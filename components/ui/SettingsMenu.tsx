'use client'
import IconLock from "./svg/IconLock"
import IconLogout from "./svg/IconLogout"
import IconSun from "./svg/IconSun"
import IconFont from "./svg/IconFont"
import SidebarLink from "./SidebarLink"
import { createSupabaseClient } from "@/app/lib/supabase/client"
import { useRouter, usePathname } from "next/navigation"
import { NotesContext } from "@/context/NotesContext"
import { useState, useEffect, useContext } from "react"
import Loading from "./Loading"

const SettingsMenu = () => {
  const supabase = createSupabaseClient
  const router = useRouter()
  const pathname = usePathname();
  const {loading, setLoading} = useContext(NotesContext);

  const [currentUser, setCurrentUser] = useState<string | null>(null);
  
  useEffect(() => {
    const fetchUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        setCurrentUser(user.email || 'No email found');
      } else {
        console.error('No user found');
      }
    }
    fetchUser();
  }, []);

  const handleLogout = async () => {
    setLoading(true);
    const { error } = await supabase.auth.signOut();
    if (error) {
      console.error('Logout error:', error);
    } else {
      router.push('/login');
    }
  };
  if (loading) {
    return <Loading />
  }
  return (
    <div className="flex flex-col min-w-[258px]">
      <h1 className="text-preset-1 text-neutral-950 dark:text-white lg:hidden">Settings</h1>
        <div className="flex flex-col gap-2 max-lg:pt-6 border-b dark:border-neutral-800 border-neutral-200 pb-3 mb-2">
<SidebarLink href={'/settings/color-theme'} label={'Color Theme'} className="px-2" active={pathname === '/settings/color-theme'} icon={<IconSun className={`${pathname === '/settings/color-theme' ? 'stroke-blue-500 ' : 'stroke-neutral-950 dark:stroke-white'} fill-transparent w-5 `}/>} />
<SidebarLink href={'/settings/font-theme'} label={'Font Theme'} className="px-2" icon={<IconFont className={`${pathname === '/settings/font-theme' ? 'fill-blue-500 ' : 'fill-neutral-950 dark:fill-white'} w-5`}/>} active={pathname === '/settings/font-theme'} />
<SidebarLink href={'/settings/change-password'} className="px-2" label={'Change Password'} icon={<IconLock className={`${pathname === '/settings/change-password' ? 'stroke-blue-500 ' : 'stroke-neutral-950 dark:stroke-white'} fill-transparent  w-5`}/>} active={pathname === '/settings/change-password'} />
</div>
<div>
<button onClick={handleLogout} className="flex w-full transition-all duration-300 rounded-lg items-center py-1.5 cursor-pointer px-2 gap-2 text-preset-4 dark:hover:bg-neutral-800 hover:bg-neutral-100 dark:text-white text-neutral-950"><IconLogout className='fill-transparent stroke-neutral-950 dark:stroke-white w-5'/> Logout</button>
</div>
      <div className="text-preset-5 absolute bottom-18 text-neutral-700 dark:text-neutral-300">
        Logged in as: <span className="text-neutral-950 dark:text-white">{currentUser}</span>
      </div>
    </div>
  )
}

export default SettingsMenu