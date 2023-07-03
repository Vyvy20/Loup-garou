class Council {
    votes = null;
    constructor() {
        this.votes = {
            "loups_garou": {},
            "conseil": {}
        }
    }

    addVotes(currentRound, player, number = 1, type = "conseil") {
        if (!this.votes[type][currentRound]) {
            this.votes[type][currentRound] = {}
        }
        this.votes[type][currentRound][player.name] = number
    }

    playerToKill(currentRound, type = "conseil") {
        const players = this.votes[type][currentRound].keys()
        let max = {
            player: "",
            number: 0
        };
        for (const player in players) {
            if (this.votes[type][currentRound][player] > max.number){
                max = {
                    player: player,
                    number: players[player]
                }
            }
        }
        return max.player
    }
}

export { Council }