import ActorFactory from "./actor/actor-factory.js";
import Canvas from "./ui/canvas.js";
import State from "./core/state.js";
import ImageCache from "./ui/image-cache.js";
import { trackInput } from "./core/input.js";
import { runFrame } from "./core/frame.js";
import { compose } from "./utils/fp.js";
import WAVES from "./waves.js";
import { WORLD_HEIGHT_PX, WORLD_WIDTH_PX } from "./core/world.js";
import { ACTOR_TYPES, IMAGES, INPUT_KEYS, WAVE_STATUS } from "./utils/constants.js";

const hasWon = (status) => status === WAVE_STATUS.WON;
const hasLost = (status) => status === WAVE_STATUS.LOST;
const hasWaveEnded = (status) => hasWon(status) || hasLost(status);

const runWave = (state, canvas, input) =>
  new Promise((resolve) =>
    runFrame((time) => {
      state = state.update(time, input);
      canvas = canvas.sync(state);

      if (hasWaveEnded(state.status())) {
        resolve([state, canvas]);
        return false;
      }

      return true;
    }),
  );

const runGame = async () => {
  const input = compose(trackInput, Object.values)(INPUT_KEYS);

  const imagesToLoad = Object.values(IMAGES);
  const imageCache = await ImageCache().loadBatch(imagesToLoad);
  let canvas = Canvas({ width: WORLD_WIDTH_PX, height: WORLD_HEIGHT_PX, imageCache }).load(document.body);

  const hero = ActorFactory.create(ACTOR_TYPES.HERO);
  let state = State({ hero });

  for (let wave = 0; wave < WAVES.length; ) {
    state = state.startWave(WAVES[wave]);
    [state, canvas] = await runWave(state, canvas, input);

    const status = state.status();
    if (hasLost(status)) break;
    wave++;
  }
};

runGame();
