import React, { useEffect, useState } from "react";
import axios from "axios";

function Cart() {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [notification, setNotification] = useState(""); // State for notification

  const fetchCartData = async () => {
    try {
      const response = await axios.get("http://localhost:3000/api/cart/", {
        withCredentials: true,
      });
      console.log("Cart data fetched:", response.data);
      setCartItems(response.data.cart || []);
    } catch (err) {
      console.error("Error fetching cart data:", err.message);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleApiError = (err, action) => {
    if (err.response) {
      console.error(
        `Error during ${action}:`,
        err.response.data.message || err.response.statusText
      );
      setNotification(err.response.data.message || "An error occurred"); // Display API error message
    } else {
      console.error(`Error during ${action}:`, err.message);
      setNotification("An error occurred. Please try again."); // Default error message
    }
  };

  const handleIncrement = async (productId) => {
    try {
      const response = await axios.patch(
        `http://localhost:3000/api/cart/product/${productId}/increment`, // Dynamically use productId
        { product: productId }, // Include productId in the body for consistency (if needed)
        { withCredentials: true }
      );
      fetchCartData(); // Refresh cart data
      setNotification(response.data.message || "Quantity updated successfully");
    } catch (err) {
      handleApiError(err, "increment");
    }
  };
  
  const handleDecrement = async (productId) => {
    try {
      const response = await axios.patch(
        `http://localhost:3000/api/cart/product/${productId}/decrement`, // Dynamically use productId
        { product: productId }, // Include productId in the body for consistency (if needed)
        { withCredentials: true }
      );
      fetchCartData(); // Refresh cart data
      setNotification(response.data.message || "Quantity updated successfully");
    } catch (err) {
      handleApiError(err, "decrement");
    }
  };
  

  const handleDelete = async (productId) => {
    try {
      const response = await axios.delete(
        `http://localhost:3000/api/cart/product/${productId}`, // Use dynamic productId here
        {
          withCredentials: true, // No need for 'data' as DELETE request includes ID in the URL
        }
      );
      fetchCartData();
      setNotification(response.data.message || "Product removed successfully");
    } catch (err) {
      handleApiError(err, "delete");
    }
  };
  

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); // Set loading state to true while API call is in progress
    try {
      const response = await axios.post("http://localhost:3000/api/cart/review", {
        cartItems // Assuming the API needs the cart items data
      }, {
        withCredentials: true
      });
      console.log("Checkout response:", response.data);
      setNotification(response.data.message || "Checkout successful!"); // Display success message
    } catch (err) {
      handleApiError(err, "checkout");
    } finally {
      setLoading(false); // Set loading state to false after API call is complete
    }
  };
  

  useEffect(() => {
    fetchCartData();
  }, []);

  useEffect(() => {
    if (notification) {
      const timer = setTimeout(() => setNotification(""), 3000); // Clear notification after 3 seconds
      return () => clearTimeout(timer);
    }
  }, [notification]);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <div style={{ display: "flex", justifyContent: "center", padding: "20px" }}>
      <div
        style={{
          border: "1px solid #ddd",
          borderRadius: "10px",
          padding: "20px",
          maxWidth: "600px",
          backgroundColor: "#f9f9f9",
          boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
          position: "relative", // Added for notification positioning
        }}
      >
        <h2 style={{ textAlign: "center", marginBottom: "20px" , fontSize: "24px"}}>Your Cart</h2>
        <form onSubmit={handleSubmit}>
          {cartItems.map((item) => (
            <div
              key={item.productId}
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                marginBottom: "15px",
                padding: "10px",
                border: "1px solid #e0e0e0",
                borderRadius: "8px",
                backgroundColor: "#fff",
              }}
            >
              <div style={{ display: "flex", alignItems: "center" }}>
                <img
                  src={item.image}
                  alt={item.name}
                  style={{
                    width: "60px",
                    height: "60px",
                    objectFit: "cover",
                    borderRadius: "5px",
                    marginRight: "10px",
                  }}
                />
                <div>
                  <strong>{item.name}</strong>
                </div>
              </div>
              <div
                style={{
                  textAlign: "center",
                  display: "flex",
                  alignItems: "center",
                  gap: "5px",
                }}
              >
                <button
                  type="button"
                  style={{
                    width: "35px",
                    height: "35px",
                    backgroundColor: "#8b3eea",
                    border: "none",
                    borderRadius: "5px",
                    fontSize: "22px",
                    color: "#fff",
                    cursor: "pointer",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    marginLeft:"5px",
                  }}
                  onClick={() => handleDecrement(item.productId)}
                >
                  -
                </button>
                <span
                  style={{
                    width: "40px",
                    textAlign: "center",
                    fontSize: "16px",
                  }}
                >
                  {item.quantity}
                </span>
                <button
                  type="button"
                  style={{
                    width: "35px",
                    height: "35px",
                    backgroundColor: "#8b3eea",
                    border: "none",
                    borderRadius: "5px",
                    fontSize: "16px",
                    color: "#fff",
                    cursor: "pointer",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                  onClick={() => handleIncrement(item.productId)}
                >
                  +
                </button>
              </div>
              <button
                type="button"
                style={{
                  backgroundColor: "transparent",
                  border: "none",
                  color: "#f44336",
                  cursor: "pointer",
                  fontSize: "18px",
                }}
                onClick={() => handleDelete(item.productId)}
              >
                🗑️
              </button>
            </div>
          ))}
          <button
            type="submit"
            style={{
              display: "block",
              margin: "20px auto",
              padding: "10px 20px",
              backgroundColor: "#8b3eea",
              color: "#fff",
              border: "none",
              borderRadius: "5px",
              fontSize: "16px",
              cursor: "pointer",
            }}
          >
            Checkout
          </button>
        </form>
        {notification && (
          <div
            style={{
              position: "absolute",
              bottom: "-20px",
              left: "50%",
              transform: "translateX(-50%)",
              backgroundColor: "#dbdad5",
              color: "#8b3eaa",
              borderRadius: "5px",
              padding: "5px 10px",
              fontSize: "12px",
              boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)",
              textAlign: "center",
              whiteSpace: "nowrap",
            }}
          >
            {notification}
          </div>
        )}
      </div>
    </div>
  );
}

export default Cart;
