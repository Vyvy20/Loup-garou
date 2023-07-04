import { joueurs } from '../Joueurs';

class Villageois extends joueurs {
  role = 'Villageois';
  skipNight = true;
  description = 'Un simple villageois qui essaye de survivre.';

  constructor(playername) {
    super(playername);
  }

  actionNight(council, vote, extra) {
    this.message({
      message:
        'Vous ne pouvez pas agir pendant la nuit car vous êtes un simple villageois.',
    });
  }

  victoryCondition(living_players) {
    for (const player of Object.values(living_players)) {
      if (player.role === 'Loup-Garou' && player.role === 'Loup-Garou Blanc') {
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
