import { IsBox, IsMovableBox } from "./box.js";
import Actor from "./actor.js";
import Hero from "./hero.js";
import Goblin from "./goblin.js";
import IsMortal from "./is-mortal.js";
import { Location } from "../utils/location.js";
import { pipe } from "../utils/fp.js";
import { ACTOR_TYPE } from "../utils/constants.js";
import { WORLD_HEIGHT_PX, WORLD_WIDTH_PX } from "../core/world.js";

const location = Location();
const createHero = pipe(Actor, Hero, IsMovableBox, IsMortal);
const createGoblin = pipe(Actor, Goblin, IsBox);

const ACTORS = {
  [ACTOR_TYPE.HERO]: (overrides) =>
    createHero({
      type: ACTOR_TYPE.HERO,
      location: location.center(WORLD_WIDTH_PX, WORLD_HEIGHT_PX),
      width: 32,
      height: 32,
      speed: 256,
      hitpoints: 5,
      isDead: false,
      isHit: false,
      ...overrides,
    }),
  [ACTOR_TYPE.GOBLIN]: (overrides) => {
    const size = 32;
    return createGoblin({
      type: ACTOR_TYPE.GOBLIN,
      location: location.randomInWorld(size, size),
      width: size,
      height: size,
      speed: 0,
      baseDamage: 1,
      ...overrides,
    });
  },
};

export default { create: (type, overrides) => ACTORS[type](overrides) };
