import { IMAGE, STYLE } from "../utils/constants.js";
import ImageCache from "./image-cache.js";

const RESET_DELAY_IN_MS = 1500;

const Canvas = ({ width, height, imageCache = ImageCache() }) => {
  const canvas = document.createElement("canvas");
  const context = canvas.getContext("2d");
  canvas.width = width;
  canvas.height = height;

  const clear = () => context.clearRect(0, 0, canvas.width, canvas.height);
  const getFromCache = async (image) => imageCache.get(image) || (await imageCache.load(image)).get(image);

  return {
    load(element) {
      element.appendChild(canvas);
      return this;
    },
    async sync(state) {
      clear();

      const wave = state.wave();
      const hero = state.hero();

      context.drawImage(await getFromCache(IMAGE.BACKGROUND), 0, 0);
      hero.draw(context, await getFromCache(IMAGE[hero.type]));

      for (const actor of wave.actors()) {
        actor.draw(context, await getFromCache(IMAGE[actor.type]));
      }

      return this;
    },
    async reset() {
      return new Promise((resolve) => {
        context.fillStyle = STYLE.RED_TRANSPARENT;
        context.fillRect(0, 0, canvas.width, canvas.height);
        setTimeout(() => resolve(this), RESET_DELAY_IN_MS);
      });
    },
  };
};

export default Canvas;
