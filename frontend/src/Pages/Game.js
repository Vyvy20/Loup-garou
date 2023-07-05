import React, { useContext, useEffect, useState } from "react";
import { GameContext } from "./Interface";
import { Box, Button, Typography } from "@mui/material";
import Joueur from "../Components/Partie/Joueur";
import PhaseEnd from "../Components/Partie/PhaseEnd";

function Game(props) {
    const [hidden, setHidden] = useState(true);
    const [turnData, setTurnData] = useState(null)
    const [phase, setPhase] = useState(null)
    const game = useContext(GameContext)

    useEffect(() => {
        const data = game.get_turn()
        setTurnData(data.data)
        setPhase(data.phase)
    }, [game, hidden])

    const handleNextPlayer = () => {
        setHidden(true);
    }

    return (
        <>
        {turnData && (
            <>
                {hidden && (
                    <Box sx={{backgroundColor: "lightgrey"}}>
                        <Typography>Tour de {turnData.player.name}</Typography>
                        <Button variant="outlined" sx={{backgroundColor: "white"}} onClick={() => setHidden(false)}>Cliquer pour commencer votre tour</Button>
                    </Box>
                )}
                {!hidden && !turnData.end && <Joueur data={turnData} handleNextPlayer={handleNextPlayer}/>}
                {!hidden && turnData.end && <PhaseEnd turn={turnData} phase={phase} handleNextPlayer={handleNextPlayer}/>}
            </>
        )}

        </>
    )
}

export default Game;