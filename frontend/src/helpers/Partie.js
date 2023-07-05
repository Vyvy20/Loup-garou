import { Council } from './Council';
import { Joueur } from './Joueurs';
import { Phases } from './Phases';
import { Voyante } from './Roles/Voyante';
import { Villageois } from './Roles/Villageois';
import { Sorciere } from './Roles/Sorciere';
import { Pyromane } from './Roles/Pyromane';
import { PetiteFille } from './Roles/PetiteFille';
import { LoupGarouBlanc } from './Roles/LoupGarouBlanc';
import { LoupGarou } from './Roles/LoupGarou';
import { Cupidon } from './Roles/Cupidon';
import { Corbeau } from './Roles/Corbeau';


class Game {
  round = 0;
  players = [];
  dead_players = [];
  living_players = {};
  council = new Council();
  phase = null;
  dead_this_turn = [];
  cycle = [];

  constructor(player_list, roles) {
    this.phase = Phases.PreGame;

    const role_list = [
      'Voyante',
      'Villageois',
      'Sorciere',
      'Pyromane',
      'PetiteFille',
      'LoupGarouBlanc',
      'LoupGarou',
      'Cupidon',
      'Corbeau',
    ];

    // Randomiser la liste des joueurs et des rôles
    player_list = this.random(player_list);
    roles = this.random(role_list);

    for (let i = 0; i < player_list.length; i++) {
      // S'il y a plus de 9 joueurs alors ajouté des Villageois
      if (i >= 9) {
        const joueur = new Villageois(player_list[i]);
        this.living_players[player_list[i]] = joueur;
        this.players.push(joueur);
      } else {
        let role;
        switch (roles[i]) {
          case 'Voyante':
            role = new Voyante(player_list[i]);
            break;
          case 'Villageois':
            role = new Villageois(player_list[i]);
            break;
          case 'Sorciere':
            role = new Sorciere(player_list[i]);
            break;
          case 'Pyromane':
            role = new Pyromane(player_list[i]);
            break;
          case 'PetiteFille':
            role = new PetiteFille(player_list[i]);
            break;
          case 'LoupGarouBlanc':
            role = new LoupGarouBlanc(player_list[i]);
            break;
          case 'LoupGarou':
            role = new LoupGarou(player_list[i]);
            break;
          case 'Cupidon':
            role = new Cupidon(player_list[i]);
            break;
          case 'Corbeau':
            role = new Corbeau(player_list[i]);
            break;
          default:
            break;
        }
        this.living_players[player_list[i]] = role;
        this.players.push(role);
      }
    }
    this.playing = 0;
    this.cycle = this.setCycle();
  }

  end() {
    let winners = [];
    for (const index in this.living_players) {
      const player = this.living_players[index];
      if (player.victoryCondition(this.living_players)) {
        this.phase = Phases.End;
        winners.push(player.playername);
      }
    }
    return winners;
  }

  nextPhase() {
    switch (this.phase) {
      case Phases.PreGame:
        this.phase = Phases.Night;
        break;
      case Phases.Night:
        this.phase = Phases.Day;
        break;
      case Phases.Day:
        this.phase = Phases.Night;
        break;
      default:
        this.phase = Phases.PreGame;
        break;
    }
    this.setCycle();
  }

  nextPlayer() {
    this.cycle.shift();
    console.log('Next player to play is ' + this.cycle[0]);
    return this.cycle[0];
  }

  setCycle() {
    let cycle = [];
    for (const player in this.living_players) {
      cycle.push(player);
    }
    cycle.push(false);
    return cycle;
  }

  get_turn() {
    // get at the start of the turn to get displayable values
    const playername = this.cycle[0];
    if (!playername) {
      // in case all players have played and phase have to end
      const data = this.endPhase();
      return data;
    }
    // if turn to play is a player, send all needed datas
    const player = this.living_players[playername];
    if (!player.canPlay(this.phase)) {
      this.nextPlayer();
      return this.get_turn();

    }
    return {
      data: {
        end: false,
        player: {
          name: player.playername,
          role: {
            name: player.role,
            description: player.description,
          },
        },
        phase: this.phase,
      },
    };
  }

  endPhase() {
    let data = null;
    switch (this.phase) {
      case Phases.PreGame:
        data = this.pregame_end();
        break;
      case Phases.Night:
        data = this.nighttime_end();
        break;
      case Phases.Day:
        data = this.daytime_end();
        break;
      default:
        data = this.pregame_end();
        break;
    }

    // check if game ended after applying all end phase scenario
    const winners = this.end();
    if (winners.length > 0) {
      return {
        data: {
          end: true,
          message: 'La partit est terminer !',
          player: {
            name: 'Tout les joueurs',
          },
          winners: winners,
        },
        phase: Phases.End,
      };
    }

    // change phase in backend before sending turn message
    this.nextPhase();
    return {
      data: data,
      phase: this.Phase,
    };
  }

  message(message) {
    const data = {
      end: true,
      message: message,
      player: {
        name: 'Tout le monde',
      },
      deadPlayers: this.dead_this_turn,
      resurectedPlayers: this.resurected_this_turn,
    };
    // before sending message, reset this turns counters
    for (const deadPlayer in this.dead_this_turn) {
      this.dead_players.push(deadPlayer);
      delete this.living_players[deadPlayer.name];
    }
    this.dead_this_turn = [];
    for (const resurectedPlayer in this.resurected_this_turn) {
      this.dead_players.remove(resurectedPlayer);
      this.living_players[resurectedPlayer.name] = resurectedPlayer;
    }
    this.resurected_this_turn = [];

    return data;
  }

  pregame_end() {
    return this.message('La première nuit vas débuter ...');
  }

  daytime_end() {
    // kill with council
    const playername = this.council.playerToKill();
    if (!playername) {
      return this.message("La journée s'achève pour le village");
    }
    console.log(
      'The player ' + playername + ' has been eliminated by the village'
    );
    this.council.reset();
    return this.message("La journée s'achève pour le village");
  }

  nighttime_end() {
    const playername = this.council.playerToKill('loups_garou');
    if (!playername) {
      return this.message(
        "La nuit s'achève, le village découvre les actions passé dans la nuit."
      );
    }
    console.log(
      'The player ' + playername + ' has been eliminated by the werewolfs'
    );
    return this.message(
      "La nuit s'achève, le village découvre les actions passé dans la nuit."
    );
  }

  pregameActions(who, vote, extra = {}) {
    const player = this.livingPlayers[this.playing];
    if (who !== player.playername) {
      throw new Error('Player trying to play is not the current player');
    }
    player.actionDay(this.council, vote, extra);
    return this.nextPlayer();
  }

  daytime_action(who, vote, extra = {}) {
    const player = this.livingPlayers[this.playing];
    if (who !== player.playername) {
      throw new Error('Player trying to play is not the current player');
    }
    player.actionDay(this.council, vote, extra);
    return this.nextPlayer();
  }

  nighttime_action(who, vote, extra = {}) {
    const player = this.livingPlayers[this.playing];
    if (who !== player.playername) {
      throw new Error('Player trying to play is not the current player');

    }
    extra['dead_this_turn'] = this.dead_this_turn;
    this.dead_this_turn = player.nighttime_action();
  }

  action(who, vote, extra = {}) {
    extra['living_players'] = this.livingPlayers;
    const player = this.livingPlayers[this.playing];
    if (who !== player.playername) {
      throw new Error('Player trying to play is not the current player');
    }
    let data = {};
    if (this.phase === Phases.Day) {
      data = player.actionDay(this.council, vote, extra);
    }
    if (this.phase === Phases.Night) {
      data = player.actionNight(this.council, vote, extra);
    }
    if (this.phase === Phases.PreGame) {
      data = player.actionPregame(this.council, vote, extra);
    }
    this.nextPlayer();
    return data;
  }

  getLivingPlayers() {
    return this.living_players;
  }

  random(array) {
    let currentIndex = array.length,
      temporaryValue,
      randomIndex;
    // Tant que l'index courant n'est pas nul
    while (0 !== currentIndex) {
      // On génère un index aléatoire entre 0 (inclus) et l'index courant (exclu)

      randomIndex = Math.floor(Math.random() * currentIndex);
      // On décrémente l'index courant
      currentIndex -= 1;

      // On effectue l'échange de la valeur à l'index courant avec la valeur à l'index aléatoire
      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }

    return array;
  }

  printPlayers() {
    console.log('Affichage des joueurs et leurs rôles:');
    for (let i = 0; i < this.players.length; i++) {
      console.log(this.players[i]);
    }
  }

}

export default Game;
