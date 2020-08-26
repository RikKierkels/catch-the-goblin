const Timer = (time) => {
  let elapsedTime = 0;

  return {
    hasExpired: () => elapsedTime >= time,
    update(time) {
      elapsedTime += time;
      return this;
    },
    reset() {
      elapsedTime = 0;
      return this;
    },
  };
};

export default Timer;
