import Spawn from "./core/spawn.js";
import Wave from "./core/wave.js";
import { ACTOR_TYPES } from "./utils/constants.js";

const waves = [
  { id: 1, spawns: [{ type: ACTOR_TYPES.GOBLIN, total: 5, interval: 2 }] },
  { id: 2, spawns: [] },
  { id: 3, spawns: [] },
];

export default waves.map(({ id, spawns }) => Wave({ id, spawns: spawns.map(Spawn) }));