import React, { useState } from "react";
import { FaCheck } from "react-icons/fa"; // Import FontAwesome check icon
import ConfirmModal from "../../../component/Modals/ConfirmModal"; // Assuming you might use a confirmation modal

const AcceptButton = ({ onAccept }) => {
  return (
    <>
      <button
        onClick={onAccept}
        style={{
          marginLeft: "auto",
          padding: "10px",
          color: "var(--secondary-hover-color)", // Default icon color
          borderRadius: "50%",
          backgroundColor: "var(--main-color)",
          transition: "background-color 0.3s, border-color 0.3s", // Transition on background and border
          cursor: "pointer",
          border: "2px solid var(--secondary-hover-color)",
        }}
        onMouseOver={(e) => {
          e.target.style.backgroundColor = "var(--secondary-hover-color)"; // Green background on hover
        }}
        onMouseOut={(e) => {
          e.target.style.backgroundColor = "transparent"; // Reset background
          e.target.style.borderColor = "var(--secondary-hover-color)"; // Reset border color
        }}
      >
        <FaCheck
          size={18}
          color="#ffffff"
          style={{ backgroundColor: "transparent !important" }}
        />{" "}
        {/* Icon color remains unaffected */}
      </button>
    </>
  );
};

export default AcceptButton;
