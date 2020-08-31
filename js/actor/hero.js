import { ACTOR_STATE, INPUT_KEY, STYLE } from "../utils/constants.js";
import { FunctionalMixin } from "../utils/utils.js";
import { Location } from "../utils/location.js";
import { drawImageOverlay } from "../ui/display.js";

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
  isDead() {
    return this.states.has(ACTOR_STATE.DEAD);
  },
  isHurting() {
    return this.states.has(ACTOR_STATE.HURTING);
  },
  update(time, input) {
    this.states = this.states.update(time);

    const travelledDistance = getTravelledDistance(this.speed * time, input);
    this.moveToInWorld(this.location.plus(travelledDistance));

    return this;
  },
  hit() {},
  wound(damage) {
    if (this.isHurting()) return this;

    this.hitpoints -= damage;

    if (this.hitpoints <= 0) return this.destroy();

    this.states = this.states.add(ACTOR_STATE.HURTING, 1);
    return this;
  },
  draw({ buffer, bufferContext, displayContext, image }) {
    const { x, y } = this.location.get();
    displayContext.drawImage(image, x, y);

    if (this.isHurting()) {
      drawImageOverlay(bufferContext, image, STYLE.RED_TRANSPARENT, this.width, this.height);
      displayContext.drawImage(buffer, x, y);
    }
  },
  destroy() {
    this.states = this.states.add(ACTOR_STATE.DEAD);
    return this;
  },
});

export default Hero;
