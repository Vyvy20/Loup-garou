import React from 'react';
import {Box, TextField, Button, Typography} from '@mui/material';
import logo from '../../images/Loup.png';



function Lobby(){
    return (
       
        <Box display="flex" flexDirection="column" alignItems="center" marginTop={1}  marginBottom ="5px">
            <Box textAlign="left" width="100%">
                <img src={logo} alt="Logo" style={{ width: '100px', height: '100px' }} />
                <Typography variant="h6" style={{}}>Loups Garou</Typography>
            </Box>
            <Typography variant="h6">Joueurs</Typography>
            <TextField label="Nom du Joueur 1" variant="outlined" />
            <div style={{ marginBottom: '16px' }} />
            <TextField label="Nom du Joueur 2" variant="outlined" />
            <div style={{ marginBottom: '16px' }} />
            <TextField label="Nom du Joueur 3" variant="outlined" />
            <div style={{ marginBottom: '16px' }} />
            <TextField label="Nom du Joueur 4" variant="outlined" />
            <Box m={1}>
                <Button variant="contained" color="primary">
                    Play
            </Button>
            </Box>
            <Box m={1}>
                <Button variant="contained" color="secondary" >
                    Reset
            </Button>
        </Box>
      </Box>
    )
}

export default Lobby;