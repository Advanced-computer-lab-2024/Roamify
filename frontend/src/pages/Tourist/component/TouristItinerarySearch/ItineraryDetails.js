import React, { useState, useEffect } from "react";
import axios from "axios";
import CommonBanner from "../../../../component/Common/CommonBanner";
import { useParams } from "react-router-dom";
import ReviewArea from "./ReviewArea.js";
import Header from "../../../../layout/Header.js";
import { HeaderData } from "../../TouristHeaderData.js";
const ItineraryDetails = ({ itineraryId }) => {
  const [itinerary, setItinerary] = useState(null);
  const { id } = useParams();
  // Fetch itinerary details based on the provided ID
  useEffect(() => {
    const fetchItineraries = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3000/api/itinerary",
          {
            withCredentials: true,
          }
        );
        const foundItinerary = response.data.find(
          (itinerary) => itinerary._id === id
        );
        setItinerary(foundItinerary);
      } catch (error) {
        console.error("Error fetching itinerary:", error);
      }
    };
    fetchItineraries();
  }, [itineraryId]);

  if (!itinerary) return <p>Loading itinerary details...</p>;

  return (
    <>
      <Header HeaderData={HeaderData} />
      <CommonBanner heading={itinerary.name} pagination="Itinerary Details" />
      <section className="itinerary_details_section">
        <div className="container">
          <div className="row">
            <div className="col-lg-8">
              <h2>{itinerary.name}</h2>
              <p>
                <strong>Tour Guide:</strong> {itinerary.tourGuide.username} (
                {itinerary.tourGuide.email})
              </p>
              <h3>{itinerary.price} EGP</h3>
              <p>{itinerary.description}</p>
            </div>
            <div className="col-lg-4">
              <h4>Details</h4>
              <p>
                <strong>Language:</strong> {itinerary.language}
              </p>
              <p>
                <strong>Pick-Up Location:</strong> {itinerary.pickUpLocation}
              </p>
              <p>
                <strong>Drop-Off Location:</strong> {itinerary.dropOffLocation}
              </p>
              <p>
                <strong>Accessibility:</strong>{" "}
                {itinerary.accessibility ? "Yes" : "No"}
              </p>
              <p>
                <strong>Rating:</strong> {itinerary.rating}
              </p>
            </div>
          </div>
        </div>
        <ReviewArea itineraryId={id} />
      </section>
    </>
  );
};

export default ItineraryDetails;
