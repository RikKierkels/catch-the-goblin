import { ACTOR_TYPES, IMAGES } from "../utils/constants.js";
import ImageCache from "./image-cache.js";

const drawBackground = (context, image) => context.drawImage(image, 0, 0);
const drawHero = (context, image, { x, y }) => context.drawImage(image, x, y);
const drawActor = (context, image, { x, y }) => context.drawImage(image, x, y);

const Canvas = ({ width, height, imageCache = ImageCache() }) => {
  const canvas = document.createElement("canvas");
  const context = canvas.getContext("2d");
  canvas.width = width;
  canvas.height = height;

  return {
    load(element) {
      element.appendChild(canvas);
      return this;
    },
    sync(state) {
      // TODO: Rework drawing
      drawBackground(context, imageCache.load(IMAGES.BACKGROUND));
      drawHero(context, imageCache.load(IMAGES.HERO), state.hero.location.get());
      state.wave
        .spawned()
        .forEach((actor) => drawActor(context, imageCache.load(IMAGES[actor.type]), actor.location.get()));
      return this;
    },
  };
};

export default Canvas;
