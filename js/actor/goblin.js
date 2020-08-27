import { FunctionalMixin } from "../utils/utils.js";

const Goblin = FunctionalMixin({
  update(time) {
    return this;
  },
  hit(other) {
    if ("wound" in other) other.wound(this.baseDamage);
    return other;
  },
  draw(context, image) {
    const { x, y } = this.location.get();
    context.drawImage(image, x, y);
  },
});

export default Goblin;
