import { Joueur } from './Joueurs';

class Corbeau extends Joueur {
  role = 'Corbeau';
  description =
    'Le Corbeau peut donner 2 votes de plus à un joueur pendant la nuit.';

  constructor(playername) {
    super(playername);
  }

  actionNight(council, playername) {
    if (council.votes['conseil'][playername]) {
      council.votes['conseil'][playername] += 2;
    } else {
      council.votes['conseil'][playername] = 2;
    }
  }

  victoryCondition(living_players) {
    for (const playername in living_players) {
      if (
        living_players[playername].role === 'LoupGarou' &&
        player.role === 'Loup-Garou Blanc'
      ) {
        return false;
      }
    }
    this.message({
      message: 'Le Corbeau a gagné. Tous les LoupGarou sont morts.',
    });
    return true;
  }
}

export { Corbeau };
