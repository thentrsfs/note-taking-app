'use client'
import React from 'react'
import { useRouter } from 'next/navigation'
import IconCheckmark from './svg/IconCheckmark'
import IconCross from './svg/IconCross'

const Toast = ({text, setToastVisible, toastText, isArchived} : {text: string , toastText: string, isArchived: boolean, setToastVisible: (visible: boolean) => void}) => {
  const router = useRouter()
  return (
    <div className='md:w-[390px] inset-x-5 bg-white fixed bottom-18 flex items-center z-50 dark:bg-neutral-800 dark:border-neutral-700 gap-2 p-2 text-preset-6 rounded-lg border border-neutral-200 dark:text-white h-fit'><IconCheckmark className='fill-green-500 w-5 text-neutral-950'/>{text} <div className='flex gap-2 ml-auto items-center'>{ toastText === 'Note archived.' || toastText === 'Note restored to active notes.' ? <span onClick={() => router.push(isArchived ? '/' : '/archived')} className='underline text-neutral-950 dark:text-white'>{isArchived ? 'All Notes' : 'Archived Notes'}</span> : null} <button onClick={() => setToastVisible(false)}><IconCross className='stroke-neutral-400 w-5' /></button></div> </div>
  )
}

export default Toast