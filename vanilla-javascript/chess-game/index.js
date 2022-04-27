const gameBoard = document.getElementById('game-board');

createBoard(gameBoard);

function createBoard(gameBoard) {
  const boardCols = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];
  const initialGame = {
    a8: 'black_rook',
    b8: 'black_knight',
    c8: 'black_bishop',
    d8: 'black_queen',
    e8: 'black_king',
    f8: 'black_bishop',
    g8: 'black_knight',
    h8: 'black_rook',
    a7: 'black_pawn',
    b7: 'black_pawn',
    c7: 'black_pawn',
    d7: 'black_pawn',
    e7: 'black_pawn',
    f7: 'black_pawn',
    g7: 'black_pawn',
    h7: 'black_pawn',

    a1: 'white_rook',
    b1: 'white_knight',
    c1: 'white_bishop',
    d1: 'white_queen',
    e1: 'white_king',
    f1: 'white_bishop',
    g1: 'white_knight',
    h1: 'white_rook',
    a2: 'white_pawn',
    b2: 'white_pawn',
    c2: 'white_pawn',
    d2: 'white_pawn',
    e2: 'white_pawn',
    f2: 'white_pawn',
    g2: 'white_pawn',
    h2: 'white_pawn',
  };
  let classes = ['white-cell', 'black-cell'];
  let index = 0;

  for (let i = 8; i > 0; i--) {
    boardCols.forEach((col) => {
      const cell = document.createElement('div');
      const id = `${col}${i}`;
      cell.classList.add('cell', classes[index]);
      cell.id = id;
      index = (index + 1) % 2;

      if (id in initialGame) {
        const img = document.createElement('img');
        img.src = `./images/${initialGame[id]}.png`;
        img.setAttribute('position', id);
        cell.appendChild(img);

        img.addEventListener('click', handleClick, { once: true });
      }

      const val = document.createElement('span');
      val.classList.add('cell-val');
      val.textContent = id;

      cell.appendChild(val);
      gameBoard.appendChild(cell);
    });

    const [one, two] = classes;
    classes = [two, one];
  }
}

function handleClick(event) {
  const image = event.target;
  const position = image.getAttribute('position');
  const imagePath = image.src.split('/').pop();
  const pieceType = imagePath.split('.').shift();

  image.classList.add('selected');
  switch (pieceType) {
    case 'white_pawn':
      moveWhitePawn(image, position);
      break;
  }

  image.addEventListener('click', handleClick, { once: true });
}

function moveWhitePawn(imageElement, position) {
  let [col, row] = position.split('');
  let potentialCells = [];
  row = parseInt(row);

  if (imageElement.getAttribute('moved')) {
    potentialCells = [document.getElementById(`${col}${row + 1}`)];
  } else {
    potentialCells = [
      document.getElementById(`${col}${row + 1}`),
      document.getElementById(`${col}${row + 2}`),
    ];
  }

  potentialCells.forEach((cell) => {
    cell.classList.add('potential-cell');
    cell.addEventListener('click', () => {
      imageElement.setAttribute('position', cell.id);
      imageElement.setAttribute('moved', true);
      imageElement.classList.remove('selected');
      cell.appendChild(imageElement);

      potentialCells.forEach((cell) => cell.classList.remove('potential-cell'));
    });
  });
}
