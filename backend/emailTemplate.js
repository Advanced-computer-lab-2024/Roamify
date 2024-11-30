module.exports = {
  flaggedItineraryEmail: (username, itineraryName) => `
  Dear ${username},
  
  We regret to inform you that your itinerary, "${itineraryName}," has been flagged for review due to concerns about its content. As a result, we have removed it from public view to maintain compliance with our guidelines.
  
  If you believe this was done in error or would like further clarification, please feel free to reach out to us.
  
  Thank you for your understanding.
  
  Best regards,  
  Roamify Team
  `,
  flaggedActivityEmail: (username, activityName) => `
  Dear ${username},
  
  We regret to inform you that your activity, "${activityName}," has been flagged for review due to concerns about its content. As a result, we have removed it from public view to maintain compliance with our guidelines.
  
  If you believe this was done in error or would like further clarification, please feel free to reach out to us.
  
  Thank you for your understanding.
  
  Best regards,  
  Roamify Team
  `,
  bookedActivityEmail: (activityName, activityDate, receipt) => {
    // Destructure receipt details
    const { type, status, price, receiptType, createdAt } = receipt;

    // Return the formatted email content
    return `
      <h1>Booking Confirmation</h1>
      <p>Thank you for booking the activity: <strong>${activityName}</strong>.</p>
      <p>Here are the details of your transaction:</p>
      <ul>
        <li><strong>Receipt Type:</strong> ${receiptType}</li>
        <li><strong>Booking Type:</strong> ${type}</li>
        <li><strong>Date:</strong> ${activityDate}</li>
        <li><strong>Status:</strong> ${status}</li>
        <li><strong>Amount Paid:</strong> $${(price / 100).toFixed(2)}</li>
        <li><strong>Date:</strong> ${new Date(createdAt).toLocaleDateString()}</li>
      </ul>
      <p>If you have any questions, feel free to contact us.</p>
      <p>Best regards,</p>
      <p>Roamify Travel</p>
    `;
  },
  bookedItineraryEmail: (itineraryName, itineraryDate, receipt) => {
    // Destructure receipt details
    const { type, status, price, receiptType, createdAt } = receipt;

    // Return the formatted email content
    return `
      <h1>Booking Confirmation</h1>
      <p>Thank you for booking the itinerary: <strong>${itineraryName}</strong>.</p>
      <p>Here are the details of your transaction:</p>
      <ul>
        <li><strong>Receipt Type:</strong> ${receiptType}</li>
        <li><strong>Booking Type:</strong> ${type}</li>
        <li><strong>Date:</strong> ${itineraryDate}</li>
        <li><strong>Status:</strong> ${status}</li>
        <li><strong>Amount Paid:</strong> $${(price / 100).toFixed(2)}</li>
        <li><strong>Date:</strong> ${new Date(createdAt).toLocaleDateString()}</li>
      </ul>
      <p>If you have any questions, feel free to contact us.</p>
      <p>Best regards,</p>
      <p>Roamify Travel</p>
    `;
  },
};
