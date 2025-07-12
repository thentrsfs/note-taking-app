'use client'
import React from 'react'
import Logo from '@/components/ui/svg/Logo'
import TextInput from '@/components/ui/TextInput'
import PrimaryButton from '@/components/ui/buttons/PrimaryButton'
import { sendResetLink } from '@/app/login/forgotten-password/actions'

const ForgottenPassword = () => {
  return (
     <div className='h-screen dark:bg-neutral-700 bg-neutral-100 items-center justify-center flex'>
    <form className='flex flex-col w-[355px] md:w-[500px] lg:w-[540px] dark:bg-neutral-950 bg-white rounded-xl px-4 md:px-8 py-8 lg:px-12 gap-4 text-preset-5'>
      <div className='flex flex-col items-center gap-5 py-3'>
      <Logo className='dark:fill-white fill-neutral-950' />
      <div className='flex flex-col items-center text-center gap-2'>
      <h1 className='text-preset-1 dark:text-white text-neutral-950'>Forgotten your password?</h1>
      <p className=' dark:text-neutral-300 text-neutral-600'>Enter your email below, and we’ll send you a link to reset it.</p>
      </div>
      </div>
      <div className=' flex flex-col gap-0.5'>
      <label className='text-preset-4 dark:text-white text-neutral-950' htmlFor="email">Email Address</label>
      <TextInput id="email" name="email" type="email" placeholder='email@example.com' />
      </div>
      <PrimaryButton formAction={sendResetLink} type='submit'>Send Reset Link</PrimaryButton>
    </form>

    </div>
  )
}

export default ForgottenPassword