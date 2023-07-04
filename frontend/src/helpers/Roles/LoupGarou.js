import { Joueur } from './Joueurs';

class LoupGarou extends Joueur {
  role = 'LoupGarou';
  description = 'Un loup-garou qui gagne quand tous les villageois sont morts.';

  actionNight(council, vote) {
    council.addVote(vote, 1, 'loups_garou');
  }

  victoryCondition(living_players) {
    for (const playername in living_players) {
      if (living_players[playername].role !== 'LoupGarou') {
        return false;
      }
    }
    this.message({
      message: 'Les LoupGarou ont gagné. Il ne reste que des LoupGarou en vie.',
    });
    return true;
  }
}

export { LoupGarou };
