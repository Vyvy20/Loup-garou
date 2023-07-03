class Joueur {
    skipAuthorization = true;
    unique = false;
    constructor(playername) {
        this.playername = playername;
    }
    
    action(){
      throw new Error('Méthode action() non implémentée.')
    }

    actionDay(council, living_players, dead_players){
    }

    victoryCondition(){
      throw new Error('Méthode conditionDeVictoire() non implémentée.');
    }
  }

export { Joueur }
