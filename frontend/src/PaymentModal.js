import React, { useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import {
  Elements,
  CardElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";

import StripePaymentWrapper from "./StripePaymentWrapper";

// Initialize Stripe

const PaymentModal = ({ isOpen, onClose, onPaymentSuccess }) => {
  const [selectedMethod, setSelectedMethod] = useState(null);
  // const elements = useElements();
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  if (!isOpen) return null;

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: "rgba(0, 0, 0, 0.5)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 1000,
      }}
      onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          background: "white",
          padding: "20px",
          borderRadius: "8px",
          maxWidth: "500px",
          width: "100%",
        }}
      >
        <h2>Select Payment Method</h2>
        <div style={{ display: "flex", gap: "20px", marginTop: "20px" }}>
          <button
            onClick={() => setSelectedMethod("wallet")}
            style={{
              flex: 1,
              padding: "10px",
              background: selectedMethod === "wallet" ? "#5469d4" : "#ccc",
              color: "white",
              border: "none",
              borderRadius: "4px",
              cursor: "pointer",
            }}
          >
            Wallet
          </button>
          <button
            onClick={() => setSelectedMethod("card")}
            style={{
              flex: 1,
              padding: "10px",
              background: selectedMethod === "card" ? "#5469d4" : "#ccc",
              color: "white",
              border: "none",
              borderRadius: "4px",
              cursor: "pointer",
            }}
          >
            Card
          </button>
        </div>

        {selectedMethod === "wallet" && (
          <div style={{ marginTop: "20px", textAlign: "center" }}>
            <button
              onClick={() => {
                onPaymentSuccess({ method: "availableCredit" });
                onClose();
              }}
              style={{
                padding: "10px 15px",
                background: "#5469d4",
                color: "white",
                border: "none",
                borderRadius: "4px",
                cursor: "pointer",
              }}
            >
              Pay with Wallet
            </button>
          </div>
        )}

        {selectedMethod === "card" && (
          <StripePaymentWrapper
            onSuccess={onPaymentSuccess}
            onCancel={onClose}
          />
        )}
        <button
          onClick={onClose}
          style={{
            marginTop: "20px",
            background: "transparent",
            border: "none",
            color: "#5469d4",
            cursor: "pointer",
          }}
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default PaymentModal;
