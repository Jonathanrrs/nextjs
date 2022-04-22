import { DragEvent, FC, useContext, useMemo } from "react";
import { List, Paper } from "@mui/material";
import { EntryStatus } from "../../interfaces";
import { EntryCard } from "./";
import { EntriesContext } from "../../context/entries";
import { UIContext } from "../../context/ui";

import styles from "./EntryList.module.css";
interface Props {
  status: EntryStatus;
}

export const EntryList: FC<Props> = ({ status }) => {
  const { entries, updateEntry } = useContext(EntriesContext);
  const { isDraggin, endDraggin } = useContext(UIContext);
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
    /* !, sabemos que no es posible que nos regrese un undefined */
    const entry = entries.find(e => e._id === id)!;
    entry.status = status;
    updateEntry(entry);
    endDraggin();
  };

  return (
    /* aqui haremos drop */
    <div
      onDrop={onDropEntry}
      /* para permitir que le caiga la card */
      onDragOver={allowDrop}
      className={isDraggin ? styles.dragging : ""}
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

        <List sx={{ opacity: isDraggin ? 0.2 : 1, transition: "all .3s" }}>
          {entriesByStatus.map((entry) => (
            <EntryCard key={entry._id} entry={entry} />
          ))}
        </List>
      </Paper>
    </div>
  );
};
