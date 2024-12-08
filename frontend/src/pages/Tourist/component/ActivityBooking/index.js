import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { FaMapMarkerAlt } from "react-icons/fa";


const BookedActivitiesWrapper = () => {
  const [bookedActivities, setBookedActivities] = useState([]);
  const [filter, setFilter] = useState("All");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [popupMessage, setPopupMessage] = useState("");
  const [selectedBooking, setSelectedBooking] = useState(null); // To store the booking to cancel
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBookedActivities = async () => {
      setLoading(true);
      setError(null);

      const statusQuery = filter === "All" ? "" : `?status=${filter.toLowerCase()}`;
      const url = `http://localhost:3000/api/tourist/get-all-upcoming-booked-activities${statusQuery}`;

      try {
        const response = await axios.get(url, { withCredentials: true });
        // Filter out any bookings without a valid activity or activity ID
        const validBookings = response.data
        // .filter(
        //   (booking) => booking.activity && booking.activity._id
        // );
        setBookedActivities(validBookings);
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

    fetchBookedActivities();
  }, [filter]);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return `${date.getDate().toString().padStart(2, "0")}/${(date.getMonth() + 1).toString().padStart(2, "0")}/${date.getFullYear()}`;
  };

  const handleCancelBooking = async () => {
    if (!selectedBooking) {
      setPopupMessage("No activity selected to cancel.");
      return;
    }

    try {
      await axios.delete("http://localhost:3000/api/tourist/cancel-activity-booking", {
        data: { ticketId: selectedBooking },
        withCredentials: true,
      });

      setBookedActivities((prevActivities) =>
        prevActivities.filter((booking) => booking._id !== selectedBooking)
      );

      setPopupMessage("Cancelled successfully");
      setSelectedBooking(null); // Reset selected booking
    } catch (err) {
      setPopupMessage("Failed to cancel the booking.");
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
    <section id="explore_area" className="section_padding">
      <div className="container">
        <div className="row" style={{ display: "flex", flexWrap: "wrap", gap: "20px" }}>
          <div className="col-lg-9">
            {loading ? (
              <p>Loading booked activities...</p>
            ) : error ? (
              <p style={{ color: "red" }}>{error}</p>
            ) : bookedActivities.length === 0 ? (
              <p>No Booked Activities</p>
            ) : (
              <div className="flight_search_result_wrapper" style={{ display: "flex", flexWrap: "wrap", gap: "20px" }}>
                {bookedActivities.map((booking) => (
                  <div
                    key={booking._id}
                    style={{
                      backgroundColor: "#f9f9f9",
                      padding: "20px",
                      borderRadius: "8px",
                      boxShadow: "0 2px 5px rgba(0, 0, 0, 0.1)",
                      cursor: "pointer",
                      flex: "1 1 30%", // Adjust to ensure flexibility
                      minWidth: "300px",
                      maxWidth: "calc(33% - 20px)",
                      transition: "transform 0.3s ease, box-shadow 0.3s ease",
                       background: "var(--secondary-color)"
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.transform = "scale(1.05)";
                      e.currentTarget.style.boxShadow = "0 10px 20px rgba(0, 0, 0, 0.2)";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = "scale(1)";
                      e.currentTarget.style.boxShadow = "0 2px 5px rgba(0, 0, 0, 0.1)";
                    }}
                  >
                    <h3
                      style={{
                        fontSize: "20px",
                        marginBottom: "15px",
                        textAlign: "center",
                        fontWeight: "bold",
                        textDecoration: "underline",
                      }}
                    >
                      {booking.name}
                    </h3>
                    <div style={{ marginBottom: "15px" }}>
                      <p style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                        <FaMapMarkerAlt style={{ color: "#8b3eea" }} /> {/* Purple pin icon */}
                        {booking.locationName}
                      </p>
                      <p>
                        <strong>Status:</strong> {booking.status}
                      </p>

                      <p>
                        <strong>Date:</strong> {formatDate(booking.date)}
                      </p>
                      <p>
                        <strong>Time:</strong> {booking.time}
                      </p>
                      <p>
                        <strong>Points Redeemed:</strong> {booking.pointsRedeemed ? "Yes" : "No"}
                      </p>

                    </div>
                    <div style={{ textAlign: "center" }}>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          openCancelConfirmation(booking._id);
                        }}
                        className="btn btn_theme"
                        style={{
                          padding: "8px 15px",
                          backgroundColor: "#8b3eea",
                          color: "#fff",
                          border: "none",
                          borderRadius: "5px",
                          cursor: "pointer",
                          fontSize: "14px",
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
