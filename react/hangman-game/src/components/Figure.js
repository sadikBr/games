import React from "react";
import image0 from "../images/0.png";

function Figure(props) {
  return (
    <div style={{ display: !props.url ? "none" : "" }}>
      <img src={props.url ? props.url : image0} alt="figure" />
    </div>
  );
}

export default Figure;
