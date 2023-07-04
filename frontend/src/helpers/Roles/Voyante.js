import { joueurs } from '../Joueurs';

class Voyante extends joueurs {
  role = 'Voyante';
  description =
    'Une voyante qui peut voir le rôle des autres joueurs pendant la nuit.';

  actionNight(council, vote, extra) {
    if (!extra || !extra.playername) {
      throw new Error('Aucun joueur choisi pour la Voyante à observer.');
    }
    this.message({
      message: `Le joueur que vous avez observé est un ${extra.role}.`,
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
      this.message({ message: 'Félicitations, vous avez gagné!' });
      return true;
    }
    return false;
  }
}

export { Voyante };
