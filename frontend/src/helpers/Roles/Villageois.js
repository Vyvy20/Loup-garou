import { Joueur } from "../Joueurs";

class Villageois extends Joueur {
  role = "Villageois";
  skipNight = true;

  action() {
    return
  }

  victoryCondition(living_players) {
    //checkrole des perso vivant, si aucun loup/perso solo
    return false;
  }
}