import { createContext } from 'react';

interface ContextProps {
  sidemenuOpen: boolean;
  isAddingEntry: boolean;
  /* methods */
  openSideMenu: () => void;
  closeSideMenu: () => void;
  setIsAddingEntry: (value: boolean) => void;
}

export const UIContext = createContext({} as ContextProps);