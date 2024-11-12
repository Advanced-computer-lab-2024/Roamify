import React, { useEffect, useState } from "react";
import axios from "axios";
import SectionHeading from "../../../component/Common/SectionHeading";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFlag, faFlagCheckered } from "@fortawesome/free-solid-svg-icons";

const ItineraryList = () => {
  const [itineraries, setItineraries] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchItineraries = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3000/api/itinerary",
          {
            withCredentials: true,
          }
        );
        setItineraries(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching itineraries:", error);
        setLoading(true);
      }
    };
    fetchItineraries();
  }, []);

  const handleFlagToggle = async (itineraryId, isFlagged) => {
    try {
      if (isFlagged) {
        await axios.put(
          "http://localhost:3000/api/admin/unflag-itinerary",
          { itineraryIdString: itineraryId },
          { withCredentials: true }
        );
        alert("Itinerary unflagged successfully!");
      } else {
        await axios.put(
          "http://localhost:3000/api/admin/flag-itinerary",
          { itineraryIdString: itineraryId },
          { withCredentials: true }
        );
        alert("Itinerary flagged successfully!");
      }
      // Refresh itineraries after flagging/unflagging
      const response = await axios.get("http://localhost:3000/api/itinerary/", {
        withCredentials: true,
      });
      setItineraries(response.data.updatedItineraries);
    } catch (error) {
      console.error("Error toggling flag:", error);
      alert("An error occurred. Please try again.");
    }
  };

  return (
    <>
      <section id="explore_area" className="section_padding">
        <div className="container">
          <SectionHeading heading={`${itineraries?.length} tours found`} />
          <div className="row">
            <div className="col-lg-9">
              <div className="row">
                <div className="col-lg-12">
                  <div className="flight_search_result_wrapper">
                    {loading ? (
                      <p>Loading itineraries...</p>
                    ) : (
                      itineraries?.map((itinerary, index) => (
                        <div
                          className="flight_search_item_wrappper"
                          key={itinerary._id}
                        >
                          <div className="flight_search_items">
                            <div className="multi_city_flight_lists">
                              <div className="flight_multis_area_wrapper">
                                <div className="flight_search_left">
                                  <div className="flight_search_destination">
                                    <h1>{itinerary.name}</h1>
                                  </div>
                                </div>
                                <div className="flight_search_middel">
                                  <div className="flight_right_arrow">
                                    <h6>{itinerary.activities[0]?.name}</h6>
                                    <p>
                                      {itinerary.activities[0]?.location?.name}
                                    </p>
                                  </div>
                                  <div className="flight_search_destination">
                                    <p>Tour Guide</p>
                                    <h3>{itinerary.tourGuide.username}</h3>
                                    <h6>{itinerary.tourGuide.email}</h6>
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div className="flight_search_right">
                              <h2>
                                ${itinerary.price}
                                <sup>Special offer</sup>
                              </h2>
                              <button
                                className="btn btn_theme btn_sm"
                                onClick={() =>
                                  handleFlagToggle(
                                    itinerary._id,
                                    itinerary.flag
                                  )
                                }
                              >
                                {itinerary.flag ? (
                                  <>
                                    <FontAwesomeIcon icon={faFlagCheckered} />
                                    Unflag
                                  </>
                                ) : (
                                  <>
                                    <FontAwesomeIcon icon={faFlag} />
                                    Flag
                                  </>
                                )}
                              </button>
                              <p>*Conditions apply</p>
                              <div
                                data-bs-toggle="collapse"
                                data-bs-target={`#collapseExample${index}`}
                                aria-expanded="false"
                                aria-controls={`collapseExample${index}`}
                              >
                                Show more{" "}
                                <i className="fas fa-chevron-down"></i>
                              </div>
                            </div>
                          </div>
                          <div
                            className="flight_policy_refund collapse"
                            id={`collapseExample${index}`}
                          >
                            <div className="flight_show_down_wrapper">
                              <div className="flight-shoe_dow_item">
                                <div className="airline-details">
                                  <span className="airlineName fw-500">
                                    {itinerary.activities[0]?.name}
                                  </span>
                                  <span className="flightNumber">
                                    {itinerary.activities[0]?.category?.name}
                                  </span>
                                </div>
                                <div className="flight_inner_show_component">
                                  <div className="flight_det_wrapper">
                                    <div className="flight_det">
                                      <div className="code_time">
                                        <span className="code">Location</span>
                                        <span className="time">
                                          {itinerary.pickUpLocation}
                                        </span>
                                      </div>
                                      <p className="airport">Drop-off</p>
                                      <p className="date">
                                        {itinerary.dropOffLocation}
                                      </p>
                                    </div>
                                  </div>
                                  <div className="flight_duration">
                                    <span>{itinerary.language}</span>
                                  </div>
                                </div>
                              </div>
                              <div className="flight_refund_policy">
                                <div className="TabPanelInner flex_widht_less">
                                  <h4>Details</h4>
                                  <p>
                                    Accessibility:{" "}
                                    {itinerary.accessibility ? "Yes" : "No"}
                                  </p>
                                  <p>Rating: {itinerary.rating}</p>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                  <div className="load_more_flight">
                    <button className="btn btn_md">
                      <i className="fas fa-spinner"></i> Load more..
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default ItineraryList;
