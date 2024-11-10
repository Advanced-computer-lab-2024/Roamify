import React from "react";

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
          <strong>Price:</strong> {currencySymbol}
          {convertedPrice.toFixed(2)}
        </p>
        <p className="card-text">
          <strong>Rating:</strong> {rating} ({reviews} reviews)
        </p>
        <a href={`/product-details/${id}`} className="apply">
          View Details
        </a>
      </div>
    </div>
  );
};

export default CommonCard;
