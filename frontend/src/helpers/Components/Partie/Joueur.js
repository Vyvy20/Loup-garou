import React from "react";
import {Box, Typography} from "@mui/material";

function Joueur() {
  return(
    <Box>
      <Box sx={{border: '1px solid', width: '20%',}}>
        <Typography variant="h4">Pseudo</Typography>
        <Typography variant="body1">Nom du joueur : </Typography>
        <Typography variant="body1">Rôle : </Typography>
        <Typography variant="body1">Description du rôle : </Typography>
      </Box>
    </Box>
  )
}
export default Joueur;
