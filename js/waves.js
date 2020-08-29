import Spawn from "./core/spawn.js";
import Wave from "./core/wave.js";
import { ACTOR_TYPE } from "./utils/constants.js";

let waves = [
  { id: 1, spawns: [{ type: ACTOR_TYPE.GOBLIN, total: 5, interval: 2 }] },
  { id: 2, spawns: [] },
  { id: 3, spawns: [] },
];

export default {
  total: () => waves.length,
  get: (i) => Wave({ id: waves[i], spawns: waves[i].spawns.map(Spawn) }),
};
