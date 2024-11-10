import React, { useState } from 'react';
import axios from 'axios';
import "./Redeem.css";

const RedeemPointsForm = () => {
  const [points, setPoints] = useState('');
  const [amountEGP, setAmountEGP] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // Calculate amount in EGP whenever points are updated
  const handlePointsChange = (e) => {
    const pointsValue = e.target.value;
    setPoints(pointsValue);
    const egpValue = (pointsValue / 100).toFixed(2);
    setAmountEGP(egpValue);
  };

  // Submit points to the API to redeem them
  const handleRedeem = async () => {
    if (!points) return;
  
    setIsLoading(true);
    try {
      await axios.put('http://localhost:3000/api/tourist/redeem-points', {
        points: parseInt(points, 10),
      });
      alert('Voucher generated successfully!');
    } catch (error) {
      console.error('Error redeeming points:', error);
      if (error.response) {
        console.error('Server response:', error.response.data);
      }
      alert('Failed to generate voucher.');
    } finally {
      setIsLoading(false);
    }
  };
  
  

  return (
    <div className="redeem-points-container">
      <header className="points-header">
        <h3>Your available Points</h3>
        <p>10,000 Points = 100 EGP</p> {/* Fixed conversion message */}
      </header>

      <div className="redeem-points-form">
        <div className="input-section">
          <label>Enter the amount:</label>
          <p>Enter the amount of points you'd like to convert.</p>
          
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
              placeholder="Amount"
              value={amountEGP}
              disabled
            />
          </div>
          <small>Try not to use decimals; we'll round them down.</small>
        </div>

        <button
          onClick={handleRedeem}
          disabled={!points || isLoading}
        >
          {isLoading ? 'Generating...' : 'Redeem'}
        </button>
      </div>
    </div>
  );
};

export default RedeemPointsForm;
