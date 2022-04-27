const BOARD_SIZE = 32;
const CELL_SIZE = 5;

export default class Board {
  constructor(boardElement) {
    this.boardElement = boardElement;
    boardElement.style.setProperty('--cell-size', CELL_SIZE);
    boardElement.style.setProperty('--grid-size', BOARD_SIZE);
    this.cells = generateBoardCells(boardElement);
    this.findNeighbours();
  }

  addEventListeners(listener, handler) {
    this.cells.forEach((row) => {
      row.forEach((cell) => {
        cell.cellElement.addEventListener(listener, () => handler(cell));
      });
    });
  }

  findNeighbours() {
    const N = this.cells.length - 1;
    for (let i = 0; i < BOARD_SIZE; i++) {
      for (let j = 0; j < BOARD_SIZE; j++) {
        const cell = this.cells[i][j];
        const neighbours = [];

        neighbours.push(
          i === 0 || j === 0 ? undefined : this.cells[i - 1][j - 1]
        );
        neighbours.push(i === 0 ? undefined : this.cells[i - 1][j]);
        neighbours.push(
          i === 0 || j === N ? undefined : this.cells[i - 1][j + 1]
        );
        neighbours.push(j === 0 ? undefined : this.cells[i][j - 1]);
        neighbours.push(j === N ? undefined : this.cells[i][j + 1]);
        neighbours.push(
          j === 0 || i === N ? undefined : this.cells[i + 1][j - 1]
        );
        neighbours.push(i === N ? undefined : this.cells[i + 1][j]);
        neighbours.push(
          i === N || j === N ? undefined : this.cells[i + 1][j + 1]
        );

        cell.neighbours = neighbours.filter((cell) => cell !== undefined);
      }
    }
  }

  showAllBombs() {
    this.cells.forEach((row) => {
      row.forEach((cell) => {
        if (cell.bomb) {
          cell.revealed = true;
          cell.cellElement.classList.remove('hidden');
          cell.cellElement.classList.add('bomb');
          cell.cellElement.textContent = '💣';
        }
      });
    });
  }
}

class Cell {
  constructor(cellElement, position) {
    this.cellElement = cellElement;
    this.position = position;
    this.revealed = false;
    this.Neighbours = [];
    if (Math.random() < 0.15) {
      this.bomb = true;
    }
  }

  reveal() {
    const numBombs = this.neighbours.filter((cell) => cell.bomb).length;
    this.revealed = true;
    this.cellElement.classList.remove('hidden');
    this.cellElement.classList.add('show');
    this.cellElement.classList.add(`s${numBombs}`);
    this.cellElement.textContent = numBombs === 0 ? '' : numBombs;
    if (numBombs == 0) {
      this.neighbours.forEach((neighbour) => {
        if (neighbour.revealed) return;
        return neighbour.reveal();
      });
    }
  }
}

function generateBoardCells(boardElement) {
  const cells = [];
  for (let i = 0; i < BOARD_SIZE; i++) {
    const cellsRow = [];
    for (let j = 0; j < BOARD_SIZE; j++) {
      const cell = document.createElement('div');
      cell.classList.add('cell');
      cell.classList.add('hidden');

      const position = [i, j];
      cellsRow.push(new Cell(cell, position));
      boardElement.appendChild(cell);
    }
    cells.push(cellsRow);
  }

  return cells;
}
