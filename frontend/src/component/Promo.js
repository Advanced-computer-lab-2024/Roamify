import React from "react";
import { FaTag } from "react-icons/fa"; // Import the Font Awesome tag icon

const Promo = ({ size = "50px", color = "var(--text-color)" }) => {
  return (
    <FaTag
      style={{
        fontSize: size, // Set the size of the icon
        color: color, // Set the color of the icon
      }}
    />
  );
};

export default Promo;
