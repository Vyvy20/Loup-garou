import { Box, Button, Typography } from "@mui/material";
import React, {useEffect, useState} from "react";
import { IntToPhases, Phases } from "../../helpers/Phases";
import { useNavigate } from "react-router-dom";

function PhaseEnd({turn, phase, handleNextPlayer = () => {}}) {
    const [data, setData] = useState(null)
    const navigate = useNavigate()

    useEffect(() => {
        setData(turn)
    }, [turn])
    
    const handleClick = () => {
        handleNextPlayer()
    }

    const handleLobby = () => {
        navigate("/app/lobby")
    }
    
    return (
        <Box>
            {data && (
                <>
                    <Typography>{data.message} {data.player.name} est conviés</Typography>
                    {data.deadPlayers && data.deadPlayers.map((player) => {
                        return (<Typography>{player} est mort pendant la {IntToPhases[phase]}</Typography>)
                    })}
                    {data.resurectedPlayers && data.resurectedPlayers.map((player) => {
                        return (<Typography>{player} a été réssusité pendant la {IntToPhases[phase]}</Typography>)
                    })}
                    {data.winners && data.winners.map((player) => {
                        return (<Typography>{player} a gagné la partie !</Typography>)
                    })}
                    {phase !== Phases.End && <Button variant="contained" sx={{marginLeft: '90%', marginTop: '10%'}} onClick={handleClick}>Joueur suivant</Button>}
                    {phase === Phases.End && <Button variant="contained" sx={{marginLeft: '90%', marginTop: '10%'}} onClick={handleLobby}>Retour au lobby</Button>}
                </>
            )}
        </Box>
    )
}

export default PhaseEnd;