import { WORLD_HEIGHT_PX, WORLD_WIDTH_PX } from "../core/world.js";
import { ACTOR_TYPES } from "../utils/constants.js";
import { Box, CanMove, Location } from "./can-move.js";
import Hero from "./hero.js";

const centerOfWorld = () => Location().center(WORLD_WIDTH_PX, WORLD_HEIGHT_PX);

const ACTORS = {
  [ACTOR_TYPES.HERO]: () =>
    Object.assign({ speed: 256 }, Box({ location: centerOfWorld(), width: 32, height: 32 }), Hero, CanMove),
};

export default { create: (type) => ACTORS[type]() };
