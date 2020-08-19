import { GAME_HEIGHT_PX, GAME_WIDTH_PX } from "./main.js";
import { ACTOR_TYPES } from "./utils/constants.js";
import CanMove from "./can-move.js";
import Hero from "./hero.js";

const center = (x) => x / 2;

const ACTORS = {
  [ACTOR_TYPES.HERO]: () =>
    Object.assign({ x: center(GAME_WIDTH_PX), y: center(GAME_HEIGHT_PX), speed: 256 }, Hero, CanMove),
};

export default { create: (type) => ACTORS[type]() };
