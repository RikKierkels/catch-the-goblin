import { ACTOR_TYPES, IMAGES, WAVE_STATUS } from "../utils/constants.js";
import ImageCache from "./image-cache.js";

const drawBackground = (context, image) => context.drawImage(image, 0, 0);

const FILL_STYLE_FOR_STATUS = {
  [WAVE_STATUS.WON]: "rgb(68, 191, 255)",
  [WAVE_STATUS.LOST]: "rgb(44, 136, 214)",
};

const Canvas = ({ width, height, imageCache = ImageCache() }) => {
  const canvas = document.createElement("canvas");
  const context = canvas.getContext("2d");
  canvas.width = width;
  canvas.height = height;

  const imageForType = (type) => imageCache.get(IMAGES[type]);

  return {
    load(element) {
      element.appendChild(canvas);
      return this;
    },
    sync(state) {
      const wave = state.wave();
      const hero = state.hero();

      drawBackground(context, imageCache.get(IMAGES.BACKGROUND));
      hero.draw(context, imageForType(hero.type));
      wave.actors().forEach((actor) => actor.draw(context, imageForType(actor.type)));

      return this;
    },
    clear(status) {
      context.fillStyle = FILL_STYLE_FOR_STATUS[status] || "rgb(229,229,229)";
      context.fillRect(0, 0, width, height);
      return this;
    },
  };
};

export default Canvas;
