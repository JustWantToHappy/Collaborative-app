import React from 'react';

type ThemeMode = {
  mode?: 'dark' | 'light',
  switchMode?: (mode:'dark'|'light') => void;
}

export const ThemeModeContext =React.createContext<ThemeMode>({});