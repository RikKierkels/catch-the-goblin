const State = ({ hero, wave = null }) => ({
  hero: () => hero,
  wave: () => wave,
  update(time, input) {
    hero = hero.update(time, input);
    wave = wave && wave.update(time);

    const actorCollidingWithHero = hero.collides(wave.actors());
    if (actorCollidingWithHero) {
      hero = actorCollidingWithHero.hit(hero);
    }

    return this;
  },
  addWave(nextWave) {
    wave = nextWave;
    return this;
  },
});

export default State;
