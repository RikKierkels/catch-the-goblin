import { IMAGES } from "./constants.js";

const drawBackground = (context, cache) => context.drawImage(cache.load(IMAGES.BACKGROUND), 0, 0);

const Canvas = {
  load(element) {
    element.appendChild(this.canvas);
    return this;
  },
  sync(time) {
    drawBackground(this.context, this.imageCache);
    return this;
  },
};

const CanvasFactory = ({ width, height, imageCache }) => {
  const canvas = document.createElement("canvas");
  canvas.width = width;
  canvas.height = height;

  return Object.assign({ canvas, context: canvas.getContext("2d"), imageCache }, Canvas);
};

export { CanvasFactory };
