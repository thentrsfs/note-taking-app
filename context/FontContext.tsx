'use client';
import { createContext, useEffect, useState } from 'react';

type FontType = 'inter' | 'noto' | 'source';

export const FontContext = createContext<{
    font: FontType;
    setFont: (font: FontType) => void;
}>({
    font: 'inter',
    setFont: () => {}
})

export const FontProvider = ({ children }: { children: React.ReactNode }) => {
    const [font, setFontState] = useState<FontType>('inter');

    useEffect(() => {
        const storedFont = localStorage.getItem('font') as FontType | null;
        if (storedFont) {
            setFontState(storedFont);
        }
    }, []);
    const setFont = (newFont: FontType) => {
        setFontState(newFont);
        localStorage.setItem('font', newFont);
    };

    return (
        <FontContext.Provider value={{ font, setFont }}>
                {children}
        </FontContext.Provider>
    )
}