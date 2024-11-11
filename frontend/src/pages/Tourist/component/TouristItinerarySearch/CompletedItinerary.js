import React, { useEffect, useState } from "react";
import axios from "axios";
import SectionHeading from "../../../../component/Common/SectionHeading";
import { Link, useNavigate } from "react-router-dom";
//  import "./TouristItinerary.css";
import CommonBanner from "../../../../component/Common/CommonBanner";
import { HeaderData } from "../../TouristHeaderData";
import Header from "../../../../layout/Header";
const CompletedItinerary = () => {
  const [itineraries, setItineraries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const navigate = useNavigate(); // Initialize useNavigate for redirection

  const fetchItineraries = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get("http://localhost:3000/api/tourist/itinerary/unrated", {
        withCredentials: true,
      });
      setItineraries(response.data.itineraries || []);
    } catch (error) {
      setItineraries([]);
      setError(
        error.response && error.response.status === 404
          ? "No itineraries found"
          : "An error occurred while fetching itineraries."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchItineraries();
  }, []); // Add dependency array to avoid infinite fetch calls

  return (
    <>
     <Header HeaderData={HeaderData} />
     <CommonBanner heading="Rate Itinerary" pagination="itinerary" />
    <section id="explore_area" className="section_padding">
      <div className="container">
        <SectionHeading heading={`${itineraries?.length || 0} itineraries found`} />
        <div className="row">
          <div className="col-lg-9">
            {loading ? (
              <p>Loading itineraries...</p>
            ) : error ? (
              <p>{error}</p>
            ) : (
              <div className="flight_search_result_wrapper">
                {itineraries.length > 0 ? (
                  itineraries.map((itinerary) => (
                    <div className="flight_search_item_wrapper" key={itinerary.itineraryId}>
                      <div className="flight_search_items">
                        <h3 className="itinerary-name">{itinerary.itineraryName}</h3>
                        <div className="itinerary-section">
                          <p>
                            <strong>Name:</strong> {itinerary.itineraryName}
                          </p>
                        </div>
                        <div className="booking-section">
                          <button
                            onClick={() => navigate(`/itinerary-details/${itinerary.itineraryId}`)}
                            className="btn btn_theme btn_sm"
                          >
                            Review
                          </button>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <p>No itineraries available.</p>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
    </>
  );
};

export default CompletedItinerary;
