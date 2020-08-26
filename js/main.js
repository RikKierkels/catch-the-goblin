import ActorFactory from "./actor/actor.js";
import Canvas from "./ui/canvas.js";
import State from "./core/state.js";
import Spawn from "./core/spawn.js";
import Wave from "./core/wave.js";
import ImageCache from "./ui/image-cache.js";
import { trackInput } from "./core/input.js";
import { runFrame } from "./core/frame.js";
import { isEmpty } from "./utils/utils.js";
import { compose } from "./utils/fp.js";
import { WORLD_HEIGHT_PX, WORLD_WIDTH_PX } from "./core/world.js";
import { ACTOR_TYPES, IMAGES, INPUT_KEYS } from "./utils/constants.js";

const asSpawns = (spawns) => spawns.map(Spawn);
const asWaves = (waves) => waves.map(Wave);
const waves = asWaves([{ id: 1, spawns: asSpawns([{ type: ACTOR_TYPES.GOBLIN, total: 5, interval: 2 }]) }]);

const runWave = (state, canvas, input) =>
  new Promise((resolve) =>
    runFrame((time) => {
      state = state.update(time, input);
      canvas = canvas.sync(state);
      const wave = state.wave();

      const hasClearedWave = wave.isCleared() && isEmpty(wave.actors());
      if (!hasClearedWave) return true;

      if (hasClearedWave) {
        resolve([state, canvas]);
        return false;
      }
    }),
  );

const runGame = async () => {
  const input = compose(trackInput, Object.values)(INPUT_KEYS);

  const imagesToLoad = Object.values(IMAGES);
  const imageCache = await ImageCache().preload(imagesToLoad);
  let canvas = Canvas({ width: WORLD_WIDTH_PX, height: WORLD_HEIGHT_PX, imageCache }).load(document.body);

  const hero = ActorFactory.create(ACTOR_TYPES.HERO);
  let state = State({ hero });

  for (const wave of waves) {
    state = state.addWave(wave);
    [state, canvas] = await runWave(state, canvas, input);
  }
};

runGame();
