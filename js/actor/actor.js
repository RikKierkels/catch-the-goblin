import { IsBox, IsMovableBox } from "./box.js";
import Hero from "./hero.js";
import Goblin from "./goblin.js";
import IsMortal from "./is-mortal.js";
import { Location } from "../utils/location.js";
import { pipe } from "../utils/fp.js";
import { ACTOR_TYPES } from "../utils/constants.js";
import { WORLD_HEIGHT_PX, WORLD_WIDTH_PX } from "../core/world.js";

const location = Location();
const createHero = pipe(IsMovableBox, IsMortal, Hero);
const createGoblin = pipe(IsBox, Goblin);

const ACTORS = {
  [ACTOR_TYPES.HERO]: () =>
    createHero({
      type: ACTOR_TYPES.HERO,
      location: location.center(WORLD_WIDTH_PX, WORLD_HEIGHT_PX),
      width: 32,
      height: 32,
      speed: 256,
      isDead: false,
      isHit: false,
    }),
  [ACTOR_TYPES.GOBLIN]: () => {
    const size = 32;
    return createGoblin({
      type: ACTOR_TYPES.GOBLIN,
      location: location.randomInWorld(size, size),
      width: size,
      height: size,
      speed: 0,
    });
  },
};

export default { create: (type) => ACTORS[type]() };
