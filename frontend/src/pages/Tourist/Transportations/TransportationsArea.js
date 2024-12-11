import React, { useState, useEffect } from "react";
import toast, { Toaster } from "react-hot-toast";
import axios from "axios";
import PaymentModal from "../../../PaymentModal";

const TransportationsArea = () => {
  const [transportations, setTransportations] = useState([]);
  const [filter, setFilter] = useState("all"); // "all" or "booked"
  const [bookedFilter, setBookedFilter] = useState("allBooked"); // "allBooked" or "upcomingBooked"
  const [selectedTransportation, setSelectedTransportation] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

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

  const openModal = (transportation) => {
    setSelectedTransportation(transportation);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setSelectedTransportation(null);
    setIsModalOpen(false);
  };

  const handlePaymentSuccess = async ({ method, paymentMethodId }) => {
    try {
      const response = await axios.post(
        "http://localhost:3000/api/tourist/book-transportation",
        {
          transportationIdString: selectedTransportation._id,
          method: method,
          paymentMethodId,
        },
        { withCredentials: true }
      );

      toast.success("Booking successful!");
      fetchTransportations();
      closeModal();
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  const handleCancelBooking = async (transportationId) => {
    try {
      const response = await axios.delete(
        "http://localhost:3000/api/tourist/cancel-transportation-booking",
        {
          data: { transportationId },
          withCredentials: true,
        }
      );
      toast.success("Booking canceled successfully!");
    } catch (error) {
      toast.error(error.response.data.message);
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
            </div>

            {/* Transportation Boxes */}
            <div className="flight_search_result_wrapper">
              {filteredTransportations.map((transportation, index) => (
                <div
                  className="flight_search_item_wrappper"
                  key={index}
                  style={{
                    width: "100%",
                    backgroundColor: "var(--secondary-color)",
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
                  <div
                    style={{ flex: "1", color: "var(--dashboard-title-color)" }}
                  >
                    <h3
                      style={{ color: "var(--text-color)", textAlign: "left" }}
                    >
                      {transportation.name}
                    </h3>
                    <p>Price: ${transportation.price}</p>
                  </div>

                  {filter === "all" && (
                    <button
                      style={{
                        padding: "10px 15px",
                        backgroundColor: "var(--main-color)",
                        color: "white",
                        border: "none",
                        borderRadius: "4px",
                        cursor: "pointer",
                      }}
                      onClick={() => openModal(transportation)}
                    >
                      Book
                    </button>
                  )}

                  {filter === "booked" && (
                    <button
                      style={{
                        padding: "10px 15px",
                        backgroundColor: "#d9534f", // Red cancel button
                        color: "white",
                        border: "none",
                        borderRadius: "4px",
                        cursor: "pointer",
                      }}
                      onClick={() => handleCancelBooking(transportation._id)}
                    >
                      Cancel Booking
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      {isModalOpen && (
        <PaymentModal
          isOpen={isModalOpen}
          onClose={closeModal}
          onPaymentSuccess={handlePaymentSuccess}
        />
      )}
      <Toaster position="bottom-center" reverseOrder={false} />
    </section>
  );
};

export default TransportationsArea;
