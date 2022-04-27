import React from "react";

const HIDDEN_SYMBOL = "❓";

function Card(props) {
  return (
    <div
      className={"card " + props.etat}
      onClick={() => props.onClick(props.index)}
    >
      {props.etat === "hidden" ? HIDDEN_SYMBOL : props.card}
    </div>
  );
}

export default Card;
