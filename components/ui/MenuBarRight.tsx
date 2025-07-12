import IconRestore from "./svg/IconRestore"
import IconArchived from "./svg/IconArchived"
import IconDelete from "./svg/IconDelete"
const MenuBarRight = ({handleArchive, handleDelete, isArchived} : {handleArchive: () => void, handleDelete: () => void, isArchived: boolean}) => {
  return (
    <div className="hidden lg:flex flex-col absolute right-8 w-full max-w-70 pl-4 pt-5 gap-3">
        <button onClick={handleArchive} className={`flex cursor-pointer dark:hover:bg-neutral-800 hover:bg-neutral-100 items-center gap-2 rounded-lg transition-all duration-300 px-4 py-2 border border-neutral-300 dark:border-neutral-600'`}>
          { isArchived ? 
          <IconRestore className='fill-neutral-950 dark:fill-white w-5'/> :
        <IconArchived className='fill-transparent stroke-neutral-950 dark:stroke-white w-5'/>
          }
        <span className="text-preset-4 dark:text-white text-neutral-950">{isArchived ? 'Restore Note' : 'Archive Note'}</span>
        <span className="ml-auto">
        </span>
        </button>
        <button onClick={handleDelete} className={`flex cursor-pointer dark:hover:bg-neutral-800 hover:bg-neutral-100 items-center gap-2 rounded-lg transition-all duration-300 px-4 py-2 border border-neutral-300 dark:border-neutral-600'`}>
        <IconDelete className='fill-transparent stroke-neutral-950 dark:stroke-white w-5'/>
        <span className="text-preset-4 dark:text-white text-neutral-950">Delete Note</span>
        <span className="ml-auto">
        </span>
        </button>
    </div>
  )
}

export default MenuBarRight