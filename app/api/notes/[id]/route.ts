import { NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client';

export async function GET(
  req: Request,
  context: { params: Promise<{ id: string }> }
) {
  const {id} = await context.params;

  const prisma = new PrismaClient();

  const note = await prisma.note.findUnique({
    where: { id },
  })

  if (!note) {
    return NextResponse.json({ error: 'Note not found' }, { status: 404 })
  }

  return NextResponse.json(note)
}

export async function PUT(
  req: Request,
  context: { params: Promise<{ id: string }> }
) {
  const {id} = await context.params;
   const prisma = new PrismaClient();
  const body = await req.json();

  const updated = await prisma.note.update({
    where: { id },
    data: {
      title: body.title,
      content: body.content,
      tags: body.tags,
      isArchived: body.isArchived,
      lastEdited: new Date(body.lastEdited),
    },
  });

  return NextResponse.json(updated);
}

export async function DELETE(
  req: Request,
  context: { params: Promise<{ id: string }> }
) {
  const { id } = await context.params;
   const prisma = new PrismaClient();

  await prisma.note.delete({
    where: { id },
  });

  return NextResponse.json({ message: 'Note deleted successfully' });
}

