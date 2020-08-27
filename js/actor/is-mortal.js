import { FunctionalMixin } from "../utils/utils.js";

const IsMortal = FunctionalMixin({
  wound(damage = 1) {
    this.hitpoints -= damage;
    this.isHit = true;
    return this;
  },
  die() {
    this.isDead = true;
    return this;
  },
});

export default IsMortal;
