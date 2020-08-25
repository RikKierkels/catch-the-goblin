const randomBetween = (low, high) => {
  if (low > high) return randomBetween(high, low);
  return Math.random() * (high - low) + low;
};

export { randomBetween };
