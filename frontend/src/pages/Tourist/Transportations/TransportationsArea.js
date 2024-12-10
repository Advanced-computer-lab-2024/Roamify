import React, { useState, useEffect } from "react";
import toast, { Toaster } from "react-hot-toast";
import { loadStripe } from "@stripe/stripe-js";
import {
  Elements,
  CardElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import axios from "axios";
import StripePaymentWrapper from "../../../StripePaymentWrapper";
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
      if (response.data.success) {
        toast.success("Booking successful!");
        fetchTransportations();
        closeModal();
      } else {
        toast.error("Booking failed.");
      }
    } catch (error) {
      toast.error("Booking failed.");
    }
  };

  const handleBookTransportation = async (
    transportationId,
    method,
    paymentMethodId = null
  ) => {
    try {
      const response = await axios.post(
        "http://localhost:3000/api/tourist/book-transportation",
        {
          transportationIdString: transportationId,
          method,
          paymentMethodId,
        },
        { withCredentials: true }
      );
      if (response.data.success) {
        toast.success("Transportation booked successfully!");
        fetchTransportations(); // Re-fetch to update state
        closeModal();
      } else {
        toast.error("Error booking transportation.");
      }
    } catch (error) {
      toast.error("Error booking transportation.");
      console.error("Error booking transportation:", error);
    }
  };

  const CheckoutForm = () => {
    const stripe = useStripe();
    const elements = useElements();
    const [loading, setLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");

    const handleSubmit = async (event) => {
      event.preventDefault();
      setLoading(true);

      if (!stripe || !elements) return;

      const cardElement = elements.getElement(CardElement);

      try {
        const { paymentMethod, error } = await stripe.createPaymentMethod({
          type: "card",
          card: cardElement,
        });

        if (error) {
          setErrorMessage(error.message);
          setLoading(false);
          return;
        }

        handleBookTransportation(
          selectedTransportation._id,
          "card",
          paymentMethod.id
        );
      } catch (error) {
        setErrorMessage("An error occurred. Please try again.");
      }

      setLoading(false);
    };

    return (
      <form onSubmit={handleSubmit} style={{ height: "40vh", width: "50vw" }}>
        <CardElement
          options={{
            style: {
              base: {
                fontSize: "16px",
                color: "#424770",
                "::placeholder": {
                  color: "#aab7c4",
                },
              },
              invalid: {
                color: "#9e2146",
              },
            },
          }}
        />
        <button
          type="submit"
          disabled={!stripe || loading}
          style={{
            marginTop: "20px",
            background: "#5469d4",
            color: "#ffffff",
            padding: "10px 15px",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
          }}
        >
          {loading ? "Processing..." : "Confirm Payment"}
        </button>
        {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
      </form>
    );
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
                    <h3 style={{ color: "var(--text-color)" }}>
                      {transportation.name}
                    </h3>
                    <p>Price: ${transportation.price}</p>
                  </div>

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
