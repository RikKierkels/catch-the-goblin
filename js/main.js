import { CanvasFactory } from "./canvas.js";
import { runFrame } from "./frame.js";
import { IMAGES } from "./constants.js";
import ImageCache from "./image-cache.js";

const runWave = (canvas) =>
  new Promise((resolve) =>
    runFrame((time) => {
      canvas = canvas.sync(time);
      if (true) return true;

      if (false) {
        resolve(canvas);
        return false;
      }
    }),
  );

const runGame = async () => {
  const imageCache = await ImageCache.preload(Object.values(IMAGES));
  let canvas = CanvasFactory({ width: 512, height: 480, imageCache });
  canvas = canvas.load(document.body);
  canvas = await runWave(canvas);
};

(async () => {
  await runGame();
})();
