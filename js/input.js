const trackInput = (keys) => {
  let down = Object.create(null);

  const track = (event) => {
    if (!keys.includes(event.key)) return;

    down[event.key] = event.type === "keydown";
    event.preventDefault();
  };

  window.addEventListener("keydown", track);
  window.addEventListener("keyup", track);
  return down;
};

export default trackInput;
