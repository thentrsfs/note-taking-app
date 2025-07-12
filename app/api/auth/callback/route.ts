// app/api/auth/callback/route.ts
import { createSupabaseClient } from '@/app/lib/supabase/server';
import prisma from '@/app/lib/prisma';
import { NextResponse } from 'next/server';

export async function POST() {
  const supabase = await createSupabaseClient();
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