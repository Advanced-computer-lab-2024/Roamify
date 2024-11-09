import React, { useState, useEffect } from "react";
import axios from "axios";

const BookedActivitiesWrapper = () => {
  const [bookedActivities, setBookedActivities] = useState([]);
  const [filter, setFilter] = useState("All");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [popupMessage, setPopupMessage] = useState("");

  useEffect(() => {
    const fetchBookedActivities = async () => {
      setLoading(true);
      setError(null);

      const statusQuery = filter === "All" ? "" : `?status=${filter.toLowerCase()}`;
      const url = `http://localhost:3000/api/tourist/get-all-booked-activities${statusQuery}`;

      try {
        const response = await axios.get(url, { withCredentials: true });
        // Filter out any bookings without a valid activity or activity ID
        const validBookings = response.data.filter(
          (booking) => booking.activity && booking.activity._id
        );
        setBookedActivities(validBookings);
      } catch (err) {
        setError("Failed to fetch booked activities. Please try again later.");
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

  const handleCancelBooking = async (activityId) => {
    if (!activityId) {
      setPopupMessage("No activity selected to cancel.");
      return;
    }

    try {
      await axios.delete(
        "http://localhost:3000/api/tourist/cancel-activity-booking",
        {
          data: { activityId },
          withCredentials: true
        }
      );

      setBookedActivities((prevActivities) =>
        prevActivities.filter((booking) => booking.activity?._id !== activityId)
      );
      
      setPopupMessage("Cancelled successfully");
    } catch (err) {
      if (err.response) {
        console.error("Failed to cancel the booking:", err.response.data);
        setPopupMessage(err.response.data.message || "Failed to cancel the booking.");
      } else if (err.request) {
        console.error("Request made but no response received:", err.request);
        setPopupMessage("Failed to cancel the booking. No response from server.");
      } else {
        console.error("Error setting up request:", err.message);
        setPopupMessage("Failed to cancel the booking due to an unknown error.");
      }
    }
  };

  return (
    <section id="explore_area" className="section_padding">
      <div className="container">
        <div className="row">
          <div className="col-lg-9">
            {loading ? (
              <p>Loading booked activities...</p>
            ) : error ? (
              <p style={{ color: "red" }}>{error}</p>
            ) : bookedActivities.length === 0 ? (
              <p>No booked activities found.</p>
            ) : (
              <div className="flight_search_result_wrapper" style={{ display: "grid", gap: "20px" }}>
                {bookedActivities.map((booking) => (
                  <div
                    className="flight_search_item_wrappper"
                    key={booking._id}
                    style={{
                      width: "100%",
                      backgroundColor: "#f9f9f9",
                      display: "flex",
                      flexDirection: "column",
                      padding: "20px",
                      marginBottom: "20px",
                      borderRadius: "8px",
                      boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)"
                    }}
                  >
                    {/* Title Section */}
                    {booking.activity?.name && (
                      <h3 style={{ marginBottom: "15px", textAlign: "center" }}>
                        {booking.activity.name}
                      </h3>
                    )}
                    
                    {/* Details Section */}
                    <div style={{ display: "flex", justifyContent: "space-between", gap: "20px" }}>
                      <div style={{ flex: "1 1 200px" }}>
                        {booking.activity?.location?.name && (
                          <p><strong>Location:</strong> {booking.activity.location.name}</p>
                        )}
                        {booking.activity?.price && (
                          <p><strong>Price:</strong> {booking.activity.price} EGP</p>
                        )}
                      </div>
                      <div style={{ flex: "1 1 200px" }}>
                        {booking.date && (
                          <p><strong>Date:</strong> {formatDate(booking.date)}</p>
                        )}
                        {booking.activity?.time && (
                          <p><strong>Time:</strong> {booking.activity.time}</p>
                        )}
                      </div>
                    </div>

                    {/* Cancel Button */}
                    <div style={{ display: "flex", justifyContent: "flex-end", marginTop: "15px" }}>
                      <button
                        onClick={() => handleCancelBooking(booking.activity?._id)}
                        style={{
                          padding: "10px 20px",
                          backgroundColor: "#ff4d4d",
                          color: "#fff",
                          border: "none",
                          borderRadius: "5px",
                          cursor: "pointer"
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
          <div style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center"
          }}>
            <div style={{
              backgroundColor: "#fff",
              padding: "20px",
              borderRadius: "8px",
              maxWidth: "500px",
              textAlign: "center"
            }}>
              <p>{popupMessage}</p>
              <button onClick={() => setPopupMessage("")} style={{
                marginTop: "10px",
                padding: "10px 20px",
                backgroundColor: "#333",
                color: "#fff",
                border: "none",
                borderRadius: "5px",
                cursor: "pointer"
              }}>
                Close
              </button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default BookedActivitiesWrapper;
