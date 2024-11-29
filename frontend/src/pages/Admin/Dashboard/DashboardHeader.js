import React from "react";

const DashboardHeader = () => {
  return (
    <header
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        backgroundColor: "var(--secondary-color)",
        color: "white",
        padding: "10px 20px",
      }}
    >
      <h1>Dashboard</h1>
      <div style={{ display: "flex", gap: "10px" }}>
        <button
          style={{
            padding: "5px 15px",
            border: "none",
            backgroundColor: "#fff",
            color: "var(--secondary-color)",
            cursor: "pointer",
            borderRadius: "5px",
          }}
        >
          Settings
        </button>
        <button
          style={{
            padding: "5px 15px",
            border: "none",
            backgroundColor: "#fff",
            color: "var(--secondary-color)",
            cursor: "pointer",
            borderRadius: "5px",
          }}
        >
          Notifications
        </button>
      </div>
    </header>
  );
};

export default DashboardHeader;
