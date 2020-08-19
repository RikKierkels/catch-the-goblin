const CanMove = {
  getCoordinates() {
    return { x: this.x, y: this.y };
  },
  setCoordinates(x, y) {
    this.x = x;
    this.y = y;
  },
  isCollidingWith() {},
};

export default CanMove;
