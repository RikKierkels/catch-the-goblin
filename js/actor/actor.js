import { Box, CanMove, Location } from "./can-move.js";
import Hero from "./hero.js";
import Goblin from "./goblin.js";
import { randomBetween } from "../utils/utils.js";
import { ACTOR_TYPES } from "../utils/constants.js";
import {
  WORLD_BOUNDARY_EAST,
  WORLD_BOUNDARY_NORTH,
  WORLD_BOUNDARY_SOUTH,
  WORLD_BOUNDARY_WEST,
  WORLD_HEIGHT_PX,
  WORLD_WIDTH_PX,
} from "../core/world.js";

const center = (x) => x / 2;
const centerOfWorld = () => Location(center(WORLD_WIDTH_PX), center(WORLD_HEIGHT_PX));
const randomInWorld = ({ width, height }) =>
  Location(
    randomBetween(WORLD_BOUNDARY_WEST, WORLD_BOUNDARY_EAST - width),
    randomBetween(WORLD_BOUNDARY_NORTH, WORLD_BOUNDARY_SOUTH - height),
  );

const ACTORS = {
  [ACTOR_TYPES.HERO]: () =>
    Object.assign(
      { type: ACTOR_TYPES.HERO, location: centerOfWorld(), width: 32, height: 32, speed: 256 },
      Box,
      Hero,
      CanMove,
    ),
  [ACTOR_TYPES.GOBLIN]: () => {
    const dimensions = { width: 32, height: 32 };
    return Object.assign(
      { type: ACTOR_TYPES.GOBLIN, location: randomInWorld(dimensions), ...dimensions, speed: 0 },
      Box,
      Goblin,
    );
  },
};

export default { create: (type) => ACTORS[type]() };
