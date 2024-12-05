import { CELL_SIZE, EYE_POSITION, GRID_ROWS } from '../constants';
import Cell from './Cell';

export default class Player {
  position: { x: number; y: number };
  context: CanvasRenderingContext2D;
  radius: number;
  startAngle: number;
  endAngle: number;
  direction: number;
  angleDelta: number;
  heading: number;

  constructor(
    context: CanvasRenderingContext2D,
    position: { x: number; y: number }
  ) {
    this.position = position;
    this.context = context;
    this.startAngle = 0.2 * Math.PI;
    this.endAngle = 1.8 * Math.PI;
    this.radius = CELL_SIZE / 2 - 5;
    this.direction = 1;
    this.angleDelta = 0.02;
    this.heading = 0;
  }

  draw() {
    this.context.fillStyle = 'yellow';
    this.context.save();
    this.context.translate(
      this.position.x * CELL_SIZE + CELL_SIZE / 2,
      this.position.y * CELL_SIZE + CELL_SIZE / 2
    );
    this.context.rotate(this.heading);
    this.context.beginPath();
    this.context.arc(0, 0, this.radius, this.startAngle, this.endAngle);
    this.context.lineTo(0, 0);
    this.context.fill();
    this.context.closePath();
    this.context.beginPath();
    this.context.fillStyle = 'black';
    this.context.arc(
      EYE_POSITION[this.heading].x,
      EYE_POSITION[this.heading].y,
      this.radius * 0.1,
      0,
      Math.PI * 2
    );
    this.context.fill();
    this.context.stroke();
    this.context.closePath();
    this.context.restore();
  }

  move({ x, y }: { x: number; y: number }, grid: Cell[][], score: number) {
    let newX = this.position.x + x;
    let newY = this.position.y + y;

    if (newY < 0) {
      this.position.y = GRID_ROWS - 1;
      if (grid[this.position.y][newX].hasFood) this.eatFood(grid, score);
      return;
    }
    if (newY >= GRID_ROWS) {
      this.position.y = 0;
      if (grid[this.position.y][newX].hasFood) this.eatFood(grid, score);
      return;
    }
    if (grid[newY][newX].isWall) return;

    this.position.x = newX;
    this.position.y = newY;

    if (grid[newY][newX].hasFood) this.eatFood(grid, score);
  }

  eatFood(grid: Cell[][], score: number) {
    grid[this.position.y][this.position.x].hasFood = false;
    score += 10;
  }
}
