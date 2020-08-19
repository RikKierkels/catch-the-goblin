import { INPUT_KEYS } from "./utils/constants.js";
import { isWithinBoundsEast, isWithinBoundsNorth, isWithinBoundsSouth, isWithinBoundsWest } from "./world.js";

const getNextCoordinates = (x, y, distance, input) => {
  if (input[INPUT_KEYS.ARROW_LEFT]) {
    x -= distance;
  }

  if (input[INPUT_KEYS.ARROW_RIGHT]) {
    x += distance;
  }

  if (input[INPUT_KEYS.ARROW_UP]) {
    y -= distance;
  }

  if (input[INPUT_KEYS.ARROW_DOWN]) {
    y += distance;
  }

  return [x, y];
};

const stayInWorld = (currentX, nextX, currentY, nextY, height, width) => {
  const x = isWithinBoundsEast(nextX + width) && isWithinBoundsWest(nextX) ? nextX : currentX;
  const y = isWithinBoundsNorth(nextY) && isWithinBoundsSouth(nextY + height) ? nextY : currentY;
  return [x, y];
};

const Hero = {
  update(time, input) {
    let [x, y] = getNextCoordinates(this.x, this.y, this.speed * time, input);
    [x, y] = stayInWorld(this.x, x, this.y, y, this.height, this.width);
    this.setCoordinates(x, y);

    return this;
  },
};

export default Hero;
