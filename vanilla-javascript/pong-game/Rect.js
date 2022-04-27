export default class Rect {
  constructor(position, width, height) {
    this.position = position;
    this.width = width;
    this.height = height;
  }

  draw(context) {
    context.fillStyle = 'white';
    context.fillRect(
      this.position.x - this.width / 2,
      this.position.y - this.height / 2,
      this.width,
      this.height
    );
  }

  get top() {
    return this.position.y - this.height / 2;
  }

  get bottom() {
    return this.position.y - this.height / 2 + this.height;
  }

  get left() {
    return this.position.x - this.width / 2;
  }

  get right() {
    return this.position.x - this.width / 2 + this.width;
  }
}
