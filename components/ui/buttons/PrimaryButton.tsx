
const PrimaryButton = ({children, className, handleSubmit, formAction, type} : {children: any, className?: string,type?: 'button' | 'submit', handleSubmit?: () => void , formAction?: (formData: FormData) => void | Promise<void>}) => {
  return (
    <button formAction={formAction} onClick={handleSubmit} type={type} className={`${className} py-3 px-4 bg-blue-500 cursor-pointer rounded-lg text-white text-preset-4 hover:bg-blue-700 transition-colors duration-300 focus:outline-2 outline-neutral-400 outline-offset-2 disabled:bg-neutral-100 disabled:text-neutral-300`}>{children}</button>
  )
}

export default PrimaryButton