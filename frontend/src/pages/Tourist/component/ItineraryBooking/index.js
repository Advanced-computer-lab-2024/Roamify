import React, { useState, useEffect } from "react";
import axios from "axios";
import { FaMapMarkerAlt } from "react-icons/fa";
const BookedItinerariesWrapper = () => {
  const [bookedItineraries, setBookedItineraries] = useState([]);
  const [filter, setFilter] = useState("All");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [popupMessage, setPopupMessage] = useState("");
  const [selectedBooking, setSelectedBooking] = useState(null); // To store the booking to cancel

  useEffect(() => {
    const fetchBookedItineraries = async () => {
      setLoading(true);
      setError(null);

      const statusQuery = filter === "All" ? "" : `?status=${filter.toLowerCase()}`;
      const url = `http://localhost:3000/api/tourist/get-all-upcoming-booked-itineraries${statusQuery}`;

      try {
        const response = await axios.get(url, { withCredentials: true });
        const validItineraries = response.data.filter(
          (itinerary) => itinerary.itinerary
        );
        setBookedItineraries(validItineraries);
      } catch (err) {
        if (err.response && err.response.status === 400) {
          setError(` ${err.response.data.message || "Something went wrong. Please try again later."}`);
        } else {
          setError("Failed to fetch booked itineraries. Please try again later.");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchBookedItineraries();
  }, [filter]);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return `${date.getDate().toString().padStart(2, "0")}/${(date.getMonth() + 1).toString().padStart(2, "0")}/${date.getFullYear()}`;
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
          withCredentials: true
        }
      );

      setBookedItineraries((prevItineraries) =>
        prevItineraries.filter((booking) => booking._id !== selectedBooking)
      );

      setPopupMessage("Cancelled successfully");
      setSelectedBooking(null); // Reset selected booking
    } catch (err) {
      setPopupMessage("Failed to cancel the booking.");
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
    <section id="explore_area" className="section_padding">
      <div className="container">
        <div className="row">
          <div className="col-lg-9">
            {loading ? (
              <p>Loading booked itineraries...</p>
            ) : error ? (
              <p style={{ color: "red" }}>{error}</p>
            ) : bookedItineraries.length === 0 ? (
              <p>No booked itineraries found.</p>
            ) : (
              <div className="flight_search_result_wrapper" style={{ display: "grid", gap: "20px",
                backgroundColor: "#f9f9f9",
                padding: "20px",
                borderRadius: "8px",
                boxShadow: "0 2px 5px rgba(0, 0, 0, 0.1)",
                cursor: "pointer",
                flex: "1 1 30%", // Adjust to ensure flexibility
                minWidth: "300px",
                maxWidth: "calc(33% - 20px)",
                transition: "transform 0.3s ease, box-shadow 0.3s ease",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "scale(1.05)";
                e.currentTarget.style.boxShadow = "0 10px 20px rgba(0, 0, 0, 0.2)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "scale(1)";
                e.currentTarget.style.boxShadow = "0 2px 5px rgba(0, 0, 0, 0.1)";
              }}>
                {bookedItineraries.map((booking) => (
                  <div
                    className="flight_search_item_wrapper"
                    key={booking._id}
                    style={{
                      width: "100%",
                      backgroundColor: "#f9f9f9",
                      display: "flex",
                      flexDirection: "column",
                      padding: "20px",
                      marginBottom: "20px",
                      borderRadius: "8px",
                      boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                    }}
                  >
                    <h3
                      style={{
                        marginBottom: "15px",
                        textAlign: "center",
                        fontWeight: "bold",
                        textDecoration: "underline",
                      }}
                    >
                      {booking.name}
                    </h3>

                    <div style={{ marginBottom: "15px" }}>
                      {booking.locations.length > 0 && (
                        <p style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                          <FaMapMarkerAlt style={{ color: "#8b3eea" }} />
                          {booking.locations.join(", ")}
                        </p>
                      )}
                      <p>
                        <strong>Status:</strong> {booking.status}
                      </p>
                     
                      <p>
                        <strong>Date:</strong> {formatDate(booking.date)}
                      </p>
                      <p>
                        <strong>Points Redeemed:</strong> {booking.pointsRedeemed ? "Yes" : "No"}
                      </p>
                     
                    </div>

                    <div style={{ display: "flex", justifyContent: "flex-end", marginTop: "15px" }}>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          openCancelConfirmation(booking._id);
                        }}
                        style={{
                          padding: "10px 20px",
                          backgroundColor: "#8b3eea", // Purple cancel button
                          color: "#fff",
                          border: "none",
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
              alignItems: "center"
            }}
          >
            <div
              style={{
                backgroundColor: "#fff",
                padding: "20px",
                borderRadius: "8px",
                maxWidth: "500px",
                textAlign: "center"
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

export default BookedItinerariesWrapper;
