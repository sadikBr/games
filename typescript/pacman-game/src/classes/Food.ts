import { FOOD_SIZE } from '../constants';

export default class Food {
  position: { x: number; y: number };
  context: CanvasRenderingContext2D;

  constructor(
    context: CanvasRenderingContext2D,
    position: { x: number; y: number }
  ) {
    this.position = position;
    this.context = context;
  }

  draw() {
    this.context.fillStyle = 'yellow';
    this.context.fillRect(
      this.position.x - FOOD_SIZE / 2,
      this.position.y - FOOD_SIZE / 2,
      FOOD_SIZE,
      FOOD_SIZE
    );
  }
}
