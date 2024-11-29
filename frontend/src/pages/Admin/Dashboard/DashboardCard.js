import React from "react";

const DashboardCard = ({ title, height, width, titlePosition, body }) => {
  return (
    <div
      style={{
        backgroundColor: "var(--secondary-color)",
        display: "flex",
        flexDirection: "column",
        padding: "20px",
        height: height,
        width: width,
        borderRadius: "8px",
        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: titlePosition === "left" ? "flex-start" : "center",
          alignItems: "center",
        }}
      >
        <h3
          style={{
            margin: 0,
            fontSize: "20px",
            color: "var(--dashboard-title-color)",
            textAlign: titlePosition === "left" ? "left" : "center",
            width: "100%",
          }}
        >
          {title}
        </h3>
      </div>
      <div style={{ marginTop: "10px", flex: 1 }}>
        {body}
        {/* This will allow the body to be dynamic (chart, text, etc.) */}
      </div>
    </div>
  );
};

export default DashboardCard;
