

const BorderButton = ({children, iconBefore, handleSubmit , type,} : {children: any , iconBefore?: React.ReactElement, handleSubmit?: () => void, type?: 'button' | 'submit'}) => {
  return (
    <button onClick={handleSubmit} type={type} className="w-full justify-center py-2 group flex gap-1.5 items-center cursor-pointer text-neutral-950 dark:text-white border dark:hover:bg-neutral-800 border-neutral-300 dark:border-neutral-600 rounded-xl text-preset-3 hover:bg-neutral-100 hover:border-neutral-100 hover:text-neutral-600 dark:hover:text-white focus:outline-2 outline-neutral-400 focus:outline-offset-2 disabled:bg-neutral-100 disabled:text-neutral-300 transition-colors duration-300"> {iconBefore}{children}</button>
  )
}

export default BorderButton