import { ACTOR_TYPES, INPUT_KEYS } from "../utils/constants.js";
import { Location } from "./can-move.js";
import { WORLD_BOUNDARY_EAST, WORLD_BOUNDARY_NORTH, WORLD_BOUNDARY_SOUTH, WORLD_BOUNDARY_WEST } from "../core/world.js";

const getTravelledDistance = (distance, input) => {
  let location = Location();

  if (input[INPUT_KEYS.ARROW_LEFT] || input[INPUT_KEYS.A]) {
    location = location.plus(Location(-distance, 0));
  }

  if (input[INPUT_KEYS.ARROW_RIGHT] || input[INPUT_KEYS.D]) {
    location = location.plus(Location(distance, 0));
  }

  if (input[INPUT_KEYS.ARROW_UP] || input[INPUT_KEYS.W]) {
    location = location.plus(Location(0, -distance));
  }

  if (input[INPUT_KEYS.ARROW_DOWN] || input[INPUT_KEYS.S]) {
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

const Hero = {
  update(time, input) {
    const distance = getTravelledDistance(this.speed * time, input);
    const nextLocation = stayInWorld(this.location, this.location.plus(distance), this.width, this.height);
    this.moveTo(nextLocation);

    return this;
  },
};

export default Hero;
