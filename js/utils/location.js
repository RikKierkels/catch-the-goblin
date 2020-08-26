import { randomBetween } from "./utils.js";
import { WORLD_BOUNDARY_EAST, WORLD_BOUNDARY_NORTH, WORLD_BOUNDARY_SOUTH, WORLD_BOUNDARY_WEST } from "../core/world.js";

const Location = (x = 0, y = 0) => ({
  get: () => ({ x, y }),
  center(x, y) {
    const center = (x) => x / 2;
    return Location(center(x), center(y));
  },
  randomInWorld(offsetX, offsetY) {
    const x = randomBetween(WORLD_BOUNDARY_WEST, WORLD_BOUNDARY_EAST - offsetX);
    const y = randomBetween(WORLD_BOUNDARY_NORTH, WORLD_BOUNDARY_SOUTH - offsetY);
    return Location(x, y);
  },
  plus(other) {
    const { x: otherX, y: otherY } = other.get();
    return Location(x + otherX, y + otherY);
  },
  times(factor) {
    return Location(x * factor, y * factor);
  },
});

export { Location };
