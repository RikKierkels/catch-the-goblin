import ActorFactory from "../actor/actor.js";
import Timer from "../utils/timer.js";

const Spawn = ({ type, total, interval }) => {
  let actors = [];
  let timer = Timer(interval);

  return {
    canSpawnMore: () => total > 0,
    update(time) {
      if (!this.canSpawnMore()) return this;
      timer = timer.update(time);
      return this;
    },
    spawn() {
      if (!this.canSpawnMore() || !timer.hasExpired()) return actors;

      const actor = ActorFactory.create(type);
      actors = [...actors, actor];
      total--;
      timer = timer.reset();

      return actors;
    },
    clear() {
      actors = [];
      return this;
    },
  };
};

export default Spawn;
