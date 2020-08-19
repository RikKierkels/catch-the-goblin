import ImageCache from "../js/image-cache";

test("given a cached image, can load the image from the cache", () => {
  const source = "img/background.png";
  const image = {};

  let cache = ImageCache();
  cache = cache.save(source, image);

  expect(cache.load(source)).toEqual(image);
});

test("given an empty cache, can preload images", async () => {
  const sources = ["img/background.png", "img/hero.png", "img/monster.png"];

  let cache = ImageCache();
  cache = await cache.preload(sources);

  sources.forEach((src) => expect(cache.load(src)).toBeTruthy());
});
