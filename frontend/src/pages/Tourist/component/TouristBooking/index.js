import React, { useState, useEffect } from "react";
import axios from "axios";

const BookedActivitiesWrapper = () => {
  const [bookedActivities, setBookedActivities] = useState([]);
  const [filter, setFilter] = useState("All");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [popupMessage, setPopupMessage] = useState(""); // State to manage popup message

  useEffect(() => {
    const fetchBookedActivities = async () => {
      setLoading(true);
      setError(null);

      const statusQuery = filter === "All" ? "" : `?status=${filter.toLowerCase()}`;
      const url = `http://localhost:3000/api/tourist/get-all-booked-activities${statusQuery}`;

      try {
        const response = await axios.get(url, { withCredentials: true });
        setBookedActivities(response.data || []);
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
    try {
      await axios.delete(
        "http://localhost:3000/api/tourist/cancel-activity-booking",
        {
          data: { activityId },
          withCredentials: true
        }
      );

      // Update the state to remove the canceled activity
      setBookedActivities((prevActivities) =>
        prevActivities.filter((booking) => booking.activity._id !== activityId)
      );
      
      // Set the success message in popup
      setPopupMessage("Cancelled successfully");
    } catch (err) {
      if (err.response) {
        console.error("Failed to cancel the booking:", err.response.data);
        setPopupMessage(err.response.data.message); // Set the error message in popup
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
                    <h3 style={{ marginBottom: "15px", textAlign: "center" }}>
                      {booking.activity.name || "N/A"}
                    </h3>
                    
                    {/* Details Section */}
                    <div style={{ display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: "20px" }}>
                      <div style={{ flex: "1 1 200px" }}>
                        <p><strong>Location:</strong> {booking.activity.location.name || "N/A"}</p>
                        <p><strong>Coordinates:</strong> {booking.activity.location.coordinates.join(", ") || "N/A"}</p>
                      </div>
                      <div style={{ flex: "1 1 200px" }}>
                        <p><strong>Date:</strong> {booking.date ? formatDate(booking.date) : "N/A"}</p>
                        <p><strong>Time:</strong> {booking.activity.time || "N/A"}</p>
                        <p><strong>Price:</strong> {booking.activity.price} EGP</p>
                      </div>
                      <div style={{ flex: "1 1 200px" }}>
                        <p><strong>Status:</strong> {booking.activity.bookingAvailable ? "Available" : "Unavailable"}</p>
                        <p><strong>Rating:</strong> {booking.activity.rating || "No rating"}</p>
                        <p><strong>Category:</strong> {booking.activity.category || "Uncategorized"}</p>
                      </div>
                      <div style={{ flex: "1 1 200px" }}>
                        <p><strong>Advertiser:</strong> {booking.activity.advertiser || "Anonymous"}</p>
                        {booking.activity.discounts > 0 && (
                          <p><strong>Discount:</strong> {booking.activity.discounts}% off</p>
                        )}
                      </div>
                    </div>

                    {/* Tags Section */}
                    {booking.activity.tags.length > 0 && (
                      <div style={{ marginTop: "10px" }}>
                        <p><strong>Tags:</strong></p>
                        <div style={{ display: "flex", flexWrap: "wrap", gap: "10px" }}>
                          {booking.activity.tags.map((tag, index) => (
                            <span 
                              key={index} 
                              style={{
                                backgroundColor: "#e0e0e0",
                                padding: "5px 10px",
                                borderRadius: "5px",
                                fontSize: "0.9em"
                              }}
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Cancel Button */}
                    <div style={{ display: "flex", justifyContent: "flex-end", marginTop: "15px" }}>
                      <button
                        onClick={() => handleCancelBooking(booking.activity._id)}
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
