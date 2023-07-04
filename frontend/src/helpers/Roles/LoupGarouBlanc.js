import { Joueur } from './Joueurs';

class LoupGarouBlanc extends Joueur {
  role = 'LoupGarouBlanc';
  description = 'Un loup-garou blanc qui gagne quand il est le dernier en vie.';

  constructor(playername) {
    super(playername);
  }

  actionNight(council, vote) {
    council.addVote(vote, 1, 'loups_garou');
  }

  victoryCondition(living_players) {
    for (const playername in living_players) {
      if (playername !== this.playername) {
        return false;
      }
    }
    this.message({
      message: 'Le LoupGarouBlanc a gagné. Il est le dernier en vie.',
    });
    return true;
  }
}

export { LoupGarouBlanc };
