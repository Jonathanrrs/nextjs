import { FC, useReducer } from "react";
import { UIContext, uiReducer } from "./";

export interface UIState {
  sidemenuOpen: boolean;
  isAddingEntry: boolean;
  isDraggin: boolean;
}

interface Props {
  children: JSX.Element[] | JSX.Element;
}

const UI_INITIAL_STATE: UIState = {
  sidemenuOpen: false,
  isAddingEntry: false,
  isDraggin: false,
};

export const UIProvider: FC<Props> = ({ children }) => {
  const [state, dispatch] = useReducer(uiReducer, UI_INITIAL_STATE);

  const openSideMenu = () => {
    dispatch({ type: "UI - Open Sidebar" });
  };
  const closeSideMenu = () => {
    dispatch({ type: "UI - Close Sidebar" });
  };

  const setIsAddingEntry = (value: boolean) => {
    dispatch({ type: "UI - AddingEntry", payload: value });
  };

  const startDraggin = () => {
    dispatch({ type: "UI - Start Dragging" });
  };
  const endDraggin = () => {
    dispatch({ type: "UI - End Dragging" });
  };

  return (
    <UIContext.Provider
      value={{
        ...state,
        /* methods */
        openSideMenu,
        closeSideMenu,
        setIsAddingEntry,
        startDraggin,
        endDraggin,
      }}
    >
      {children}
    </UIContext.Provider>
  );
};
