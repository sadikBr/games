import React from "react";

function HiddenWord(props) {
  return (
    <div className="output">
      <div className="container">
        <h4 className="category">The choosen category is: {props.category}</h4>
        <div className="word">
          {props.word.split("").map((letter, index) => {
            if (props.lettersFound.includes(letter)) {
              return <span key={letter + index}>{letter}</span>;
            } else if (props.gameOver) {
              return (
                <span
                  style={{ color: "rgba(255, 40, 0, 1)" }}
                  key={letter + index}
                >
                  {letter}
                </span>
              );
            } else {
              return <span key={letter + index}></span>;
            }
          })}
        </div>
      </div>

      {props.gameOver || props.gameWon ? (
        <div className="reset">
          <span
            style={{
              color: props.gameOver ? "rgba(255, 40, 0, 1)" : "green",
            }}
          >
            {props.gameOver ? "Game Over" : "Noice you guessed it!!"}
          </span>
          <button onClick={props.onClick}>Reset Game</button>
        </div>
      ) : (
        ""
      )}
    </div>
  );
}

export default HiddenWord;
