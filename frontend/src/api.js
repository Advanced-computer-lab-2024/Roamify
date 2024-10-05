import axios from 'axios';

// Base URL of your backend API (adjust if necessary)
const API_URL = 'http://localhost:3000/api'; 

// Fetch upcoming activities from the backend
export const fetchUpcomingItems = async () => {  // Change the function name to match App.jsx
  try {
    const response = await axios.get(`${API_URL}/upcoming`);
    return response.data; // Adjust based on the structure of your response
  } catch (error) {
    console.error("Error fetching upcoming items:", error);
    return {
      upcomingActivities: [], // Make sure to return an empty structure if error occurs
      upcomingItineraries: [],
      upcomingPlaces: []
    };
  }
};

// Search for specific items (activities, places, itineraries)
export const searchItems = async (query, type) => {
  try {
    const response = await axios.get(`${API_URL}/search`, {
      params: { query, type },
    });
    return response.data;
  } catch (error) {
    console.error("Error searching items:", error);
    return [];
  }
};

