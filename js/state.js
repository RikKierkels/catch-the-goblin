const State = {
  update(time, input) {
    this.hero = this.hero.update(time, input);
    return this;
  },
};

export default { create: ({ hero }) => Object.assign({ hero }, State) };
