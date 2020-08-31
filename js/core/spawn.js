import ActorFactory from "../actor/actor-factory.js";
import Timer from "../utils/timer.js";

const Spawn = ({ type, total, interval }) => {
  let actorsToSpawn = [];
  let spawnTimer = Timer(interval);

  return {
    hasSpawnedAll: () => total <= 0,
    update(time) {
      if (this.hasSpawnedAll()) return this;
      spawnTimer = spawnTimer.update(time);
      return this;
    },
    spawn() {
      if (this.hasSpawnedAll() || !spawnTimer.hasExpired()) return actorsToSpawn;

      const actor = ActorFactory.create(type);
      actorsToSpawn = [...actorsToSpawn, actor];
      total--;
      spawnTimer = spawnTimer.reset();

      return actorsToSpawn;
    },
    clear() {
      actorsToSpawn = [];
      return this;
    },
  };
};

export default Spawn;
