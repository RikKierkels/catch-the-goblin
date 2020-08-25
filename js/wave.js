const Wave = ({ id, spawns }) => {
  let spawned = [];

  return {
    id,
    isCleared: () => spawns.all((spawn) => !spawn.canSpawnMore()),
    spawned: () => spawned,
    update(time) {
      spawns = spawns.map((spawn) => spawn.update(time));
      spawned = spawns.flatMap((spawn) => spawn.spawn()).concat(spawned);
      spawns = spawns.map((spawn) => spawn.clear());
      return this;
    },
  };
};

export default Wave;
