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
  `
};
