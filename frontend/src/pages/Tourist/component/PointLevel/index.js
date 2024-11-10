import React, { useState, useEffect } from 'react';
import { FaMedal, FaStar, FaCrown } from 'react-icons/fa';
import "./Pointlev.css";

const LoyaltyLevelForm = () => {
  const [level, setLevel] = useState(null);
  const [points, setPoints] = useState(null);

  useEffect(() => {
    fetch('http://localhost:3000/api/tourist/view-points-level', {
      credentials: 'include'
    })
      .then((response) => response.json())
      .then((data) => {
        setLevel(data.level);
        setPoints(data.points); // Assuming the API returns 'points'
      })
      .catch((error) => console.error('Error fetching level and points:', error));
  }, []);

  const renderIcon = () => {
    switch (level) {
      case 1:
        return <FaMedal style={{ color: 'bronze', fontSize: '2em' }} />;
      case 2:
        return <FaStar style={{ color: 'silver', fontSize: '2.5em' }} />;
      case 3:
        return <FaCrown style={{ color: 'gold', fontSize: '3em' }} />;
      default:
        return <p>Loading...</p>;
    }
  };

  return (
    <div className="form-container">
      <div className="loyalty-level-form">
        <h3>Your Loyalty Level</h3>
        <div className="level-icons">
          {renderIcon()}
        </div>
        <p>{points !== null ? `Points: ${points}` : 'Loading points...'}</p>
        <p>Receive loyalty points upon payment for any event/itinerary!</p>
      </div>
    </div>
  );
}

export default LoyaltyLevelForm;
