import React, { useState, useEffect } from "react";
import axios from "axios";
import { FaMapMarkerAlt } from "react-icons/fa";
import LoadingLogo from "../../../../component/LoadingLogo";
import EmptyResponseLogo from "../../../../component/EmptyResponseLogo";

const BookedItinerariesWrapper = () => {
  const [bookedItineraries, setBookedItineraries] = useState([]);
  const [filter, setFilter] = useState("All");
  const [loading, setLoading] = useState(true);
  const currencySymbol = localStorage.getItem("currencySymbol") || "$";
  const exchangeRate = parseFloat(localStorage.getItem("value")) || 1;
  const [error, setError] = useState(null);
  const [popupMessage, setPopupMessage] = useState("");
  const [selectedBooking, setSelectedBooking] = useState(null); // To store the booking to cancel

  useEffect(() => {
    const fetchBookedItineraries = async () => {
      setLoading(true);
      setError(null);

      const statusQuery =
        filter === "All" ? "" : `?status=${filter.toLowerCase()}`;
      const url = `http://localhost:3000/api/tourist/get-all-upcoming-booked-itineraries${statusQuery}`;

      try {
        const response = await axios.get(url, { withCredentials: true });
        const validItineraries = response.data.filter(
          (itinerary) => itinerary.itinerary
        );
        setBookedItineraries(validItineraries);
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

    fetchBookedItineraries();
  }, [filter]);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return `${date.getDate().toString().padStart(2, "0")}/${(
      date.getMonth() + 1
    )
      .toString()
      .padStart(2, "0")}/${date.getFullYear()}`;
  };

  const handleCancelItinerary = async () => {
    if (!selectedBooking) {
      setPopupMessage("No itinerary selected to cancel.");
      return;
    }

    try {
      await axios.delete(
        "http://localhost:3000/api/tourist/cancel-itinerary-booking",
        {
          data: { ticketId: selectedBooking },
          withCredentials: true,
        }
      );

      setBookedItineraries((prevItineraries) =>
        prevItineraries.filter((booking) => booking._id !== selectedBooking)
      );

      setPopupMessage("Cancelled successfully");
      setSelectedBooking(null); // Reset selected booking
    } catch (err) {
      setPopupMessage(err.response.data.message);
    }
  };

  const openCancelConfirmation = (ticketId) => {
    setSelectedBooking(ticketId); // Set the booking to cancel
    setPopupMessage("Are you sure you want to cancel this itinerary?");
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
        <h2>Upcoming Booked Itineraries</h2>
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
            ) : error ? (
              <EmptyResponseLogo isVisible={true} text={error} size="300px" />
            ) : (
              <div
                className="flight_search_result_wrapper"
                style={{ display: "flex", flexWrap: "wrap", gap: "20px" }}
              >
                {bookedItineraries.map((booking) => (
                  <div
                    key={booking._id}
                    className="flight_search_item_wrapper"
                    style={{
                      display: "flex",
                      background: "var(--secondary-color)",
                      borderRadius: "10px",
                      boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                      transition: "transform 0.3s ease",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.transform = "scale(1.05)";
                      e.currentTarget.style.boxShadow =
                        "0 10px 20px rgba(0, 0, 0, 0.2)";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = "scale(1)";
                      e.currentTarget.style.boxShadow =
                        "0 4px 8px rgba(0, 0, 0, 0.1)";
                    }}
                  >
                    <div
                      className="flight_search_left"
                      style={{
                        flex: "1",
                        height: "100%",
                        padding: "30px 20px",
                        display: "flex",
                        gap: "20px",
                        flexDirection: "column",
                        alignItems: "baseline",
                        width: "100%",
                      }}
                    >
                      <h3
                        style={{ fontSize: "24px", color: "var(--text-color)" }}
                      >
                        {booking.name}
                      </h3>
                      <p style={{ color: "var(--dashboard-title-color)" }}>
                        <FaMapMarkerAlt style={{ marginRight: "8px" }} />
                        {booking.locations.join(", ")}
                      </p>
                      <p style={{ color: "var(--dashboard-title-color)" }}>
                        <strong>Date: </strong>
                        {formatDate(booking.date)}
                      </p>
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
                          {(booking.originalPrice * exchangeRate).toFixed(
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
                              booking.status === "active"
                                ? "fa-check"
                                : "fa-times"
                            }`}
                            style={{
                              color: "var(--text-color)",
                              marginRight: "8px",
                            }}
                          ></i>
                          <span>
                            {booking.status === "active"
                              ? "Active"
                              : "Inactive"}
                          </span>
                        </span>
                      </div>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          openCancelConfirmation(booking._id);
                        }}
                        className="btn btn_theme"
                        style={{
                          padding: "10px 20px",
                          backgroundColor: "var(--main-color)",
                          color: "#fff",
                          borderRadius: "5px",
                          cursor: "pointer",
                        }}
                      >
                        Cancel Booking
                      </button>
                    </div>
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
                backgroundColor: "var(--secondary-color)",
                padding: "20px",
                borderRadius: "8px",
                border: "1px solid var(--secondary-border-color)",
                maxWidth: "500px",
                textAlign: "center",
              }}
            >
              <p>{popupMessage}</p>
              {selectedBooking ? (
                <div>
                  <button
                    onClick={handleCancelItinerary}
                    style={{
                      marginTop: "10px",
                      padding: "10px 20px",
                      backgroundColor: "var(--main-color)",
                      color: "white",
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
                      backgroundColor: "transparent",
                      color: "var(--text-color)",
                      border: "1px solid var(--main-color)",
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

export default BookedItinerariesWrapper;
