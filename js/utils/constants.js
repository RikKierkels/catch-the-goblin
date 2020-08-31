export const ACTOR_TYPE = {
  HERO: "HERO",
  GOBLIN: "GOBLIN",
};

export const IMAGE = {
  BACKGROUND: "img/background.png",
  [ACTOR_TYPE.HERO]: "img/hero.png",
  [ACTOR_TYPE.GOBLIN]: "img/monster.png",
};

export const INPUT_KEY = {
  ARROW_UP: "ArrowUp",
  ARROW_RIGHT: "ArrowRight",
  ARROW_DOWN: "ArrowDown",
  ARROW_LEFT: "ArrowLeft",
  W: "w",
  A: "a",
  S: "s",
  D: "d",
};

export const WAVE_STATUS = {
  PLAYING: "playing",
  WON: "won",
  LOST: "lost",
};

export const STYLE = {
  RED_TRANSPARENT: "rgba(186, 51, 35, 0.6)",
};

export const ACTOR_STATE = {
  ATTACKING: 0,
  HURTING: 1,
  DEAD: 2,
};
