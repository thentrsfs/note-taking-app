
const SecondaryButton = ({children, handleSubmit} : {children: string, handleSubmit?: () => void}) => {
  return (
    <button onClick={handleSubmit} type="button" className="py-3 px-4 bg-neutral-100 dark:bg-neutral-500 dark:text-white dark:border-neutral-500 rounded-lg text-neutral-600 cursor-pointer text-preset-4 hover:bg-white hover:border-neutral-300 hover:text-neutral-950 focus:outline-2 outline-neutral-400 outline-offset-2 focus:border-neutral-950 focus:text-neutral-950 focus:bg-white transition-colors duration-300 border border-neutral-100 disabled:bg-neutral-100 disabled:text-neutral-300">{children}</button>
  )
}

export default SecondaryButton