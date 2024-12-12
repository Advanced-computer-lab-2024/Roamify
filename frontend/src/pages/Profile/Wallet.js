import React, { useState, useEffect } from "react";
import axios from "axios";
import CommonBanner from "../../component/Common/CommonBanner";
import { color } from "chart.js/helpers";
import WalletLogo from "../../component/WalletLogo";
const Wallet = () => {
  const [walletData, setWalletData] = useState(null);
  const [refundsData, setRefundsData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const currencySymbol = localStorage.getItem("currencySymbol") || "$";
  const exchangeRate = parseFloat(localStorage.getItem("value")) || 1;

  useEffect(() => {
    const fetchWalletData = async () => {
      try {
        const [walletResponse, refundsResponse] = await Promise.all([
          axios.get("http://localhost:3000/api/tourist/get-wallet", {
            withCredentials: true,
          }),
          axios.get("http://localhost:3000/api/tourist/view-total-refunds", {
            withCredentials: true,
          }),
        ]);

        setWalletData(walletResponse.data);
        setRefundsData(refundsResponse.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchWalletData();
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  const showRefunds = (amount) => (amount === 0 ? "No refunds" : `$${amount}`);

  return (
    <>
      <div style={styles.pageContainer}>
        <div
          className="section_heading_center"
          style={{
            textAlign: "center",
            marginBottom: "20px",
          }}
        >
          <h2>Your Wallet</h2>
        </div>
        <WalletLogo size="300px" />
        <div style={styles.infoContainer}>
          <div style={styles.infoRow}>
            <h3 style={styles.header}>Available Credit</h3>
            <p style={styles.value}>
              {currencySymbol + " "}
              {walletData?.availableCredit || 0 * exchangeRate}
            </p>
          </div>

          {/* Display Wallet Cards if the cards array is not empty
          {walletData.cards && walletData.cards.length > 0 ? (
            <div style={styles.cardsContainer}>
              <h3 style={styles.header}>Your Cards</h3>
              <ul style={styles.cardsList}>
                {walletData.cards.map((card, index) => (
                  <li key={index} style={styles.cardItem}>
                    <strong>Card Name: </strong> {card.name}
                    <br />
                    <strong>Card Balance: </strong> $
                    {card.balance.toLocaleString()}
                  </li>
                ))}
              </ul>
            </div>
          ) : (
            <p>No cards available.</p>
          )} */}

          <div style={styles.infoRow}>
            <h3 style={styles.header}>Refunded Activities Amount</h3>
            <p style={styles.value}>
              {showRefunds(refundsData.refundedActivitiesAmount)}
            </p>
          </div>

          <div style={styles.infoRow}>
            <h3 style={styles.header}>Refunded Itineraries Amount</h3>
            <p style={styles.value}>
              {showRefunds(refundsData.refundedItinerariesAmount)}
            </p>
          </div>

          <div style={styles.infoRow}>
            <h3 style={styles.header}>Total Refunds</h3>
            <p style={styles.value}>{showRefunds(refundsData.total)}</p>
          </div>
        </div>
      </div>
    </>
  );
};

// Styles for the page
const styles = {
  pageContainer: {
    padding: "20px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    minHeight: "100vh",
  },
  infoContainer: {
    width: "100%",
    maxWidth: "800px", // Restrict width for larger screens
    backgroundColor: "var(--secondary-color)",
    padding: "20px",
    borderRadius: "8px",
    border: "1px solid var(--secondary-border-color)",
    boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)",
  },
  infoRow: {
    display: "flex",
    justifyContent: "space-between",
    width: "100%",
    marginBottom: "12px", // Reduced margin to minimize empty space
    alignItems: "center",
    color: "var(--text-color)",
  },
  header: {
    fontSize: "1.1rem", // Smaller header font size to fit more content
    fontWeight: "bold",
    margin: 0,
    flex: 1,
    textAlign: "left", // Align the header to the left
    color: "var(--text-color)",
  },
  value: {
    fontSize: "1.3rem", // Slightly smaller value text
    fontWeight: "bold",
    margin: 0,
    flex: 1,
    textAlign: "right", // Align the value to the right
    color: "var(--main-color)",
  },
  cardsContainer: {
    marginTop: "15px", // Added margin for spacing
    width: "100%",
  },
  cardsList: {
    listStyleType: "none",
    paddingLeft: "0",
    marginTop: "10px",
  },
  cardItem: {
    padding: "8px",
    borderBottom: "1px solid #ddd",
    fontSize: "1rem",
    marginBottom: "5px",
  },
};

export default Wallet;
