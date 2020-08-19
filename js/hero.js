import { INPUT_KEYS } from "./utils/constants.js";
import { isWithinBoundsEast, isWithinBoundsNorth, isWithinBoundsSouth, isWithinBoundsWest } from "./world.js";

const getNextCoordinates = (x, y, distance, input) => {
  if (input[INPUT_KEYS.ARROW_UP] && isWithinBoundsNorth(y)) {
    y -= distance;
  }

  if (input[INPUT_KEYS.ARROW_DOWN] && isWithinBoundsSouth(y)) {
    y += distance;
  }

  if (input[INPUT_KEYS.ARROW_LEFT] && isWithinBoundsWest(x)) {
    x -= distance;
  }

  if (input[INPUT_KEYS.ARROW_RIGHT] && isWithinBoundsEast(x)) {
    x += distance;
  }

  return [x, y];
};

const Hero = {
  update(time, input) {
    const [x, y] = getNextCoordinates(this.x, this.y, this.speed * time, input);
    this.setCoordinates(x, y);
    return this;
  },
};

export default Hero;
