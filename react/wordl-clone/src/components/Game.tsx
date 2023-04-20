import { useEffect, useMemo, useState } from 'react';
import wordsList from '../wordsList';

import GameBoard from './GameBoard';
import Keyboard from './Keyboard';

const KEYBOARD_KEYS: BoardValue[][] = [
  [
    { value: 'q', state: 'undetermined' },
    { value: 'w', state: 'undetermined' },
    { value: 'e', state: 'undetermined' },
    { value: 'r', state: 'undetermined' },
    { value: 't', state: 'undetermined' },
    { value: 'y', state: 'undetermined' },
    { value: 'u', state: 'undetermined' },
    { value: 'i', state: 'undetermined' },
    { value: 'o', state: 'undetermined' },
    { value: 'p', state: 'undetermined' },
  ],
  [
    { value: 'a', state: 'undetermined' },
    { value: 's', state: 'undetermined' },
    { value: 'd', state: 'undetermined' },
    { value: 'f', state: 'undetermined' },
    { value: 'g', state: 'undetermined' },
    { value: 'h', state: 'undetermined' },
    { value: 'j', state: 'undetermined' },
    { value: 'k', state: 'undetermined' },
    { value: 'l', state: 'undetermined' },
  ],
  [
    { value: 'Enter', state: 'undetermined' },
    { value: 'z', state: 'undetermined' },
    { value: 'x', state: 'undetermined' },
    { value: 'c', state: 'undetermined' },
    { value: 'v', state: 'undetermined' },
    { value: 'b', state: 'undetermined' },
    { value: 'n', state: 'undetermined' },
    { value: 'm', state: 'undetermined' },
    { value: 'Backspace', state: 'undetermined' },
  ],
];

function getRandomWord() {
  return wordsList[Math.floor(wordsList.length * Math.random())].toLowerCase();
}

export interface BoardValue {
  value: string;
  state: 'correct' | 'wrong' | 'valid' | 'undetermined';
}

function Game() {
  const [gameBoard, setGameBoard] = useState([
    [null, null, null, null, null],
    [null, null, null, null, null],
    [null, null, null, null, null],
    [null, null, null, null, null],
    [null, null, null, null, null],
    [null, null, null, null, null],
  ] as (BoardValue | null)[][]);

  const [keyboardKeys, setKeyboardKeys] = useState(KEYBOARD_KEYS);
  const [gameOver, setGameOver] = useState(false);
  const [word, _] = useState(() => getRandomWord());
  const [currentRowIndex, setCurrentRowIndex] = useState(0);

  const currentRow = useMemo(() => {
    return gameBoard[currentRowIndex];
  }, [currentRowIndex]);

  function updateKeyboardKeys(char: string, state: BoardValue['state']) {
    for (let i = 0; i < KEYBOARD_KEYS.length; i++) {
      const row = KEYBOARD_KEYS[i];
      for (let j = 0; j < row.length; j++) {
        const value = KEYBOARD_KEYS[i][j];
        if (value.value === char) {
          KEYBOARD_KEYS[i][j].state = state;
        }
      }
    }

    setKeyboardKeys(KEYBOARD_KEYS);
  }

  useEffect(() => {
    if (gameOver) return;

    addEventListener('keydown', clickHandler);

    return () => {
      removeEventListener('keydown', clickHandler);
    };
  }, [clickHandler, gameOver]);

  function clickHandler(event: KeyboardEvent) {
    handleKeyPress(event.key);
  }

  function handleKeyPress(key: string) {
    if (gameOver) return;

    if ((key >= 'a' && key <= 'z') || key === 'Backspace') {
      updateRow(key);
    }

    if (key === 'Enter') {
      submitCurrentRow();
    }
  }

  function submitCurrentRow() {
    if (currentRow.some((val) => val == null)) return;

    const guess = composeWord(currentRow).toLowerCase();

    if (guess === word.toLowerCase()) {
      currentRow.forEach((val) => {
        if (val != null) {
          val.state = 'correct';
        }
      });

      setGameOver(true);
      console.log('You Win!');
    } else {
      for (let i = 0; i < guess.length; i++) {
        const [wordChar, guessChar] = [word[i], guess[i]];

        if (wordChar === guessChar) {
          // @ts-ignore
          currentRow[i].state = 'correct';
          updateKeyboardKeys(guessChar, 'correct');
        } else if (word.includes(guessChar)) {
          // @ts-ignore
          currentRow[i].state = 'valid';
          updateKeyboardKeys(guessChar, 'valid');
        } else {
          // @ts-ignore
          currentRow[i].state = 'wrong';
          updateKeyboardKeys(guessChar, 'wrong');
        }
      }
    }

    updateBoard();

    if (currentRowIndex >= 5) {
      if (!gameOver) {
        setGameOver(true);
        console.log('You lose!');
      }
    } else {
      setCurrentRowIndex((prev) => prev + 1);
    }
  }

  function composeWord(currentRow: (BoardValue | null)[]) {
    return currentRow.reduce((acc, val) => {
      return acc + val?.value;
    }, '');
  }

  function updateRow(key: string) {
    if (key === 'Backspace') {
      for (let i = currentRow.length - 1; i >= 0; i--) {
        const value = currentRow[i];

        if (value !== null) {
          currentRow[i] = null;

          break;
        }
      }
    } else {
      for (let i = 0; i < currentRow.length; i++) {
        const value = currentRow[i];

        if (value === null) {
          currentRow[i] = {
            value: key,
            state: 'undetermined',
          };

          break;
        }
      }
    }

    updateBoard();
  }

  function updateBoard() {
    const newBoard = [...gameBoard];
    newBoard[currentRowIndex] = currentRow;

    setGameBoard(newBoard);
  }

  return (
    <main className='game-section'>
      <GameBoard gameBoard={gameBoard} />
      <Keyboard
        keyboardKeys={keyboardKeys}
        handleButtonPress={handleKeyPress}
      />
    </main>
  );
}

export default Game;
