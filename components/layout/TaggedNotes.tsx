'use client';

import { useContext } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { NotesContext } from '@/context/NotesContext';
import Loading from '@/components/ui/Loading';
import Link from 'next/link';
import PrimaryButton from '@/components/ui/buttons/PrimaryButton';
import MobileCreateButton from '@/components/ui/buttons/MobileCreateButton';

const TaggedNotes = ({ tag }: { 
  tag: string;
}) => {
  const router = useRouter();
  const { notes, loading } = useContext(NotesContext);
  const path = usePathname();

  const filteredNotes = notes.filter(note => note.tags.includes(tag));

  if (loading) return <Loading />;

  return (
    <div className="flex flex-col gap-3">
          <button className="flex items-center gap-1 lg:hidden">
            <svg className="fill-neutral-600 dark:fill-neutral-300" xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24">
              <path fillRule="evenodd" d="M15.75 20.414 7.336 12l8.414-8.414L17.164 5l-7 7 7 7-1.414 1.414Z" clipRule="evenodd" />
            </svg>
            <span className="text-preset-5 text-neutral-600 dark:text-neutral-300" onClick={() => router.push('/tags')}>All Tags</span>
          </button>
          <Link className="hidden lg:flex" href={'/create-note'}><PrimaryButton className="w-full">+ Create New Note</PrimaryButton></Link>
          <h1 className="text-preset-1 text-neutral-600 dark:text-neutral-400 lg:hidden">
            Notes Tagged: <span className="text-neutral-950 dark:text-white capitalize">{tag}</span>
          </h1>
          <span className="text-preset-5 text-neutral-700 dark:text-neutral-300">
            All notes with the <span className="text-neutral-950 dark:text-white capitalize">“{tag}”</span> tag are shown here.
          </span>
      <div>
        <div className="flex flex-col gap-1">
        {filteredNotes.map((note) => (
          <div className="flex flex-col gap-1" key={note.id}>
          <Link
            href={`/notes/${note.id}?source=tag&tag=${encodeURIComponent(tag)}`}
            key={note.id}
            className={`${note.id === path.split('/')[2]  ? 'bg-neutral-100 dark:bg-neutral-800 rounded-md' : '' } flex flex-col gap-3 p-2`}
          >
            <span className="text-preset-3 text-neutral-950 dark:text-white capitalize">{note.title}</span>
            <div className="flex gap-2 flex-wrap">
              {note.tags.map((tagItem, index) => (
                <span
                  key={index}
                  className="text-preset-6 text-neutral-950 capitalize dark:text-white bg-neutral-200 dark:bg-neutral-700 px-[6px] pt-[2px] pb-[4px] rounded-sm"
                >
                  {tagItem}
                </span>
              ))}
            </div>
            <span className="text-preset-6 text-neutral-700 dark:text-neutral-200">
              {new Date(note.lastEdited).toDateString().slice(4)}
            </span>
          </Link>
          <hr className="dark:border-neutral-800 border-neutral-200" />
          </div>
        ))}
        </div>
      </div>
      <MobileCreateButton />
    </div>
  );
};

export default TaggedNotes;
