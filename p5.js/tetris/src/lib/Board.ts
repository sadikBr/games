import type p5 from "p5";
import {
  cellSize,
  colors,
  cols,
  rows,
  TetrominoEnum,
  canvasWidth,
  canvasHeight,
} from "../globals";
import type { Tetromino } from "./Tetromino";
import { TetrominosManager } from "./TetrominosManager";

export class Board {
  private cells: (TetrominoEnum | null)[][];
  private currentTetromino: Tetromino | null;
  private nextTetromino: Tetromino | null;
  private p5: p5;
  private gameOver: boolean;
  private paused: boolean;
  private score: number;
  private level: number;
  private linesCleared: number;
  private lastTime: number;
  private keysPressed: Set<string>;
  private lastInputTimes: Map<string, number>;
  private gameStarted: boolean;

  constructor(p: p5) {
    this.p5 = p;
    this.cells = Array.from({ length: rows }, () => Array(cols).fill(null));
    this.gameOver = false;
    this.paused = false;
    this.score = 0;
    this.level = 1;
    this.linesCleared = 0;
    this.lastTime = Date.now();
    this.keysPressed = new Set();
    this.lastInputTimes = new Map();
    this.gameStarted = false;
    this.currentTetromino = TetrominosManager.getRandomTetromino(this.level);
    this.nextTetromino = TetrominosManager.getRandomTetromino(this.level);

    // Set up key event listeners
    this.setupKeyListeners();
    this.createButtons();
  }

  private setupKeyListeners() {
    document.addEventListener("keydown", (e) => {
      this.keysPressed.add(e.code);

      // Pause game when P is pressed
      if (e.code === "KeyP") {
        this.togglePause();
      }
    });

    document.addEventListener("keyup", (e) => {
      this.keysPressed.delete(e.code);
    });
  }

  private createButtons() {
    // Create pause button
    const pauseButton = document.createElement("button");
    pauseButton.innerText = "Pause";
    pauseButton.classList.add("game-button");
    pauseButton.style.top = "10px";
    pauseButton.style.right = "10px";
    pauseButton.addEventListener("click", () => this.togglePause());
    document.body.appendChild(pauseButton);

    // Create restart button
    const restartButton = document.createElement("button");
    restartButton.innerText = "Restart";
    restartButton.classList.add("game-button");
    restartButton.style.top = "10px";
    restartButton.style.right = "100px";
    restartButton.addEventListener("click", () => this.restart());
    document.body.appendChild(restartButton);
  }

  public togglePause() {
    this.paused = !this.paused;
  }

  update() {
    if (this.gameOver || this.paused) return;
    if (!this.currentTetromino) {
      this.spawnNewTetromino();
      return;
    }

    // Mark game as started once the first update cycle occurs
    if (!this.gameStarted) {
      this.gameStarted = true;
    }

    const currentTime = Date.now();
    const deltaTime = currentTime - this.lastTime;
    this.lastTime = currentTime;

    this.handleInput();

    // Update tetromino (handles automatic falling)
    const updateResult = this.currentTetromino.update(deltaTime, this.level);

    if (updateResult.shouldMove) {
      if (!this.moveTetromino(updateResult.direction)) {
        // Make sure the piece is in a valid position before placing
        if (
          this.isValidPosition(
            this.currentTetromino,
            this.currentTetromino.position,
          )
        ) {
          // Piece couldn't move down, so it's landed
          this.placeTetromino();
          this.clearLines();
          this.spawnNewTetromino();
        }
      }
    }
  }

  private handleInput() {
    if (!this.currentTetromino || this.gameOver) return;

    // Add a cooldown system to prevent rapid input processing
    const currentTime = Date.now();
    const inputCooldown = 100; // milliseconds

    // Store last input times for each key
    if (!this.lastInputTimes) {
      this.lastInputTimes = new Map();
    }

    // Handle movement input with proper timing
    if (this.keysPressed.has("ArrowLeft")) {
      const lastTime = this.lastInputTimes.get("ArrowLeft") || 0;
      if (currentTime - lastTime > inputCooldown) {
        this.moveTetromino({ x: -1, y: 0 });
        this.lastInputTimes.set("ArrowLeft", currentTime);
      }
    }

    if (this.keysPressed.has("ArrowRight")) {
      const lastTime = this.lastInputTimes.get("ArrowRight") || 0;
      if (currentTime - lastTime > inputCooldown) {
        this.moveTetromino({ x: 1, y: 0 });
        this.lastInputTimes.set("ArrowRight", currentTime);
      }
    }

    if (this.keysPressed.has("ArrowDown")) {
      const lastTime = this.lastInputTimes.get("ArrowDown") || 0;
      if (currentTime - lastTime > inputCooldown) {
        if (this.moveTetromino({ x: 0, y: 1 })) {
          this.score += 1; // Bonus points for soft drop
        }
        this.lastInputTimes.set("ArrowDown", currentTime);
      }
    }

    if (this.keysPressed.has("ArrowUp")) {
      const lastTime = this.lastInputTimes.get("ArrowUp") || 0;
      if (currentTime - lastTime > 200) {
        // Longer cooldown for rotation
        this.rotateTetromino();
        this.lastInputTimes.set("ArrowUp", currentTime);
      }
    }

    if (this.keysPressed.has("Space")) {
      const lastTime = this.lastInputTimes.get("Space") || 0;
      if (currentTime - lastTime > 300) {
        // Even longer cooldown for hard drop
        this.hardDrop();
        this.lastInputTimes.set("Space", currentTime);
      }
    }
  }

  private moveTetromino(direction: { x: number; y: number }): boolean {
    if (!this.currentTetromino) return false;

    const newPosition = {
      x: this.currentTetromino.position.x + direction.x,
      y: this.currentTetromino.position.y + direction.y,
    };

    if (this.isValidPosition(this.currentTetromino, newPosition)) {
      this.currentTetromino.position = newPosition;
      return true;
    }

    return false;
  }

  private rotateTetromino() {
    if (!this.currentTetromino) return;

    if (this.currentTetromino.canRotate(this.cells)) {
      this.currentTetromino.rotate();
    }
  }

  private hardDrop() {
    if (!this.currentTetromino || !this.gameStarted) return;

    // Make sure the game has actually started
    if (!this.gameStarted) {
      this.gameStarted = true;
      return;
    }

    // Only proceed if the piece is in a valid position
    if (
      !this.isValidPosition(
        this.currentTetromino,
        this.currentTetromino.position,
      )
    ) {
      return;
    }

    let dropDistance = 0;
    let prevPosition = { ...this.currentTetromino.position };

    // Move the tetromino down until it can't move anymore
    while (this.moveTetromino({ x: 0, y: 1 })) {
      dropDistance++;
      prevPosition = { ...this.currentTetromino.position };
    }

    // Safety check: ensure we have a valid position
    if (
      !this.isValidPosition(
        this.currentTetromino,
        this.currentTetromino.position,
      )
    ) {
      // Revert to last valid position if current position is invalid
      this.currentTetromino.position = prevPosition;
    }

    // Only place the tetromino if it's in a valid position
    if (
      this.isValidPosition(
        this.currentTetromino,
        this.currentTetromino.position,
      )
    ) {
      this.score += dropDistance * 2; // Bonus points for hard drop
      this.placeTetromino();
      this.clearLines();
      this.spawnNewTetromino();
    }
  }

  private isValidPosition(
    tetromino: Tetromino,
    position: { x: number; y: number },
  ): boolean {
    const shape = tetromino.getShape();

    for (let y = 0; y < shape.length; y++) {
      for (let x = 0; x < shape[0].length; x++) {
        if (shape[y][x] === 1) {
          const boardX = position.x + x;
          const boardY = position.y + y;

          // Check bounds
          if (boardX < 0 || boardX >= cols || boardY >= rows) {
            return false;
          }

          // Check collision with existing pieces (allow negative y for spawning)
          // Make sure boardY is within the valid array bounds
          if (
            boardY >= 0 &&
            boardY < rows &&
            this.cells[boardY][boardX] !== null
          ) {
            return false;
          }
        }
      }
    }

    return true;
  }

  private placeTetromino() {
    if (!this.currentTetromino) return;

    // First check if the piece is in a valid position to be placed
    if (
      !this.isValidPosition(
        this.currentTetromino,
        this.currentTetromino.position,
      )
    ) {
      return;
    }

    const filledCells = this.currentTetromino.getFilledCells();

    // Make sure we have valid cells to place
    if (filledCells.length === 0) {
      return;
    }

    for (const cell of filledCells) {
      if (cell.y >= 0 && cell.y < rows && cell.x >= 0 && cell.x < cols) {
        this.cells[cell.y][cell.x] = this.currentTetromino.type;
      }
    }
  }

  private clearLines() {
    let linesCleared = 0;

    for (let y = rows - 1; y >= 0; y--) {
      if (this.cells[y].every((cell) => cell !== null)) {
        // Remove the completed line
        this.cells.splice(y, 1);
        // Add new empty line at the top
        this.cells.unshift(Array(cols).fill(null));
        linesCleared++;
        y++; // Check the same row again since we shifted everything down
      }
    }

    if (linesCleared > 0) {
      this.linesCleared += linesCleared;
      this.updateScore(linesCleared);
      this.updateLevel();
    }
  }

  private updateScore(linesCleared: number) {
    const basePoints = [0, 40, 100, 300, 1200];
    this.score += basePoints[linesCleared] * this.level;
  }

  private updateLevel() {
    this.level = Math.floor(this.linesCleared / 10) + 1;
  }

  private spawnNewTetromino() {
    // Current tetromino becomes the next one
    this.currentTetromino = this.nextTetromino;

    // Generate a new next tetromino
    this.nextTetromino = TetrominosManager.getRandomTetromino(this.level);

    // Check if the new tetromino can be placed at its starting position
    if (
      !this.isValidPosition(
        this.currentTetromino as Tetromino,
        this.currentTetromino!.position,
      )
    ) {
      // If we can't place it, try to move it up one cell to give the player a chance
      const adjustedPosition = {
        x: this.currentTetromino!.position.x,
        y: this.currentTetromino!.position.y - 1,
      };

      if (
        !this.isValidPosition(
          this.currentTetromino as Tetromino,
          adjustedPosition,
        )
      ) {
        // If we still can't place it, the game is over
        this.gameOver = true;
      } else {
        // We can place it after moving it up one space
        this.currentTetromino!.position = adjustedPosition;
      }
    }
  }

  private drawUI() {
    // Draw UI panel background
    const uiX = cols * cellSize + 10;
    this.p5.fill(30);
    this.p5.noStroke();
    this.p5.rect(uiX - 10, 0, 200, canvasHeight);

    // Draw UI text
    this.p5.fill(255);
    this.p5.textAlign(this.p5.LEFT);
    this.p5.textSize(18);
    this.p5.textStyle(this.p5.BOLD);
    this.p5.text("TETRIS", uiX, 30);

    this.p5.textSize(16);
    this.p5.textStyle(this.p5.NORMAL);
    this.p5.text(`Score: ${this.score}`, uiX, 70);
    this.p5.text(`Level: ${this.level}`, uiX, 100);
    this.p5.text(`Lines: ${this.linesCleared}`, uiX, 130);

    // Draw next piece preview
    this.p5.textStyle(this.p5.BOLD);
    this.p5.text("NEXT PIECE", uiX, 180);
    this.drawNextPiece(uiX + 20, 200);

    // Draw controls info
    this.p5.textSize(12);
    this.p5.textStyle(this.p5.NORMAL);
    this.p5.text("CONTROLS:", uiX, canvasHeight - 120);
    this.p5.text("← → : Move", uiX, canvasHeight - 100);
    this.p5.text("↑ : Rotate", uiX, canvasHeight - 80);
    this.p5.text("↓ : Soft Drop", uiX, canvasHeight - 60);
    this.p5.text("Space : Hard Drop", uiX, canvasHeight - 40);
    this.p5.text("P : Pause", uiX, canvasHeight - 20);

    // Show paused text
    if (this.paused && !this.gameOver) {
      this.p5.fill(255, 255, 0);
      this.p5.textAlign(this.p5.CENTER);
      this.p5.textSize(32);
      this.p5.text("PAUSED", canvasWidth / 2, canvasHeight / 2);
    }

    // Show game over text
    if (this.gameOver) {
      this.p5.fill(255, 0, 0);
      this.p5.textAlign(this.p5.CENTER);
      this.p5.textSize(32);
      this.p5.text("GAME OVER", canvasWidth / 2, canvasHeight / 2);
      this.p5.textSize(16);
      this.p5.text(
        "Press R to restart",
        canvasWidth / 2,
        canvasHeight / 2 + 40,
      );
    }
  }

  private drawNextPiece(x: number, y: number) {
    if (!this.nextTetromino) return;

    const shape = this.nextTetromino.getShape();
    const previewSize = cellSize * 0.8;

    // Center the preview based on shape dimensions
    const pieceWidth = shape[0].length * previewSize;
    const centerX = x + (4 * previewSize - pieceWidth) / 2;

    for (let row = 0; row < shape.length; row++) {
      for (let col = 0; col < shape[0].length; col++) {
        if (shape[row][col] === 1) {
          this.p5.fill(colors[this.nextTetromino.type]);
          this.p5.stroke(255);
          this.p5.strokeWeight(1);
          this.p5.rect(
            centerX + col * previewSize,
            y + row * previewSize,
            previewSize,
            previewSize,
          );
        }
      }
    }
  }

  draw() {
    this.p5.background(0);

    // Draw the grid
    for (let row = 0; row < rows; row++) {
      for (let col = 0; col < cols; col++) {
        const cell = this.cells[row][col];

        if (cell !== null) {
          this.p5.fill(colors[cell]);
        } else {
          this.p5.fill(20);
        }

        this.p5.stroke(60);
        this.p5.strokeWeight(1);
        this.p5.rect(col * cellSize, row * cellSize, cellSize, cellSize);
      }
    }

    // Draw current tetromino
    if (this.currentTetromino && !this.gameOver && !this.paused) {
      this.currentTetromino.draw(this.p5);
    }

    // Draw UI
    this.drawUI();

    // Draw overlay for paused game
    if (this.paused && !this.gameOver) {
      this.p5.fill(0, 0, 0, 150);
      this.p5.noStroke();
      this.p5.rect(0, 0, cols * cellSize, rows * cellSize);
    }
  }

  isGameOver(): boolean {
    return this.gameOver;
  }

  getScore(): number {
    return this.score;
  }

  restart() {
    this.cells = Array.from({ length: rows }, () => Array(cols).fill(null));
    this.gameOver = false;
    this.paused = false;
    this.score = 0;
    this.level = 1;
    this.linesCleared = 0;
    this.lastTime = Date.now();
    this.lastInputTimes = new Map();
    this.gameStarted = false;
    this.currentTetromino = TetrominosManager.getRandomTetromino(this.level);
    this.nextTetromino = TetrominosManager.getRandomTetromino(this.level);

    // Clear any keys that might be pressed
    this.keysPressed.clear();
  }
}
