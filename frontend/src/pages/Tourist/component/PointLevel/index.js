import React, { useState, useEffect } from "react";
import { FaMedal, FaStar, FaCrown } from "react-icons/fa";
import "./Pointlev.css";
import { Link } from "react-router-dom";

const LoyaltyLevelForm = () => {
  const [level, setLevel] = useState(null);
  const [points, setPoints] = useState(null);

  // Define level details
  const levelDetails = {
    1: { icon: FaMedal, color: "bronze", name: "Level 1" },
    2: { icon: FaStar, color: "silver", name: "Level 2" },
    3: { icon: FaCrown, color: "gold", name: "Level 3 " },
  };

  useEffect(() => {
    fetch("http://localhost:3000/api/tourist/view-points-level", {
      credentials: "include",
    })
      .then((response) => response.json())
      .then((data) => {
        setLevel(data.level);
        setPoints(data.points);
      })
      .catch((error) =>
        console.error("Error fetching level and points:", error)
      );
  }, []);

  // Render the icon and the level name based on the current level
  const renderLevelInfo = () => {
    const details = levelDetails[level];
    if (details) {
      const Icon = details.icon; // Dynamically select the correct icon
      return (
        <>
          <Icon style={{ color: details.color, fontSize: "3em" }} />
          <p>{details.name}</p>
        </>
      );
    } else {
      return <p>Loading...</p>; // Show loading message if level is null
    }
  };

  return (
    <div
      className="form-container"
      style={{
        transform: "none",
        display: "flex",
        flexDirection: "column",
        gap: "20px",
      }}
    >
      <div
        className="loyalty-level-form"
        style={{
          backgroundColor: "var(--secondary-color)",
          border: "1px solid var(--secondary-border-color)",
        }}
      >
        <h3 style={{ color: "var(--text-color)" }}>Your Loyalty Level</h3>
        <div className="level-icons">{renderLevelInfo()}</div>
        <p>{points !== null ? `Points: ${points}` : "Loading points..."}</p>
        <p style={{ color: "var(--dashboard-title-color)" }}>
          Receive loyalty points upon payment for any activity, itinerary, or
          transportation!
        </p>
      </div>
      <Link to={"/tourist/redeem"}>
        <button>Redeem Points</button>
      </Link>
    </div>
  );
};

export default LoyaltyLevelForm;
