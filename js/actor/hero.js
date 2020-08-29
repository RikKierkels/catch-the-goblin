import { INPUT_KEY } from "../utils/constants.js";
import { FunctionalMixin } from "../utils/utils.js";
import { Location } from "../utils/location.js";

const DIRECTION_KEYS = {
  north: [INPUT_KEY.ARROW_UP, INPUT_KEY.W],
  east: [INPUT_KEY.ARROW_LEFT, INPUT_KEY.A],
  south: [INPUT_KEY.ARROW_DOWN, INPUT_KEY.S],
  west: [INPUT_KEY.ARROW_RIGHT, INPUT_KEY.D],
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
