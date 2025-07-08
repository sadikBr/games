import type p5 from "p5";
import {
  cellSize,
  colors,
  cols,
  rows,
  tetrominos,
  type TetrominoEnum,
} from "../globals";

export class Tetromino {
  type: TetrominoEnum;
  position: { x: number; y: number };
  rotationIndex: number;
  fallTimer: number;
  fallSpeed: number = 500; // Default value
  level: number;

  constructor(type: TetrominoEnum, level: number = 1) {
    this.type = type;
    this.position = { x: 0, y: 0 };
    this.rotationIndex = 0;
    this.fallTimer = 0;
    this.level = level;
    this.updateFallSpeed();
  }

  updateFallSpeed() {
    // Base speed is 500ms, decreases as level increases
    // Minimum fall speed is 50ms
    this.fallSpeed = Math.max(50, 500 - (this.level - 1) * 50);
  }

  update(deltaTime: number, level?: number) {
    // Update level and fall speed if level has changed
    if (level !== undefined && level !== this.level) {
      this.level = level;
      this.updateFallSpeed();
    }

    this.fallTimer += deltaTime;

    if (this.fallTimer >= this.fallSpeed) {
      this.fallTimer = 0;
      // Signal that the piece should try to move down
      return { shouldMove: true, direction: { x: 0, y: 1 } };
    }

    // No movement needed this update
    return { shouldMove: false, direction: { x: 0, y: 0 } };
  }

  getShape() {
    return tetrominos[this.type][this.rotationIndex];
  }

  getBounds() {
    const shape = this.getShape();
    const bounds = {
      left: this.position.x,
      right: this.position.x + shape[0].length - 1,
      top: this.position.y,
      bottom: this.position.y + shape.length - 1,
    };
    return bounds;
  }

  getFilledCells() {
    const shape = this.getShape();
    const filledCells: { x: number; y: number }[] = [];

    for (let y = 0; y < shape.length; y++) {
      for (let x = 0; x < shape[0].length; x++) {
        if (shape[y][x] === 1) {
          const cellX = this.position.x + x;
          const cellY = this.position.y + y;

          // Only add cells that are within the game board
          if (cellX >= 0 && cellX < cols && cellY >= 0 && cellY < rows) {
            filledCells.push({
              x: cellX,
              y: cellY,
            });
          }
        }
      }
    }

    return filledCells;
  }

  canRotate(board: (TetrominoEnum | null)[][]): boolean {
    const currentRotation = this.rotationIndex;
    const newRotation = (currentRotation + 1) % tetrominos[this.type].length;
    const newShape = tetrominos[this.type][newRotation];

    // Check if rotation would go out of bounds
    if (
      this.position.x + newShape[0].length > cols ||
      this.position.y + newShape.length > rows ||
      this.position.x < 0
    ) {
      return false;
    }

    // Check if rotation would collide with existing pieces
    for (let y = 0; y < newShape.length; y++) {
      for (let x = 0; x < newShape[0].length; x++) {
        if (newShape[y][x] === 1) {
          const boardX = this.position.x + x;
          const boardY = this.position.y + y;

          // Check board bounds before accessing the board array
          if (
            boardY >= 0 &&
            boardY < rows &&
            boardX >= 0 &&
            boardX < cols &&
            board[boardY][boardX] !== null
          ) {
            return false;
          }
        }
      }
    }

    return true;
  }

  rotate() {
    // Calculate new rotation index safely
    const nextIndex = (this.rotationIndex + 1) % tetrominos[this.type].length;

    // Ensure the rotation index is always valid
    if (nextIndex >= 0 && nextIndex < tetrominos[this.type].length) {
      this.rotationIndex = nextIndex;
    }
  }

  draw(p: p5) {
    const shape = this.getShape();

    for (let y = 0; y < shape.length; y++) {
      for (let x = 0; x < shape[0].length; x++) {
        if (shape[y][x] === 1) {
          const posX = this.position.x + x;
          const posY = this.position.y + y;

          p.fill(colors[this.type]);
          p.stroke(255);
          p.strokeWeight(1);
          p.rect(posX * cellSize, posY * cellSize, cellSize, cellSize);
        }
      }
    }
  }
}
