'use client';

import { createContext, useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { createSupabaseClient } from '@/app/lib/supabase/client';

type Note = {
  id: string;
  title: string;
  content: string;
  tags: string[];
  lastEdited: Date;
  isArchived: boolean;
  userId: string;
};

interface NotesContextType {
  notes: Note[];
  setNotes: React.Dispatch<React.SetStateAction<Note[]>>;
  refreshNotes: () => Promise<void>;
  loading: boolean;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
  searchInput: string;
  setSearchInput: React.Dispatch<React.SetStateAction<string>>;
}

export const NotesContext = createContext<NotesContextType>({
  notes: [],
  setNotes: () => {},
  refreshNotes: async () => {},
  loading: false,
  setLoading: () => {},
  searchInput: '',
  setSearchInput: () => {},
});

export const NotesProvider = ({ children }: { children: React.ReactNode }) => {
  const pathname = usePathname();
  const [notes, setNotes] = useState<Note[]>([]);
  const [searchInput, setSearchInput] = useState('');
  const [loading, setLoading] = useState(true);

  const fetchNotes = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/notes');
      if (res.ok) {
        const data = await res.json();
        setNotes(data);
      } else {
        console.error('Failed to fetch notes');
      }
    } catch (err) {
      console.error(err);
    }
    setLoading(false);
  };

useEffect(() => {
  fetchNotes();
}, []);

  useEffect(() => {
    if(pathname === '/' || pathname.startsWith('/archived') || pathname.startsWith('/tags') || pathname.startsWith('/settings')) 
      setSearchInput('');
  },[ pathname ]);

  return (
    <NotesContext.Provider value={{ notes, setNotes, refreshNotes: fetchNotes, loading, setLoading, searchInput, setSearchInput }}>
      {children}
    </NotesContext.Provider>
  );
};
