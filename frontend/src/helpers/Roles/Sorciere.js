import { joueurs } from '../Joueurs';

class Sorciere extends joueurs {
  role = 'Sorciere';
  description =
    'Une sorcière qui peut lancer un sort pour tuer ou ressusciter un joueur pendant la nuit.';
  usedKillPower = false;
  usedResurrectPower = false;

  actionNight(council, vote, extra) {
    if (!extra || !extra.playername || !extra.action) {
      throw new Error(
        'Aucun joueur ou action choisis pour la Sorcière à effectuer.'
      );
    }

    if (extra.action === 'tuer') {
      if (this.usedKillPower) {
        throw new Error('Vous avez déjà utilisé votre pouvoir de tuer.');
      }
      council.addVote(extra.playername, 1, 'loups_garou');
      this.message({
        message: `Vous avez choisi de tuer le joueur ${extra.playername}.`,
      });
      this.usedKillPower = true;
    } else if (extra.action === 'ressusciter') {
      if (this.usedResurrectPower) {
        throw new Error('Vous avez déjà utilisé votre pouvoir de ressusciter.');
      }
      this.message({
        message: `Vous avez choisi de ressusciter le joueur ${extra.playername}.`,
      });
      this.usedResurrectPower = true;
    } else {
      throw new Error('Action non reconnue pour la Sorcière à effectuer.');
    }
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

export { Sorciere };
