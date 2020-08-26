import { FunctionalMixin } from "../utils/utils.js";

const IsMortal = FunctionalMixin({
  wound(damage = 1) {
    this.hitpoints -= damage;
    this.isHit = true;
  },
  die() {
    this.isDead = true;
  },
});

export default IsMortal;
