import Board from './Game.js';

const boardElement = document.getElementById('game-board');
const resetBtn = document.getElementById('reset-btn');
const winScreen = document.getElementById('win-screen');
const winnerElement = document.getElementById('winner');
const players = [1, 2];
let currentPlayerIndex = 0;
let gameOver = false;

const board = new Board(boardElement);
board.render();

board.addEventListeners('click', handleClick);

function handleClick(cell) {
  if (gameOver) return;
  const column = cell.col;
  const availableCell = board.getFreeCell(column);
  if (availableCell) {
    availableCell.setState(players[currentPlayerIndex]);
    currentPlayerIndex = (currentPlayerIndex + 1) % 2;
    board.render();
  } else {
    console.log('There is no place to play here');
  }

  //Check for winner
  if (board.isThereWinner()) {
    gameOver = true;
    winScreen.style.display = 'flex';
    if (currentPlayerIndex == 0) {
      winnerElement.textContent = 'Yellow';
    } else {
      winnerElement.textContent = 'Red';
    }
  }
}

resetBtn.addEventListener('click', () => {
  winScreen.style.display = 'none';
  gameOver = false;
  currentPlayerIndex = 0;
  board.reset();
});
