import React, { useState } from "react";
import { FaCalendarAlt, FaMinusCircle } from "react-icons/fa"; // Import calendar icon
import DatePicker from "react-datepicker"; // Import the datepicker component
import "react-datepicker/dist/react-datepicker.css"; // Import datepicker CSS

const StatsCard = ({ title, value, width = "32%" }) => {
  return (
    <div
      style={{
        backgroundColor: "var(--secondary-color)",
        padding: "20px",
        width: width,
        height: "20vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        borderRadius: "8px",
        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
        textAlign: "center",
        position: "relative",
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
