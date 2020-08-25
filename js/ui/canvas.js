import { IMAGES } from "../utils/constants.js";
import ImageCache from "./image-cache.js";

const drawBackground = (context, image) => context.drawImage(image, 0, 0);
const drawHero = (context, image, { x, y }) => context.drawImage(image, x, y);

const Canvas = ({ width, height, imageCache = ImageCache() }) => {
  const canvas = document.createElement("canvas");
  const context = canvas.getContext("2d");
  canvas.width = width;
  canvas.height = height;

  function load(element) {
    element.appendChild(canvas);
    return this;
  }

  function sync(state) {
    console.log(state);
    drawBackground(context, imageCache.load(IMAGES.BACKGROUND));
    drawHero(context, imageCache.load(IMAGES.HERO), state.hero.location.get());
    return this;
  }

  return {
    load,
    sync,
  };
};

export default Canvas;
