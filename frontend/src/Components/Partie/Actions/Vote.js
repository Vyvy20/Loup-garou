import React, { useState } from "react";
import { Button, Typography } from "@mui/material";


function Vote({key = 0, handleVote = () => {}, children}) {
    const [isVoted, setIsVoted] = useState(false)
    const handleClick = () => {
        handleVote(key, !isVoted)
        setIsVoted((old) => { return !old })
    }
    return (
        <>
            <Typography>{children}</Typography>
            <Button onClick={handleClick} color={isVoted ? 'error' : 'primary'}>{isVoted ? "Remove Vote": "Vote"}</Button>
        </>
    )
}

export default Vote;
