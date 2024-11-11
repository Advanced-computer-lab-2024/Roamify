import React from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const AcceptConditions = () => {
  const navigate = useNavigate();

  const handleAccept = async () => {
    try {
      await axios.put(
        "http://localhost:3000/api/user/accept-reject-terms-and-conditions",
        { accepted: true },
        { withCredentials: true }
      );
      alert("You have accepted the terms and conditions.");
      navigate("/profile-details");
    } catch (error) {
      console.error("Error accepting terms and conditions:", error);
      alert("Failed to accept terms and conditions. Please try again.");
    }
  };

  return (
    <div>
      <h2>Terms and Conditions</h2>
      <p>Please read and accept our terms and conditions:</p>
      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec vehicula
        nisl eget magna commodo, sed laoreet eros malesuada. Integer auctor
        libero vitae lectus euismod, a auctor purus hendrerit.
      </p>
      <button onClick={handleAccept}>Accept Terms and Conditions</button>
    </div>
  );
};

export default AcceptConditions;
