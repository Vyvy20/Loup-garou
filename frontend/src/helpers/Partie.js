import { Council } from "./Council"; 
import { Joueur } from "./Joueurs";

const Phases = {
    PreGame: 0,
    Night: 1,
    Day: 2,
    End: 3
}

class Game {
    round = 0;
    players = []
    dead_players = [];
    living_players = {};
    council = new Council();
    phase = null;
    dead_this_turn = [];
    cycle = []

    constructor(player_list) {
        this.phase = Phases.PreGame
        for (const player in player_list) {
            const joueur = new Joueur(player);
            this.living_players[player] = joueur;
            this.players.push(joueur);
        }
        this.playing = 0;
        this.cycle = this.setCycle()
    }

    end() {
        let winners = [];
        for (const player in this.living_players) {
            if (player.victoryCondition()) {
                winners.push(player);
            }
        }
        return winners
    }

    nextPhase() {
        switch (this.phase) {
            case Phases.PreGame:
                this.phase = Phases.Night
                break
            case Phases.Night:
                this.phase = Phases.Day
                break
            case Phases.Day:
                this.phase = Phases.Night
                break
            default:
                this.phase = Phases.PreGame
                break
        }
        this.setCycle()
    }

    nextPlayer() {
        this.cycle.shift()
        console.log("Next player to play is " + this.cycle[0])
        return this.cycle[0]
    }

    setCycle() {
        let cycle = []
        for (const player in this.living_players.keys()){
            cycle.push(player)
        }
        cycle.push(false)
        return cycle
    }

    get_turn() {
        // get at the start of the turn to get displayable values
        const playername = this.cycle[0];
        if (!playername) {
            // in case all players have played and phase have to end
            return this.endPhase()
        }
        // if turn to play is a player, send all needed datas
        const player = this.living_players[playername];
        return {
            data: {
                end: false,
                player: {
                    name: player.name,
                    role: {
                        name: player.role,
                        description: player.description
                    }
                },
            },
            phase: this.phase
        }
    }

    endPhase() {
        let data = null
        switch(this.phase) {
            case Phases.PreGame:
                data =  this.pregame_end()
                break
            case Phases.Night:
                data = this.nighttime_end()
                break
            case Phases.Day:
                data = this.daytime_end()
                break
            default:
                data = this.pregame_end()
                break
        }
        
        // check if game ended after applying all end phase scenario
        const winners = this.end();
        if (winners) {
            return {
                data: {
                    end: true,
                    message: "La partit est terminer !",
                    player: {
                        name: "Tout les joueurs",
                    },
                    winners: winners
                },
                phase: Phases.End
            }
        }

        // change phase in backend before sending turn message
        this.nextPhase()
        return {
            data: data,
            phase: this.Phase
        }
    }

    message(message) {
        const data = {
            end: true,
            message: message,
            player: {
                name: "Tout le monde",
            },
            deadPlayers: this.dead_this_turn,
            resurectedPlayers: this.resurected_this_turn,
        }
        // before sending message, reset this turns counters
        for (const deadPlayer in this.dead_this_turn) {
            this.dead_players.push(deadPlayer)
            delete this.living_players[deadPlayer.name];
        }
        this.dead_this_turn = []
        for (const resurectedPlayer in this.resurected_this_turn) {
            this.dead_players.remove(resurectedPlayer)
            this.living_players[resurectedPlayer.name] = resurectedPlayer
        }
        this.resurected_this_turn = []

        return data
    }

    pregame_end() {
        return this.message("La première nuit vas débuter ...")
    }

    daytime_end() {
        // kill with council
        const playername = this.council.playerToKill();
        if (!playername) {
            return this.message("La journée s'achève pour le village")
        }
        console.log("The player "+ playername + " has been eliminated by the village");
        this.council.reset()
        return this.message("La journée s'achève pour le village")
    }

    nighttime_end() {
        const playername = this.council.playerToKill("loups_garou");
        if (!playername) {
            return this.message("La nuit s'achève, le village découvre les actions passé dans la nuit.")
        }
        console.log("The player "+ playername + " has been eliminated by the werewolfs");
        return this.message("La nuit s'achève, le village découvre les actions passé dans la nuit.")
    }

    pregameActions(who, vote, extra = {}) {

    }

    daytime_action(who, vote, extra = {}) {
        const player = this.livingPlayers[this.playing]
        if (who !== player.playername) {
            throw new Error("Player trying to play is not the current player")
        }
        player.actionDay(this.council, vote, extra)
        return this.nextPlayer()
    }

    nighttime_action(who, vote, extra = {}) {
        const player = this.livingPlayers[this.playing]
        if (who !== player.playername) {
            throw new Error("Player trying to play is not the current player")
        }
        extra["dead_this_turn"] = this.dead_this_turn
        this.dead_this_turn = player.nighttime_action()
    }

    action(who, vote, extra = {}) {
        const player = this.livingPlayers[this.playing]
        if (who !== player.playername) {
            throw new Error("Player trying to play is not the current player")
        }
        let data = {}
        if(this.phase === Phases.Day) { 
            data = player.actionDay(this.council, vote, extra)
        }
        if(this.phase === Phases.Night) { 
            data = player.actionNight(this.council, vote, extra)
        }
        if(this.phase === Phases.PreGame) {
            data = player.actionPregame(this.council, vote, extra)
        }
        this.cycle.shift()
        return data
    }
}

export default Game;