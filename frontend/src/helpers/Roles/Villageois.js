import { Joueur } from '../Joueurs';

class Villageois extends Joueur {
  role = 'Villageois';
  skipNight = true;
  description = 'Un simple villageois qui essaye de survivre.';


  actionNight(council, vote, extra) {
    this.message({
      message:
        'Vous ne pouvez pas agir pendant la nuit car vous êtes un simple villageois.',
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

export { Villageois };
