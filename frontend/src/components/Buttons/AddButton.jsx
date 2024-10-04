import React from "react";
import "./Buttons.css";

function AddActivityButton({ onClick }) {
  return (
    <button className="accept" onClick={onClick}>
      Add 
    </button>
  );
}

export default AddActivityButton;