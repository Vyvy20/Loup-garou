import React, { createContext, useState } from "react";
import { Outlet } from "react-router-dom";
import Box from "@mui/material/Box";

export const GameContext = createContext();
export const SetGameContext = createContext();

function Interface(props) {
    const [game, setGame] = useState(null);

    return (
        <Box>
            <GameContext.Provider value={game}>
                <SetGameContext.Provider value={setGame}>
                    <Box sx={{ display: "flex", flexDirection: "column", minHeight: "100vh"}}>
                        <Outlet />
                    </Box>
                </SetGameContext.Provider>
            </GameContext.Provider>
        </Box>
    )
}

export default Interface;