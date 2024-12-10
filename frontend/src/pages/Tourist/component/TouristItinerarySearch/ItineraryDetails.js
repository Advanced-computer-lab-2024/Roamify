import React, { useState, useEffect } from "react";
import axios from "axios";
import CommonBanner from "../../../../component/Common/CommonBanner";
import { useParams } from "react-router-dom";
import ReviewArea from "./ReviewArea.js";
import Header from "../../../../layout/Header.js";
import { HeaderData } from "../../TouristHeaderData.js";
import { FaMapMarkerAlt, FaAccessibleIcon } from "react-icons/fa"; // Location & Accessibility Icons
import { GiPriceTag } from "react-icons/gi"; // Price Icon

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
      {/* <Header HeaderData={HeaderData} /> */}
      <section className="itinerary_details_section" style={{ padding: "50px 0",background: "var(--secondary-color)" }}>
        <div className="container">
          <div className="row">
            {/* Left Column: Main Itinerary Info */}
            <div className="col-lg-8">
              <div className="itinerary-card" style={{ padding: "20px", borderRadius: "8px", background: "var(--secondary-color)", boxShadow: "0 4px 8px rgba(0,0,0,0.1)" }}>
                <h2 style={{ fontSize: "2rem", fontWeight: "600" }}>{itinerary.name}</h2>
                <p style={{ fontSize: "1.1rem", margin: "10px 0" }}>
                  <strong>Tour Guide:</strong> {itinerary.tourGuide.username} (
                  {itinerary.tourGuide.email})
                </p>
                <div style={{ fontSize: "1.5rem", fontWeight: "500", color: "#27ae60", margin: "10px 0" }}>
                  <GiPriceTag style={{ marginRight: "10px" }} />
                  {itinerary.price} EGP
                </div>
                <p style={{ margin: "20px 0", lineHeight: "1.6" }}>{itinerary.description}</p>
              </div>
            </div>

            {/* Right Column: Itinerary Details */}
            <div className="col-lg-4">
              <div className="itinerary-card" style={{ padding: "20px", borderRadius: "8px", background: "var(--secondary-color)", boxShadow: "0 4px 8px rgba(0,0,0,0.1)" }}>
                <h4>Itinerary Details</h4>
                <p><strong>Language:</strong> {itinerary.language}</p>
                <div style={{ display: "flex", alignItems: "center", marginBottom: "10px" }}>
                  <FaMapMarkerAlt style={{ marginRight: "10px", color: "#3498db" }} />
                  <p><strong>Pick-Up Location:</strong> {itinerary.pickUpLocation}</p>
                </div>
                <div style={{ display: "flex", alignItems: "center", marginBottom: "10px" }}>
                  <FaMapMarkerAlt style={{ marginRight: "10px", color: "#3498db" }} />
                  <p><strong>Drop-Off Location:</strong> {itinerary.dropOffLocation}</p>
                </div>
                <div style={{ display: "flex", alignItems: "center", marginBottom: "10px" }}>
                  <FaAccessibleIcon style={{ marginRight: "10px", color: "#f39c12" }} />
                  <p><strong>Accessibility:</strong> {itinerary.accessibility ? "Yes" : "No"}</p>
                </div>
                <p><strong>Rating:</strong> {itinerary.rating} / 5</p>
              </div>
            </div>
          </div>
        </div>

        {/* Review Section */}
        <ReviewArea itineraryId={id} />
      </section>
    </>
  );
};

export default ItineraryDetails;
