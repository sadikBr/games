import { COLS, ROWS } from "../constants.ts";
import Cell from "./Cell.ts";

export default class Grid {
  context: CanvasRenderingContext2D
  grid: Cell[][];
  width: number;
  height: number;

  constructor(context: CanvasRenderingContext2D, width: number, height: number) {
    this.context = context;
    this.width = width;
    this.height = height;
    this.grid = this.generateGrid();

    this.calculateNeighbours();
  }

  generateGrid() {
    return Array.from({ length: COLS }, (_, i) => {
      return Array.from({ length: ROWS }, (_, j) => {
        return new Cell(this.context, { x: i, y: j }, this.width / COLS, this.height / ROWS);
      });
    });
  }

  calculateNeighbours() {
    this.grid.forEach(row => {
      row.forEach(cell => {
        cell.calculateNeighbours(this.grid);
      })
    })
  }

  draw() {
    this.grid.forEach(row => {
      row.forEach(cell => {
        cell.draw();
      })
    })
  }

  update() {
    const newGrid = this.grid.map(row => {
      return row.map(cell => {
        const aliveNeighbours = cell.neighbours;
        // Act based on the number of the neighbours.
        if (cell.alive) {
          if (aliveNeighbours < 2) {
            cell.setAlive(false);
          } else if (aliveNeighbours === 2 || aliveNeighbours === 3) {
            cell.setAlive(true);
          } else {
            cell.setAlive(false);
          }
        } else {
          if (aliveNeighbours === 3) {
            cell.setAlive(true);
          }
        }

        return cell;
      });
    });
    this.grid = newGrid;
    this.calculateNeighbours();
  }
}
