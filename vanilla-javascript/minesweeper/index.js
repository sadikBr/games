import Board from './Board.js';

const boardElement = document.getElementById('game-board');
const gameOverElement = document.getElementById('game-over');
const resetBtn = document.getElementById('reset-button');
let gameOver = false;

let board = new Board(boardElement);

board.addEventListeners('click', handleClick);

function handleClick(cell) {
  if (gameOver || cell.revealed) return;
  if (cell.bomb) {
    gameOver = true;
    board.showAllBombs();
    return (gameOverElement.style.display = 'flex');
  }
  cell.reveal();
}

resetBtn.addEventListener('click', () => {
  gameOver = false;
  gameOverElement.style.display = 'none';
  boardElement.innerHTML = '';
  board = new Board(boardElement);
  board.addEventListeners('click', handleClick);
});
