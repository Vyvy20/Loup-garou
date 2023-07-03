class villageois extends joueurs {
    constructor(name, votes, listLivePlayers, skipAuthorization, role, roleAllie) {
        super(name, votes, listLivePlayers, skipAuthorization);
        this.role = role;
        this.roleAllie = roleAllie;
      }
}