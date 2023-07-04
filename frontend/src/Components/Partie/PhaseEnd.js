import { Box, Button, Typography } from "@mui/material";
import React, {useEffect, useState} from "react";
import { IntToPhases } from "../../helpers/Phases";

function PhaseEnd({turn, handleNextPlayer = () => {}}) {
    const [data, setData] = useState(null)

    useEffect(() => {
        setData(turn)
      }, [turn])
    
      const handleClick = () => {
        handleNextPlayer()
    }

    console.log(data)
    
    return (
        <Box>
            {data && (
                <>
                    <Typography>{data.message}, {data.player.name} est conviés</Typography>
                    <Button variant="contained" sx={{marginLeft: '90%', marginTop: '10%'}} onClick={handleClick}>Joueur suivant</Button>
                    {data.deadPlayers.map((player) => {
                        return (<Typography>{player} est mort pendant la {IntToPhases[data.phase]}</Typography>)
                    })}
                    {data.resurectedPlayers.map((player) => {
                        return (<Typography>{player} a été réssusité pendant la {IntToPhases[data.phase]}</Typography>)
                    })}
                </>
            )}
        </Box>
    )
}

export default PhaseEnd;