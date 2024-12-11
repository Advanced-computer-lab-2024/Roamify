import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify"; // Import both toast and ToastContainer
import "react-toastify/dist/ReactToastify.css"; // Import Toastify styles
import "./Card.css";
import { Link } from "react-router-dom";

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
  // State to track whether the item is in the wishlist
  const [isInWishlist, setIsInWishlist] = useState(false);

  // Get currency symbol and exchange rate from localStorage
  const currencySymbol = localStorage.getItem("currencySymbol") || "$";
  const exchangeRate = parseFloat(localStorage.getItem("value")) || 1; // Default to 1 if not set

  // Calculate the converted price
  const convertedPrice = price * exchangeRate;

  // Check if the product is in the wishlist
  useEffect(() => {
    const checkWishlistStatus = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/api/wishlist/`,
          {
            withCredentials: true,
          }
        );
        const productInWishlist = response.data?.wishlist?.some(
          (item) => item.productId === id
        );
        setIsInWishlist(productInWishlist);
      } catch (error) {
        console.error("Error checking wishlist:", error);
      }
    };

    checkWishlistStatus();
  }, [id]);

  // Handler for adding/removing item from wishlist
  const handleWishlist = async () => {
    try {
      if (isInWishlist) {
        // Remove product from wishlist
        console.log(`Removing product with ID: ${id}`);
        const response = await axios.delete(
          `http://localhost:3000/api/wishlist/${id}`,
          { withCredentials: true }
        );
        console.log(response); // Log the response from the API

        setIsInWishlist(false); // Update state after removing from wishlist
        toast.success("Item removed from your wishlist."); // Show success toast
      } else {
        // Add product to wishlist
        console.log(`Adding product with ID: ${id}`);
        const response = await axios.post(
          `http://localhost:3000/api/wishlist/${id}`,
          {},
          { withCredentials: true }
        );
        console.log(response); // Log the response from the API

        setIsInWishlist(true); // Update state after adding to wishlist
        toast.success("Item successfully added to your wishlist!"); // Show success toast
      }
    } catch (error) {
      console.error("Error adding/removing from wishlist:", error);
      toast.error("There was an error with the wishlist operation."); // Show error toast
    }
  };

  // Handler for adding the product to the cart
  const handleAddToCart = async () => {
    try {
      const response = await axios.post(
        `http://localhost:3000/api/cart/product`,
        {
          productId: id,
        },
        { withCredentials: true } // Ensure credentials are sent for authentication
      );

      // Check the response JSON
      toast.success(
        response.data.message || "Item added to cart successfully!"
      );
    } catch (error) {
      // Extract and display API error message
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        toast.error(error.response.data.message);
      } else {
        console.error("Unexpected error:", error);
        toast.error("An unexpected error occurred.");
      }
    }
  };

  return (
    <div
      className="card"
      style={{
        borderRadius: "15px",
        border: "none",
        boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)", // Initial shadow
        transition: "transform 0.3s ease, box-shadow 0.3s ease", // Smooth transition
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = "scale(1.05)"; // Enlarge
        e.currentTarget.style.boxShadow = "0px 8px 16px rgba(0, 0, 0, 0.2)"; // Stronger shadow
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = "scale(1)"; // Reset size
        e.currentTarget.style.boxShadow = "0px 4px 8px rgba(0, 0, 0, 0.1)"; // Reset shadow
      }}
    >
      <img
        src={picture}
        alt={name}
        className="card-img-top"
        style={{
          height: "30vh",
          objectFit: "contain",
        }}
      />

      {/* Heart icon for wishlist */}
      <div className="heart_destinations" onClick={handleWishlist}>
        <i
          className={`fas fa-heart ${isInWishlist ? "heart-filled" : ""}`}
          title={isInWishlist ? "Remove from Wishlist" : "Add to Wishlist"}
          style={{
            fontSize: "1.5rem",
            color: isInWishlist ? "var(--main-color)" : "var(--gray-color)",
            transition: "color 0.3s ease",
          }}
        ></i>
      </div>

      {/* Product details */}
      <div
        className="card-body"
        style={{ background: "var(--secondary-color)" }}
      >
        <h5 className="card-title">{name}</h5>
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
        <div
          className="button-group"
          style={{ display: "flex", gap: "8px", marginTop: "10px" }}
        >
          <Link
            to={`/tourist/product-details/${id}`}
            className="btn custom-btn "
            style={{
              flex: 1,
              border: "1px solid var(--main-color)",
            }}
          >
            View Details
          </Link>
          <button
            className="btn custom-btn"
            onClick={handleAddToCart}
            style={{ flex: 1 }}
          >
            Add to Cart
          </button>
        </div>
      </div>

      {/* Toast Container for notifications */}
    </div>
  );
};

export default CommonCard;
