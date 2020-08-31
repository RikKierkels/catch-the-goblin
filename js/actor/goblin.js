import { FunctionalMixin } from "../utils/utils.js";

const Goblin = FunctionalMixin({
  update(time) {
    return this;
  },
  hit(other) {
    if ("wound" in other) other.wound(this.baseDamage);
    return other;
  },
  draw({ displayContext, image }) {
    const { x, y } = this.location.get();
    displayContext.drawImage(image, x, y);
  },
});

export default Goblin;
