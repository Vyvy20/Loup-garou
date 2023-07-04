import React, {useContext, useState} from 'react';
import {Box, TextField, Button, Typography} from '@mui/material';
import logo from '../images/Loup.png';
import Game from "../helpers/Partie";
import SetGameContext from "./Interface";
import ClearIcon from '@mui/icons-material/Clear';
import DoneIcon from '@mui/icons-material/Done';

function CustomTypefield({onValidate, onRemove}) {
    const [name, setName] = useState("");

    const handleValidate = () => {
        onValidate(name)
    }

    const handleRemove = () => {
        onRemove(name)
        setName("")
    }

    return (
        <Box sx={{ mb: "16px"}}>
            <TextField value={name} onChange={(e) => setName(e.target.value)}/>
            <Button endIcon={<DoneIcon color="success"/>} onClick={handleValidate}/>
            <Button endIcon={<ClearIcon color="error" />} onClick={handleRemove}/>
        </Box>
    )
}

function Lobby(){
    const [players, setPlayers] = useState([]);
    const [num, setNum] = useState(0);

    const setGame = useContext(SetGameContext);
    
    const handleAdd = (name) => {
        if(!name) {
            return
        }
        for(const player in players) {
            if (player === name) {
                return
            }
        }
        setPlayers([...players, name])
        setNum((old) => {return old+1})
    }

    const handleRemove = (name) => {
        setPlayers((old) => {return players.filter(value => value !== name)})
        setNum((old) => {return old-1})
    }

    const startGame = () => {
        setGame(new Game(players))
    }

    const handleReset = () => {
        setPlayers([])
        setNum(0)
    }

    let typefields = [<CustomTypefield onValidate={handleAdd} onRemove={handleRemove}/>]
    for (let i = 0; i < num; i++) {
        typefields.push(<CustomTypefield onValidate={handleAdd} onRemove={handleRemove}/>)
    }

    console.log(players)
    
    return (
        <Box display="flex" flexDirection="column" alignItems="center" marginTop={1}  marginBottom ="5px">
            <Box textAlign="left" width="100%">
                <img src={logo} alt="Logo" style={{ width: '100px', height: '100px' }} />
                <Typography variant="h6">Loups Garou</Typography>
            </Box>
            <Typography variant="h6">Joueurs</Typography>
            
            {typefields.map((typefield, i) => {
                return typefield
            })}
            <Box m={1}>
                <Button variant="contained" color="primary" onClick={startGame}>
                    Play
            </Button>
            </Box>
            <Box m={1}>
                <Button variant="contained" color="error" onClick={handleReset}>
                    Reset
            </Button>
        </Box>
      </Box>
    )
}

export default Lobby;