import { Joueur } from '../Joueurs';

class LoupGarouBlanc extends Joueur {
  role = 'LoupGarouBlanc';
  description = 'Un loup-garou blanc qui gagne quand il est le dernier en vie.';

  actionNight(council, vote) {
    council.addVote(vote, 1, 'loups_garou');
  }

  victoryCondition(living_players) {
    if (
      Object.keys(living_players).length === 1 &&
      living_players[this.playername]
    ) {
      this.message({
        message: 'Le LoupGarouBlanc a gagné. Il est le dernier en vie.',
      });
      return true;
    }
    return false;
  }
}

export { LoupGarouBlanc };
