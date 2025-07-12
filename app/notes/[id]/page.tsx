'use client';

import React, { useEffect, useState, useContext } from "react"
import { ToastContext } from "@/context/ToastContext";
import { NotesContext } from "@/context/NotesContext";
import { useRouter } from "next/navigation";
import HeaderControl from "@/components/ui/HeaderControl";
import IconTag from "@/components/ui/svg/IconTag";
import IconClock from "@/components/ui/svg/IconClock";
import IconStatus from "@/components/ui/svg/IconStatus";
import Loading from "@/components/ui/Loading";
import ArchiveModal from "@/components/ui/modals/ArchiveModal";
import DeleteModal from "@/components/ui/modals/DeleteModal";
import PrimaryButton from '@/components/ui/buttons/PrimaryButton'
import SecondaryButton from "@/components/ui/buttons/SecondaryButton"
import MenuBarRight from "@/components/ui/MenuBarRight";


const NotePage = ({params}: {params: Promise<{id: string}>}) => {
  const unwrappedParams = React.use(params);
  const {id} = unwrappedParams;
  const router = useRouter();
    const { refreshNotes} = useContext(NotesContext);
    const [loading, setLoading] = useState(false)
    const { setToastText, setToastVisible, isArchived, setIsArchived } = useContext(ToastContext);
    const [note, setNote] = useState<{title: string, content: string, tags: string[], lastEdited: Date, isArchived: boolean} | null>(null)
    const [title, setTitle] = useState('')
    const [content, setContent] = useState('')
    const [tags, setTags] = useState('')
    const [lastEdited, setLastEdited] = useState<Date | null>(null)
    const [archiveModal, setArchiveModal] = useState(false)
    const [deleteModal, setDeleteModal] = useState(false)
    const [error, setError] = useState('')
    const [titleError, setTitleError] = useState(false);
    const [contentError, setContentError] = useState(false);
    const [tagsError, setTagsError] = useState(false);
   

    // Fetch note
    useEffect(() => {
      const fetchNote = async () => {
        setLoading(true)
        const res = await fetch(`/api/notes/${id}`)
        if(res.ok){
        const data = await res.json()
        setTitle(data.title)
        setContent(data.content)
        setTags(data.tags.join(','))
        setIsArchived(data.isArchived || false  )
        setLastEdited(new Date(data.lastEdited));
        setNote(data)
        }else{
          setNote(null)
        }
        setLoading(false)
      }
      fetchNote()
    }, [id])

    // Update lastEdited date only if user changes something
  useEffect(() => {
    if (!note) return;
    const changed =
      title !== note.title ||
      content !== note.content ||
      tags !== note.tags.join(', ');
    if (changed) {
      setLastEdited(new Date());
    }
  }, [title, content, tags]);
 

  const handleSave = async () => {
    setLoading(true);

    let hasError = false;

    if(!title.trim()){
      setTitleError(true);
      hasError = true;
    } else {
      setTitleError(false);
    }

    if(!content.trim()){
      setContentError(true);
      hasError = true;
    } else {
      setContentError(false);
    }
    
    if(!tags.trim()){
      setTagsError(true);
      hasError = true;
    } else {
      setTagsError(false);}
 
  if (hasError) {
    setError('Please fill in all fields');
    setTimeout(() => setError(''), 2500);
    setLoading(false);
    return;
  }

    const res = await fetch(`/api/notes/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({title, content, tags: tags.split(',').map(tag => tag.trim()), lastEdited, isArchived}),
    })
    if(res.ok){
      refreshNotes();
      router.push('/')
      setToastText('Note saved successfully!');
      setToastVisible(true);
      setTimeout(() => {
        setToastVisible(false);
      }, 2500);
    } else {
      console.log('Error saving note')
      setLoading(false);
    }
  }


  const handleArchive = async () => {
    setLoading(true);
    const res = await fetch(`/api/notes/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({title, content, tags: tags.split(',').map(tag => tag.trim()), lastEdited, isArchived: !isArchived}),
    })
    if(res.ok){
      refreshNotes();
      router.push('/')
      setToastText(isArchived ? 'Note restored to active notes.' : 'Note archived.');
      setToastVisible(true);
      setTimeout(() => {
        setToastVisible(false);
      }, 2500);
    } else {
      console.log('Error archiving note')
      setLoading(false);
    }
    
  }

  
  const handleDelete = async () => {
    setLoading(true);
    const res = await fetch(`/api/notes/${id}`, {
      method: 'DELETE',
    })
    if(res.ok){
      refreshNotes();
      router.push('/')
      setToastText('Note permanently deleted.');
      setToastVisible(true);
      setTimeout(() => {
        setToastVisible(false);
      }, 2500);
    } else {
      console.log('Error deleting note')
      setLoading(false);
    }
  }

  const openArchiveModal = () => {
    setArchiveModal(true);
  }

  const openDeleteModal = () => {
    setDeleteModal(true);
  }
    if(loading) return <Loading/>
    if(!note) return <div className="flex min-h-screen w-full">Note not found</div>
    return <div className="flex min-h-screen w-full">
     <div className="flex flex-col gap-3 min-h-screen w-full ">
       {archiveModal && (
          <ArchiveModal isArchived={isArchived} handleArchive={handleArchive} cancel={() => setArchiveModal(false)}/>
        )}
        {archiveModal && (
          <div onClick={() => setArchiveModal(false)} className="inset-0 bg-black opacity-50 fixed z-10"></div>
        )}
        {deleteModal && (
          <DeleteModal handleDelete={handleDelete} cancel={() => setDeleteModal(false)}/>
        )}
        {deleteModal && (
          <div onClick={() => setDeleteModal(false)} className="inset-0 bg-black opacity-50 fixed z-10"></div>
        )}
       <HeaderControl isUniqueNote={true} goBack={() => router.back()} cancel={() => router.push('/')} handleSubmit={handleSave} handleArchive={openArchiveModal} handleDelete={openDeleteModal} isArchived={isArchived} />
       
        <input placeholder="Enter a title..." value={title} onChange={(e) => setTitle(e.target.value)} className={`${titleError ? 'placeholder:text-red-500 dark:placeholder:text-red-500' : 'dark:placeholder:text-neutral-300 placeholder:text-neutral-950'} text-preset-2 capitalize text-neutral-950 dark:text-white focus:outline-none`}/>
        <div className="flex items-center"><div className="flex items-center gap-2 w-full flex-1">
<IconTag className="fill-transparent stroke-neutral-700 dark:stroke-neutral-300 w-5"/> 
<span className="text-preset-5 text-neutral-700 dark:text-neutral-300">Tags</span> </div> <input value={tags} onChange={(e) => setTags(e.target.value)} className={`${tagsError ? 'placeholder:text-red-500 dark:placeholder:text-red-500' : 'placeholder:text-neutral-400 '} flex-2 capitalize placeholder:normal-case text-preset-5 dark:text-white text-neutral-950 focus:outline-none`} type="text" placeholder="Add tags separated by commas (e.g. Work, Planning)" /> </div>
{ note.isArchived &&
  <div className="flex items-center">
  <div className="flex items-center gap-2 w-full flex-1">
<IconStatus className="fill-transparent stroke-neutral-700 dark:stroke-neutral-300 w-5"/> <span className="text-preset-5 text-neutral-700 dark:text-neutral-300">Status</span>
  </div>
  <span className="flex-2 text-preset-5 text-neutral-950 dark:text-white">Archived</span>
</div>}
        <div className="flex border-b border-neutral-200 dark:border-neutral-800 pb-2 items-center"><div className="flex items-center gap-2 flex-1 w-full">
<IconClock className="fill-neutral-700 w-5 dark:fill-neutral-300" /> <span className="text-preset-5 text-neutral-700 dark:text-neutral-300">Last edited</span> </div>
<span className="flex-2 text-preset-5 text-neutral-700 dark:text-white">{lastEdited ? lastEdited.toDateString().slice(4) : ''}</span> 
        </div>
        <textarea value={content} onChange={(e) => setContent(e.target.value)} className={`${contentError ? ' placeholder:text-red-500 dark:placeholder:text-red-500' : 'dark:placeholder:text-neutral-400 placeholder:text-neutral-700'} lg:h-[65vh] text-neutral-950 dark:text-white rounded-lg focus:outline-none`} placeholder="Start typing your note here…"></textarea>
        <div className="hidden lg:flex gap-4 border-t border-neutral-200 dark:border-neutral-800 pt-4 ">
  <PrimaryButton handleSubmit={handleSave}>Save Note</PrimaryButton>
  <SecondaryButton handleSubmit={() => router.push('/')}>Cancel</SecondaryButton>
</div>
         {error && <span className="text-red-500 dark:text-red-500 text-preset-5 absolute bottom-20 left-[50%] translate-x-[-50%]">{error}</span>}
    </div>
    <MenuBarRight isArchived={isArchived} handleArchive={openArchiveModal} handleDelete={openDeleteModal}/>
    </div>

  
}

export default NotePage