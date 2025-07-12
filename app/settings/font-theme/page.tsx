'use client';
import { useState, useContext, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { FontContext } from '@/context/FontContext';
import { ToastContext } from '@/context/ToastContext';
import { NotesContext } from '@/context/NotesContext';
import Loading from '@/components/ui/Loading';
import IconMonospace from '@/components/ui/svg/IconMonospace';
import IconSansSerif from '@/components/ui/svg/IconSansSerif';
import IconSerif from '@/components/ui/svg/IconSerif';
import PrimaryButton from '@/components/ui/buttons/PrimaryButton';

const FontTheme = () => {
    const router = useRouter()
    const { font, setFont } = useContext(FontContext);
    const { loading, setLoading } = useContext(NotesContext);
    const [selectedFont, setSelectedFont] = useState<'inter' | 'noto' | 'source'>(font);
    const { setToastText, setToastVisible } = useContext(ToastContext);

    useEffect( () => {
        setSelectedFont(font);
    }, [font]);
    const handleApplyFont = () => {
        setLoading(true);
        setFont(selectedFont);
        router.push('/settings');
        setToastText('Settings updated successfully!');
        setToastVisible(true);
        setTimeout(() => {
            setToastVisible(false);
            setLoading(false);
        }, 2500);
    }
    const fonts = [{
        name: 'inter',
        title: 'Sans Serif',
        description: 'Clean and modern, easy to read.',
        icon: <IconSansSerif className='fill-neutral-950 dark:fill-white' />
    }, {
        name: 'noto',
        title: 'Serif',
        description: 'Classic and elegant for a timeless feel.',
        icon: <IconSerif className='fill-neutral-950 dark:fill-white' />
    }, {
        name: 'source',
        title: 'Monospace',
        description: 'Code-like, great for a technical vibe.',
        icon: <IconMonospace className='fill-neutral-950 dark:fill-white' />    
    }];
    if(loading) return <Loading/>
  return (
      <div className='flex flex-col gap-3'>
        <button onClick={() => router.push('/settings')} className="flex focus:outline-red-600 items-center gap-1 py-1"><svg className="fill-neutral-600 dark:fill-neutral-300" xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24"><path fillRule="evenodd" d="M15.75 20.414 7.336 12l8.414-8.414L17.164 5l-7 7 7 7-1.414 1.414Z" clipRule="evenodd"/></svg>
    <span className="text-preset-5 text-neutral-600 dark:text-neutral-300" >Settings</span>
    </button>
     <h1 className="text-preset-1 text-neutral-950 dark:text-white">Font Theme</h1>
     <span className='text-preset-5 text-neutral-700 dark:text-neutral-300'>Choose your font theme:</span>
     <div className='flex flex-col gap-4'>
     {fonts.map((f) => (
       <label key={f.name} className={`${selectedFont === f.name ? 'bg-neutral-100 dark:bg-neutral-800' : 'bg-white dark:bg-neutral-950'} flex w-full items-center justify-between p-4 border border-neutral-200 dark:border-neutral-800 rounded-xl transition-colors duration-300 cursor-pointer`}>
    <div className='flex gap-5'>
        <div className='flex items-center justify-center w-10 h-10 rounded-xl bg-white dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-800 group-hover:bg-neutral-200 dark:group-hover:bg-neutral-800 transition-colors'>
        {f.icon}
        </div>
    <div className='flex flex-col gap-2 group'>
<span className='text-preset-4 text-neutral-950 dark:text-white'>{f.title}</span>
<span className='text-preset-6 text-neutral-700 dark:text-neutral-300'>{f.description}</span>
    </div>
    </div>
  <input
    type="radio"
    name="theme"
    value={f.name}
    className="hidden peer"
    checked={selectedFont === f.name}
    onChange={(e) => setSelectedFont(e.target.value as 'inter' | 'noto' | 'source')}
  />
  <div className="w-4 h-4 rounded-full border-2 border-neutral-200 dark:border-neutral-600 peer-checked:border-4 peer-checked:border-blue-500 transition-colors"></div>
</label>
     ))}
</div>
     <PrimaryButton handleSubmit={handleApplyFont} className='self-end'>Apply Changes</PrimaryButton>
     </div>
  )
}

export default FontTheme