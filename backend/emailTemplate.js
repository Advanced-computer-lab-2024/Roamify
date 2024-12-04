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
  reminderForActivity: (activityName, activityDate, activityLocation, username) => {
    return `
        Hi ${username},

        We hope you're as excited as we are! This is a friendly reminder that you've booked an activity scheduled for tomorrow. Here are the details:

        - Activity Name: ${activityName}
        - Date & Time: ${activityDate}
        - Location: ${activityLocation}

        Please make sure to arrive on time and bring any necessary items or documents mentioned during the booking process. If you have any questions or need assistance, feel free to reply to this emaail.

        We look forward to seeing you there and hope you have a fantastic experience!

        Best regards,
        Roamify Travel
    `;
  },
  reminderForItinerary: (itineraryName, itineraryDate, username) => {
    return `
        Hi ${username},

        We hope you're as excited as we are! This is a friendly reminder that you've booked an activity scheduled for tomorrow. Here are the details:

        - Activity Name: ${itineraryName}
        - Date & Time: ${itineraryDate}
        

        Please make sure to arrive on time and bring any necessary items or documents mentioned during the booking process. If you have any questions or need assistance, feel free to reply to this emaail.

        We look forward to seeing you there and hope you have a fantastic experience!

        Best regards,
        Roamify Travel
    `;
  },
  notifyBookedUsersForUpdateInActivity: (activityName, activityDate, activityLocation, username) => {
    return `
Hi ${username},

We hope this message finds you well. We’re writing to inform you about an update to an activity you’ve booked with us. Here are the new details:

    Activity Name: ${activityName}
    New Date & Time: ${activityDate}
    Location: ${activityLocation}

We apologize for any inconvenience caused and appreciate your understanding. Please make sure to note the updated details and prepare accordingly.

If you have any questions or require assistance, don’t hesitate to reply to this email or contact our support team.

We look forward to seeing you soon and hope you enjoy this updated experience!

Best regards,
Roamify Travel    `;
  },

};
