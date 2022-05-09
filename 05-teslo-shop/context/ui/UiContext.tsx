import { createContext } from 'react';

interface ContextProps {
  isMenuOpen: boolean;
  /* ,ethods */
  toggleSideMenu: () => void;
}

export const UiContext = createContext({} as ContextProps);