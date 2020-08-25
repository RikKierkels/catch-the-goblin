const Timer = (time) => {
  let elapsedTimeSec = 0;

  return {
    hasExpired: () => elapsedTimeSec >= time,
    update(time) {
      elapsedTimeSec += time;
      console.log(elapsedTimeSec);
      return this;
    },
    reset() {
      elapsedTimeSec = 0;
      return this;
    },
  };
};

export default Timer;
