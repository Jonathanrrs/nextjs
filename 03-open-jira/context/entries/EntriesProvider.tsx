import { FC, useReducer } from "react";
import { v4 as uuidv4 } from 'uuid';
import { EntriesContext, entriesReducer } from "./";
import { Entry } from "../../interfaces";

export interface EntriesState {
  entries: Entry[];
}

interface Props {
  children: JSX.Element[] | JSX.Element;
}

const Entries_INITIAL_STATE: EntriesState = {
  entries: [
    {
      _id: uuidv4(),
      description: 'Agregar los issues al proyecto final de React Native',
      status: 'pending',
      createdAt: Date.now(),
    },
    {
      _id: uuidv4(),
      description: 'Crear un Pull Request al proyecto final de React Native',
      status: 'in-progress',
      createdAt: Date.now(),
    },
    {
      _id: uuidv4(),
      description: 'Agregar Redux al proyecto',
      status: 'finished',
      createdAt: Date.now(),
    },
  ],
};

export const EntriesProvider: FC<Props> = ({ children }) => {
  const [state, dispatch] = useReducer(entriesReducer, Entries_INITIAL_STATE);

  return (
    <EntriesContext.Provider
      value={{
        ...state,
      }}
    >
      {children}
    </EntriesContext.Provider>
  );
};
