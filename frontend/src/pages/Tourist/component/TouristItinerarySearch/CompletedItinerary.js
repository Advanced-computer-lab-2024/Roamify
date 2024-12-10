import React, { useEffect, useState } from "react";
import axios from "axios";
import SectionHeading from "../../../../component/Common/SectionHeading";
import { Link, useNavigate } from "react-router-dom";
//  import "./TouristItinerary.css";
import CommonBanner from "../../../../component/Common/CommonBanner";
import { HeaderData } from "../../TouristHeaderData";
import Header from "../../../../layout/Header";
import LoadingLogo from "../../../../component/LoadingLogo";
import { renderStars } from "../../../../functions/renderStars";
// Import react-icons for the location icon
import { FaMapMarkerAlt } from "react-icons/fa"; 

const CompletedItinerary = () => {
  const [itineraries, setItineraries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const navigate = useNavigate(); // Initialize useNavigate for redirection

  const fetchItineraries = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get(
        "http://localhost:3000/api/tourist/get-all-booked-itineraries",
        {
          withCredentials: true,
        }
      );
      setItineraries(response.data || []);
      console.log(response.data);
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
  }, []); // Add dependency array to avoid infinite fetch calls

  return (
    <>
      {/* <CommonBanner heading="Rate Itinerary" pagination="itinerary" /> */}
      <section id="explore_area" className="section_padding">
        <div className="container">
          <SectionHeading
            heading={`${itineraries?.length || 0} itineraries found`}
          />
          <div className="row">
            <div className="col-lg-9">
              {loading ? (
                <LoadingLogo isVisible={true} />
              ) : error ? (
                <p>{error}</p>
              ) : (
                <div className="flight_search_result_wrapper">
                  {itineraries.length > 0 ? (
                    itineraries?.map((itinerary, index) => (
                      <div key={itinerary._id}>
                        <div
                          className="flight_search_items"
                          style={{
                            background: "var(--secondary-color)",
                            height: "20vh",
                          }}
                        >
                          <div
                            className="left-side"
                            style={{
                              height: "100%",
                              padding: "30px 30px",
                              display: "flex",
                              gap: "20px",
                              flexDirection: "column",
                              alignItems: "baseline",
                              width: "100%",
                            }}
                          >
                            <p style={{ fontSize: "28px" }}>
                              {itinerary.itinerary.name}
                            </p>
                            <div style={{ display: "flex", alignItems: "center" }}>
                              <FaMapMarkerAlt style={{ marginRight: "10px" }} />
                              <p style={{ fontSize: "20px" }}>
                                {itinerary.itinerary.locations.join(', ')}
                              </p>
                            </div>

                            <div
                              className="activity-tags"
                              style={{
                                display: "flex",
                                flexWrap: "wrap",
                                gap: "10px",
                                justifyContent: "flex-start",
                              }}
                            ></div>
                          </div>
                          <div
                            className="flight_search_right"
                            style={{
                              background: "var(--main-color)",
                              height: "100%",
                              width: "40%",
                              display: "flex",
                              gap: "20px",
                              flexDirection: "column",
                              justifyContent: "space-evenly",
                            }}
                          >
                            <h3>Points Redeemed: {itinerary.pointsRedeemed ? 'Yes' : 'No'}</h3>

                            {itinerary.isReviewed ? (
                              <p>Already Reviewed</p>
                            ) : (
                              <button
                                onClick={() =>
                                  navigate(
                                    `/tourist/itinerary-details/${itinerary.itinerary._id}`
                                  )
                                }
                                className="btn btn_theme btn_sm"
                              >
                                Review
                              </button>
                            )}
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
