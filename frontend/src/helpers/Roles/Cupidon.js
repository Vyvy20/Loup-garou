import { Joueur } from './Joueurs';

class Cupidon extends Joueur {
  role = 'Cupidon';
  description = 'Cupidon peut lier deux joueurs ensemble pendant la PreGame.';

  couple = [];

  constructor(playername) {
    super(playername);
  }

  actionPregame(living_players, playername1, playername2) {
    if (living_players[playername1] && living_players[playername2]) {
      this.couple = [playername1, playername2];
    } else {
      throw new Error('One or both of the player names provided do not exist.');
    }
  }

  victoryCondition(living_players) {
    if (
      this.couple.length === 2 &&
      living_players[this.couple[0]] &&
      living_players[this.couple[1]]
    ) {
      for (const playername in living_players) {
        if (
          playername !== this.playername &&
          playername !== this.couple[0] &&
          playername !== this.couple[1]
        ) {
          return false;
        }
      }
      this.message({
        message:
          'Cupidon et le couple ont gagné. Ils sont les derniers en vie.',
      });
      return true;
    } else if (
      this.couple.length === 2 &&
      !living_players[this.couple[0]] &&
      !living_players[this.couple[1]]
    ) {
      for (const playername in living_players) {
        if (living_players[playername].role === 'LoupGarou') {
          return false;
        }
      }
      this.message({
        message:
          'Cupidon a gagné. Le couple est mort et tous les LoupGarou sont morts.',
      });
      return true;
    }
    return false;
  }
}

export { Cupidon };
