import React from "react";
import "./Buttons.css";

function AcceptButton({ onClick }) {
  return (
    <button className="accept" onClick={onClick}>
      Accept
    </button>
  );
}

export default AcceptButton;
