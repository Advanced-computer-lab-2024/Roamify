import React from "react";

// Reusable LoadingSpinner component
const OkayLogo = ({ isVisible, size = "50px" }) => {
  if (!isVisible) return null; // Don't render the spinner if not visible

  return (
    <img
      src="/loading.gif" // Path to your loading GIF
      alt={altText}
      style={{
        width: size, // Set the size of the GIF (default is 50px)
        height: size,
      }}
    />
  );
};

export default OkayLogo;
