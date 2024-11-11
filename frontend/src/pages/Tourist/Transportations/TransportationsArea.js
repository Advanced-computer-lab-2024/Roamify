import React, { useState, useEffect } from "react";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";

const TransportationsArea = () => {
  const [transportations, setTransportations] = useState([]);
  const [filter, setFilter] = useState("all"); // "all" or "booked"
  const [bookedFilter, setBookedFilter] = useState("allBooked"); // "allBooked" or "upcomingBooked"

  const fetchTransportations = async () => {
    try {
      const response = await axios.get(
        "http://localhost:3000/api/tourist/get-all-transportation",
        {
          withCredentials: true,
        }
      );
      setTransportations(response.data.transportations || []);
    } catch (error) {
      console.error("Error fetching transportations:", error);
      toast.error("Failed to fetch transportations.");
    }
  };

  useEffect(() => {
    fetchTransportations();
  }, []);

  const handleBookTransportation = async (transportationId) => {
    try {
      await axios.put(
        "http://localhost:3000/api/tourist/book-transportation",
        {
          transportationIdString: transportationId,
        },
        { withCredentials: true }
      );
      toast.success("Transportation booked successfully!");
      fetchTransportations(); // Re-fetch to update state
    } catch (error) {
      toast.error("Error booking transportation.");
      console.error("Error booking transportation:", error);
    }
  };

  const filteredTransportations = transportations.filter((transportation) => {
    if (filter === "all") return true;
    const isBooked = transportation.touristsBooked.length > 0;
    if (filter === "booked" && isBooked) {
      if (bookedFilter === "allBooked") return true;
      if (bookedFilter === "upcomingBooked") {
        const currentDate = new Date();
        const transportationDate = new Date(transportation.date);
        return transportationDate > currentDate;
      }
    }
    return false;
  });

  return (
    <section id="explore_area" className="section_padding">
      <div className="container">
        <div className="row">
          <div className="col-lg-9">
            {/* Filter Buttons */}
            <div style={{ display: "flex", gap: "10px", marginBottom: "20px" }}>
              <button
                type="button"
                className={`btn ${
                  filter === "all" ? "btn-primary" : "btn-outline-primary"
                }`}
                onClick={() => setFilter("all")}
              >
                All Transportations
              </button>
              <button
                type="button"
                className={`btn ${
                  filter === "booked" ? "btn-primary" : "btn-outline-primary"
                }`}
                onClick={() => setFilter("booked")}
              >
                Booked Transportations
              </button>
              {filter === "booked" && (
                <>
                  <button
                    type="button"
                    className={`btn ${
                      bookedFilter === "allBooked"
                        ? "btn-success"
                        : "btn-outline-success"
                    }`}
                    onClick={() => setBookedFilter("allBooked")}
                  >
                    All Booked
                  </button>
                  <button
                    type="button"
                    className={`btn ${
                      bookedFilter === "upcomingBooked"
                        ? "btn-success"
                        : "btn-outline-success"
                    }`}
                    onClick={() => setBookedFilter("upcomingBooked")}
                  >
                    Upcoming Booked
                  </button>
                </>
              )}
            </div>

            {/* Transportation Boxes */}
            <div
              className="flight_search_result_wrapper"
              style={{ display: "block", gap: "20px" }}
            >
              {filteredTransportations.map((transportation, index) => (
                <div
                  className="flight_search_item_wrappper"
                  key={index}
                  style={{
                    width: "100%",
                    backgroundColor: "#f9f9f9",
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "center",
                    padding: "20px",
                    marginBottom: "20px",
                    borderRadius: "8px",
                    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                  }}
                >
                  <div style={{ flex: "1" }}>
                    <h3 style={{ marginBottom: "10px" }}>
                      {transportation.name}
                    </h3>
                    <p>Type: {transportation.type}</p>
                    <p>Pickup Location: {transportation.pickupLocation}</p>
                    <p>Drop-Off Location: {transportation.dropOffLocation}</p>
                    <p>
                      Date: {new Date(transportation.date).toLocaleDateString()}
                    </p>
                    <p>Time: {transportation.time}</p>
                    <p>Price: ${transportation.price}</p>
                  </div>

                  {filter === "all" && (
                    <button
                      style={{
                        padding: "10px 15px",
                        backgroundColor: "#007bff",
                        color: "#fff",
                        border: "none",
                        borderRadius: "4px",
                        cursor: "pointer",
                      }}
                      onClick={() =>
                        handleBookTransportation(transportation._id)
                      }
                    >
                      Book
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <Toaster position="bottom-center" reverseOrder={false} />
    </section>
  );
};

export default TransportationsArea;
