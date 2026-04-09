'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { useDeviceType } from '@/hooks/useDeviceType';
import { usePathname } from 'next/navigation';

type Stage = 'preloading' | 'lanyard' | 'cinematic' | 'home';

interface AppContextProps {
  stage: Stage;
  setStage: (s: Stage) => void;
  theme: 'dark' | 'light';
  toggleTheme: () => void;
}

const AppContext = createContext<AppContextProps | null>(null);

export const AppProvider = ({ children }: { children: React.ReactNode }) => {
  const { isTouchDevice } = useDeviceType();
  const pathname = usePathname();

  // Initialize stage based on route. 
  // ONLY start with 'preloading' on the Home page.
  const [stage, setStage] = useState<Stage>(pathname === '/' ? 'preloading' : 'home');
  const [theme, setTheme] = useState<'dark' | 'light'>('dark');

  // Allow all devices to see the new optimized Cinematic Intro
  useEffect(() => {
    // We no longer skip for touch devices as the new intro is performant CSS/Framer
  }, [isTouchDevice]);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(t => t === 'dark' ? 'light' : 'dark');
  };

  return (
    <AppContext.Provider value={{ stage, setStage, theme, toggleTheme }}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error('useAppContext must be used within AppProvider');
  return ctx;
};
