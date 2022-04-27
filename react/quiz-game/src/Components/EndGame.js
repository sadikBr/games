import React from 'react';

function EndGame(props) {
  return (
    <div className='game-end'>
      <h1>
        Out of {props.nbrOfQuestions} questions, you've got {props.score}{' '}
        correct answers (
        <span>{((props.score / props.nbrOfQuestions) * 100).toFixed(2)}%</span>)
      </h1>
      <button onClick={props.resetGame}>Play Again</button>
    </div>
  );
}

export default EndGame;
