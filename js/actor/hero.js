import { INPUT_KEYS } from "../utils/constants.js";
import { FunctionalMixin } from "../utils/utils.js";
import { Location } from "../utils/location.js";

const DIRECTION_KEYS = {
  north: [INPUT_KEYS.ARROW_UP, INPUT_KEYS.W],
  east: [INPUT_KEYS.ARROW_LEFT, INPUT_KEYS.A],
  south: [INPUT_KEYS.ARROW_DOWN, INPUT_KEYS.S],
  west: [INPUT_KEYS.ARROW_RIGHT, INPUT_KEYS.D],
};
const hasKey = (input) => (keys) => keys.some((key) => input[key]);

const getTravelledDistance = (distance, input) => {
  const inputHasKey = hasKey(input);
  let location = Location();

  if (inputHasKey(DIRECTION_KEYS.east)) {
    location = location.plus(Location(-distance, 0));
  }

  if (inputHasKey(DIRECTION_KEYS.west)) {
    location = location.plus(Location(distance, 0));
  }

  if (inputHasKey(DIRECTION_KEYS.north)) {
    location = location.plus(Location(0, -distance));
  }

  if (inputHasKey(DIRECTION_KEYS.south)) {
    location = location.plus(Location(0, distance));
  }

  return location;
};

const Hero = FunctionalMixin({
  update(time, input) {
    const travelledDistance = getTravelledDistance(this.speed * time, input);
    this.moveToInWorld(this.location.plus(travelledDistance));

    return this;
  },
  hit() {},
  draw(context, image) {
    const { x, y } = this.location.get();
    context.drawImage(image, x, y);
  },
});

export default Hero;
