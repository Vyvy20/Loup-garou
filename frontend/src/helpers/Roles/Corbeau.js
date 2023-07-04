import { Joueur } from '../Joueurs';

class Corbeau extends Joueur {
  role = 'Corbeau';
  description =
    'Le Corbeau peut donner 2 votes de plus à un joueur pendant la nuit.';

  actionNight(council, playername) {
    council.addVotes(playername, 2);
  }

  victoryCondition(living_players) {
    for (const playername in living_players) {
      if (
        living_players[playername].role === 'LoupGarou' ||
        living_players[playername].role === 'LoupGarouBlanc' ||
        living_players[playername].role === 'Pyromane'
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
