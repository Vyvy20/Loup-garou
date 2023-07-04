import { Phases } from "./Phases";

class Joueur {
  skipAuthorization = true;
  unique = false;
  role = 'Joueur';
  description = 'Un participant a la partie de Loups Garous';
  pregame = false;
  night = false;
  
  constructor(playername) {
    this.playername = playername;
  }

  actionPregame() {
    return;
  }

  actionNight(council, vote, extra) {
    throw new Error('Méthode action() non implémentée.');
  }

  actionDay(council, vote, extra) {
    council.addVote(vote);
  }

  victoryCondition() {
    throw new Error('Méthode victoryCondition() non implémentée.');
  }

  message(data) {
    if (!data) {
      throw new Error('Aucune donnée fournie.');
    }
    const message = data.message;
    if (!message) throw new Error('Aucun message dans les données fournies.');

    return message;
  }

  canPlay(phase) {
    switch (phase) {
      case Phases.PreGame:
        return this.pregame
      case Phases.Day:
        return true;
      case Phases.Night:
        return this.night;
      default:
        return false;
    }
  }
}

export { Joueur };
