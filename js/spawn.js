import ActorFactory from "./actor/actor.js";

const Spawn = ({ type, total }) => {
  let spawned = [];

  return {
    hasSpawnedAll: () => total < 1,
    update(time) {
      return this;
    },
    spawn() {
      if (this.hasSpawnedAll()) return spawned;

      const actor = ActorFactory.create(type);
      spawned = [actor, ...spawned];
      total--;
      return spawned;
    },
    clear() {
      spawned = [];
      return this;
    },
  };
};

export default Spawn;
