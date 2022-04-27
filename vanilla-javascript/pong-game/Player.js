import Rect from './Rect.js';
import Ball from './Ball.js';

export default class Player extends Rect {
  constructor(position, width, height) {
    super(position, width, height);
  }

  update(context, target) {
    this.draw(context);
    if (target instanceof Ball) {
      this.position.y = target.position.y;
    } else {
      this.position.y = target.y;
    }
  }

  checkCollision(ball) {
    if (
      ball.right >= this.left &&
      ball.top < this.bottom &&
      ball.bottom > this.top &&
      ball.left <= this.right
    )
      ball.vel.set(ball.vel.x * -1.05, ball.vel.y * 1.05);
  }
}
