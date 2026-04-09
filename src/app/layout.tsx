import type { Metadata } from 'next';
import { Inter, Outfit, Geist } from 'next/font/google';
import './globals.scss';
import './shadcn.css';
import CustomCursor from '@/components/CustomCursor';
import { AppProvider } from '@/components/AppProvider';
import NavigationDock from '@/components/NavigationDock';
import FeedbackWidget from '@/components/FeedbackWidget';
import { cn } from "@/lib/utils";

const geist = Geist({ subsets: ['latin'], variable: '--font-sans' });

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });
const outfit = Outfit({ subsets: ['latin'], variable: '--font-outfit' });

export const metadata: Metadata = {
  title: 'Rebira Adugna | Full Stack Web Developer',
  description: 'Portfolio of Rebira Adugna — crafting high-performance, scalable web applications and intuitive digital experiences.',
  keywords: 'Rebira Adugna, Full Stack Developer, MERN Stack, Next.js, React, Algorithms',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" data-theme="dark" className={cn("font-sans", geist.variable)}>
      <body className={`${inter.variable} ${outfit.variable} font-sans bg-black text-white antialiased`}>
        <AppProvider>
          <CustomCursor />
          {children}
          {/* Persisting UI Components */}
          <NavigationDock />
          <FeedbackWidget />
        </AppProvider>
      </body>
    </html>
  );
}
