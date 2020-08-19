const makeLoadImage = (onload) => (src) => {
  const image = new Image();
  return Object.assign(image, { src, onload: onload(src, image) });
};

const ImageCache = () => {
  const cache = Object.create(null);

  function load(src) {
    return cache[src];
  }

  function save(src, image) {
    cache[src] = image;
    return this;
  }

  function preload(sources) {
    return new Promise((resolve) => {
      const toLoadCount = sources.length;
      let loadedCount = 0;

      const onload = (src, image) => {
        loadedCount++;
        save(src, image);
        if (loadedCount === toLoadCount) resolve(this);
      };

      const loadImage = makeLoadImage(onload, onerror);
      sources.forEach(loadImage);
    });
  }

  return {
    load,
    save,
    preload,
  };
};

export default ImageCache;
