import { createContext } from 'react';

interface ContextProps {
  sidemenuOpen: boolean;
  isAddingEntry: boolean;
  isDraggin: boolean;
  /* methods */
  openSideMenu: () => void;
  closeSideMenu: () => void;
  setIsAddingEntry: (value: boolean) => void;

  startDraggin: () => void
  endDraggin: () => void
}

export const UIContext = createContext({} as ContextProps);