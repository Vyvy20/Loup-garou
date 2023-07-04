import { useState, useEffect } from "react/effects";
import Game from "../helpers/Partie";

const useGame = (players) => {
    const [game, setGame] = useState(null)

    useEffect(() => {
        if (typeof players === Array) {
            setGame(new Game(players))
        }
    }, [players])

    return [game]
}

export default useGame;
