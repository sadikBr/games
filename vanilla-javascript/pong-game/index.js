import { Vec2 } from './math.js';
import Player from './Player.js';
import Ball from './Ball.js';

const canvas = document.getElementById('canvas');
const context = canvas.getContext('2d');

// making the canvas full page size and resize it on page resize
canvas.width = innerWidth;
canvas.height = innerHeight;
addEventListener('resize', () => {
  canvas.width = innerWidth;
  canvas.height = innerHeight;
});

// Getting the mouse coordinates
const mouse = new Vec2(0, 0);
canvas.addEventListener('mousemove', ({ offsetX, offsetY }) => {
  mouse.set(offsetX, offsetY);
});

const ball = new Ball(5);
const ai = new Player(new Vec2(canvas.width - 20, canvas.height / 2), 20, 100);
const human = new Player(new Vec2(20, canvas.height / 2), 20, 100);

function update() {
  context.fillStyle = 'black';
  context.fillRect(0, 0, canvas.width, canvas.height);

  ball.update(context, new Vec2(canvas.width, canvas.height));
  ai.update(context, ball);
  ai.checkCollision(ball);
  human.update(context, mouse);
  human.checkCollision(ball);

  requestAnimationFrame(update);
}
update();
