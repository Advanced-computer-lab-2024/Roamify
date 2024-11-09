import React from "react";

const RejectButton = ({ onReject }) => {
  return (
    <button
      onClick={onReject}
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        width: "40px",
        height: "40px",
        backgroundColor: "transparent",
        border: "2px solid #e3342f",
        color: "#e3342f",
        borderRadius: "50%",
        cursor: "pointer",
        transition: "background-color 0.3s, color 0.3s",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.backgroundColor = "#e3342f";
        e.currentTarget.style.color = "#fff";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.backgroundColor = "transparent";
        e.currentTarget.style.color = "#e3342f";
      }}
      aria-label="Reject"
    >
      &times;
    </button>
  );
};

export default RejectButton;
