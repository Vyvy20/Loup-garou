import { joueurs } from '../Joueurs';

class Pyromane extends joueurs {
  role = 'Pyromane';
  description =
    "Un pyromane qui peut mettre de l'essence sur les autres joueurs.";
  night = true;

  actionNight(council, living_players, extra) {
    if (!extra || !Array.isArray(extra.targets) || extra.targets.length > 3) {
      throw new Error(
        "Le Pyromane doit choisir jusqu'à trois cibles pour l'essence."
      );
    }

    for (let i = 0; i < extra.targets.length; i++) {
      const target = extra.targets[i];
      if (!living_players[target]) {
        throw new Error(`Le joueur ${target} n'existe pas ou est déjà mort.`);
      }

      living_players[target].fuelStacks += 1;
      if (living_players[target].fuelStacks >= 3) {
        council.addVote(target, 1, 'loups_garou');
        this.message({
          message: `Le joueur ${target} a été brûlé par le pyromane.`,
        });
      } else {
        this.message({
          message: `Le joueur ${target} a reçu une stack d'essence du pyromane.`,
        });
      }
    }
  }

  victoryCondition(living_players) {
    if (
      Object.keys(living_players).length === 1 &&
      living_players[this.playername]
    ) {
      this.message({
        message: 'Le Pyromane a gagné. Il est le dernier en vie.',
      });
      return true;
    }
    return false;
  }
}

export { Pyromane };
