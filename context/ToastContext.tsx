'use client';
import { createContext, useState } from "react";

export const ToastContext = createContext<{toastText: string; setToastText: (text: string) => void; toastVisible: boolean; setToastVisible: (visible: boolean) => void; isArchived: boolean; setIsArchived: (isArchived: boolean) => void}>({
  toastText: '',
  toastVisible: false,
  isArchived: false,
  setIsArchived: () => {},
  setToastText: () => {},
  setToastVisible: () => {},
});
export const ToastProvider = ({ children }: { children: React.ReactNode }) => {
    const [toastText, setToastText] = useState('Note restored to active notes.');
    const [toastVisible, setToastVisible] = useState(false);
    const [isArchived, setIsArchived] = useState(false);
  return (
    <ToastContext.Provider value={{toastText, setToastText, toastVisible, setToastVisible, isArchived, setIsArchived}}>
      {children}
    </ToastContext.Provider>
  );
};