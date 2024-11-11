import React, { useState, useEffect } from 'react';
import axios from 'axios';
import "./Redeem.css";

const RedeemPointsForm = () => {
  const [availablePoints, setAvailablePoints] = useState(0); // State to store fetched points
  const [points, setPoints] = useState('');
  const [amountEGP, setAmountEGP] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchPoints = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/tourist/view-points-level', { withCredentials: true });
        setAvailablePoints(response.data.points); // Assume the API returns an object with a points property
      } catch (error) {
        console.error('Failed to fetch points:', error);
      }
    };
    fetchPoints();
  }, []);

  // Updates the points and corresponding EGP value when user inputs points
  const handlePointsChange = (e) => {
    const pointsValue = e.target.value;
    setPoints(pointsValue);
    const egpValue = (pointsValue / 100).toFixed(2); // Conversion rate: 10,000 Points = 100 EGP
    setAmountEGP(egpValue);
  };

  // Handles redeeming points when "Redeem" button is clicked
  const handleRedeem = async () => {
    if (!points) return; // Ensures that we don't proceed if no points are entered

    setIsLoading(true);
    try {
      await axios.put(
        'http://localhost:3000/api/tourist/redeem-points',
        { points: parseInt(points, 10) },
        { withCredentials: true }
      );
      alert('Voucher generated successfully!');
      setAvailablePoints(prev => prev - parseInt(points, 10)); // Optionally adjust the available points locally
    } catch (error) {
      console.error('Error redeeming points:', error);
      alert('Failed to generate voucher.');
    } finally {
      setIsLoading(false); // Always turn off loading indicator
    }
  };

  return (
    <div className="redeem-points-container">
      <header className="points-header">
        <h3>Redeem Your Points</h3>
        <p>10,000 Points = 100 EGP</p>
      </header>

      <div className="redeem-points-form">
        <div className="input-section">
          <label>Enter the amount:</label>
          <p> Your available points: {availablePoints}</p>
          <div className="amount-inputs">
            <input
              type="number"
              placeholder="My Points"
              value={points}
              onChange={handlePointsChange}
            />
            <span>⇄</span>
            <input
              type="number"
              placeholder="Amount in EGP"
              value={amountEGP}
              disabled
            />
          </div>
          <small>Try not to use decimals; we'll round them down.</small>
        </div>
        <button onClick={handleRedeem} disabled={!points || isLoading}>
          {isLoading ? 'Generating...' : 'Redeem'}
        </button>
      </div>
    </div>
  );
};

export default RedeemPointsForm;
