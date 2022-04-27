import React from "react";

function Letters(props) {
  return (
    <div className="letters">
      {"abcdefghijklmnopqrstuvwxyz".split("").map((letter) => (
        <button
          style={{
            background: props.wrongLetters.includes(letter)
              ? "rgba(255, 0, 0, .4)"
              : props.lettersFound.includes(letter)
              ? "rgba(0, 255, 0, .4)"
              : "",
          }}
          autoFocus
          onKeyPress={(event) => props.onClick(event.key.toLocaleLowerCase())}
          onClick={() => props.onClick(letter)}
          key={letter}
        >
          {letter}
        </button>
      ))}
    </div>
  );
}

export default Letters;
