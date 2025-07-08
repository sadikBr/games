import { TetrominoEnum, startPositions } from "../globals";
import { Tetromino } from "./Tetromino";

export class TetrominosManager {
  public static getRandomTetromino(level: number = 1): Tetromino {
    const tetrominoTypes = Object.values(TetrominoEnum).filter(
      (value) => typeof value === "number",
    ) as TetrominoEnum[];

    const randomType =
      tetrominoTypes[Math.floor(Math.random() * tetrominoTypes.length)];
    const tetromino = new Tetromino(randomType, level);

    // Set the correct starting position
    const startPos = startPositions[randomType];
    tetromino.position = { x: startPos.x, y: startPos.y };

    return tetromino;
  }
}
