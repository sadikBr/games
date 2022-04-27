/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react';
import { Categories } from './Config';
import MenuPage from './Components/MenuPage';
import './App.css';
import Question from './Components/Question';
import EndGame from './Components/EndGame';

function App() {
  const [gameStarted, setGameStarted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [category, setCategory] = useState('General knowledge');
  const [difficulty, setDifficulty] = useState('Easy');
  const [nbrOfQuestions, setNbrOfQuestions] = useState(10);
  const [API_URL, setAPI_URL] = useState(
    `https://opentdb.com/api.php?amount=${nbrOfQuestions}&category=${
      Categories.indexOf(category) + 9
    }&difficulty=${difficulty.toLocaleLowerCase()}&type=multiple`
  );
  const [showAnswers, setShowAnswers] = useState(false);
  const [questions, setQuestions] = useState([]);
  const [options, setOptions] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [gameEnded, setGameEnded] = useState(false);
  const [score, setScore] = useState(0);

  useEffect(() => {
    setAPI_URL(
      `https://opentdb.com/api.php?amount=${nbrOfQuestions}&category=${
        Categories.indexOf(category) + 9
      }&difficulty=${difficulty.toLocaleLowerCase()}&type=multiple`
    );
  }, [category, difficulty, nbrOfQuestions]);

  function handleChange(element) {
    if (element.name === 'nbrOfQuestions') {
      setNbrOfQuestions(element.value);
    } else if (element.name === 'categories') {
      setCategory(element.value);
    } else if (element.name === 'difficulties') {
      setDifficulty(element.value);
    }
  }

  function fetchDataAndStart(url) {
    setLoading(true);
    fetch(url)
      .then((response) => response.json())
      .catch((err) => {
        setLoading(false);
        alert('That category is not available');
      })
      .then((data) => {
        setQuestions(data.results);
        setOptions(
          [
            data.results[0].correct_answer,
            ...data.results[0].incorrect_answers,
          ].sort(() => Math.random() - 0.5)
        );
        setGameStarted(true);
        setLoading(false);
      })
      .catch((err) => {
        setLoading(false);
        alert('That category is not available');
      });
  }

  useEffect(() => {
    setOptions(
      currentIndex >= 1 &&
        currentIndex < 10 &&
        [
          questions[currentIndex].correct_answer,
          ...questions[currentIndex].incorrect_answers,
        ].sort(() => Math.random() - 0.5)
    );
  }, [currentIndex]);

  function handleClick(answer) {
    setShowAnswers(true);
    if (questions[currentIndex].correct_answer === answer) {
      setScore(score + 1);
    }

    setTimeout(() => {
      setCurrentIndex((prev) => {
        if (prev === questions.length - 1) setGameEnded(true);
        else return prev + 1;
      });
      setShowAnswers(false);
    }, 1000);
  }

  function resetGame() {
    setCurrentIndex(0);
    setScore(0);
    setGameStarted(false);
    setGameEnded(false);
  }

  return (
    <div className='app'>
      {gameEnded ? (
        <EndGame
          score={score}
          resetGame={resetGame}
          nbrOfQuestions={nbrOfQuestions}
        />
      ) : gameStarted ? (
        <Question
          showAnswers={showAnswers}
          handleClick={handleClick}
          question={questions[currentIndex]}
          options={options}
        />
      ) : (
        <MenuPage
          loading={loading}
          category={category}
          difficulty={difficulty}
          nbrOfQuestions={nbrOfQuestions}
          handleChange={handleChange}
          url={API_URL}
          fetchDataAndStart={fetchDataAndStart}
        />
      )}
    </div>
  );
}

export default App;
