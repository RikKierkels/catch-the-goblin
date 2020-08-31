import { IMAGE, STYLE } from "../utils/constants.js";
import ImageCache from "./image-cache.js";

const RESET_DELAY_IN_MS = 1500;

const createCanvas = (width, height) => {
  const canvas = document.createElement("canvas");
  return Object.assign(canvas, { width, height });
};

const Display = ({ width, height, imageCache = ImageCache() }) => {
  const display = createCanvas(width, height);
  const displayContext = display.getContext("2d");

  const buffer = createCanvas(width, height);
  const bufferContext = buffer.getContext("2d");

  const withDrawingArguments = (image) => ({
    image,
    display,
    displayContext,
    buffer,
    bufferContext,
  });

  const clear = () => displayContext.clearRect(0, 0, display.width, display.height);
  const getFromCache = async (image) => imageCache.get(image) || (await imageCache.load(image)).get(image);

  return {
    load(element) {
      element.appendChild(display);
      return this;
    },
    async sync(state) {
      clear();

      const wave = state.wave();
      const hero = state.hero();

      displayContext.drawImage(await getFromCache(IMAGE.BACKGROUND), 0, 0);
      hero.draw(withDrawingArguments(await getFromCache(IMAGE[hero.type])));

      for (const actor of wave.actors()) {
        actor.draw(withDrawingArguments(await getFromCache(IMAGE[actor.type])));
      }

      return this;
    },
    async reset() {
      return new Promise((resolve) => {
        displayContext.fillStyle = STYLE.RED_TRANSPARENT;
        displayContext.fillRect(0, 0, display.width, display.height);
        setTimeout(() => resolve(this), RESET_DELAY_IN_MS);
      });
    },
  };
};

const drawImageOverlay = (context, image, style, width, height) => {
  context.drawImage(image, 0, 0);
  context.save();
  context.globalCompositeOperation = "source-in";
  context.fillStyle = style;
  context.fillRect(0, 0, width, height);
  context.restore();
};

export default Display;
export { drawImageOverlay };
