import React from "react";

const AcceptButton = ({ onAccept }) => {
  return (
    <button
      onClick={onAccept}
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        width: "40px",
        height: "40px",
        backgroundColor: "transparent",
        border: "2px solid #38c172",
        color: "#38c172",
        borderRadius: "50%",
        cursor: "pointer",
        transition: "background-color 0.3s, color 0.3s",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.backgroundColor = "#38c172";
        e.currentTarget.style.color = "#fff";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.backgroundColor = "transparent";
        e.currentTarget.style.color = "#38c172";
      }}
      aria-label="Accept"
    >
      &#10003;
    </button>
  );
};

export default AcceptButton;
