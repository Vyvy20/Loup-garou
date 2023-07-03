class Joueur {
    skipAuthorization = true;
    unique = false;
    constructor(playername) {
        this.playername = playername;
    }
    
    action(){
      throw new Error('Méthode action() non implémentée.')
    }

    actionDay(votes, listLivePlayers){
    }

    victoryCondition(){
      throw new Error('Méthode conditionDeVictoire() non implémentée.');
    }
  }

export { Joueur }
