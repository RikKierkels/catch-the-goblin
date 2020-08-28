import { FunctionalMixin } from "../utils/utils.js";

const IsMortal = FunctionalMixin({
  wound(damage = 1) {
    this.hitpoints -= damage;
    this.isHit = true;

    if (this.hitpoints < 0) {
      this.die();
    }

    return this;
  },
  die() {
    this.isDead = true;
    return this;
  },
});

export default IsMortal;
