class Joueur {
    skipAuthorization = true;
    unique = false;
    role = "Joueur"
    description = "Un participant a la partie de Loups Garous"
    constructor(playername) {
        this.playername = playername;
    }

    actionPregame() {
        return
    }
    
    actionNight(council, vote, extra){
      throw new Error('Méthode action() non implémentée.')
    }

    actionDay(council, vote, extra){
        council.addVote(vote)
    }

    victoryCondition(){
      throw new Error('Méthode conditionDeVictoire() non implémentée.');
    }
  }

export { Joueur }
