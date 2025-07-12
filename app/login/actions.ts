'use server'

import { redirect } from 'next/navigation'
import { createSupabaseClient } from '@/app/lib/supabase/server'
import { supabaseAdmin } from '@/app/lib/supabase/admin'

export async function login({email, password} : {email: string, password: string}): Promise<{error: string | null}> {
  const supabase = await createSupabaseClient()

  const { error } = await supabase.auth.signInWithPassword({
    email,
    password,
  })

  return {error:error?.message || null}
}

export async function loginWithGoogle() {
  const supabase = await createSupabaseClient()

  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: 'google',
    options: {
      redirectTo: `${process.env.NEXT_PUBLIC_SITE_URL}/auth/callback`,
    },
  })

  if (error || !data?.url) {
    redirect('/error')
  }

  redirect(data.url)
}

  export async function signup({email, password} : {email: string, password: string}): Promise<{error: string | null}> {
     const { data, error: listError } = await supabaseAdmin.auth.admin.listUsers({
    page: 1,
    perPage: 1000, // Adjust as needed
  })

  if (listError) {
    return { error: 'Server error checking user.' }
  }
const existingUser = data.users.find((u) => u.email?.toLowerCase() === email.toLowerCase())

   if (existingUser) {
    if (!existingUser.email_confirmed_at) {
      return { error: 'User needs to verify email. Please check your inbox.' }
    }
    return { error: 'User already exists.' }
  }


    const supabase = await createSupabaseClient()

    const { error } = await supabase.auth.signUp({
      email,
      password,
    })

    return {error:error?.message || null}
  }

export async function resetPassword(email: string){
  const supabase = await createSupabaseClient()

  const {error} = await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: `${process.env.NEXT_PUBLIC_SITE_URL}/login/reset-password`,
  })

  if (error) {
    redirect('/error')
  }

 return true
}