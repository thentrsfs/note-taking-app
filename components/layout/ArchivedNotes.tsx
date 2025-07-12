'use client';
import PrimaryButton from '@/components/ui/buttons/PrimaryButton'
import MobileCreateButton from '@/components/ui/buttons/MobileCreateButton'
import Loading from '@/components/ui/Loading'
import { useContext } from 'react';
import { NotesContext } from '@/context/NotesContext';
import Link from "next/link"
import { usePathname } from 'next/navigation';

const ArchivedNotes = () => {
  const {notes, loading} = useContext(NotesContext);
  const path = usePathname();
  const archivedNotes = notes.filter((note) => note.isArchived);

  if (loading) return <Loading />;
  return (
    <div className="flex flex-col gap-2">
        <div className="flex flex-col gap-4">
        <h1 className="text-preset-1 text-neutral-950 dark:text-white lg:hidden">Archived Notes</h1>
<Link className="hidden lg:flex" href={'/create-note?source=archived'}><PrimaryButton className="w-full">+ Create New Note</PrimaryButton></Link>
        <span className='text-preset-5 text-neutral-700 dark:text-neutral-200'>All your archived notes are stored here. You can restore or delete them anytime.</span>
        </div>
<MobileCreateButton/>
    <nav className="flex flex-col">
        
      {archivedNotes.length === 0 && (
        <div className="text-preset-5 text-neutral-950 border border-neutral-200 dark:bg-neutral-800 dark:border-neutral-700 dark:text-white bg-neutral-100 p-2 rounded-lg">No notes have been archived yet. Move notes here for safekeeping, or <Link className='underline' href={'/create-note'}>create a new note.</Link></div>
      )}
      <div className=" flex flex-col gap-1">
{archivedNotes.map((note) => (
  <div className='flex flex-col gap-1' key={note.id}>
  <Link href={`/notes/${note.id}?source=archived`} className={`${path === `/notes/${note.id}` ? 'bg-neutral-100 dark:bg-neutral-800 rounded-md' : ''} flex flex-col gap-3 p-2`}>
    <span className="text-preset-3 text-neutral-950 dark:text-white capitalize">{note.title}</span>
    <div className="flex gap-2">
      {note.tags.map((tag, index) => (
        <span key={index} className="text-preset-6 text-neutral-950 dark:text-white dark:bg-neutral-700 bg-neutral-200 px-[6px] pt-[2px] pb-[4px] rounded-sm">{tag}</span>
      ))}
    </div>
    <span className="text-preset-6 text-neutral-700 dark:text-neutral-200">{new Date(note.lastEdited).toDateString().slice(4)}</span>
  </Link>
    <hr className="border-neutral-200 dark:border-neutral-800" />
  </div>
))}
</div>
    </nav>
    </div>
  )
}

export default ArchivedNotes