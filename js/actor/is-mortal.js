import { FunctionalMixin } from "../utils/utils.js";

const IsMortal = FunctionalMixin({
  takeDamage(damage) {
    this.health -= damage;
    this.isHit = true;
  },
  die() {
    this.isDead = true;
  },
});

export default IsMortal;
