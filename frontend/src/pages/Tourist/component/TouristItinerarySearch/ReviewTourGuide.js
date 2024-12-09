import React, { useEffect, useState } from "react";
import axios from "axios";
import SectionHeading from "../../../../component/Common/SectionHeading";
import { useNavigate } from "react-router-dom";
import CommonBanner from "../../../../component/Common/CommonBanner";
import { HeaderData } from "../../TouristHeaderData";
import Header from "../../../../layout/Header";
import ReviewArea from "./TourGuideReviewArea";

const ReviewTourGuide = () => {
  const [itineraries, setItineraries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedTourGuideId, setSelectedTourGuideId] = useState(null); // State to track the selected tour guide for review

  const navigate = useNavigate();

  const fetchItineraries = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get(
        "http://localhost:3000/api/tourist/tour-guide/unrated",
        {
          withCredentials: true,
        }
      );
      setItineraries(response.data.tourGuides || []);
    } catch (error) {
      setItineraries([]);
      setError(
        error.response.data.message
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchItineraries();
  }, []);

  return (
    <>
      
      <CommonBanner heading="Rate Tour Guide" pagination="tourguide" />
      <section id="explore_area" className="section_padding">
        <div className="container">
          <SectionHeading
            heading={`${itineraries?.length || 0} itineraries found`}
          />
          <div className="row">
            <div className="col-lg-9">
              {loading ? (
                <p>Loading tourguides...</p>
              ) : error ? (
                <p>{error}</p>
              ) : (
                <div className="flight_search_result_wrapper">
                  {itineraries.length > 0 ? (
                    itineraries.map((itinerary) => (
                      <div
                        className="flight_search_item_wrapper"
                        key={itinerary.tourGuideId}
                      >
                        <div className="flight_search_items">
                          <h3 className="itinerary-name">
                            {itinerary.tourGuideName}
                          </h3>
                          <div className="itinerary-section">
                            <p>
                              <strong>Name:</strong> {itinerary.tourGuideName}
                            </p>
                          </div>
                          <div className="booking-section">
                            <button
                              onClick={() =>
                                setSelectedTourGuideId(itinerary.tourGuideId)
                              } // Set the selected tour guide ID
                              className="btn btn_theme btn_sm"
                            >
                              Review
                            </button>
                          </div>
                        </div>
                      </div>
                    ))
                  ) : (
                    <p>No tour guides available.</p>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Conditionally render the ReviewArea component as a pop-up */}
      {selectedTourGuideId && (
        <div className="popup-container">
          <div className="popup-content">
            <button
              onClick={() => setSelectedTourGuideId(null)}
              className="close-button"
            >
              &times;
            </button>
            <ReviewArea tourGuideId={selectedTourGuideId} />
          </div>
        </div>
      )}
    </>
  );
};

export default ReviewTourGuide;
