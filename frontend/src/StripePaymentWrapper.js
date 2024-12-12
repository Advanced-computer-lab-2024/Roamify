import React, { useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import {
  Elements,
  CardElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";

// Initialize Stripe
const stripePromise = loadStripe(
  "pk_test_51QQY4ZP3sEYylgGCN5LrQ0J8U9LHDMcZtZlH3QXbcJxlJJi7vDgHaqeuDdm25HjV51YR3u010gD1HAKsKcIuiL3a00tONTwi1N"
);

const StripePayment = ({ onSuccess, onCancel, promoCode }) => {
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

      // Return paymentMethod.id to the parent
      onSuccess({
        method: "card",
        promoCode: promoCode,
        paymentMethodId: paymentMethod.id,
      });
      onCancel();
    } catch (error) {
      setErrorMessage("An error occurred. Please try again.");
    }

    setLoading(false);
  };

  return (
    <form
      onSubmit={handleSubmit}
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "15px",
        height: "50vh",
        marginTop: "20px",
      }}
    >
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
        style={{
          width: "200px", // Ensure it fits the container width
          height: "44px", // Consistent height for input fields
          boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)", // Subtle shadow for better visibility
          borderRadius: "4px", // Rounded edges
          border: "1px solid #ddd", // Light border for clarity
        }}
      />
      <button
        type="submit"
        disabled={!stripe || loading}
        style={{
          marginTop: "20px",
          background: "var(--main-color)",
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
      <button
        type="button"
        onClick={onCancel}
        style={{
          marginTop: "10px",
          background: "transparent",
          border: "1px solid var(--main-color)",
          padding: "10px 15px",
          borderRadius: "4px",
          cursor: "pointer",
        }}
      >
        Cancel
      </button>
    </form>
  );
};

const StripePaymentWrapper = ({ onSuccess, onCancel, promoCode }) => {
  return (
    <Elements stripe={stripePromise}>
      <StripePayment
        onSuccess={onSuccess}
        promoCode={promoCode}
        onCancel={onCancel}
      />
    </Elements>
  );
};

export default StripePaymentWrapper;
