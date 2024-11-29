import React from "react";

const StatsCard = ({ title, value }) => {
  return (
    <div
      style={{
        backgroundColor: "var(--secondary-color)",
        padding: "20px",
        width: "32%",
        borderRadius: "8px",
        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
        textAlign: "center",
      }}
    >
      <h3
        style={{
          margin: 0,
          fontSize: "20px",
          color: "var(--dashboard-title-color)",
        }}
      >
        {title}
      </h3>
      <p style={{ fontSize: "24px", fontWeight: "bold" }}>{value}</p>
    </div>
  );
};

export default StatsCard;
