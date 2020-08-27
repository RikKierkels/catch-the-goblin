import { ACTOR_TYPES, IMAGES } from "../utils/constants.js";
import ImageCache from "./image-cache.js";

const drawBackground = (context, image) => context.drawImage(image, 0, 0);

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
  };
};

export default Canvas;
