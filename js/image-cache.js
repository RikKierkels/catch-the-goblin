const makeLoadImage = (onload) => (src) => {
  const image = new Image();
  return Object.assign(image, { src, onload: onload(src, image) });
};

const ImageCache = {
  cache: Object.create(null),
  save(src, image) {
    this.cache[src] = image;
    return this;
  },
  load(src) {
    return this.cache[src];
  },
  async preload(imageSources) {
    return new Promise((resolve) => {
      const toLoadCount = imageSources.length;
      let loadedCount = 0;

      const onload = (src, image) => {
        loadedCount++;
        this.save(src, image);
        if (loadedCount === toLoadCount) resolve(this);
      };

      const loadImage = makeLoadImage(onload);
      imageSources.forEach(loadImage);
    });
  },
};

export default ImageCache;
