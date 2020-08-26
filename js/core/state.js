const State = {
  update(time, input) {
    this.hero = this.hero.update(time, input);
    this.wave = this.wave && this.wave.update(time);

    const heroCollidingWith = this.hero.collides(this.wave.spawned());
    if (heroCollidingWith) {
    }

    return this;
  },
  addWave(wave) {
    this.wave = wave;
    return this;
  },
};

export default { create: ({ hero }) => Object.assign({ hero }, State) };
