import ActorFactory from "./actor/actor.js";
import Timer from "./utils/timer.js";

const Spawn = ({ type, total, interval }) => {
  let spawned = [];
  let timer = Timer(interval);

  return {
    hasSpawnedAll: () => total < 1,
    update(time) {
      if (this.hasSpawnedAll()) return this;
      timer = timer.update(time);
      return this;
    },
    spawn() {
      if (this.hasSpawnedAll()) return spawned;

      if (timer.hasExpired()) {
        const actor = ActorFactory.create(type);
        spawned = [...spawned, actor];
        total--;
        timer = timer.reset();
      }

      return spawned;
    },
    clear() {
      spawned = [];
      return this;
    },
  };
};

export default Spawn;
