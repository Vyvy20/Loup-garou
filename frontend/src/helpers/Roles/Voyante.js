import { Joueur } from '../Joueurs';

class Voyante extends Joueur {
  role = 'Voyante';
  description =
    'Une voyante qui peut voir le rôle des autres joueurs pendant la nuit.';
  night = true;

  actionNight(council, vote, extra) {
    if (!vote || !vote.playername) {
      throw new Error('Aucun joueur choisi pour la Voyante à observer.');
    }
    const player = extra["living_players"][vote]
    this.message({
      message: `${vote} que vous avez observé est un ${player.role}.`,
    });
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
    if (living_players[this.playername] !== undefined) {
      console.log(this.playername + " à gagné la partie")
      return true;
    }
    return false;
  }
}

export { Voyante };
