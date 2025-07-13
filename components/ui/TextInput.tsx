import IconInfo from "./svg/IconInfo"
const TextInput = ({value, label,id,name, type, placeholder, beforeIcon, afterIcon, hint, handleChange, error} : {value?: string, id?: string, name?: string, type?: string, label?: string, placeholder?: string, beforeIcon?: React.ReactNode, afterIcon?: React.ReactNode, hint?: string , handleChange?: (e: React.ChangeEvent<HTMLInputElement>) => void, error?: boolean}) => {
  return (
    <div className="flex flex-col gap-1">
  <label>{label}</label>
<div className={`${error && 'border-red-500 dark:border-red-500 bg-neutral-800'} flex aria-disabled:bg-neutral-50 items-center gap-2 focus-within:outline-2 focus-within:outline-neutral-500 focus-within:outline-offset-2 border border-neutral-300 hover:bg-neutral-50 dark:hover:bg-neutral-800 dark:border-neutral-600 rounded-lg px-4 py-2 transition-colors duration-300`}>
 {beforeIcon}
  <input id={id} name={name} type={type} value={value} onChange={handleChange} className="w-full p-1 border-0 outline-0 placeholder:text-neutral-500 disabled:placeholder:text-neutral-300 text-neutral-950 dark:text-white" placeholder={placeholder} />
  {afterIcon}
</div>
{ hint && <span className={`${error && 'text-red-500 dark:text-red-500'} text-xs pt-0.5 flex gap-1.5 text-neutral-600 dark:text-neutral-400 leading-[140%]`}><IconInfo className={`${error && 'stroke-red-500 dark:stroke-red-500'} fill-transparent stroke-neutral-600 dark:stroke-neutral-`}/> {hint}</span>}
</div>
  )
}

export default TextInput