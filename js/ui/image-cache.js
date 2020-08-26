import { isEmpty } from "../utils/utils.js";

const toFutureImage = (source) =>
  new Promise((resolve) => {
    const onload = (src, image) => resolve([src, image]);
    const onerror = () => resolve([]);
    return loadImageFromSource(onload, onerror, source);
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
      const futureImages = sources.map(toFutureImage);
      const loadedImages = await Promise.all(futureImages);
      loadedImages.filter((x) => isEmpty(x)).forEach(([src, image]) => this.save(src, image));
      return this;
    },
  };
};

export default ImageCache;
