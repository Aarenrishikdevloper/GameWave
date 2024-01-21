import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { ClerkProvider } from '@clerk/nextjs'
import {ThemeProvider} from "@/components/theme-provider";
import { dark } from '@clerk/themes';
import {Toaster} from "sonner";
const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'GameWave',
  description: 'A Streaming App for Gamers',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
      <ClerkProvider appearance={{baseTheme:dark}}>
        <html lang="en">
         <body className={inter.className}>
         <ThemeProvider
             attribute="class"
             forcedTheme={'dark'}
             storageKey={'onlyfans-theme'}
         >
         <Toaster theme={"light"} position={"bottom-left"} />
         {children}
         </ThemeProvider>
         </body>
        </html>
      </ClerkProvider>  
  )
}
