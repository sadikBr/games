import { COLS, ROWS } from "../constants";

export default class Cell {
  context: CanvasRenderingContext2D;
  position: { x: number, y: number };
  width: number;
  height: number;
  alive: boolean;
  neighbours: number;

  constructor(context: CanvasRenderingContext2D, position: { x: number; y: number }, width: number, height: number) {
    this.context = context;
    this.position = position;
    this.width = width;
    this.height = height;
    this.alive = Math.random() < 0.3;
    this.neighbours = 0;
  }

  draw() {
    this.context.fillStyle = this.alive ? "white" : "black";
    this.context.strokeStyle = this.alive ? "white" : "black";
    this.context.fillRect(this.position.x * this.width, this.position.y * this.height, this.width, this.height);
    this.context.strokeRect(this.position.x * this.width, this.position.y * this.height, this.width, this.height);
  }

  calculateNeighbours(grid: Cell[][]) {
    const { x, y } = this.position;
    const neighbours = [
      { i: x - 1, j: y },
      { i: x + 1, j: y },
      { i: x, j: y + 1 },
      { i: x, j: y - 1 },
      { i: x - 1, j: y - 1 },
      { i: x - 1, j: y + 1 },
      { i: x + 1, j: y + 1 },
      { i: x + 1, j: y - 1 },
    ]

    const filteredNeighbours = neighbours.filter((item) => {
      if (item.i < 0 || item.i >= COLS || item.j < 0 || item.j >= ROWS) {
        return false;
      }
      return true;
    });

    const aliveCells = filteredNeighbours.filter(item => grid[item.i][item.j].alive);

    this.neighbours = aliveCells.length;
  }

  setAlive(alive: boolean) {
    this.alive = alive;
  }
}
