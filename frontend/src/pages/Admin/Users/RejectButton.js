import React, { useState } from "react";
import { FaTimes } from "react-icons/fa"; // Import FontAwesome times icon for rejection
import ConfirmModal from "../../../component/Modals/ConfirmModal"; // Assuming you might use a confirmation modal

const RejectButton = ({ onReject }) => {
  return (
    <>
      <button
        onClick={onReject}
        style={{
          marginLeft: "auto",
          padding: "10px",
          color: "var(--secondary-hover-color)", // Default icon color (like AcceptButton)
          borderRadius: "50%",
          backgroundColor: "transparent",
          transition: "background-color 0.3s, border-color 0.3s", // Transition on background and border
          cursor: "pointer",
          border: "2px solid var(--secondary-hover-color)", // Similar border style to AcceptButton
        }}
        onMouseOver={(e) => {
          e.target.style.backgroundColor = "var(--secondary-hover-color)"; // Hover effect background
          e.target.style.borderColor = "var(--secondary-hover-color)"; // Hover effect border color
        }}
        onMouseOut={(e) => {
          e.target.style.backgroundColor = "transparent"; // Reset background
          e.target.style.borderColor = "var(--secondary-hover-color)"; // Reset border color
        }}
      >
        <FaTimes
          size={18} // Adjust size if necessary
          color="white" // Icon color remains unaffected
          style={{ backgroundColor: "transparent !important" }} // Ensure icon background stays transparent
        />
      </button>
    </>
  );
};

export default RejectButton;
