'use client'

import Link from "next/link"
import { useContext } from "react"
import MobileCreateButton from "../ui/buttons/MobileCreateButton"
import Loading from "../ui/Loading"
import { usePathname } from "next/navigation"
import PrimaryButton from "../ui/buttons/PrimaryButton"
import { NotesContext } from "@/context/NotesContext"


const SidebarAllNotes = () => {
  const path = usePathname();
const {notes, loading} = useContext(NotesContext);
const filteredNotes = notes.filter((note) => !note.isArchived);

if(loading) return <Loading/>
  return (
    <div className="flex flex-col gap-2 w-full" >
       <h1 className="text-preset-1 text-neutral-950 dark:text-white lg:hidden">All Notes</h1>
<Link className="hidden lg:flex" href={'/create-note?source=all'}><PrimaryButton className="w-full">+ Create New Note</PrimaryButton></Link>
<MobileCreateButton/>
    <nav className="flex flex-col">
      {filteredNotes.length === 0 && !loading && (
        <div className="text-preset-5 text-neutral-950 dark:text-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 bg-neutral-100 p-2 rounded-lg">You don’t have any notes yet. Start a new note to capture your thoughts and ideas.</div>
      )}
      <div className=" flex flex-col gap-1">
{filteredNotes.map((note) => (
  <div className="flex flex-col gap-1" key={note.id}>
  <Link href={`/notes/${note.id}?source=all`} key={note.id} className={`${path === `/notes/${note.id}` ? 'bg-neutral-100 dark:bg-neutral-800 rounded-md' : ''} flex flex-col gap-3 p-2 `}>   
    <span className="text-preset-3 text-neutral-950 dark:text-white capitalize">{note.title}</span>
    <div className="flex gap-2 flex-wrap">
      {note.tags.map((tag, index) => (
        <span key={index} className="text-preset-6 text-neutral-950 capitalize dark:text-white bg-neutral-200 dark:bg-neutral-700 px-[6px] pt-[2px] pb-[4px] rounded-sm">{tag}</span>
      ))}
      
    </div>
    <span className="text-preset-6 text-neutral-700 dark:text-neutral-300">{new Date(note.lastEdited).toDateString().slice(4)}</span>
  </Link>
    <hr className="border-neutral-200 dark:border-neutral-800" />
  </div>
))}
</div>

    </nav>
    </div>
  )
}

export default SidebarAllNotes