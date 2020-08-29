const MAX_FRAME_STEP_MS = 100;
const TOTAL_MS_IN_SEC = 1000;

const runFrame = (frameFunction) => {
  let lastTime = null;

  const frame = async (time) => {
    if (lastTime) {
      const elapsedTime = Math.min(time - lastTime, MAX_FRAME_STEP_MS) / TOTAL_MS_IN_SEC;
      const isRequestingNextFrame = await frameFunction(elapsedTime);
      if (!isRequestingNextFrame) return;
    }

    lastTime = time;
    requestAnimationFrame(frame);
  };

  requestAnimationFrame(frame);
};

export { runFrame };
