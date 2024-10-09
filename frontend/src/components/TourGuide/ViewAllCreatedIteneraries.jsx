import React, { useState, useEffect } from "react";
import "./TourGuideItinerary.css"; // Import main CSS for styling
import axios from "axios";

const ViewAllCreatedItineraries = () => {
  const [itineraries, setItineraries] = useState([]);
  const [error, setError] = useState(null);

  // Fetch the list of all itineraries when the component mounts
  useEffect(() => {
    const fetchItineraries = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3000/tourguide/get-itinearies"
        );
        console.log("API Response:", response.data); // Log response for debugging

        // Set the itineraries if the response data is an array
        if (Array.isArray(response.data)) {
          setItineraries(response.data);
        } else {
          console.warn("Unexpected response structure:", response.data);
        }
      } catch (err) {
        console.error("Error fetching itineraries:", err.message);
        setError("Failed to fetch itineraries. Please try again later.");
      }
    };

    fetchItineraries();
  }, []); // Correct placement of dependency array

  console.log(itineraries);
  return (
    <div className="itinerary-list-page flex flex-col items-center p-5 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-semibold mb-5">All Created Itineraries</h1>
      <div className="flex flex-col gap-4 bg-white p-6 rounded-lg shadow-md w-full max-w-3xl">
        {error ? (
          <p className="text-center text-red-500">{error}</p>
        ) : itineraries.length === 0 ? (
          <p className="text-center">No itineraries available.</p>
        ) : (
          <ul className="itinerary-list">
            {itineraries.map((itinerary) => (
              <li
                key={itinerary._id}
                className="flex justify-between items-center p-4 border-b border-gray-300"
              >
                <div>
                  <h3 className="font-semibold text-lg">{itinerary.name}</h3>
                  <p>
                    Activities:{" "}
                    {Array.isArray(itinerary.activities) &&
                    itinerary.activities.length > 0
                      ? itinerary.activities.join(", ")
                      : "No activities specified"}
                  </p>
                  <p>
                    Locations:{" "}
                    {Array.isArray(itinerary.locations) &&
                    itinerary.locations.length > 0
                      ? itinerary.locations.join(", ")
                      : "No locations specified"}
                  </p>
                  <p>
                    Available Dates:{" "}
                    {Array.isArray(itinerary.availableDates) &&
                    itinerary.availableDates.length > 0
                      ? itinerary.availableDates
                          .map((date) => new Date(date).toLocaleDateString())
                          .join(", ")
                      : "No available dates"}
                  </p>
                  <p>
                    Language: {itinerary.language || "Language not specified"}
                  </p>
                  <p>Price: ${itinerary.price || "Price not specified"}</p>
                  <p>
                    Pick-up Location:{" "}
                    {itinerary.pickUpLocation ||
                      "Pick-up location not specified"}
                  </p>
                  <p>
                    Drop-off Location:{" "}
                    {itinerary.dropOffLocation ||
                      "Drop-off location not specified"}
                  </p>
                  <p>Accessibility: {itinerary.accessibility ? "Yes" : "No"}</p>
                  <p>Booked: {itinerary.booked ? "Yes" : "No"}</p>
                  <p>
                    Preference Tags:{" "}
                    {itinerary.preferenceTags &&
                    itinerary.preferenceTags.length > 0
                      ? itinerary.preferenceTags
                          .map((tag) => tag.name)
                          .join(", ")
                      : "No preference tags available"}
                  </p>
                  <p>Rating: {itinerary.rating || "No rating available"}</p>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default ViewAllCreatedItineraries;
