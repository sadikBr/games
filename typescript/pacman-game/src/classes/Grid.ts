import { CELL_SIZE, GRID } from '../constants';
import Cell from './Cell';
import Food from './Food';

export default class Grid {
  grid: Cell[][];
  context: CanvasRenderingContext2D;
  food: Food[];

  constructor(context: CanvasRenderingContext2D) {
    this.grid = GRID.map((row, rowIndex) => {
      return row.map((cell, cellIndex) => {
        return cell === 1
          ? new Cell({ x: cellIndex, y: rowIndex }, true, false)
          : new Cell({ x: cellIndex, y: rowIndex }, false, true);
      });
    });
    this.context = context;
    this.food = [];
  }

  draw() {
    this.grid.forEach((row) => {
      row.forEach((cell) => {
        this.context.fillStyle = cell.isWall ? 'blue' : 'black';
        this.context.fillRect(
          cell.position.x * CELL_SIZE,
          cell.position.y * CELL_SIZE,
          CELL_SIZE,
          CELL_SIZE
        );
        if (cell.hasFood) {
          const food = new Food(this.context, {
            x: cell.position.x * CELL_SIZE + CELL_SIZE / 2,
            y: cell.position.y * CELL_SIZE + CELL_SIZE / 2,
          });
          food.draw();
          this.food.push(food);
        }
      });
    });
  }
}
