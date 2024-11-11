import React from "react";
import "./Card.css";

const CommonCard = ({
  id,
  sellerId,
  name,
  description,
  price,
  rating,
  reviews,
  picture,
}) => {
  // Get currency symbol and exchange rate from localStorage
  const currencySymbol = localStorage.getItem("currencySymbol") || "$";
  const exchangeRate = parseFloat(localStorage.getItem("value")) || 1; // Default to 1 if not set

  // Calculate the converted price
  const convertedPrice = price * exchangeRate;

  // Handler for the purchase action
  const handlePurchase = () => {
    // Logic to add product to cart or initiate a direct purchase
    console.log('Purchase initiated for product:', id);
    // You can redirect to a checkout page, update a state, or show a notification
  };

  return (
    <div className="card">
      <img src={picture} alt={name} className="card-img-top" />
      <div className="card-body">
        <h5 className="card-title">{name}</h5>
        <p className="card-text">{description}</p>
        <p className="card-text">
          <strong>Seller:</strong> {sellerId.username}
        </p>
        <p className="card-text">
          <strong>Price:</strong> {currencySymbol}{convertedPrice.toFixed(2)}
        </p>
        <p className="card-text">
          <strong>Rating:</strong> {rating} ({reviews} reviews)
        </p>
        <a href={`/product-details/${id}`} className="btn custom-btn mr-2">
          View Details
        </a>
        <button onClick={handlePurchase} className="btn custom-btn">
          Purchase
        </button>
      </div>
    </div>
  );
};

export default CommonCard;
