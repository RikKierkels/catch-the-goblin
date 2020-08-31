import { FunctionalMixin } from "../utils/utils.js";

function required(name) {
  throw new Error(`Forgot to override the actor base function: ${name}`);
}

const Actor = FunctionalMixin({
  update() {
    required("update");
  },
  hit() {
    required("hit");
  },
  wound() {
    required("wound");
  },
  draw() {
    required("draw");
  },
  destroy() {
    required("destroy");
  },
});

export default Actor;
