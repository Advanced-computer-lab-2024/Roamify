import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Cart() {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

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

  const showToast = (message, type = "success") => {
    toast[type](message, { position: "top-center", autoClose: 3000 });
  };

  const handleApiError = (err, action) => {
    if (err.response) {
      console.error(
        `Error during ${action}:`,
        err.response.data.message || err.response.statusText
      );
      showToast(err.response.data.message || "An error occurred", "error");
    } else {
      console.error(`Error during ${action}:`, err.message);
      showToast("An error occurred. Please try again.", "error");
    }
  };

  const handleIncrement = async (productId) => {
    try {
      const response = await axios.patch(
        `http://localhost:3000/api/cart/product/${productId}/increment`,
        { product: productId },
        { withCredentials: true }
      );
      fetchCartData();
      showToast(response.data.message || "Quantity updated successfully");
    } catch (err) {
      handleApiError(err, "increment");
    }
  };

  const handleDecrement = async (productId) => {
    try {
      const response = await axios.patch(
        `http://localhost:3000/api/cart/product/${productId}/decrement`,
        { product: productId },
        { withCredentials: true }
      );
      fetchCartData();
      showToast(response.data.message || "Quantity updated successfully");
    } catch (err) {
      handleApiError(err, "decrement");
    }
  };

  const handleDelete = async (productId) => {
    try {
      const response = await axios.delete(
        `http://localhost:3000/api/cart/product/${productId}`,
        { withCredentials: true }
      );
      fetchCartData();
      showToast(response.data.message || "Product removed successfully");
    } catch (err) {
      handleApiError(err, "delete");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axios.post("http://localhost:3000/api/cart/checkout", {}, { withCredentials: true });
      console.log("Checkout response:", response.data);

      if (response.data.order && response.data.order._id) {
        localStorage.setItem("orderId", response.data.order._id);
        showToast(response.data.message || "Checkout successful!");
        navigate("/tourist/address");
      } else {
        throw new Error("No order ID received in response.");
      }
    } catch (err) {
      console.error("Checkout error:", err);
      handleApiError(err, "checkout");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCartData();
  }, []);

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
        }}
      >
        <h2 style={{ textAlign: "center", marginBottom: "20px", fontSize: "24px" }}>Shopping Cart</h2>
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
              <div style={{ display: "flex", alignItems: "center", flex: "1" }}>
                <img
                  src={item.image}
                  alt={item.name}
                  style={{
                    width: "80px",
                    height: "80px",
                    objectFit: "contain",
                    borderRadius: "0px",
                    marginRight: "10px",
                  }}
                />
                <div>
                  <strong>{item.name}</strong>
                </div>
              </div>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "10px",
                  flex: "0 0 auto",
                }}
              >
                <button
                  type="button"
                  style={{
                    width: "40px",
                    height: "40px",
                    backgroundColor: "#8b3eea",
                    border: "none",
                    borderRadius: "5px",
                    fontSize: "22px",
                    color: "#fff",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    cursor: "pointer",
                  }}
                  onClick={() => handleDecrement(item.productId)}
                >
                  -
                </button>
                <span
                  style={{
                    minWidth: "40px",
                    height: "40px",
                    lineHeight: "40px",
                    textAlign: "center",
                    fontSize: "16px",
                  }}
                >
                  {item.quantity}
                </span>
                <button
                  type="button"
                  style={{
                    width: "40px",
                    height: "40px",
                    backgroundColor: "#8b3eea",
                    border: "none",
                    borderRadius: "5px",
                    fontSize: "22px",
                    color: "#fff",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    cursor: "pointer",
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
                  fontSize: "20px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
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
      </div>
      <ToastContainer />
    </div>
  );
}

export default Cart;
