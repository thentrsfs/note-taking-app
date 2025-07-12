// app/api/auth/callback/route.ts
import { createSupabaseClient } from '@/app/lib/supabase/server'
import {PrismaClient} from '@prisma/client'
import { NextResponse } from 'next/server';

export async function POST() {
  const supabase = await createSupabaseClient();
  const prisma = new PrismaClient();
  const { data: { user }, error } = await supabase.auth.getUser();
  if (error || !user) {
    return new NextResponse('Unauthorized', { status: 401 });
  }

  await prisma.user.upsert({
    where: { id: user.id },
    update: {
      email: user.email,
    },
    create: {
      id: user.id,          // Supabase UID
      email: user.email!,   // required column
    },
  });

  return NextResponse.json({ ok: true });
}