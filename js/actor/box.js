import { FunctionalMixin } from "../utils/utils.js";
import { WORLD_BOUNDARY_EAST, WORLD_BOUNDARY_NORTH, WORLD_BOUNDARY_SOUTH, WORLD_BOUNDARY_WEST } from "../core/world.js";
import { pipe } from "../utils/fp.js";
import { Location } from "../utils/location.js";

const IsBox = FunctionalMixin({
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

const isExceedingWorldBoundaryX = (x, width) => x < WORLD_BOUNDARY_WEST || x + width > WORLD_BOUNDARY_EAST;
const isExceedingWorldBoundaryY = (y, height) => y < WORLD_BOUNDARY_NORTH || y + height > WORLD_BOUNDARY_SOUTH;

const IsMovableBox = pipe(
  IsBox,
  FunctionalMixin({
    moveTo(location) {
      this.location = location;
      return this;
    },
    moveToInWorld(nextLocation) {
      let locationInWorld = Location();

      const { x: currentX, y: currentY } = this.location.get();
      const { x: nextX, y: nextY } = nextLocation.get();

      locationInWorld = locationInWorld.plus(
        isExceedingWorldBoundaryX(nextX, this.width) ? Location(currentX, 0) : Location(nextX, 0),
      );

      locationInWorld = locationInWorld.plus(
        isExceedingWorldBoundaryY(nextY, this.height) ? Location(0, currentY) : Location(0, nextY),
      );

      this.moveTo(locationInWorld);
    },
  }),
);

export { IsBox, IsMovableBox };
