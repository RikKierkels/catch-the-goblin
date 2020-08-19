import { INPUT_KEYS } from "./utils/constants.js";

const getNextCoordinates = (x, y, distance, input) => {
  if (input[INPUT_KEYS.ARROW_UP]) {
    y -= distance;
  }

  if (input[INPUT_KEYS.ARROW_DOWN]) {
    y += distance;
  }

  if (input[INPUT_KEYS.ARROW_LEFT]) {
    x -= distance;
  }

  if (input[INPUT_KEYS.ARROW_RIGHT]) {
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
