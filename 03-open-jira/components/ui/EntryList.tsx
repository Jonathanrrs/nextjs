import { List, Paper } from "@mui/material";
import { EntryCard } from "./";

export const EntryList = () => {
  return (
    /* aqui haremos drop */
    <div>
      <Paper
        sx={{
          height: "calc(100vh - 180px)",
          overflow: "scroll",
          backgroundColor: "transparent",
          padding: '1px 5px',
          '&::-webkit-scrollbar': { display: 'none' }
        }}
      >
        {/* cambiará dependiendo si está haciendo drag o no */}
        <List sx={{ opacity: 1 }}>
          <EntryCard />
        </List>
      </Paper>
    </div>
  );
};
