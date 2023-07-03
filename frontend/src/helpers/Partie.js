import { Council } from "./Council"; 
import { Joueur } from "./Joueurs";

const Phases = {
    PreGame: 0,
    Night: 1,
    Day: 2,
}

class Game {
    round = 0;
    players = {};
    dead_players = {};
    living_players = {};
    playing = null;
    council = new Council();
    phase = null;


    constructor(player_list) {
        this.phase = Phases.PreGame
        for (const player in player_list) {
            this.players[player] = new Joueur(player);
        }
        this.living_players = this.players
        this.playing = this.living_players[0]
        this.nextPhase()
    }

    end() {
        let winners = [];
        for (const player in this.living_players) {
            if (player.isWinner()) {
                winners.push(player);
            }
        }
        if (winners.length > 0) {
            // send a message with all the game winners
            return true;
        }
        return false;
    }

    nextPhase() {
        switch (this.phase) {
            case Phases.PreGame:
                this.phase = Phases.Night
                break;
            case Phases.Night:
                this.phase = Phases.Day
                break;
            case Phases.Day:
                this.phase = Phases.Night
                break;
            default:
                this.phase = Phases.PreGame
                break;
        }
    }

    play() {
        if (this.phase === Phases.Pregame) {
            this.pregame();
        }
        if (this.phase === Phases.Night) {
            this.night();
        }
        if (this.phase === Phases.Day) {
            this.day();
        }
    }

    pregame() {
        return 
    }

    night() {
        this.playing.actionNight(this.council, this.living_players, this.dead_players);
    }

    day() {
        this.playing.actionDay(this.council, this.living_players, this.dead_players);
    }
}