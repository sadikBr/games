const BOARD_COLS = 20;
const BOARD_ROWS = 13;
const NUMBER_TO_CONNECT = 4;
const potentialClasses = {
  1: 'red',
  2: 'yellow',
};

export default class Board {
  constructor(boardElement) {
    this.boardElement = boardElement;
    this.boardElement.style.setProperty('--grid-cols', BOARD_COLS);
    this.boardElement.style.setProperty('--grid-rows', BOARD_ROWS);
    this.board = this.createBoard();
  }

  createBoard() {
    const board = [];
    for (let j = 0; j < BOARD_COLS; j++) {
      const col = [];
      for (let i = 0; i < BOARD_ROWS; i++) {
        const cellElement = document.createElement('div');
        cellElement.classList.add('cell');
        const cell = new Cell(cellElement, j);

        col.push(cell);
      }
      board.push(col);
    }

    return board;
  }

  render() {
    this.boardElement.innerHTML = '';
    for (let j = 0; j < BOARD_ROWS; j++) {
      for (let i = 0; i < BOARD_COLS; i++) {
        const cell = this.board[i][j];
        if (cell.state !== 0) {
          cell.cellElement.classList.add(potentialClasses[cell.state]);
        }
        this.boardElement.appendChild(cell.cellElement);
      }
    }
  }

  reset() {
    this.board.forEach((col) => {
      col.forEach((cell) => {
        cell.cellElement.classList.remove('red');
        cell.cellElement.classList.remove('yellow');
        cell.setState(0);
      });
    });
    this.render();
  }

  addEventListeners(listener, handler) {
    this.board.forEach((col) => {
      col.forEach((cell) => {
        cell.cellElement.addEventListener(listener, () => handler(cell));
      });
    });
  }

  getFreeCell(col) {
    const column = this.board[col];
    for (let i = column.length - 1; i >= 0; i--) {
      const cell = column[i];
      if (cell.state === 0) {
        return cell;
      }
    }
  }

  isThereWinner() {
    //Check horizontally
    for (let r = 0; r < BOARD_ROWS; r++) {
      for (let c = 0; c < BOARD_COLS - NUMBER_TO_CONNECT - 1; c++) {
        const cell = this.board[c][r];
        if (cell.state !== 0) {
          let winner = true;
          for (let i = 0; i < NUMBER_TO_CONNECT - 1; i++) {
            if (
              this.board[c + i][r].state !== this.board[c + (i + 1)][r].state
            ) {
              winner = false;
            }
          }
          if (winner) return true;
        }
      }
    }
    //Check vertically
    for (let c = 0; c < BOARD_COLS; c++) {
      for (let r = 0; r < BOARD_ROWS - (NUMBER_TO_CONNECT - 1); r++) {
        const cell = this.board[c][r];
        if (cell.state !== 0) {
          let winner = true;
          for (let i = 0; i < NUMBER_TO_CONNECT - 1; i++) {
            if (
              this.board[c][r + i].state !== this.board[c][r + (i + 1)].state
            ) {
              winner = false;
            }
          }
          if (winner) return true;
        }
      }
    }
    //Check diagonally
    for (let c = 0; c < BOARD_COLS - (NUMBER_TO_CONNECT - 1); c++) {
      for (let r = 0; r < BOARD_ROWS - (NUMBER_TO_CONNECT - 1); r++) {
        const cell = this.board[c][r];
        if (cell.state !== 0) {
          let winner = true;
          for (let i = 0; i < NUMBER_TO_CONNECT - 1; i++) {
            if (
              this.board[c + i][r + i].state !==
              this.board[c + (i + 1)][r + (i + 1)].state
            ) {
              winner = false;
            }
          }
          if (winner) return true;
        }
      }
    }
    //Check antidiagonally
    for (let r = NUMBER_TO_CONNECT - 1; r < BOARD_ROWS; r++) {
      for (let c = 0; c < BOARD_COLS - (NUMBER_TO_CONNECT - 1); c++) {
        const cell = this.board[c][r];
        if (cell.state !== 0) {
          let winner = true;
          for (let i = 0; i < NUMBER_TO_CONNECT - 1; i++) {
            if (
              this.board[c + i][r - i].state !==
              this.board[c + (i + 1)][r - (i + 1)].state
            ) {
              winner = false;
            }
          }
          if (winner) return true;
        }
      }
    }
  }
}

class Cell {
  constructor(cellElement, col) {
    this.cellElement = cellElement;
    this.state = 0;
    this.col = col;
  }

  setState(val) {
    this.state = val;
  }
}
