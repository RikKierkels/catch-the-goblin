import Canvas from "./canvas.js";
import { runFrame } from "./frame.js";
import { ACTOR_TYPES, IMAGES, INPUT_KEYS } from "./utils/constants.js";
import ImageCache from "./image-cache.js";
import trackInput from "./input.js";
import State from "./state.js";
import ActorFactory from "./actor.js";
import { compose } from "./utils/fp.js";

export const GAME_WIDTH_PX = 512;
export const GAME_HEIGHT_PX = 480;

const runWave = (state, canvas, input) =>
  new Promise((resolve) =>
    runFrame((time) => {
      state = state.update(time, input);
      canvas = canvas.sync(state);

      if (true) return true;

      if (false) {
        resolve([state, canvas]);
        return false;
      }
    }),
  );

const runGame = async () => {
  const input = compose(trackInput, Object.values)(INPUT_KEYS);

  const imagesToLoad = Object.values(IMAGES);
  const imageCache = await ImageCache().preload(imagesToLoad);

  const hero = ActorFactory.create(ACTOR_TYPES.HERO);
  let state = State.create({ hero });

  let canvas = Canvas({ width: GAME_WIDTH_PX, height: GAME_HEIGHT_PX, imageCache }).load(document.body);
  [state, canvas] = await runWave(state, canvas, input);
};

runGame();
