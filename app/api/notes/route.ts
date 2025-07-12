import { NextResponse } from 'next/server';
import prisma from '@/app/lib/prisma';
import { createSupabaseClient } from '@/app/lib/supabase/server';


export async function POST(req: Request) {
  const supabase = await createSupabaseClient();
  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser();

  
  if (authError || !user) {
    return new NextResponse('Unauthorized', { status: 401 });
  } 

  console.log('Creating note for user:', user.id);

  try {
    const { title, tags, content } = await req.json();

    if (!title || !tags || !content) {
      return new NextResponse('Missing fields', { status: 400 });
    }

    const note = await prisma.note.create({
      data: {
        title,
        tags,
        content,
        lastEdited: new Date(),
        isArchived: false,
        userId: user.id, // Link to current user
      },
    });

    return NextResponse.json(note);
  } catch (error) {
  console.error('Error creating note:', error);
  return new NextResponse(
    `Error creating note: ${
      error instanceof Error ? error.message : 'unknown'
    }`,
    { status: 500 },
  );
}
}

export async function GET() {
  const supabase = await createSupabaseClient();
  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser();
  

  if (authError || !user) {
    return new NextResponse('Unauthorized', { status: 401 });
  }

  try {
    const notes = await prisma.note.findMany({
      where: { userId: user.id },
      orderBy: { lastEdited: 'desc' },
    });

    if (!notes || notes.length === 0) {
      return NextResponse.json([]);
    }

    return NextResponse.json(notes);
  } catch (error) {
  console.error('Error fetching notes:', error);
  return new NextResponse(`Error fetching notes: ${error instanceof Error ? error.message : 'unknown error'}`, { status: 500 });
}
}

