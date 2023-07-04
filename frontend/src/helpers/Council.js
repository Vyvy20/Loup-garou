class Council {
    votes = null;
    constructor() {
        this.votes = {
            "loups_garou": {},
            "conseil": {}
        }
    }

    addVote(player, number = 1, type = "conseil") {
        if (!this.votes[type]) {
            this.votes[type] = {}
        }
        this.votes[type][player.name] = number
    }

    playerToKill(type = "conseil") {
        const players = this.votes[type].keys()
        let player_to_kill = {
            player: null,
            number: 0
        };
        for (const player in players) {
            if (this.votes[type][player] > player_to_kill.number){
                player_to_kill = {
                    player: player,
                    number: players[player]
                }
            }
            if (player_to_kill.number === this.votes[type][player]) {
                player_to_kill.player = null;
            }
        }
        return player_to_kill.player
    }

    reset() {
        this.votes = {
            "loups_garou": {},
            "conseil": {}
        }
    }
}

export { Council }