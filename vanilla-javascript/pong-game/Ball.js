import { Vec2 } from './math.js';

export default class Ball {
  constructor(module) {
    this.position = new Vec2(50, 50);
    this.module = module;
    this.vel = new Vec2(module, module);
    this.size = 10;
  }

  draw(context) {
    context.fillStyle = 'white';
    context.beginPath();
    context.arc(this.position.x, this.position.y, this.size, 0, 2 * Math.PI);
    context.fill();
  }

  update(context, bounds) {
    this.position.x += this.vel.x;
    this.position.y += this.vel.y;

    this.checkEdges(bounds);
    this.draw(context);
  }

  reset(bounds) {
    this.position.set(bounds.x / 2, bounds.y / 2);
    this.vel.set(
      (Math.random() < 0.5 ? -1 : 1) * this.module,
      (Math.random() < 0.5 ? -1 : 1) * this.module
    );
  }

  checkEdges(bounds) {
    if (
      this.position.x + this.size > bounds.x ||
      this.position.x - this.size < 0
    )
      this.reset(bounds);
    if (
      this.position.y + this.size > bounds.y ||
      this.position.y - this.size < 0
    )
      this.vel.y *= -1;
  }

  get top() {
    return this.position.y - this.size;
  }

  get bottom() {
    return this.position.y + this.size;
  }

  get right() {
    return this.position.x + this.size;
  }

  get left() {
    return this.position.x - this.size;
  }
}
