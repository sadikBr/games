export const cellSize = Math.min(window.innerWidth, window.innerHeight) / 20;

export const rows = 20;
export const cols = 10;

export const canvasWidth = cellSize * cols + 200; // Extra space for UI
export const canvasHeight = cellSize * rows;

export enum TetrominoEnum {
  I,
  J,
  L,
  O,
  S,
  T,
  Z,
}

export const tetrominos = {
  [TetrominoEnum.I]: [
    [[1, 1, 1, 1]],
    [[1], [1], [1], [1]],
    [[1, 1, 1, 1]],
    [[1], [1], [1], [1]],
  ],
  [TetrominoEnum.J]: [
    [
      [1, 1, 1],
      [0, 0, 1],
    ],
    [
      [0, 1],
      [0, 1],
      [1, 1],
    ],
    [
      [1, 0, 0],
      [1, 1, 1],
    ],
    [
      [1, 1],
      [1, 0],
      [1, 0],
    ],
  ],
  [TetrominoEnum.L]: [
    [
      [1, 1, 1],
      [1, 0, 0],
    ],
    [
      [1, 1],
      [0, 1],
      [0, 1],
    ],
    [
      [0, 0, 1],
      [1, 1, 1],
    ],
    [
      [1, 0],
      [1, 0],
      [1, 1],
    ],
  ],
  [TetrominoEnum.O]: [
    [
      [1, 1],
      [1, 1],
    ],
  ],
  [TetrominoEnum.S]: [
    [
      [0, 1, 1],
      [1, 1, 0],
    ],
    [
      [1, 0],
      [1, 1],
      [0, 1],
    ],
    [
      [0, 1, 1],
      [1, 1, 0],
    ],
    [
      [1, 0],
      [1, 1],
      [0, 1],
    ],
  ],
  [TetrominoEnum.T]: [
    [
      [1, 1, 1],
      [0, 1, 0],
    ],
    [
      [0, 1],
      [1, 1],
      [0, 1],
    ],
    [
      [0, 1, 0],
      [1, 1, 1],
    ],
    [
      [1, 0],
      [1, 1],
      [1, 0],
    ],
  ],
  [TetrominoEnum.Z]: [
    [
      [1, 1, 0],
      [0, 1, 1],
    ],
    [
      [0, 1],
      [1, 1],
      [1, 0],
    ],
    [
      [1, 1, 0],
      [0, 1, 1],
    ],
    [
      [0, 1],
      [1, 1],
      [1, 0],
    ],
  ],
};

export const startPositions = {
  [TetrominoEnum.I]: { x: Math.floor(cols / 2) - 2, y: 0 },
  [TetrominoEnum.J]: { x: Math.floor(cols / 2) - 1, y: 0 },
  [TetrominoEnum.L]: { x: Math.floor(cols / 2) - 1, y: 0 },
  [TetrominoEnum.O]: { x: Math.floor(cols / 2) - 1, y: 0 },
  [TetrominoEnum.S]: { x: Math.floor(cols / 2) - 1, y: 0 },
  [TetrominoEnum.T]: { x: Math.floor(cols / 2) - 1, y: 0 },
  [TetrominoEnum.Z]: { x: Math.floor(cols / 2) - 1, y: 0 },
};

export const colors = {
  [TetrominoEnum.I]: "#00FFFF",
  [TetrominoEnum.J]: "#0000FF",
  [TetrominoEnum.L]: "#FFA500",
  [TetrominoEnum.O]: "#FFFF00",
  [TetrominoEnum.S]: "#00FF00",
  [TetrominoEnum.T]: "#800080",
  [TetrominoEnum.Z]: "#FF0000",
};
