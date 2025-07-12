'use client';
import TextInput from "@/components/ui/TextInput"
import IconSearch from "@/components/ui/svg/IconSearch"
import Link from "next/link";
import Loading from "@/components/ui/Loading";
import { usePathname } from "next/navigation";
import { useState, useEffect, useContext } from "react";
import { NotesContext } from "@/context/NotesContext";
import MobileCreateButton from "@/components/ui/buttons/MobileCreateButton";
import PrimaryButton from "../ui/buttons/PrimaryButton";

const SearchedNotes = () => {
  const pathname = usePathname();
  const {notes, loading, searchInput, setSearchInput} = useContext(NotesContext);
    const [searchedNotes, setSearchedNotes] = useState<{id: string, title: string, content: string, tags: string[], lastEdited: Date, isArchived: boolean}[]>([]);

    // Filter notes based on search input
    useEffect(() => {
      const trimmedInput = searchInput.trim().toLowerCase();
      if (trimmedInput === '') {
        setSearchedNotes([]);
        return;
      }
        const filteredNotes = notes.filter(note => note.title.toLowerCase().includes(trimmedInput) || note.tags.some(tag => tag.toLowerCase().includes(trimmedInput)));
        setSearchedNotes(filteredNotes);
    }, [searchInput, notes]);

    if(loading) return <Loading/>
  return (
    <div className="flex flex-col gap-3">
        <h1 className="text-preset-1 text-neutral-950 dark:text-white lg:hidden">Search</h1>
        <Link className="hidden lg:flex" href={'/create-note'}><PrimaryButton className="w-full">+ Create New Note</PrimaryButton></Link>
        <div className="flex flex-col gap-5">
        <div className="lg:hidden">
        <TextInput value={searchInput} handleChange={(e) => setSearchInput(e.target.value)} placeholder="Search..." beforeIcon={<IconSearch className={'fill-neutral-500'}/>} />
        </div>
        { searchInput && <span className="text-preset-5 text-neutral-700 dark:text-neutral-300">All notes matching <span className="text-neutral-950 dark:text-white">”{searchInput}”</span> are displayed below.</span>}
        {searchedNotes.length === 0 && searchInput && <div className="text-preset-5 text-neutral-950 border border-neutral-200 dark:bg-neutral-800 dark:border-neutral-700 dark:text-white bg-neutral-100 p-2 rounded-lg">No notes match your search. Try a different keyword or <Link className='underline' href={'/create-note'}>create a new note.</Link></div>}
        </div>
        <div className="flex flex-col gap-3 ">
            {   searchedNotes.map((note,index) => (
                    <Link href={`/notes/${note.id}`} key={note.id} className={`${index === searchedNotes.length - 1 ? 'border-0' : 'border-b'} ${pathname === `/notes/${note.id}` ? 'bg-neutral-100 dark:bg-neutral-800 rounded-md' : ''}  border-neutral-200 dark:border-neutral-800 flex flex-col gap-3 p-2`}>
    <span className="text-preset-3 text-neutral-950 capitalize dark:text-white">{note.title}</span>
    <div className="flex gap-2">
      {note.tags.map((tag, index) => (
        <span key={index} className="text-preset-6 text-neutral-950 capitalize dark:text-white bg-neutral-200 dark:bg-neutral-700 px-[6px] pt-[2px] pb-[4px] rounded-sm">{tag}</span>
      ))}
    </div>
    <span className="text-preset-6 text-neutral-700 dark:text-neutral-200">{new Date(note.lastEdited).toDateString().slice(4)}</span>
  </Link>
                ))
            }
        </div>
       
        <MobileCreateButton/>
    </div>
  )
}

export default SearchedNotes