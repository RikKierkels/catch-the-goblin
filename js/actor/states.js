import Timer from "../utils/timer.js";
import { not } from "../utils/fp.js";

const hasSameTypeAs = (type) => (state) => state.type === type;

const States = (states = []) => ({
  has: (type) => states.some(hasSameTypeAs(type)),
  add(type, time = Infinity) {
    if (this.has(type)) return;

    states = [...states, { type, timer: Timer(time) }];
    return this;
  },
  remove(type) {
    states = states.filter(not(hasSameTypeAs(type)));
    return this;
  },
  update(time) {
    states = states.map(({ type, timer }) => ({ type, timer: timer.update(time) }));
    states = states.filter(({ timer }) => !timer.hasExpired());
    return this;
  },
});

export { States };
