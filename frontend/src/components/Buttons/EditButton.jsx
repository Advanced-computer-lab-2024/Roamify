import React from "react";
import "./Buttons.css";

function EditButton({ onClick }) {
  return (
    <button className="edit" onClick={onClick}>
      Edit
    </button>
  );
}

export default EditButton;