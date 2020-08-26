const FunctionalMixin = (behavior) => (target) => Object.assign(target, behavior);

const randomBetween = (low, high) => {
  if (low > high) return randomBetween(high, low);
  return Math.random() * (high - low) + low;
};

const isEmpty = (arr) => !Array.isArray(arr) || arr.length === 0;

export { FunctionalMixin, randomBetween, isEmpty };
