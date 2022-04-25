import { FC, useEffect, useReducer } from "react";
import { EntriesContext, entriesReducer } from "./";
import { Entry } from "../../interfaces";
import { entriesApi } from "../../apis";

export interface EntriesState {
  entries: Entry[];
}

interface Props {
  children: JSX.Element[] | JSX.Element;
}

const Entries_INITIAL_STATE: EntriesState = {
  entries: [],
};

export const EntriesProvider: FC<Props> = ({ children }) => {
  const [state, dispatch] = useReducer(entriesReducer, Entries_INITIAL_STATE);

  const addNewEntry = async (description: string) => {
    const { data } = await entriesApi.post<Entry>("/entries", { description });
    dispatch({ type: "[Entry] - Add-Entry", payload: data });
  };

  const updateEntry = async ({ _id, description, status }: Entry) => {
    try {
      const { data } = await entriesApi.put<Entry>(`/entries/${_id}`, {
        description: description,
        status: status,
      });
      dispatch({ type: "[Entry] - Entry-updated", payload: data });
    } catch (error) {
      console.log({error});
      
    }
  };

  const refreshEntries = async () => {
    const { data } = await entriesApi.get<Entry[]>("/entries");
    dispatch({ type: "[Entry] - Refresh_Data", payload: data });
  };

  useEffect(() => {
    refreshEntries();
  }, []);

  return (
    <EntriesContext.Provider
      value={{
        ...state,
        /* methods */
        addNewEntry,
        updateEntry,
      }}
    >
      {children}
    </EntriesContext.Provider>
  );
};
