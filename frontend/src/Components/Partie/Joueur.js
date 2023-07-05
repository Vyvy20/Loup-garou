import React, { useEffect, useState, createContext } from "react";
import {Grid, Box, Typography, Button} from "@mui/material";
import Allie from "./Allie";
import Actions from "./Actions";
import { IntToPhases } from "../../helpers/Phases";

export const UserContext = createContext();

function Joueur({ data, handleNextPlayer = () => {} }) {
  const [user, setUser] = useState(null)
  const [phase, setPhase] = useState(null)

  useEffect(() => {
    setUser(data.player)
	setPhase(data.phase)
  }, [data.player, data.phase])

  const handleClick = () => {
	handleNextPlayer()
  }

  return(
    <Box>
		<Typography>Current Phase: {IntToPhases[phase]}</Typography>
      	{user && (
			<UserContext.Provider value={data}>
				<Grid Container> 
					<Grid item sx={{border: '1px solid', width: '20%', backgroundColor: 'Navy', color: 'white'}} xs={3}>
						<Typography variant="h4">Pseudo</Typography>
						<Typography variant="body1">Nom du joueur : {user.name}</Typography>
						<Typography variant="body1">Rôle : {user.role.name}</Typography>
						<Typography variant="body1">Description du rôle : {user.role.description}</Typography>
					</Grid>
					<Grid xs={3}>
						<Allie/>
					</Grid>
					<Grid xs={3}>
						<Actions phase={phase} role={user.role.name}/>
					</Grid>
					<Grid>
						<Button variant="contained" sx={{marginLeft: '90%', marginTop: '10%'}} onClick={handleClick}>Joueur suivant</Button>
					</Grid>
				</Grid>
			</UserContext.Provider>
      	)}
    </Box>
  )
}
export default Joueur;