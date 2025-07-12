import React from 'react'
import IconArchived from '../svg/IconArchived'
import SecondaryButton from '../buttons/SecondaryButton'
import PrimaryButton from '../buttons/PrimaryButton'

const ArchiveModal = ({handleArchive, cancel, isArchived} : {handleArchive: () => void, cancel: () => void, isArchived: boolean}) => {
  return (
    <div className='fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-11 bg-white dark:bg-neutral-700 flex flex-col w-[355px] md:w-[440px] h-fit rounded-xl border dark:border-neutral-600 border-neutral-200'>
        <div className='flex border-b border-neutral-200 dark:border-neutral-600 gap-4 p-5'>
            <div className='flex items-center justify-center bg-neutral-100 dark:bg-neutral-600 rounded-lg w-10 h-10 p-2'>
<IconArchived className='fill-transparent stroke-neutral-950 dark:stroke-white '/>
</div>
<div className='flex flex-col gap-2'>
    <span className='text-preset-3 text-neutral-950 dark:text-white'>{ isArchived ? 'Restore Note' : 'Archive Note'}</span>
    <span className='text-preset-5 text-neutral-700 dark:text-neutral-200'>{ isArchived ? 'Are you sure you want to restore this note?' : 'Are you sure you want to archive this note? You can find it in the Archived Notes section and restore it anytime.'}</span>
</div>
        </div>
<div className='flex gap-4 p-4 self-end'>
<SecondaryButton handleSubmit={cancel}>Cancel</SecondaryButton>
<PrimaryButton handleSubmit={handleArchive}>{ isArchived ? 'Restore Note' : 'Archive Note'}</PrimaryButton>
</div>
    </div>
  )
}

export default ArchiveModal