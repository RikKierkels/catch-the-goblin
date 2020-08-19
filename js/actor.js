import { WORLD_HEIGHT_PX, WORLD_WIDTH_PX } from "./world.js";
import { ACTOR_TYPES } from "./utils/constants.js";
import CanMove from "./can-move.js";
import Hero from "./hero.js";

const center = (x) => x / 2;

const ACTORS = {
  [ACTOR_TYPES.HERO]: () =>
    Object.assign(
      { x: center(WORLD_WIDTH_PX), y: center(WORLD_HEIGHT_PX), speed: 256, width: 32, height: 32 },
      Hero,
      CanMove,
    ),
};

export default { create: (type) => ACTORS[type]() };
