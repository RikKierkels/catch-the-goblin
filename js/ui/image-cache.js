const loadImage = (src) =>
  new Promise((resolve) => {
    const onload = (src, image) => resolve([src, image]);
    const onerror = () => resolve([]);
    return createImageToLoad(onload, onerror, src);
  });

const createImageToLoad = (onload, onerror, src) => {
  const image = new Image();
  return Object.assign(image, { src, onload: onload(src, image), onerror });
};

const ImageCache = () => {
  const cache = Object.create(null);
  const store = ([src, image]) => {
    if (!src || !image) return;
    cache[src] = image;
  };

  return {
    get: (src) => cache[src],
    async load(source) {
      const image = await loadImage(source);
      store(image);
      return this;
    },
    async loadBatch(sources) {
      await Promise.all(sources.map(this.load));
      return this;
    },
  };
};

export default ImageCache;
