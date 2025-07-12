
const DeleteButton = ({children, handleSubmit} : {children: string, handleSubmit?: () => void}) => {
  return (
    <button onClick={handleSubmit} type="button" className="py-3 px-4 bg-red-500 rounded-lg text-white text-preset-4 hover:bg-red-700 cursor-pointer transition-colors duration-300 focus:outline-2 outline-neutral-400 outline-offset-2 disabled:bg-neutral-100 disabled:text-neutral-300">{children}</button>
  )
}

export default DeleteButton