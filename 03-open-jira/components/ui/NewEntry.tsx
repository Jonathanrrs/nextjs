import React from "react";
import { Box, Button, TextField } from "@mui/material";
import SaveIcon from "@mui/icons-material/Save";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";

export const NewEntry = () => {
  return (
    <Box sx={{marginBottom: 2, paddingX: 2}}>
      <Button startIcon={<AddCircleOutlineIcon />} fullWidth variant="outlined">
        Agregar tarea
      </Button>
      <TextField
        fullWidth
        sx={{ marginTop: 2, marginBottom: 1 }}
        placeholder="Nueva entrada"
        autoFocus
        multiline
        label="Nueva entrada"
        helperText="Ingrese un valor"
      />
      <Box display="flex" justifyContent="space-between">
        <Button variant="text">Cancelar</Button>
        <Button variant="outlined" color="secondary" endIcon={<SaveIcon />}>
          Guardar
        </Button>
      </Box>
    </Box>
  );
};
