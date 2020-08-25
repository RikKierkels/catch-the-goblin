const isEmpty = (xs) => xs.length;

const Wave = ({ id, spawns }) => {
  let spawned = [];

  return {
    id,
    isCleared: () => spawns.all((spawn) => spawn.hasSpawnedAll()),
    spawned: () => spawned,
    update(time) {
      spawns = spawns.map((spawn) => spawn.update(time));
      spawned = spawns
        .map((spawn) => spawn.spawn())
        .filter(isEmpty)
        .concat(spawned)
        .flat(1);
      spawns = spawns.map((spawn) => spawn.clear());
      return this;
    },
  };
};

export default Wave;
