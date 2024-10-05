import React from "react";
import "./Buttons.css";

function LoginButton({ text, height }) {
  const showLogin = () => {
    const login = document.querySelector(".login-container");
    if (login) {
      login.style.display = "flex";
    }
  };

  return (
    <button
      className="loginButton"
      onClick={showLogin}
      style={{ height: height }}
    >
      {text ? text : "Login"}
    </button>
  );
}

export default LoginButton;
