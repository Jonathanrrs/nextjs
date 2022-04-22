import { DragEvent, FC, useContext, useMemo } from "react";
import { List, Paper } from "@mui/material";
import { EntryStatus } from "../../interfaces";
import { EntryCard } from "./";
import { EntriesContext } from "../../context/entries";

interface Props {
  status: EntryStatus;
}

export const EntryList: FC<Props> = ({ status }) => {
  const { entries } = useContext(EntriesContext);

  const entriesByStatus = useMemo(
    () => entries.filter((entry) => entry.status === status),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [entries]
  );
  const allowDrop = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();
  };
  const onDropEntry = (event: DragEvent<HTMLDivElement>) => {
    const id = event.dataTransfer.getData("text");
    console.log({id});
    
  };

  return (
    /* aqui haremos drop */
    <div
      onDrop={onDropEntry}
      /* para permitir que le caiga la card */
      onDragOver={allowDrop}
    >
      <Paper
        sx={{
          height: "calc(100vh - 180px)",
          overflow: "scroll",
          backgroundColor: "transparent",
          padding: "1px 5px",
          "&::-webkit-scrollbar": { display: "none" },
        }}
      >
        {/* cambiará dependiendo si está haciendo drag o no */}
        <List sx={{ opacity: 1 }}>
          {entriesByStatus.map((entry) => (
            <EntryCard key={entry._id} entry={entry} />
          ))}
        </List>
      </Paper>
    </div>
  );
};
