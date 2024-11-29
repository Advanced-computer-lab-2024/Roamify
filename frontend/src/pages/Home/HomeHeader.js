import React from "react";
import { Link } from "react-router-dom"; // Import Link for navigation
import ThemeToggleButton from "./ThemeToggleButton";

const HomeHeader = ({ HeaderData }) => {
  const handleNavClick = (id) => {
    const section = document.getElementById(id);
    if (section) {
      section.scrollIntoView({ behavior: "smooth" }); // Smooth scrolling to the section
    }
  };

  return (
    <header
      style={{
        position: "absolute", // Make the header fixed
        top: 0,
        left: 0,
        width: "100%",
        maxHeight: "18vh",
        zIndex: 1000, // Ensure the header is always on top
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "30px 50px", // Reduced padding for a more compact look
        background: "transparent", // Transparent white background
        backdropFilter: "blur(10px)", // Add blur for a frosted glass effect
        boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)", // Professional shadow
      }}
    >
      {/* Logo */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "flex-start",
          flex: 1,
        }}
      >
        <img src={"/logo.svg"} alt="Logo" style={{}} />
      </div>

      {/* Navigation */}
      <nav
        style={{
          display: "flex",
          backgroundColor: "rgba(37, 37, 37, 0.4)", // Semi-transparent background
          padding: "0px 30px",
          borderRadius: "50px",
          justifyContent: "space-around",
          flex: 1,
          backdropFilter: "blur(10px)", // Frosted-glass effect
          WebkitBackdropFilter: "blur(10px)", // Safari compatibility
          boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)", // Subtle shadow for depth
          border: "1px solid rgba(255, 255, 255, 0.2)", // Light border for contrast
        }}
      >
        {HeaderData.map((data, index) => (
          <button
            key={index}
            onClick={() => handleNavClick(data.id)} // Scroll to section on click
            style={{
              color: "#fff",
              backgroundColor: "transparent",
              border: "none",
              fontSize: "14px",
              padding: "20px 20px",
              cursor: "pointer",
              transition: "all 0.3s ease",
            }}
            onMouseEnter={(e) => {
              e.target.style.borderBottom = "2px solid var(--main-color)";
            }}
            onMouseLeave={(e) => {
              e.target.style.borderBottom = "2px solid transparent";
            }}
          >
            {data.menu}
          </button>
        ))}
      </nav>

      {/* Login & Sign Up Links */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "flex-end",
          flex: 1,
          gap: "15px", // Add spacing between buttons
        }}
      >
        <ThemeToggleButton />
        <Link
          to="/login"
          style={{
            padding: "8px 20px",
            border: "1px solid rgba(255, 255, 255, 0.2)",
            borderRadius: "25px",
            backgroundColor: "rgba(37, 37, 37, 0.4)",
            color: "white",
            fontSize: "14px",
            textDecoration: "none", // Remove underline
            cursor: "pointer",
            transition: "all 0.3s ease",
          }}
          onMouseEnter={(e) => (
            (e.target.style.backgroundColor = "var(--main-color)"),
            (e.target.style.color = "#fff")
          )}
          onMouseLeave={(e) => (
            (e.target.style.backgroundColor = "transparent"),
            (e.target.style.color = "#fff")
          )}
        >
          Login
        </Link>
        <Link
          to="/register"
          style={{
            padding: "8px 20px",
            border: "1px solid var(--main-color)",
            borderRadius: "25px",
            backgroundColor: "var(--main-color)",
            color: "#fff",
            fontSize: "14px",
            textDecoration: "none", // Remove underline
            cursor: "pointer",
            transition: "all 0.3s ease",
          }}
          onMouseEnter={(e) => (e.target.style.backgroundColor = "#8e5ce2")}
          onMouseLeave={(e) =>
            (e.target.style.backgroundColor = "var(--main-color)")
          }
        >
          Sign Up
        </Link>
      </div>
    </header>
  );
};

export default HomeHeader;
