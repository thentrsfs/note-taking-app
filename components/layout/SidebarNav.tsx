'use client'
import Logo from "../ui/svg/Logo"
import Link from "next/link"
import IconHome from "../ui/svg/IconHome"
import IconArchived from "../ui/svg/IconArchived"
import SidebarLink from "../ui/SidebarLink"
import { usePathname, useSearchParams, useRouter } from "next/navigation"
import { useContext } from "react"
import { NotesContext } from "@/context/NotesContext"
import IconTag from "../ui/svg/IconTag"
import IconChevronRight from "../ui/svg/IconChevronRight"

const SidebarNav = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const sourcePath = searchParams.get('source');
  const isNotesPage = pathname === '/' || sourcePath === 'all';
  const isArchivedPage = pathname === '/archived' || sourcePath === 'archived';
  const tagSelected = searchParams.get("tag") || (pathname.startsWith("/tags") ? decodeURIComponent(pathname.split("/")[2] || "") : null);
  const {notes, searchInput, setSearchInput} = useContext(NotesContext);
  const uniqueTags = Array.from(new Set(notes.flatMap(note => note.tags)));

  const handleClick = () => {
    if(pathname === '/')
      setSearchInput('');
  }

  return (
    <div className="hidden lg:flex bg-white dark:bg-neutral-950 w-100 p-5 border-r dark:border-neutral-800 border-neutral-200 flex-col gap-4">
      <div onClick={() => router.push('/')}><Logo className='dark:fill-white fill-neutral-950 cursor-pointer' /></div>
      <nav className="flex flex-col border-b border-neutral-200 dark:border-neutral-800 pt-4 pb-2">
        <SidebarLink handleClick={handleClick} href={'/'} label={'All Notes'} icon={<IconHome className={`${isNotesPage ? 'fill-blue-500' : 'fill-neutral-950 dark:fill-white'}  w-5` }/>} active={isNotesPage} className="px-3 py-[10px]"/>
        <SidebarLink href={'/archived'} label={'Archived Notes'} icon={<IconArchived className={`${isArchivedPage ? 'stroke-blue-500' : 'stroke-neutral-950 dark:stroke-white'} fill-transparent w-5` }/>} active={isArchivedPage} className="px-3 py-[10px]"/>
      </nav>
      <div className="flex flex-col gap-2 px-2">
        <h1 className="text-preset-4 text-neutral-500 dark:text-white ">Tags</h1>
        <div className="flex flex-col">
    {uniqueTags.map((tag, index) => (
        <Link href={`/tags/${tag}`} key={index} className={`${tagSelected === tag && !searchInput ? 'bg-neutral-100 dark:bg-neutral-800' : ''} border-neutral-200 dark:border-neutral-800 hover:bg-neutral-100 dark:hover:bg-neutral-800 px-3 transition-all duration-300 rounded-lg py-[10px] flex gap-2 items-center`}> <IconTag className={`${tagSelected === tag && !searchInput ? 'stroke-blue-500' : 'stroke-neutral-700 dark:stroke-neutral-300'} fill-transparent  w-5` }/><span className="capitalize flex items-center justify-between w-full text-preset-4 text-neutral-700 dark:text-neutral-300">{tag}  {tagSelected === tag && !searchInput && <IconChevronRight className="fill-neutral-950 dark:fill-white "/>}</span></Link>
    ))}
    </div>
    </div>
    </div>
  )
}

export default SidebarNav