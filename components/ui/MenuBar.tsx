'use client';

import Link from "next/link";
import { usePathname } from "next/navigation";
import IconHome from "./svg/IconHome"
import IconSearch from "./svg/IconSearch"
import IconArchived from "./svg/IconArchived"
import IconTag from "./svg/IconTag"
import IconSettings from "./svg/IconSettings"
const MenuBar = () => {
      const pathname = usePathname();
    const navItems = [{
        label: 'Home',
        href: '/',
        icon: <IconHome className={`${pathname === '/' ? 'fill-blue-500 ' : 'fill-neutral-600 dark:fill-neutral-400'} w-6`}/>
    },
    {
        label: 'Search',
        href: '/search',
        icon: <IconSearch className={`${pathname.startsWith('/search') ? 'fill-blue-500 ' : 'fill-neutral-600 dark:fill-neutral-400'} `}/>
    },
{
    label: 'Archived',
    href: '/archived',
    icon: <IconArchived className={`${pathname.startsWith('/archived') ? 'stroke-blue-500 ' : 'stroke-neutral-600 dark:stroke-neutral-400 '} fill-transparent w-6`}/>
},
{
    label: 'Tags',
    href: '/tags',
    icon: <IconTag className={`${pathname.startsWith('/tags') ? 'stroke-blue-500 ' : 'stroke-neutral-600 dark:stroke-neutral-400 '} fill-transparent `}/>
},
{
    label: 'Settings',
    href: '/settings',
    icon: <IconSettings className={`${pathname.startsWith('/settings') ? 'fill-blue-500 ' : 'fill-neutral-600 dark:fill-neutral-400'} `}/>
}
]
  return (
    <nav className="lg:hidden fixed bg-white flex dark:bg-neutral-950 justify-between border-t-1 border-neutral-200 dark:border-neutral-800 w-full px-5 py-2 bottom-0">
        {navItems.map(({label, icon, href }, index) => {
            const isActive = href === '/'
  ? pathname === '/'
  : pathname.startsWith(href);
            return (
               
                    <Link href={href} key={href} className={`flex justify-center items-center gap-2 hover:bg-neutral-50 ${index === navItems.length - 1 ? 'border-0' : ' md:border-r-1'} border-neutral-100 dark:border-neutral-800 w-full`}>
                        <div className={`${isActive ? 'bg-blue-50 dark:bg-neutral-700' : ''} md:w-20 w-full min-w-[62px] rounded-sm flex flex-col items-center gap-1 py-1`}>
                        <span className="fill-red-500">{icon}</span>
                        <span className={`${isActive ? 'text-blue-500' : 'text-neutral-600 dark:text-neutral-400'} text-preset-6 hidden md:block` }>{label}</span>
                        </div>
                    </Link>
          
            )
        })}
    </nav>
  )
}

export default MenuBar