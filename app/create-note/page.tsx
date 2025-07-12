'use client';

import { useState, useContext } from "react";
import { NotesContext } from "@/context/NotesContext";
import { useRouter } from "next/navigation";
import Loading from "@/components/ui/Loading";
import HeaderControl from "@/components/ui/HeaderControl"
import IconTag from "@/components/ui/svg/IconTag"
import IconClock from "@/components/ui/svg/IconClock"
import { ToastContext } from "@/context/ToastContext";
import PrimaryButton from '@/components/ui/buttons/PrimaryButton'
import SecondaryButton from "@/components/ui/buttons/SecondaryButton"


const createNotePage = () => {
    // States
    const {notes,refreshNotes, loading, setLoading} = useContext(NotesContext);
    const {setToastText, setToastVisible} = useContext(ToastContext);
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [tags, setTags] = useState('');
    const [isArchived, setIsArchived] = useState(false);
    const [lastEdited, setLastEdited] = useState(new Date());
    const [error, setError] = useState('');
    const [titleError, setTitleError] = useState(false);
    const [contentError, setContentError] = useState(false);
    const [tagsError, setTagsError] = useState(false);

    const router = useRouter();

    const handleSubmit = async () => {
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
            setTagsError(false);
        }
        if(notes.find(note => note.title.toLowerCase() === title.toLowerCase())) {
            setError('Note with this title already exists');
            setTimeout(() => setError(''), 2500);
            setLoading(false);
            return;
        }
    
        if (hasError) {
            setError('Please fill in all fields');
            setTimeout(() => setError(''), 2500);
            setLoading(false);
            return;
        }

       const res = await fetch('/api/notes', {
  method: 'POST',
  credentials: 'include',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    title,
    tags: tags.split(',').map(tag => tag.trim()),
    content,
    isArchived,
    lastEdited
  }),
});
        if(res.ok) {
            await refreshNotes();
            setToastText('Note created successfully!');
            setToastVisible(true);
            setTimeout(() => {
                setToastVisible(false);
            }, 2500);
            router.push('/');
        } else {
            setError('Error creating note')
            setLoading(false);
        }
    }

    if(loading) return <Loading/>
  return (
    <div className="flex flex-col gap-3 min-h-screen">
        <HeaderControl goBack={() => router.back()} cancel={() => router.push('/')} handleSubmit={handleSubmit}/>
        <input placeholder="Enter a title..." value={title} onChange={(e) => setTitle(e.target.value)} className={`${titleError ? 'placeholder:text-red-500 dark:placeholder:text-red-500' : 'dark:placeholder:text-neutral-300 placeholder:text-neutral-950'} text-preset-2 capitalize text-neutral-950 dark:text-white focus:outline-none`}/>
        <div className="flex gap-4 items-center">
            <div className="flex items-center gap-2 w-full flex-1">
<IconTag className="fill-transparent stroke-neutral-700 dark:stroke-neutral-300 w-5"/> <span className="text-preset-5 text-neutral-700 dark:text-neutral-300">Tags</span> </div> <input value={tags} onChange={(e) => setTags(e.target.value)} className={`${tagsError ? 'placeholder:text-red-500 dark:placeholder:text-red-500' : 'placeholder:text-neutral-400 '} flex-2 capitalize placeholder:normal-case text-preset-5 dark:text-white text-neutral-950 focus:outline-none`} type="text" placeholder="Add tags separated by commas (e.g. Work, Planning)" />
        </div>
        <div className="flex gap-4 border-b border-neutral-200 dark:border-neutral-800 pb-2 items-center"><div className="flex items-center gap-2 flex-1 w-full">
<IconClock className="fill-neutral-700 dark:fill-neutral-300 w-5" /> <span className="text-preset-5 text-neutral-700 dark:text-neutral-300">Last edited</span> </div>
<span className="flex-2 text-preset-5 text-neutral-300">Not yet saved</span> 
        </div>
        <textarea value={content} onChange={(e) => setContent(e.target.value)} className={`${contentError ? ' placeholder:text-red-500 dark:placeholder:text-red-500' : 'dark:placeholder:text-neutral-400 placeholder:text-neutral-700'} lg:h-[65vh] text-neutral-950 dark:text-white rounded-lg focus:outline-none`} placeholder="Start typing your note here…"></textarea>
        <div className="hidden lg:flex gap-4 border-t border-neutral-200 dark:border-neutral-800 pt-4 ">
  <PrimaryButton handleSubmit={handleSubmit}>Save Note</PrimaryButton>
  <SecondaryButton handleSubmit={() => router.push('/')}>Cancel</SecondaryButton>
</div>
        {error && <span className="text-red-500 dark:text-red-500 text-preset-5 absolute bottom-20 left-[50%] translate-x-[-50%]">{error}</span>}
    </div>
  )
}

export default createNotePage