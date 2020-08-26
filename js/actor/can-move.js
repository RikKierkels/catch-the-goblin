import { FunctionalMixin } from "../utils/utils.js";

const Location = (x = 0, y = 0) => ({
  get() {
    return { x, y };
  },
  plus(other) {
    const { x: otherX, y: otherY } = other.get();
    return Location(x + otherX, y + otherY);
  },
  times(factor) {
    return Location(x * factor, y * factor);
  },
});

const Box = FunctionalMixin({
  overlapsX(other) {
    const { x: thisX } = this.location.get();
    const { x: otherX } = other.location.get();

    return thisX + this.width > otherX && otherX + other.width > thisX;
  },
  overlapsY(other) {
    const { y: thisY } = this.location.get();
    const { y: otherY } = other.location.get();
    return thisY + this.height > otherY && otherY + other.height > thisY;
  },
  overlaps(other) {
    return this.overlapsX(other) && this.overlapsY(other);
  },
  collides(others) {
    return others.find((other) => other.overlaps(this));
  },
});

const CanMove = FunctionalMixin({
  moveTo(location) {
    this.location = location;
  },
});

export { Location, Box, CanMove };
