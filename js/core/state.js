import { WAVE_STATUS } from "../utils/constants.js";
import { isEmpty } from "../utils/utils.js";

const isWaveCleared = (wave) => wave && wave.isCleared() && isEmpty(wave.actors());

const State = ({ hero, wave = null }) => {
  let status = WAVE_STATUS.PLAYING;

  return {
    status: () => status,
    hero: () => hero,
    wave: () => wave,
    update(time, input) {
      hero = hero.update(time, input);
      wave = wave && wave.update(time);

      const actorCollidingWithHero = hero.collides(wave.actors());
      if (actorCollidingWithHero) {
        hero = actorCollidingWithHero.hit(hero);
      }

      status = hero.isDead ? WAVE_STATUS.LOST : status;
      status = isWaveCleared(wave) ? WAVE_STATUS.WON : status;

      return this;
    },
    startWave(nextWave) {
      wave = nextWave;
      return this;
    },
  };
};

export default State;
