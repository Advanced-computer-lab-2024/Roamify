import React, { useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import {
  Elements,
  CardElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";

import StripePaymentWrapper from "./StripePaymentWrapper";

const PaymentModal = ({ isOpen, onClose, onPaymentSuccess }) => {
  const [selectedMethod, setSelectedMethod] = useState(null);
  const [promoCode, setPromoCode] = useState("");
  const [promoApplied, setPromoApplied] = useState(false);
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
          background: "var(--secondary-color)",
          padding: "20px",
          borderRadius: "8px",
          maxWidth: "500px",
          width: "100%",
        }}
      >
        <h2 style={{ color: "var(--text-color)" }}>Select Payment Method</h2>

        {/* Promo Code Section */}
        <div style={{ marginTop: "20px" }}>
          <label
            htmlFor="promo-code"
            style={{
              color: "var(--text-color)",
              display: "block",
              marginBottom: "8px",
            }}
          >
            Enter Promo Code
          </label>
          <div style={{ display: "flex", gap: "10px" }}>
            <input
              id="promo-code"
              type="text"
              value={promoCode}
              onChange={(e) => setPromoCode(e.target.value)}
              placeholder="Enter your promo code"
              style={{
                flex: 1,
                padding: "10px",
                borderRadius: "4px",
                border: "1px solid var(--secondary-border-color)",
              }}
            />
          </div>
        </div>

        {/* Payment Method Section */}
        <div style={{ display: "flex", gap: "20px", marginTop: "20px" }}>
          <button
            onClick={() => setSelectedMethod("wallet")}
            style={{
              flex: 1,
              padding: "10px",
              background:
                selectedMethod === "wallet"
                  ? "var(--main-color)"
                  : "transparent",
              color: "white",
              border: "1px solid var(--main-color)",
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
              background:
                selectedMethod === "card" ? "var(--main-color)" : "transparent",
              color: "white",
              border: "1px solid var(--main-color)",
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
                onPaymentSuccess({
                  method: "availableCredit",
                  promoCode: promoCode,
                });
                onClose();
              }}
              style={{
                padding: "10px 15px",
                background: "var(--main-color)",
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
            promoCode={promoCode}
            onCancel={onClose}
          />
        )}

        <button
          onClick={onClose}
          style={{
            marginTop: "20px",
            background: "transparent",
            border: "none",
            color: "var(--main-color)",
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
