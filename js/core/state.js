import Wave from "../wave.js";

const State = {
  update(time, input) {
    this.hero = this.hero.update(time, input);
    this.wave = this.wave.update(time);
    return this;
  },
  addWave(wave) {
    this.wave = wave;
    return this;
  },
};

export default { create: ({ hero }) => Object.assign({ hero, wave: Wave({ id: 0, spawns: [] }) }, State) };
