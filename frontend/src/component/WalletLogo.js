import React from "react";

// Reusable LoadingSpinner component
const WalletLogo = ({ isVisible = true, size = "50px" }) => {
  if (!isVisible) return null; // Don't render the spinner if not visible

  return (
    <img
      src="/wallet.svg" // Path to your loading GIF
      style={{
        width: size, // Set the size of the GIF (default is 50px)
        height: size,
      }}
    />
  );
};

export default WalletLogo;
