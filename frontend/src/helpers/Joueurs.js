class Joueur {
    skipAuthorization = true;
    unique = false;
    constructor(playername) {
        this.playername = playername;
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
