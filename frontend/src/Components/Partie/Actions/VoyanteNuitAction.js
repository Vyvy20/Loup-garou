import React, { useContext, useState, useEffect } from "react";
import { UserContext } from "../Joueur";
import { GameContext } from "../../../Pages/Interface";
import VoteBatterie from "./VoteBatterie";

function VoyanteNuitAction(props) {
    const [livingPlayers, setLivingPlayers] = useState({})
    const game = useContext(GameContext)
    const user = useContext(UserContext)

    useEffect(() => {
        setLivingPlayers(game.getLivingPlayers()); 
    }, [game])

    const handleValidate = (votes) => {
        if(!votes) {
            return
        }
        game.action(user.playername, votes)
    }

    return (
        <VoteBatterie livingPlayers={livingPlayers} handleValidate={handleValidate}/>
    )
}

export default VoyanteNuitAction