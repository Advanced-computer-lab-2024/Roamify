import React from "react";
import "./Buttons.css";
import arrow from "../../assets/right-arrow.png";

function ViewButton({ buttonID, handleClick, buttonStyle }) {
  return (
    <button
      id={buttonID}
      className="view-button"
      style={buttonStyle}
      onClick={(e) => handleClick && handleClick(e.currentTarget.id)}
    >
      Learn More
      <img className="arrow-in-button" src={arrow} alt="arrow" />
    </button>
  );
}

export default ViewButton;
