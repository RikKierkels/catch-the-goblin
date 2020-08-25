import ActorFactory from "./actor/actor.js";
import Timer from "./utils/timer.js";

const Spawn = ({ type, total, interval }) => {
  let spawned = [];
  let timer = Timer(interval);

  return {
    canSpawnMore: () => total > 0,
    update(time) {
      if (!this.canSpawnMore()) return this;
      timer = timer.update(time);
      return this;
    },
    spawn() {
      if (!this.canSpawnMore() || !timer.hasExpired()) return spawned;

      const actor = ActorFactory.create(type);
      spawned = [...spawned, actor];
      total--;
      timer = timer.reset();

      return spawned;
    },
    clear() {
      spawned = [];
      return this;
    },
  };
};

export default Spawn;
