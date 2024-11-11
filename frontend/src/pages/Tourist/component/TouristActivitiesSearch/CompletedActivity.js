import React, { useEffect, useState } from "react";
import axios from "axios";
import SectionHeading from "../../../../component/Common/SectionHeading";
import { Link, useNavigate } from "react-router-dom";
//  import "./TouristItinerary.css";
import CommonBanner from "../../../../component/Common/CommonBanner";
import { HeaderData } from "../../TouristHeaderData";
import Header from "../../../../layout/Header";
const CompletedActivity = () => {
  const [itineraries, setItineraries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const navigate = useNavigate(); // Initialize useNavigate for redirection

  const fetchItineraries = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get("http://localhost:3000/api/tourist/activity/unrated", {
        withCredentials: true,
      });
      setItineraries(response.data.activities || []);
    } catch (error) {
      setItineraries([]);
      setError(
        error.response && error.response.status === 404
          ? "No activities found"
          : "An error occurred while fetching activities."
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
     <CommonBanner heading="Rate Activity" pagination="activity" />
    <section id="explore_area" className="section_padding">
      <div className="container">
        <SectionHeading heading={`${itineraries?.length || 0} activities found`} />
        <div className="row">
          <div className="col-lg-9">
            {loading ? (
              <p>Loading activity...</p>
            ) : error ? (
              <p>{error}</p>
            ) : (
              <div className="flight_search_result_wrapper">
                {itineraries.length > 0 ? (
                  itineraries.map((itinerary) => (
                    <div className="flight_search_item_wrapper" key={itinerary.activityId}>
                      <div className="flight_search_items">
                        <h3 className="itinerary-name">{itinerary.activityName}</h3>
                        <div className="itinerary-section">
                          <p>
                            <strong>Name:</strong> {itinerary.activityName}
                          </p>
                        </div>
                        <div className="booking-section">
                          <button
                            onClick={() => navigate(`/activity-details/${itinerary.activityId}`)}
                            className="btn btn_theme btn_sm"
                          >
                            Review
                          </button>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <p>No activities available.</p>
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

export default CompletedActivity;
