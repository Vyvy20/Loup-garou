import { Joueur } from './Joueurs';

class PetiteFille extends Joueur {
  role = 'PetiteFille';
  description = 'Une petite fille qui peut identifier un loup-garou la nuit.';

  constructor(playername) {
    super(playername);
  }

  actionNight(council, living_players) {
    // Liste de tous les loups-garous (ou loups-garous blancs) encore vivants
    let werewolves = Object.values(living_players).filter(
      (player) =>
        player.role === 'loup-garou' || player.role === 'loup-garoublanc'
    );

    // Choisissez un loup-garou aléatoire
    let randomWerewolf =
      werewolves[Math.floor(Math.random() * werewolves.length)];

    // Liste de tous les autres joueurs vivants
    let otherPlayers = Object.values(living_players).filter(
      (player) => player !== randomWerewolf
    );

    // Choisissez deux autres joueurs aléatoirement
    let randomPlayer1 =
      otherPlayers[Math.floor(Math.random() * otherPlayers.length)];
    otherPlayers = otherPlayers.filter((player) => player !== randomPlayer1); // Remove the chosen player from the list
    let randomPlayer2 =
      otherPlayers[Math.floor(Math.random() * otherPlayers.length)];

    // Maintenant, randomWerewolf, randomPlayer1 et randomPlayer2 sont les trois joueurs choisis pour la PetiteFille.

    // Envoyer un message à la PetiteFille
    this.message({
      message:
        'Les joueurs choisis pour vous cette nuit sont : ' +
        randomWerewolf.playername +
        ', ' +
        randomPlayer1.playername +
        ' et ' +
        randomPlayer2.playername +
        '.',
    });
  }

  victoryCondition(living_players) {
    for (const player of Object.values(living_players)) {
      if (player.role === 'Loup-Garou' || player.role === 'LoupGarouBlanc') {
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
export { PetiteFille };
