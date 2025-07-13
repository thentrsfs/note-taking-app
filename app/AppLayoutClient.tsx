'use client';

import { useContext, useState, useEffect } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import { FontContext } from "@/context/FontContext";
import { ThemeContext } from "@/context/ThemeContext";
import { ToastContext } from "@/context/ToastContext";
import { NotesContext } from "@/context/NotesContext";
import Sidebar from "@/components/layout/SidebarNav";
import MenuBar from "@/components/ui/MenuBar";
import SettingsMenu from "@/components/ui/SettingsMenu";
import ArchivedNotes from "@/components/layout/ArchivedNotes";
import SidebarAllNotes from "@/components/layout/SidebarAllNotes";
import TaggedNotes from "@/components/layout/TaggedNotes";
import SearchedNotes from "@/components/layout/SearchedNotes";
import Header from "@/components/ui/Header";
import Toast from "@/components/ui/Toast";
import Loading from "@/components/ui/Loading";
import { Suspense } from "react";

export default function AppLayoutClient({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const {searchInput, setSearchInput} = useContext(NotesContext);
  const { theme } = useContext(ThemeContext);
  const { font } = useContext(FontContext);
  const sourcePath = searchParams.get('source');
 const tag = searchParams.get("tag") || (pathname.startsWith("/tags") ? decodeURIComponent(pathname.split("/")[2] || "") : null);
const isLoginPage = pathname.startsWith('/login');
  const isTagsPage = pathname.startsWith('/tags') || sourcePath === 'tag';
  const allNotesPage = pathname === '/' || sourcePath === 'all';
  const isArchivedPage = pathname.startsWith('/archived') || sourcePath === 'archived';
  const isSearchPage = searchInput !== '';
  const isSettingsPage = pathname.startsWith('/settings');

  const { toastText, toastVisible, setToastVisible, isArchived } = useContext(ToastContext);

  const [isHydrated, setIsHydrated] = useState(false);
  useEffect(() => {
    setIsHydrated(true);
    fetch('/api/auth/callback', { method: 'POST' }).catch(console.error);
  }, []);

  const fontClass = {
    inter: 'font-inter',
    noto: 'font-noto',
    source: 'font-source',
  }[font];

  return (
    <div className={`${fontClass} bg-neutral-100 lg:bg-white dark:bg-neutral-800 dark:lg:bg-neutral-950 min-h-screen flex max-lg:flex-col`}>
      {!isHydrated ? <Loading /> : (
        <div data-theme={theme} className="flex max-lg:flex-col w-full">
          <Suspense fallback={<Loading />}>
          {!isLoginPage && <Sidebar />}
          </Suspense>
          <div className="flex flex-col w-full lg:bg-white bg-neutral-100 dark:bg-neutral-800 lg:dark:bg-neutral-950">
            {!isLoginPage && <Header searchInput={searchInput} handleInputChange={(e) => setSearchInput(e.target.value)} title={isArchivedPage ? 'Archived Notes' : isTagsPage ? 'Notes Tagged:' : 'All Notes'} tag={tag || ''} />}
            <main className={!isLoginPage ? 'rounded-t-xl flex min-h-screen max-lg:flex-col bg-white dark:bg-neutral-950 pb-12 p-4 md:p-8 lg:py-0 overflow-hidden transition-colors duration-300' : ''}>
              {!isLoginPage && (
                <div className="hidden lg:block lg:py-5 pr-8 w-full max-w-80">
                  {isArchivedPage && !searchInput && <ArchivedNotes />}
                  {allNotesPage && !searchInput && <SidebarAllNotes />}
                  {isTagsPage && !searchInput && <TaggedNotes tag={tag || ''} />}
                  {isSettingsPage && !searchInput && <SettingsMenu />}
                  {isSearchPage && <SearchedNotes />}
                </div>
              )}
              <div className={!isLoginPage  ? 'w-full lg:px-8 lg:py-5 lg:border-x lg:border-neutral-200 lg:dark:border-neutral-700 ' : ''}>
                {children}
              </div>
              <div className="lg:max-w-70 w-full"></div>
            </main>
          </div>
          {!isLoginPage && <MenuBar />}
          {toastVisible && <Toast text={toastText} toastText={toastText} isArchived={isArchived} setToastVisible={setToastVisible} />}
        </div>
      )}
    </div>
  );
}
