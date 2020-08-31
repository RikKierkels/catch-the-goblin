import { FunctionalMixin } from "../utils/utils.js";
import Timer from "../utils/timer.js";

const hasSameTypeAs = (type) => (state) => state.type === type;

const HasStates = (states = []) =>
  FunctionalMixin({
    hasState: (type) => states.some(hasSameTypeAs(type)),
    addState(type, time) {
      if (this.hasState(type)) return;

      states = [...states, { type, timer: Timer(time) }];
      return this;
    },
    removeState(type) {
      states = states.filter(hasSameTypeAs(type));
      return this;
    },
    updateStates(time) {
      states = states.map(({ type, timer }) => ({ type, timer: timer.update(time) }));
      states = states.filter(({ timer }) => !timer.hasExpired());
      console.log(states);
      return this;
    },
  });

export default HasStates;
