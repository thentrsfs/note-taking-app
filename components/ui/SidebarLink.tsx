import Link from "next/link"
import IconChevronRight from "../ui/svg/IconChevronRight"
const SidebarLink = ({href,handleClick, label, icon, active ,className} : {href: string,handleClick?: () => void, label: string, icon: React.ReactNode, active?: boolean, className?: string}) => {
  return (
   
     <Link href={href} onClick={handleClick} className={`flex items-center gap-2 rounded-lg py-1.5 transition-all duration-300 ${active ? 'bg-neutral-100 dark:bg-neutral-800' : 'dark:hover:bg-neutral-800 hover:bg-neutral-100'} ${className}`}>
        {icon}
        <span className="text-preset-4 dark:text-white text-neutral-950">{label}</span>
        <span className="ml-auto">
        <IconChevronRight className={` ${active ? 'fill-neutral-950 dark:fill-white' : 'fill-transparent'}`}/>
        </span>
        </Link>
       
  )
}

export default SidebarLink