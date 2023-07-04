import React from "react";
import {Grid, Box, Typography, Button} from "@mui/material";
import Allie from "./Allie";
import Actions from "./Actions";

function Joueur() {
  return(
    <Box>
      <Grid Container> 
        <Grid item sx={{border: '1px solid', width: '20%', backgroundColor: 'Navy', color: 'white'}} xs={3}>
          <Typography variant="h4">Pseudo</Typography>
          <Typography variant="body1">Nom du joueur : </Typography>
          <Typography variant="body1">Rôle : </Typography>
          <Typography variant="body1">Description du rôle : </Typography>
        </Grid>
        <Grid xs={3}>
          <Allie/>
        </Grid>
        <Grid xs={3}>
          <Actions/>
        </Grid>
        <Grid>
        <Button variant="contained" sx={{marginLeft: '90%', marginTop: '10%'}}>Joueur suivant</Button>
        </Grid>
      </Grid>
    </Box>
  )
}
export default Joueur;