class Joueur {
  skipAuthorization = true;
  unique = false;
  role = 'Joueur';
  description = 'Un participant a la partie de Loups Garous';
  constructor(playername, role) {
    this.name = playername;
    this.role = role;
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
    throw new Error('Méthode conditionDeVictoire() non implémentée.');
  }

  message(data) {
    if (!data) {
      throw new Error('Aucune donnée fournie.');
    }
    const message = data.message;
    if (!message) throw new Error('Aucun message dans les données fournies.');

    return message;
  }
}

export { Joueur };
