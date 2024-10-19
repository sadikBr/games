import { CELL_SIZE, GRID } from '../constants';
import Food from './Food';

export default class Grid {
  grid: number[][];
  context: CanvasRenderingContext2D;
  food: Food[];

  constructor(context: CanvasRenderingContext2D) {
    this.grid = GRID;
    this.context = context;
    this.food = [];
  }

  draw() {
    this.grid.forEach((row, rowIndex) => {
      row.forEach((cell, cellIndex) => {
        this.context.fillStyle = cell === 1 ? 'blue' : 'black';
        this.context.fillRect(
          cellIndex * CELL_SIZE,
          rowIndex * CELL_SIZE,
          CELL_SIZE,
          CELL_SIZE
        );

        if (cell === 0) {
          const food = new Food(this.context, {
            x: cellIndex * CELL_SIZE + CELL_SIZE / 2,
            y: rowIndex * CELL_SIZE + CELL_SIZE / 2,
          });
          food.draw();
          this.food.push(food);
        }
      });
    });
  }
}
