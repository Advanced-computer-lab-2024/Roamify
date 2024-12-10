import React, { useContext } from "react";
import { ThemeContext } from "../../ThemeContext";
import { FaMoon, FaSun } from "react-icons/fa";

const ThemeToggleButton = () => {
  const { isDarkMode, toggleTheme } = useContext(ThemeContext);

  return (
    <button
      onClick={toggleTheme}
      style={{
        padding: "15px",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        borderRadius: "999px",
        backgroundColor: "transparent", // Transparent by default
        color: "var(--text-color)", // Text color based on theme
        border: "1px solid var(--secondary-color)", // Border color to match the theme
        cursor: "pointer",
        boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
        transition: "all 0.3s ease",
        outline: "none",
      }}
      onMouseEnter={(e) => {
        e.target.style.backgroundColor = "var(--secondary-color)"; // Change background color on hover
      }}
      onMouseLeave={(e) => {
        e.target.style.backgroundColor = "transparent"; // Reset background color on hover leave
      }}
    >
      {/* Conditional rendering of icon based on the theme */}
      {isDarkMode ? <FaSun size={20} /> : <FaMoon size={20} />}
    </button>
  );
};

export default ThemeToggleButton;
