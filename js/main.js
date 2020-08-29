import Canvas from "./ui/canvas.js";
import State from "./core/state.js";
import ImageCache from "./ui/image-cache.js";
import { trackInput } from "./core/input.js";
import { runFrame } from "./core/frame.js";
import { compose } from "./utils/fp.js";
import WAVES from "./waves.js";
import { WORLD_HEIGHT_PX, WORLD_WIDTH_PX } from "./core/world.js";
import { IMAGE, INPUT_KEY, WAVE_STATUS } from "./utils/constants.js";

const hasWon = (status) => status === WAVE_STATUS.WON;
const hasLost = (status) => status === WAVE_STATUS.LOST;
const hasWaveEnded = (status) => hasWon(status) || hasLost(status);

const runWave = (state, canvas, input) =>
  new Promise((resolve) =>
    runFrame(async (time) => {
      state = state.update(time, input);
      canvas = await canvas.sync(state);

      if (hasWaveEnded(state.status())) {
        resolve([state, canvas]);
        return false;
      }

      return true;
    }),
  );

const runGame = async () => {
  const input = compose(trackInput, Object.values)(INPUT_KEY);
  const imageCache = await ImageCache().loadBatch(Object.values(IMAGE));

  let canvas = Canvas({ imageCache, width: WORLD_WIDTH_PX, height: WORLD_HEIGHT_PX }).load(document.body);
  let state = State();

  for (let wave = 0; wave < WAVES.total(); ) {
    state = state.start(WAVES.get(wave));
    [state, canvas] = await runWave(state, canvas, input);

    const status = state.status();
    if (hasLost(status)) {
      state = state.reset();
      canvas = await canvas.reset();
    } else {
      wave++;
    }
  }
};

runGame();
