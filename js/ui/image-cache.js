import { isEmpty } from "../utils/utils.js";
import { not } from "../utils/fp.js";

const toImageToLoad = (src) =>
  new Promise((resolve) => {
    const onload = (src, image) => resolve([src, image]);
    const onerror = () => resolve([]);
    return loadImageFromSource(onload, onerror, src);
  });

const loadImageFromSource = (onload, onerror, src) => {
  const image = new Image();
  return Object.assign(image, { src, onload: onload(src, image), onerror });
};

const ImageCache = () => {
  const cache = Object.create(null);

  return {
    load: (src) => cache[src],
    save: (src, image) => (cache[src] = image),
    async preload(sources) {
      const loadedImages = await Promise.all(sources.map(toImageToLoad));
      loadedImages.filter(not(isEmpty)).forEach(([src, image]) => this.save(src, image));
      return this;
    },
  };
};

export default ImageCache;
