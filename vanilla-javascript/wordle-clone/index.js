const resultScreen = document.querySelector('.result-screen');

let wordAttempts;
let attempt;
let letterCount;
let misteryWord;
let guessedChars;

window.onload = init();

function handleClick(event) {
  const word = wordAttempts[attempt];
  const clicked = event.target.textContent;

  if (clicked === '<=') {
    deleteLastChar(word);
  } else if (letterCount === 5 && clicked === 'ENTER') {
    submitWord(word);
  } else {
    submitCharacter(word, clicked, event.target.textContent.charCodeAt(0));
  }
}

function init() {
  resultScreen.style.display = 'none';
  document.querySelectorAll('.key').forEach((key) => {
    key.classList.remove('exists');
    key.classList.remove('correct');
    key.classList.remove('wrong');
  });
  wordAttempts = document.querySelectorAll('.board__row');
  wordAttempts.forEach((item) => {
    item.querySelectorAll('.char').forEach((char) => {
      char.classList.remove('exists');
      char.classList.remove('correct');
      char.classList.remove('wrong');
      char.textContent = '';
    });
  });
  attempt = 0;
  letterCount = 0;

  misteryWord = getRandomWord(words);
  guessedChars = [];

  document.addEventListener('keydown', keyDownHandler);

  document.querySelectorAll('.key').forEach((key) => {
    key.addEventListener('click', handleClick);
  });
}

function getRandomWord(list) {
  return list[Math.floor(Math.random() * list.length)];
}

function between(value, min, max) {
  return value >= min && value <= max;
}

function keyDownHandler(event) {
  const word = wordAttempts[attempt];
  if (letterCount === 5 && event.key === 'Enter') {
    submitWord(word);
    return;
  }
  if (event.key === 'Backspace') {
    deleteLastChar(word);
    return;
  }

  submitCharacter(word, event.key, event.keyCode);
}

function deleteLastChar(word) {
  if (letterCount === 0) return;
  word.querySelector(`div.char:nth-child(${letterCount})`).textContent = '';
  guessedChars.pop();
  letterCount--;
}

function submitWord(word) {
  const guessedWord = guessedChars.join('');

  guessedChars.forEach((char, index) => {
    if (misteryWord.includes(char)) {
      if (char === misteryWord[index]) {
        document.getElementById(char).classList.add('correct');
        word
          .querySelector(`div.char:nth-child(${index + 1})`)
          .classList.add('correct');
      } else {
        document.getElementById(char).classList.add('exists');
        word
          .querySelector(`div.char:nth-child(${index + 1})`)
          .classList.add('exists');
      }
    } else {
      document.getElementById(char).classList.add('wrong');
      word
        .querySelector(`div.char:nth-child(${index + 1})`)
        .classList.add('wrong');
    }
  });

  if (guessedWord === misteryWord) {
    gameOver('You Won');
    document.removeEventListener('keydown', keyDownHandler);
    document.querySelectorAll('.key').forEach((key) => {
      key.removeEventListener('click', handleClick);
    });
    return;
  }

  if (attempt === 5 && guessedWord !== misteryWord) {
    gameOver('You Lost');
    document.removeEventListener('keydown', keyDownHandler);
    document.querySelectorAll('.key').forEach((key) => {
      key.removeEventListener('click', handleClick);
    });
    return;
  }

  guessedChars.length = 0;
  letterCount = 0;
  attempt++;
}

function submitCharacter(word, char, keyCode) {
  console.log(keyCode);
  if (!between(keyCode, 65, 90) || letterCount === 5) return;
  guessedChars.push(char.toLowerCase());
  word.querySelector(`div.char:nth-child(${letterCount + 1})`).textContent =
    char.toLowerCase();

  letterCount++;
}

function gameOver(state) {
  resultScreen.style.display = 'flex';
  if (state === 'You Won') {
    resultScreen.querySelector('.game-result').textContent = state;
  } else {
    resultScreen.querySelector(
      '.game-result'
    ).innerHTML = `${state}, the word is <span class='word'>${misteryWord.toUpperCase()}</span>`;
  }
}
