import React from "react";

// Reusable LoadingSpinner component
const LoadingLogo = ({ isVisible, size = "80px" }) => {
  if (!isVisible) return null; // Don't render the spinner if not visible

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh", // Center the spinner vertically and horizontally
      }}
    >
      <img
        src="/loading.gif" // Path to your loading GIF
        alt={"Loading.."}
        style={{
          width: size, // Set the size of the GIF (default is 50px)
          height: size,
        }}
      />
    </div>
  );
};

export default LoadingLogo;
