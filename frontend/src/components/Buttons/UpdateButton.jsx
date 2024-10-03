import React from "react";
import "./Buttons.css";

function UpdateButton({ onClick }) {
  return (
    <button className="edit" onClick={onClick}>
      Update
    </button>
  );
}

export default UpdateButton;