const HeaderControl = ({handleSubmit, handleArchive, handleDelete, cancel, goBack, isUniqueNote = false, isArchived = false } : {handleSubmit: () => void , handleArchive?: () => void,cancel: () => void, goBack: () => void, isUniqueNote?: boolean, isArchived?: boolean, handleDelete?: () => void }) => {
  return (
    <div className="w-full lg:hidden bg-transparent flex items-center justify-between pb-3 border-b border-neutral-200 dark:border-neutral-800 dark:bg-neutral-950">
        <button onClick={goBack} className="flex focus:outline-red-600 items-center gap-1 py-1"><svg className="fill-neutral-600 dark:fill-neutral-300" xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24"><path fillRule="evenodd" d="M15.75 20.414 7.336 12l8.414-8.414L17.164 5l-7 7 7 7-1.414 1.414Z" clipRule="evenodd"/></svg>
    <span className="text-preset-5 text-neutral-600 dark:text-neutral-300" >Go Back</span>
    </button>
    <div className="flex items-center gap-3">
       <div className={`items-center gap-3 ${isUniqueNote ? 'flex' : 'hidden'}`}> <button onClick={handleDelete}><svg className="stroke-neutral-600 fill-transparent dark:stroke-neutral-300" xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 25"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="m14.852 3.879.818 1.785h2.64c.811 0 1.47.658 1.47 1.47V8.22c0 .555-.45 1.005-1.006 1.005H5.005C4.45 9.226 4 8.776 4 8.221V7.133c0-.811.658-1.47 1.47-1.47h2.639l.818-1.784c.246-.536.78-.879 1.37-.879h3.185c.59 0 1.125.343 1.37.879ZM18.24 9.3v8.686c0 1.665-1.333 3.014-2.977 3.014H8.517c-1.644 0-2.977-1.349-2.977-3.014V9.301M10.2 12.816v4.509m3.38-4.509v4.509"/></svg></button>
       {isArchived ? (<button onClick={handleArchive}><svg className="fill-neutral-600 dark:fill-neutral-300" xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24"><path fillRule="evenodd" d="M3.708 7.404a.75.75 0 0 1 .983.398l1.316 3.114L9.1 9.608a.75.75 0 0 1 .584 1.382L5.9 12.59a.75.75 0 0 1-.983-.4L3.309 8.387a.75.75 0 0 1 .4-.982Z" clipRule="evenodd"/><path fillRule="evenodd" d="M12.915 5.664c-3.447 0-6.249 2.746-6.335 6.16a.75.75 0 0 1-1.5-.038c.108-4.228 3.575-7.622 7.835-7.622a7.838 7.838 0 0 1 7.835 7.835 7.833 7.833 0 0 1-7.835 7.835 7.843 7.843 0 0 1-6.457-3.384.75.75 0 1 1 1.232-.856 6.343 6.343 0 0 0 5.225 2.74 6.333 6.333 0 0 0 6.335-6.335 6.339 6.339 0 0 0-6.335-6.335Z" clipRule="evenodd"/></svg></button>) : (<button onClick={handleArchive}><svg className="stroke-neutral-600 fill-transparent dark:stroke-neutral-300" xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none" viewBox="0 0 24 24"><path  strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M21 7.782v8.435C21 19.165 18.919 21 15.974 21H8.026C5.081 21 3 19.165 3 16.216V7.782C3 4.834 5.081 3 8.026 3h7.948C18.919 3 21 4.843 21 7.782Z"/><path  strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="m15 14-3.002 3L9 14M11.998 17v-7M20.934 7H3.059"/></svg></button>)}
        </div>
        <button className="text-preset-5 text-neutral-600 dark:text-neutral-300" onClick={cancel}>Cancel</button>
        <button className="text-preset-5 text-blue-500" onClick={handleSubmit}>Save Note</button>
    </div>
    </div>
  )
}

export default HeaderControl