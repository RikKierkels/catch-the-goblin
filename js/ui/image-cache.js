const makeLoadImage = (onload) => (src) => {
  const image = new Image();
  return Object.assign(image, { src, onload: onload(src, image) });
};

const ImageCache = () => {
  const cache = Object.create(null);

  return {
    load: (src) => cache[src],
    save: (src, image) => (cache[src] = image),
    async preload(sources) {
      return new Promise((resolve) => {
        const toLoadCount = sources.length;
        let loadedCount = 0;

        const onload = (src, image) => {
          loadedCount++;
          this.save(src, image);
          if (loadedCount === toLoadCount) resolve(this);
        };

        const loadImageFromSource = makeLoadImage(onload);
        sources.forEach(loadImageFromSource);
      });
    },
  };
};

export default ImageCache;
