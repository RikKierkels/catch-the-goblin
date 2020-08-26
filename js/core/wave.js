const Wave = ({ id, spawns }) => {
  let actors = [];

  return {
    isCleared: () => spawns.every((spawn) => !spawn.canSpawnMore()),
    actors: () => actors,
    update(time) {
      spawns = spawns.map((spawn) => spawn.update(time));
      actors = spawns.flatMap((spawn) => spawn.spawn()).concat(actors);
      spawns = spawns.map((spawn) => spawn.clear());
      return this;
    },
  };
};

export default Wave;
