import Link from "next/link"

const MobileCreateButton = () => {
  return (
    <Link href={'/create-note'}>
<button className="fixed bottom-16 right-4 md:bottom-24 md:right-8 rounded-full bg-blue-500 text-white w-12 h-12 md:w-16 md:h-16 flex items-center 
justify-center lg:hidden"><svg className="fill-white w-8 h-8 md:w-10 md:h-10" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M12 5a.75.75 0 0 1 .75.75V11H18a.75.75 0 0 1 0 1.5h-5.25v5.25a.75.75 0 0 1-1.5 0V12.5H6A.75.75 0 0 1 6 11h5.25V5.75A.75.75 0 0 1 12 5Z"/></svg></button>
</Link>
  )
}

export default MobileCreateButton