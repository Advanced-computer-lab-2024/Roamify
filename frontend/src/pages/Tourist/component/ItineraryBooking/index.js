import React, { useState, useEffect } from "react";
import axios from "axios";

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
      }} finally {
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
              <div className="flight_search_result_wrapper" style={{ display: "grid", gap: "20px" }}>
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
                      boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)"
                    }}
                  >
                    {booking.itinerary?.name && (
                      <h3 style={{ marginBottom: "15px", textAlign: "center" }}>
                        {booking.itinerary.name}
                      </h3>
                    )}
                    
                    <div style={{ display: "flex", justifyContent: "space-between", gap: "20px" }}>
                      <div style={{ flex: "1 1 200px" }}>
                        {booking.itinerary?.location?.name && (
                          <p><strong>Location:</strong> {booking.itinerary.location.name}</p>
                        )}
                        {booking.itinerary?.price && (
                          <p><strong>Price:</strong> {booking.itinerary.price} EGP</p>
                        )}
                      </div>
                      <div style={{ flex: "1 1 200px" }}>
                        {booking.date && (
                          <p><strong>Date:</strong> {formatDate(booking.date)}</p>
                        )}
                        {booking.itinerary?.time && (
                          <p><strong>Time:</strong> {booking.itinerary.time}</p>
                        )}
                      </div>
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
