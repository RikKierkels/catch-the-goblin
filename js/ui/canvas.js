import { IMAGES, STYLES } from "../utils/constants.js";
import ImageCache from "./image-cache.js";

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
      this.clear();

      const wave = state.wave();
      const hero = state.hero();

      context.drawImage(imageCache.get(IMAGES.BACKGROUND), 0, 0);
      hero.draw(context, imageForType(hero.type));
      wave.actors().forEach((actor) => actor.draw(context, imageForType(actor.type)));

      return this;
    },
    clear() {
      context.clearRect(0, 0, canvas.width, canvas.height);
      return this;
    },
    async reset() {
      return new Promise((resolve) => {
        context.fillStyle = STYLES.LOST;
        context.fillRect(0, 0, canvas.width, canvas.height);
        setTimeout(() => resolve(this), 1500);
      });
    },
  };
};

export default Canvas;
