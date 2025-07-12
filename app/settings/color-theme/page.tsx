'use client';
import { useRouter } from 'next/navigation';
import { useContext, useEffect, useState } from 'react';
import { ThemeContext } from '@/context/ThemeContext';
import { ToastContext } from '@/context/ToastContext';
import IconSun from '@/components/ui/svg/IconSun';
import IconMoon from '@/components/ui/svg/IconMoon';
import IconSystem from '@/components/ui/svg/IconSystem';
import PrimaryButton from '@/components/ui/buttons/PrimaryButton';

const ColorThemePage = () => {
    const router = useRouter();
    const { theme, setTheme } = useContext(ThemeContext);
    const [selectedTheme, setSelectedTheme] = useState<'light' | 'dark' | 'system'>(theme);
    const { setToastText, setToastVisible } = useContext(ToastContext);

    const modes = [{
      name: 'light',
      title: 'Light Mode',
      icon: <IconSun className='stroke-neutral-950 fill-transparent dark:stroke-white' />,
      description: 'Pick a clean and classic light theme'
    }, {
      name: 'dark',
      title: 'Dark Mode',
      icon: <IconMoon className=' fill-neutral-950 dark:fill-white' />,
      description: 'Pick a dark theme'
    }, {
      name: 'system',
      title: 'System',
      icon: <IconSystem className=' fill-neutral-950 dark:fill-white' />,
      description: 'Adapts to your device’s theme'
    }];

    useEffect(() => {
      setSelectedTheme(theme);
    }, [theme]);

    const handleApplyTheme = () => {
        setTheme(selectedTheme);
        router.push('/settings');
        setToastText('Settings updated successfully!');
        setToastVisible(true);
        setTimeout(() => {
          setToastVisible(false);
        }, 2500);
    };
  return (
    <div className='flex flex-col gap-3'>
        <button onClick={() => router.push('/settings')} className="flex focus:outline-red-600 items-center gap-1 py-1"><svg className="fill-neutral-600 dark:fill-neutral-300" xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24"><path fillRule="evenodd" d="M15.75 20.414 7.336 12l8.414-8.414L17.164 5l-7 7 7 7-1.414 1.414Z" clipRule="evenodd"/></svg>
    <span className="text-preset-5 text-neutral-600 dark:text-neutral-300" >Settings</span>
    </button>
     <h1 className="text-preset-1 text-neutral-950 dark:text-white">Color Theme</h1>
     <span className='text-preset-5 text-neutral-700 dark:text-neutral-300'>Choose your color theme:</span>
     <div className='flex flex-col gap-4'>
     {modes.map((mode) => (
       <label key={mode.name} className={`${selectedTheme === mode.name ? 'bg-neutral-100 dark:bg-neutral-800' : 'bg-white dark:bg-neutral-950'} flex w-full items-center justify-between p-4 border border-neutral-200 dark:border-neutral-800 rounded-xl transition-colors duration-300 cursor-pointer`}>
    <div className='flex gap-5'>
        <div className='flex items-center justify-center w-10 h-10 rounded-xl bg-white dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-800 group-hover:bg-neutral-200 dark:group-hover:bg-neutral-800 transition-colors'>
        {mode.icon}
        </div>
    <div className='flex flex-col gap-2 group'>
<span className='text-preset-4 text-neutral-950 dark:text-white'>{mode.title}</span>
<span className='text-preset-6 text-neutral-700 dark:text-neutral-300'>{mode.description}</span>
    </div>
    </div>
  <input
    type="radio"
    name="theme"
    value={mode.name}
    className="hidden peer"
    checked={selectedTheme === mode.name}
    onChange={(e) => setSelectedTheme(e.target.value as 'light' | 'dark' | 'system')}
  />
  <div className="w-4 h-4 rounded-full border-2 border-neutral-200 dark:border-neutral-600 peer-checked:border-4 peer-checked:border-blue-500 transition-colors"></div>
</label>
     ))}
</div>
     <PrimaryButton handleSubmit={handleApplyTheme} className='self-end'>Apply Changes</PrimaryButton>
     </div>

  )
}

export default ColorThemePage