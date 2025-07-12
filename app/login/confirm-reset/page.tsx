'use client'
import React from 'react'
import Logo from '@/components/ui/svg/Logo'

const ConfirmReset
 = () => {
  return (
     <div className='h-screen bg-neutral-700 items-center justify-center flex'>
    <div className='flex flex-col w-[355px] md:w-[500px] lg:w-[540px] bg-neutral-950 rounded-xl px-4 md:px-8 py-8 gap-6 text-preset-5 items-center text-center'>
      <Logo className='dark:fill-white fill-neutral-950 lg:hidden' />
      <h1 className='text-preset-1 dark:text-white text-neutral-950'>Check your email to reset your password.</h1>
    </div>
    </div>
  )
}

export default ConfirmReset
