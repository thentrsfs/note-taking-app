import { redirect } from 'next/navigation'
import { resetPassword } from '@/app/login/actions'

export async function sendResetLink(formData: FormData) {
  const email = formData.get('email') as string | null

  if (!email) throw new Error('Email is required')

  await resetPassword(email)
  redirect('/login/confirm-reset')  // redirect to confirmation page
}