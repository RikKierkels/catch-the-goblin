const Wave = ({ id, spawns }) => {
  let actors = [];

  return {
    actors: () => actors,
    isCleared: () => spawns.every((spawn) => spawn.hasSpawnedAll()),
    update(time) {
      spawns = spawns.map((spawn) => spawn.update(time));
      actors = spawns.flatMap((spawn) => spawn.spawn()).concat(actors);
      spawns = spawns.map((spawn) => spawn.clear());
      return this;
    },
  };
};

export default Wave;
