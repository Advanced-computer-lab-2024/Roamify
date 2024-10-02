import React from "react";
import "./Buttons.css";

function RejectButton({ onClick }) {
  return (
    <button className="reject" onClick={onClick}>
      Reject
    </button>
  );
}

export default RejectButton;