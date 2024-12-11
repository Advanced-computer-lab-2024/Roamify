import React from "react";

// Reusable LoadingSpinner component
const EmptyResponseLogo = ({ isVisible, size = "50px", text }) => {
  if (!isVisible) return null; // Don't render the spinner if not visible

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh", // Center the spinner vertically and horizontally
      }}
    >
      <img
        src="/emptyResponseLogo.svg" // Path to your loading GIF
        alt={"Loading..."}
        style={{
          width: size, // Set the size of the GIF (default is 50px)
          height: size,
        }}
      />
      <p style={{ fontSize: "50px", lineHeight: "60px" }}>{text}</p>
    </div>
  );
};

export default EmptyResponseLogo;
