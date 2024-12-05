import { CELL_SIZE, GRID_COLS, GRID_ROWS } from '../constants';
import Grid from './Grid';
import Player from './Player';

export default class Game {
  context: CanvasRenderingContext2D;
  grid: Grid;
  canvas: HTMLCanvasElement;
  player: Player;
  lastTime: number;
  fpsInterval: number;
  score: number;

  constructor() {
    this.canvas = document.getElementById('game') as HTMLCanvasElement;
    setCanvasDimensions(this.canvas);
    this.context = this.canvas.getContext('2d') as CanvasRenderingContext2D;
    this.grid = new Grid(this.context);
    this.player = new Player(this.context, {
      x: 9,
      y: 9,
    });
    this.lastTime = 0;
    this.fpsInterval = 1000 / 30;
    this.score = 0;

    addEventListener('keydown', (event: KeyboardEvent) => {
      console.log(this);
      switch (event.key) {
        case 'ArrowUp':
          this.player.heading = 1.5 * Math.PI;
          this.player.move({ x: 0, y: -1 }, this.grid.grid, this.score);
          break;
        case 'ArrowDown':
          this.player.heading = 0.5 * Math.PI;
          this.player.move({ x: 0, y: 1 }, this.grid.grid, this.score);
          break;
        case 'ArrowRight':
          this.player.heading = 0;
          this.player.move({ x: 1, y: 0 }, this.grid.grid, this.score);
          break;
        case 'ArrowLeft':
          this.player.heading = Math.PI;
          this.player.move({ x: -1, y: 0 }, this.grid.grid, this.score);
          break;
      }
    });
  }

  start() {
    this.draw(0);
    this.player.eatFood(this.grid.grid, this.score);
  }

  draw(time: number) {
    const deltaTime = time - this.lastTime;
    this.context.fillStyle = 'black';
    this.context.fillRect(0, 0, this.canvas.width, this.canvas.height);
    this.grid.draw();

    if (deltaTime >= this.fpsInterval) {
      this.lastTime = time - (deltaTime % this.fpsInterval);
      this.player.startAngle -=
        this.player.direction * this.player.angleDelta * Math.PI;
      this.player.endAngle +=
        this.player.direction * this.player.angleDelta * Math.PI;
      if (
        this.player.startAngle <= 0.005 * Math.PI ||
        this.player.endAngle >= 1.97 * Math.PI ||
        this.player.startAngle >= 0.2 * Math.PI ||
        this.player.endAngle <= 1.8 * Math.PI
      ) {
        this.player.direction *= -1;
      }
    }

    this.player.draw();

    requestAnimationFrame((time) => this.draw(time));
  }
}

function setCanvasDimensions(canvas: HTMLCanvasElement) {
  canvas.width = CELL_SIZE * GRID_COLS;
  canvas.height = CELL_SIZE * GRID_ROWS;
}
