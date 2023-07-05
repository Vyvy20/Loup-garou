import React, { useState } from "react";
import Vote from "./Vote";
import { Button } from "@mui/material";

function VoteBatterie({livingPlayers, handleValidate = () => {}, maxSelection = 1}) {
    const [votes, setVotes] = useState([])
    const [isReady, setIsReady] = useState(false);

    const handleClick = () => {
        if(maxSelection !== votes.length()) {
            return
        }
        handleValidate(votes)
    }

    const handleVote = (index, isVoted) => {
        if(isVoted) {
            setVotes((old) => { return [...old, index]})
        }
        else {
            setVotes((old) => { return old.filter(value => value !== index)});
        }
        if(maxSelection >= votes.length()) {
            setIsReady(true)
        }
        else {
            setIsReady(false);
        }
    }

    let votesComponent = [];
    for(const player in livingPlayers) {
        votes.push(<Vote handleVote={handleVote} key={player}>{player}</Vote>)
    }

    return (
        <>
            {votesComponent.map((player) => {
                return player
            })}
            <Button onClick={handleClick} disabled={!isReady}>Validate Action</Button>
        </>
    )
}

export default VoteBatterie;