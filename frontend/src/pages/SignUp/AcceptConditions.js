import React from "react";

const AcceptConditions = () => {
  const handleAccept = () => {
    alert("You have accepted the terms and conditions.");
    // Update the terms and conditions status in your backend or context if necessary
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
