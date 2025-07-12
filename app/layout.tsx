import './globals.css';
import { Inter, Noto_Serif, Source_Code_Pro } from 'next/font/google';
import { FontProvider } from "@/context/FontContext";
import { NotesProvider } from "@/context/NotesContext";
import { ThemeProvider } from "@/context/ThemeContext";
import { ToastProvider } from "@/context/ToastContext";
import AppLayout from './AppLayout';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter', display: 'swap' });
const noto = Noto_Serif({ subsets: ['latin'], variable: '--font-noto', display: 'swap' });
const source = Source_Code_Pro({ subsets: ['latin'], variable: '--font-source', display: 'swap' });

export const metadata = {
  title: 'Note Taking App',
  description: 'A note taking web app',
  icons: {
    icon: '/images/logo.svg',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${noto.variable} ${source.variable}`}>
      <body>  
        <head/>
    <NotesProvider>
      <FontProvider>
        <ThemeProvider>
          <ToastProvider>
              <AppLayout>{children}</AppLayout>
          </ToastProvider>
        </ThemeProvider>
      </FontProvider>
    </NotesProvider>
    </body>
    </html>
  );
}
