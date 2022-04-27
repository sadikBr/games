import React from "react";

function Popup(props) {
  return (
    <div className={props.showPopup ? "popup showPopup" : "popup"}>
      <p>You've already tried that letter - try another one</p>
    </div>
  );
}

export default Popup;
