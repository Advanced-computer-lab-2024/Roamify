import React from "react";
import "./Buttons.css";

function SignUpButton({ onClick }) {
  return (
    <button className="signupButton" onClick={onClick}>
      Sign up
    </button>
  );
}

export default SignUpButton;
