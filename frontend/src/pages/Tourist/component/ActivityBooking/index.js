import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { FaMapMarkerAlt } from "react-icons/fa";
import LoadingLogo from "../../../../component/LoadingLogo";
import { renderStars } from "../../../../functions/renderStars";
import EmptyResponseLogo from "../../../../component/EmptyResponseLogo";

const BookedActivitiesWrapper = () => {
  const [bookedActivities, setBookedActivities] = useState([]);
  const [filter, setFilter] = useState("All");
  const [loading, setLoading] = useState(true);
  const currencySymbol = localStorage.getItem("currencySymbol") || "$";
  const exchangeRate = parseFloat(localStorage.getItem("value")) || 1;
  const [error, setError] = useState(null);
  const [popupMessage, setPopupMessage] = useState("");
  const [selectedBooking, setSelectedBooking] = useState(null); // To store the booking to cancel
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBookedActivities = async () => {
      setLoading(true);
      setError(null);

      const statusQuery =
        filter === "All" ? "" : `?status=${filter.toLowerCase()}`;
      const url = `http://localhost:3000/api/tourist/get-all-upcoming-booked-activities${statusQuery}`;

      try {
        const response = await axios.get(url, { withCredentials: true });
        // Filter out any bookings without a valid activity or activity ID
        const validBookings = response.data;
        // .filter(
        //   (booking) => booking.activity && booking.activity._id
        // );
        setBookedActivities(validBookings);
      } catch (err) {
        if (err.response && err.response.status === 400) {
          setError(
            ` ${
              err.response.data.message ||
              "Something went wrong. Please try again later."
            }`
          );
        } else {
          setError(
            "Failed to fetch booked itineraries. Please try again later."
          );
        }
      } finally {
        setLoading(false);
      }
    };

    fetchBookedActivities();
  }, [filter]);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return `${date.getDate().toString().padStart(2, "0")}/${(
      date.getMonth() + 1
    )
      .toString()
      .padStart(2, "0")}/${date.getFullYear()}`;
  };

  const handleCancelBooking = async () => {
    if (!selectedBooking) {
      setPopupMessage("No activity selected to cancel.");
      return;
    }

    try {
      await axios.delete(
        "http://localhost:3000/api/tourist/cancel-activity-booking",
        {
          data: { ticketId: selectedBooking },
          withCredentials: true,
        }
      );

      setBookedActivities((prevActivities) =>
        prevActivities.filter((booking) => booking._id !== selectedBooking)
      );

      setPopupMessage("Cancelled successfully");
      setSelectedBooking(null); // Reset selected booking
    } catch (err) {
      setPopupMessage(err.response.data.message);
    }
  };

  const handleActivityClick = (activityId) => {
    navigate(`/activity-details/${activityId}`);
  };

  const openCancelConfirmation = (ticketId) => {
    setSelectedBooking(ticketId); // Set the booking to cancel
    setPopupMessage("Are you sure you want to cancel this booking?");
  };

  const closePopup = () => {
    setPopupMessage(""); // Close the popup
    setSelectedBooking(null); // Reset selected booking
  };

  return (
    <section
      id="explore_area"
      className="section_padding"
      style={{ minHeight: "100vh" }}
    >
      <div className="section_heading_center">
        <h2>Upcoming Booked Activities</h2>
      </div>

      <div className="container">
        <div
          className="row"
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: "10px",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <div className="col-lg-9">
            {loading ? (
              <LoadingLogo isVisible={true} size="100px" />
            ) : bookedActivities.length === 0 ? (
              <EmptyResponseLogo isVisible={true} text={error} size="300px" />
            ) : (
              <div
                className="flight_search_result_wrapper"
                style={{ display: "flex", flexWrap: "wrap", gap: "20px" }}
              >
                {bookedActivities.map((activity) => (
                  <div
                    className="flight_search_item_wrappper"
                    key={activity._id}
                  >
                    <div
                      className=""
                      style={{
                        display: "flex",
                        background: "var(--secondary-color)",
                        borderRadius: "10px", // Optional: to round the corners of the box
                        boxShadow:
                          "0 4px 8px rgba(0, 0, 0, 0.1), 0 6px 20px rgba(0, 0, 0, 0.1)", // Shadow effect
                        transition: "box-shadow 0.3s ease", // Smooth transition on hover
                      }}
                    >
                      <div
                        className="flight_search_left"
                        style={{
                          flex: "1",
                          height: "100%",
                          padding: "30px 0px",
                          display: "flex",
                          gap: "20px",
                          flexDirection: "column",
                          alignItems: "baseline",
                          width: "100%",
                        }}
                      >
                        <div
                          className="flight_search_destination"
                          style={{
                            display: "flex",
                            flexDirection: "column",
                            justifyContent: "left",
                            gap: "10px",
                          }}
                        >
                          <h3
                            style={{
                              fontSize: "28px",
                              color: "var(--text-color)",
                              textAlign: "left",
                            }}
                          >
                            {activity.name}
                          </h3>
                          <span className="review-rating">
                            {renderStars(activity.rating)}
                          </span>
                          <p style={{ color: "var(--dashboard-title-color)" }}>
                            {" "}
                            <i
                              className="fas fa-map-marker-alt"
                              style={{
                                marginRight: "8px",
                              }}
                            ></i>
                            {activity.locationName}
                          </p>
                        </div>

                        <div
                          className="flight_search_destination"
                          style={{
                            display: "flex",
                            flexDirection: "column",
                            gap: "10px",
                            color: "var(--dashboard-title-color)",
                          }}
                        >
                          <div
                            style={{
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "baseline",
                            }}
                          >
                            <p>Date : </p>
                            <p>
                              {new Date(activity.date).toLocaleDateString()}
                            </p>
                          </div>

                          <h6>Time : {activity.time}</h6>
                        </div>
                      </div>

                      <div
                        className="flight_search_right"
                        style={{
                          background: "var(--scroll-bar-color)",
                          // height: "100%",
                          display: "flex",
                          flexDirection: "column",
                          // alignItems: "end",
                          justifyContent: "end",
                          position: "relative",
                          color: "white",
                          padding: "10px 20px",
                        }}
                      >
                        <div
                          style={{
                            flex: 1,
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                          }}
                        >
                          <h2 style={{}}>
                            {currencySymbol}
                            {(activity.originalPrice * exchangeRate).toFixed(
                              2
                            )}{" "}
                          </h2>
                        </div>
                        <div
                          style={{
                            flex: 1,
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                          }}
                        >
                          <span
                            style={{
                              display: "flex",
                              alignItems: "center",
                              fontSize: "18px",
                            }}
                          >
                            <i
                              className={`fas ${
                                activity.status === "active"
                                  ? "fa-check"
                                  : "fa-times"
                              }`}
                              style={{
                                color: "var(--text-color)",
                                marginRight: "8px",
                              }}
                            ></i>
                            <span>
                              {activity.status === "active"
                                ? "Active"
                                : "Inactive"}
                            </span>
                          </span>
                        </div>
                        <div
                          style={{
                            display: "flex",
                            flexDirection: "column",
                            marginBottom: "5px",
                          }}
                        >
                          <div style={{ textAlign: "center" }}>
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                openCancelConfirmation(activity._id);
                              }}
                              className="btn btn_theme"
                              style={{
                                padding: "8px 15px",
                                backgroundColor: "var(--main-color)",
                                color: "#fff",
                                border: "none",
                                borderRadius: "5px",
                                cursor: "pointer",
                                width: "100%",
                              }}
                            >
                              Cancel Booking
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                    {/* <div
                      className="flight_policy_refund collapse"
                      id={`collapseExample${activity._id}`}
                    >
                      <div className="flight_show_down_wrapper">
                        <div className="flight-shoe_dow_item">
                          <h4>Activity Details</h4>
                          <p className="fz12">
                            {activity.category.description}
                          </p>
                          <p className="fz12">
                            Advertiser: {activity.advertiser.username} (
                            {activity.advertiser.email})
                          </p>
                        </div>
                        <div className="flight_refund_policy">
                          <div className="TabPanelInner flex_widht_less">
                            <h4>Tags</h4>
                            {activity.tags.map((tag, i) => (
                              <p className="fz12" key={i}>
                                {tag.name} - {tag.description}
                              </p>
                            ))}
                            <h4>Category</h4>
                            <p>{activity.category.name}</p>
                          </div>
                        </div>
                      </div>
                    </div> */}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Popup Modal */}
        {popupMessage && (
          <div
            style={{
              position: "fixed",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              backgroundColor: "rgba(0, 0, 0, 0.5)",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <div
              style={{
                backgroundColor: "#fff",
                padding: "20px",
                borderRadius: "8px",
                maxWidth: "500px",
                textAlign: "center",
              }}
            >
              <p>{popupMessage}</p>
              {selectedBooking ? (
                <div>
                  <button
                    onClick={handleCancelBooking}
                    style={{
                      marginTop: "10px",
                      padding: "10px 20px",
                      backgroundColor: "#8b3eea", // Purple Cancel
                      color: "#fff",
                      border: "none",
                      borderRadius: "5px",
                      cursor: "pointer",
                    }}
                  >
                    Yes, Cancel
                  </button>
                  <button
                    onClick={closePopup}
                    style={{
                      marginTop: "10px",
                      padding: "10px 20px",
                      backgroundColor: "#333",
                      color: "#fff",
                      border: "none",
                      borderRadius: "5px",
                      cursor: "pointer",
                      marginLeft: "10px",
                    }}
                  >
                    No, I changed my mind
                  </button>
                </div>
              ) : (
                <button
                  onClick={closePopup}
                  style={{
                    marginTop: "10px",
                    padding: "10px 20px",
                    backgroundColor: "#333",
                    color: "#fff",
                    border: "none",
                    borderRadius: "5px",
                    cursor: "pointer",
                  }}
                >
                  Close
                </button>
              )}
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default BookedActivitiesWrapper;
