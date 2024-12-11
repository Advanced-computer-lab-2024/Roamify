import React, { useEffect, useState } from "react";
import axios from "axios";
import SectionHeading from "../../../component/Common/SectionHeading";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFlag, faFlagCheckered } from "@fortawesome/free-solid-svg-icons";
import LoadingLogo from "../../../component/LoadingLogo";
import { renderStars } from "../../../functions/renderStars";

const ItineraryList = () => {
  const [itineraries, setItineraries] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchItineraries = async () => {
    try {
      const response = await axios.get("http://localhost:3000/api/itinerary", {
        withCredentials: true,
      });
      setItineraries(response.data.itineraries);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching itineraries:", error);
      setLoading(true);
    }
  };

  useEffect(() => {
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
      fetchItineraries();
    } catch (error) {
      console.error("Error toggling flag:", error);
      alert("An error occurred. Please try again.");
    }
  };

  return (
    <>
      <section id="explore_area" className="section_padding">
        <div className="container">
          <SectionHeading
            heading={`${itineraries?.length} itineraries found`}
          />
          <div className="row" style={{ width: "100%" }}>
            <div className="col-lg-9" style={{ width: "100%" }}>
              <div className="row">
                <div className="col-lg-12">
                  <div className="flight_search_result_wrapper">
                    {loading ? (
                      <LoadingLogo isVisible={true} size="100px" />
                    ) : (
                      itineraries?.map((itinerary, index) => (
                        <div key={itinerary._id}>
                          <div
                            className="flight_search_items"
                            style={{
                              background: "var(--secondary-color)",
                              height: "30vh",
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
                                {itinerary.name}
                              </p>
                              <span className="review-rating">
                                {renderStars(itinerary.rating)}
                              </span>
                              <span className="review-rating">
                                Language :{" "}
                                <span
                                  style={{
                                    color: "var(--dashboard-title-color)",
                                  }}
                                >
                                  {itinerary.language}
                                </span>
                              </span>
                              <div
                                className="activity-tags"
                                style={{
                                  display: "flex",
                                  flexWrap: "wrap",
                                  gap: "10px",
                                  justifyContent: "flex-start",
                                }}
                              >
                                {itinerary.preferenceTags.map((tag, index) => (
                                  <>
                                    <span
                                      key={index}
                                      style={{
                                        whiteSpace: "nowrap",
                                        fontSize: "14px",
                                        color: "var(--dashboard-title-color)",
                                      }}
                                    >
                                      {tag.name}
                                    </span>
                                    {index <
                                      itinerary.preferenceTags.length - 1 && (
                                      <span
                                        style={{
                                          margin: "0px 5px",
                                          color: "var(--main-color)", // You can replace this with your desired color
                                          display: "flex",
                                          justifyContent: "center",
                                          alignItems: "center",
                                        }}
                                      >
                                        <i
                                          className="fas fa-circle"
                                          style={{ fontSize: "7px" }}
                                        ></i>
                                      </span>
                                    )}
                                  </>
                                ))}
                              </div>
                            </div>
                            <div
                              className="flight_search_right"
                              style={{
                                background: "var(--secondary-border-color)",
                                height: "100%",
                                width: "20%",
                                display: "flex",
                                gap: "20px",
                                flexDirection: "column",
                                // alignItems: "center",
                                justifyContent: "space-evenly",
                              }}
                            >
                              <h2>${itinerary.price}</h2>
                              <button
                                className=" btn_theme btn_sm"
                                onClick={() =>
                                  handleFlagToggle(
                                    itinerary._id,
                                    itinerary.flag
                                  )
                                }
                                style={{
                                  border: "1px solid var(--main-color)",
                                  display: "flex",
                                  justifyContent: "center",
                                  alignItems: "center",
                                  gap: "10px",
                                  height: "7vh",
                                }}
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
                              <div
                                className="flight-shoe_dow_item"
                                style={{
                                  flex: "1",
                                  display: "flex",
                                  flexDirection: "column",
                                  alignItems: "center",
                                  justifyContent: "center",
                                  padding: "50px 20px",
                                }}
                              >
                                <div className="flight_inner_show_component">
                                  <div className="flight_det_wrapper">
                                    <div className="flight_det">
                                      <p className="airport">
                                        {itinerary.pickUpLocation}
                                      </p>
                                    </div>
                                  </div>
                                  <div className="flight_duration">
                                    <div className="arrow_right"></div>
                                    <span>01h 15m</span>
                                  </div>
                                  <div className="flight_det_wrapper">
                                    <div className="flight_det">
                                      <p className="airport">
                                        {itinerary.dropOffLocation}
                                      </p>
                                    </div>
                                  </div>
                                </div>
                              </div>
                              <div
                                className="flight_refund_policy"
                                style={{ flex: 2 }}
                              >
                                <div
                                  className="TabPanelInner flex_widht_less"
                                  style={{ flex: 1 }}
                                >
                                  <h4>Pickup Dates</h4>
                                  <div className="flight_info_taable">
                                    {itinerary.availableDates.map(
                                      (date, index) => (
                                        <p className="fz12">
                                          -{" "}
                                          {
                                            new Date(date)
                                              .toISOString()
                                              .split("T")[0]
                                          }
                                        </p>
                                      )
                                    )}
                                  </div>
                                </div>
                                <div
                                  className="TabPanelInner flex_widht_less"
                                  style={{ flex: 1 }}
                                >
                                  <h4>Activities</h4>
                                  <div className="flight_info_taable">
                                    {itinerary.activities.map(
                                      (activity, index) => (
                                        <p className="fz12">
                                          {index + 1}. {activity.name}
                                        </p>
                                      )
                                    )}
                                  </div>
                                </div>
                                <div
                                  className="TabPanelInner"
                                  style={{ flex: 1 }}
                                >
                                  <h4>Locations</h4>
                                  <div className="flight_info_taable">
                                    {itinerary.locations.map((location) => (
                                      <h3>{location}</h3>
                                    ))}
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))
                    )}
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
