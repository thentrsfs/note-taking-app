'use client';
import Link from "next/link";
import { useContext } from "react";
import { NotesContext } from "@/context/NotesContext";
import IconTag from "@/components/ui/svg/IconTag";
import Loading from "@/components/ui/Loading";
import MobileCreateButton from "@/components/ui/buttons/MobileCreateButton";

const TagsPage = () => {
    const {notes, loading} = useContext(NotesContext);
    const uniqueTags = Array.from(new Set(notes.flatMap(note => note.tags)));

    if (loading) return <Loading />;
  return (
    <div className="lg:hidden flex flex-col gap-3">
        <h1 className="text-preset-1 text-neutral-950 dark:text-white ">Tags</h1>
        <div className="flex flex-col gap-3 p-2">
    {uniqueTags.map((tag, index) => (
        <Link href={`/tags/${tag}`} key={index} className={`${index === uniqueTags.length - 1 ? 'border-0' : 'border-b'} border-neutral-200 dark:border-neutral-800 py-[10px] flex gap-2 items-center`}> <IconTag className='fill-transparent stroke-neutral-700 dark:stroke-neutral-300 w-5'/><span className="capitalize text-preset-4 text-neutral-700 dark:text-neutral-300">{tag}</span></Link>
    ))}
    </div>
        <MobileCreateButton/>
    </div>
  )
}

export default TagsPage