import React from 'react'
import IconDelete from '../svg/IconDelete'
import SecondaryButton from '../buttons/SecondaryButton'
import DeleteButton from '../buttons/DeleteButton'

const DeleteModal = ({handleDelete, cancel} : {handleDelete: () => void, cancel: () => void}) => {
  return (
    <div className='fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-11 bg-white dark:bg-neutral-700 flex flex-col w-[355px] md:w-[440px] h-fit rounded-xl border dark:border-neutral-600 border-neutral-200'>
        <div className='flex border-b border-neutral-200 dark:border-neutral-600 gap-4 p-5'>
            <div className='flex items-center justify-center bg-neutral-100 dark:bg-neutral-600 rounded-lg w-10 h-10 p-2'>
<IconDelete className='fill-transparent stroke-neutral-950 dark:stroke-white'/>
</div>
<div className='flex flex-col gap-2'>
    <span className='text-preset-3 text-neutral-950 dark:text-white'>Delete Note</span>
    <span className='text-preset-5 text-neutral-700 dark:text-neutral-200'>Are you sure you want to permanently delete this note? This action cannot be undone.</span>
</div>
        </div>
<div className='flex gap-4 p-4 self-end'>
<SecondaryButton handleSubmit={cancel}>Cancel</SecondaryButton>
<DeleteButton handleSubmit={handleDelete}>Delete Note</DeleteButton>
</div>
    </div>
  )
}

export default DeleteModal