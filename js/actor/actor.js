import { WORLD_HEIGHT_PX, WORLD_WIDTH_PX } from "../core/world.js";
import { ACTOR_TYPES } from "../utils/constants.js";
import { Box, CanMove, Location } from "./can-move.js";
import Hero from "./hero.js";
import Goblin from "./goblin.js";

const centerOfWorld = () => Location().center(WORLD_WIDTH_PX, WORLD_HEIGHT_PX);

const ACTORS = {
  [ACTOR_TYPES.HERO]: () =>
    Object.assign(
      { type: ACTOR_TYPES.HERO, location: centerOfWorld(), width: 32, height: 32, speed: 256 },
      Box,
      Hero,
      CanMove,
    ),
  [ACTOR_TYPES.GOBLIN]: () =>
    Object.assign({ type: ACTOR_TYPES.GOBLIN, location: Location(0, 0), width: 32, height: 32, speed: 0 }, Box, Goblin),
};

export default { create: (type) => ACTORS[type]() };
