import React, { useState, useEffect } from "react";
import Header from "./components/Header";
import Letters from "./components/Letters";
import HiddenWord from "./components/HiddenWord";
import Popup from "./components/Popup";
import Figure from "./components/Figure";
import words from "./words";
import image1 from "./images/1.png";
import image2 from "./images/2.png";
import image3 from "./images/3.png";
import image4 from "./images/4.png";
import image5 from "./images/5.png";
import image6 from "./images/6.png";
import image7 from "./images/7.png";
import image8 from "./images/8.png";
import "./App.css";

function App() {
  const images = [
    image1,
    image2,
    image3,
    image4,
    image5,
    image6,
    image7,
    image8,
  ];
  const categories = [
    "days",
    "months",
    "cities",
    "fruits",
    "vegetables",
    "verbs",
  ];

  const [category, setCategory] = useState(
    categories[Math.floor(Math.random() * categories.length)]
  );
  const [word, setWord] = useState(
    words[category][Math.floor(Math.random() * words[category].length)]
  );
  const [strikes, setStrikes] = useState(7);
  const [lettersFound, setLettersFound] = useState([]);
  const [usedLetters, setUsedLetters] = useState([]);
  const [wrongLetters, setWrongLetters] = useState([]);
  const [gameOver, setGameOver] = useState(false);
  const [gameWon, setGameWon] = useState(false);
  const [showPopup, setShowPopup] = useState(false);

  function evaluateLetter(letter) {
    if (!gameOver && !gameWon) {
      if (usedLetters.includes(letter)) {
        setShowPopup(true);
        setTimeout(() => {
          setShowPopup(false);
        }, 2000);
        return;
      } else {
        setUsedLetters((usedLetters) => [...usedLetters, letter]);
      }
      if (word.split("").includes(letter)) {
        setLettersFound((lettersFound) => [...lettersFound, letter]);
      } else {
        setWrongLetters((wrongLetters) => [...wrongLetters, letter]);
        setStrikes(strikes - 1);
        if (strikes === 0) {
          setGameOver(true);
        }
      }
    }
  }

  useEffect(() => {
    setGameWon(true);
    for (let i = 0; i < word.length; i++) {
      if (!lettersFound.includes(word[i])) setGameWon(false);
    }
  }, [lettersFound, word]);

  useEffect(() => {
    setWord(
      words[category][Math.floor(Math.random() * words[category].length)]
    );
  }, [category]);

  function resetGame() {
    setCategory(categories[Math.floor(Math.random() * categories.length)]);
    setStrikes(7);
    setLettersFound([]);
    setUsedLetters([]);
    setWrongLetters([]);
    setGameOver(false);
    setGameWon(false);
  }

  return (
    <div className="app">
      <Popup showPopup={showPopup} />
      <Header />
      <div className="main">
        <Figure url={images[6 - strikes]} />
        <HiddenWord
          category={category}
          word={word}
          lettersFound={lettersFound}
          gameOver={gameOver}
          gameWon={gameWon}
          onClick={resetGame}
        />
      </div>
      <Letters
        onClick={evaluateLetter}
        lettersFound={lettersFound}
        wrongLetters={wrongLetters}
      />
    </div>
  );
}

export default App;
