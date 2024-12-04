import React, { useEffect, useState } from "react";
import axios from "axios";

function Cart() {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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
      console.error(`Error during ${action}:`, err.response.data.message || err.response.statusText);
    } else {
      console.error(`Error during ${action}:`, err.message);
    }
  };

  const handleIncrement = async (productId) => {
    try {
      await axios.patch(
        "http://localhost:3000/api/cart/increment-product",
        { product: productId },
        { withCredentials: true }
      );
      fetchCartData();
    } catch (err) {
      handleApiError(err, "increment");
    }
  };

  const handleDecrement = async (productId) => {
    try {
      await axios.patch(
        "http://localhost:3000/api/cart/decrement-product",
        { product: productId },
        { withCredentials: true }
      );
      fetchCartData();
    } catch (err) {
      handleApiError(err, "decrement");
    }
  };

  const handleDelete = async (productId) => {
    try {
      await axios.delete("http://localhost:3000/api/cart/remove-product", {
        data: { product: productId },
        withCredentials: true,
      });
      fetchCartData();
    } catch (err) {
      handleApiError(err, "delete");
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Cart submitted:", cartItems);
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
        <h2 style={{ textAlign: "center", marginBottom: "20px"}}>Your Cart</h2>
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
                    fontSize: "20px",
                    fontWeight: "bold",
                    color: "#fff",
                    cursor: "pointer",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    marginLeft:"10px",
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
                    fontWeight: "bold",
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
                    fontWeight: "bold",
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
      </div>
    </div>
  );
}

export default Cart;
