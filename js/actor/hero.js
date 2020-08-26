import { INPUT_KEYS } from "../utils/constants.js";
import { Location } from "./can-move.js";
import { WORLD_BOUNDARY_EAST, WORLD_BOUNDARY_NORTH, WORLD_BOUNDARY_SOUTH, WORLD_BOUNDARY_WEST } from "../core/world.js";
import { FunctionalMixin } from "../utils/utils.js";

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

const isExceedingWorldBoundaryX = (x, width) => x < WORLD_BOUNDARY_WEST || x + width > WORLD_BOUNDARY_EAST;
const isExceedingWorldBoundaryY = (y, height) => y < WORLD_BOUNDARY_NORTH || y + height > WORLD_BOUNDARY_SOUTH;

const stayInWorld = (currentLocation, nextLocation, width, height) => {
  let locationInWorld = Location();

  const { x: currentX, y: currentY } = currentLocation.get();
  const { x: nextX, y: nextY } = nextLocation.get();

  locationInWorld = locationInWorld.plus(
    isExceedingWorldBoundaryX(nextX, width) ? Location(currentX, 0) : Location(nextX, 0),
  );

  locationInWorld = locationInWorld.plus(
    isExceedingWorldBoundaryY(nextY, height) ? Location(0, currentY) : Location(0, nextY),
  );

  return locationInWorld;
};

const Hero = FunctionalMixin({
  update(time, input) {
    const distance = getTravelledDistance(this.speed * time, input);
    const nextLocation = stayInWorld(this.location, this.location.plus(distance), this.width, this.height);
    this.moveTo(nextLocation);

    return this;
  },
});

export default Hero;
