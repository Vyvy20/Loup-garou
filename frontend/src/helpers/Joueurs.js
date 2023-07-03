class joueurs {
    constructor(name, votes, listLivePlayers, skipAuthorization) {
      this.name = name;
      this.votes = votes;
      this.listLivePlayers = listLivePlayers;
      this.skipAuthorization  = skipAuthorization;
      this.unique = true; 
    }
    
    action(){
      throw new Error('Méthode action() non implémentée.')
    }

    actionDay(votes, listLivePlayers){
          this.votes = votes;
          this.listLivePlayers = listLivePlayers;
        }

    victoryCondition(){
      throw new Error('Méthode conditionDeVictoire() non implémentée.');
    }
  }

