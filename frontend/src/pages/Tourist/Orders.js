import React, { useState, useEffect } from "react";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import EmptyResponseLogo from "../../component/EmptyResponseLogo";

const OrdersArea = () => {
  const [orders, setOrders] = useState([]);
  const [filter, setFilter] = useState("current"); // "current", "past", or "cancelled"
  const [error, setError] = useState("");

  const fetchOrders = async () => {
    try {
      const response = await axios.get("http://localhost:3000/api/order/", {
        withCredentials: true,
      });
      console.log("API Response:", response.data);
      setOrders(response.data.orders || []);
    } catch (error) {
      console.error("Error fetching orders:", error);
      setOrders([]);
      setError(error.response.data.message);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const handleCancelOrder = async (orderId) => {
    const url = `http://localhost:3000/api/order/${orderId}/cancel`;
    try {
      const response = await fetch(url, {
        method: "PATCH",
        credentials: "include",
      });
      const data = await response.json();
      if (!response.ok)
        throw new Error(data.message || "Failed to cancel order");
      toast.success("Order cancelled successfully!");
      fetchOrders(); // Re-fetch to update state
    } catch (error) {
      toast.error(`Error cancelling order: ${error.message}`);
      console.error("Error cancelling order:", error);
    }
  };

  const handleFilterChange = (newFilter) => {
    console.log("Filter changing to:", newFilter);
    setFilter(newFilter);
  };

  const filteredOrders = orders.filter((order) => {
    console.log(`Filtering for ${filter}:`, order);
    if (filter === "current") return order.status === "Processing";
    if (filter === "past") return order.status === "Delivered";
    if (filter === "cancelled") return order.status === "Cancelled";
    return false;
  });

  const formatDateAndTime = (dateString) => {
    const date = new Date(dateString);
    return `${date.toLocaleDateString()} at ${date.toLocaleTimeString()}`;
  };

  return (
    <section
      id="order_area"
      className="section_padding"
      style={{ minHeight: "100vh" }}
    >
      <div className="container">
        <div
          className="row"
          style={{ alignItems: "center", justifyContent: "center" }}
        >
          <div className="col-lg-9" style={{ width: "100%" }}>
            <div style={{ display: "flex", gap: "10px", marginBottom: "20px" }}>
              <button
                type="button"
                className={`btn ${
                  filter === "current" ? "btn-primary" : "btn-outline-primary"
                }`}
                onClick={() => handleFilterChange("current")}
              >
                Current Orders
              </button>
              <button
                type="button"
                className={`btn ${
                  filter === "past" ? "btn-primary" : "btn-outline-primary"
                }`}
                onClick={() => handleFilterChange("past")}
              >
                Past Orders
              </button>
              <button
                type="button"
                className={`btn ${
                  filter === "cancelled" ? "btn-primary" : "btn-outline-primary"
                }`}
                onClick={() => handleFilterChange("cancelled")}
              >
                Cancelled Orders
              </button>
            </div>
            {error ? (
              <EmptyResponseLogo isVisible={true} size="200px" text={error} />
            ) : (
              filteredOrders.map((order, index) => (
                <div
                  className="order_item_wrappper"
                  key={index}
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "flex-start", // Left-align order summary
                    padding: "20px",
                    backgroundColor: "#f9f9f9",
                    borderRadius: "8px",
                    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                    marginBottom: "20px",
                  }}
                >
                  <h3 style={{ textAlign: "left", marginBottom: "10px" }}>
                    Order Summary
                  </h3>
                  <div
                    style={{
                      width: "100%",
                      marginBottom: "15px",
                      textAlign: "left",
                    }}
                  >
                    <p>Status: {order.status}</p>
                    <p>Total Receipt Price: ${order.receipt?.price || "N/A"}</p>
                    <p>Date and Time: {formatDateAndTime(order.createdAt)}</p>
                    <p>
                      Delivery Address: {order.deliveryAddress.street},{" "}
                      {order.deliveryAddress.city}
                    </p>
                  </div>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "flex-start",
                      gap: "10px",
                      flexWrap: "wrap",
                      width: "100%",
                    }}
                  >
                    {order.products.map((product, productIndex) => (
                      <div
                        key={productIndex}
                        style={{
                          width: "200px", // Square size
                          height: "150px", // Square size
                          padding: "10px",
                          backgroundColor: "#fff",
                          border: "1px solid #ddd",
                          borderRadius: "5px",
                          textAlign: "left",
                          overflow: "hidden", // Hide overflow text
                          whiteSpace: "nowrap", // Prevent text wrapping
                          textOverflow: "ellipsis", // Add ellipsis for overflow
                        }}
                      >
                        <p>Name: {product.name}</p>
                        <p>Price: ${product.priceAtPurchase}</p>
                        <p>Quantity: {product.quantity}</p>
                      </div>
                    ))}
                  </div>
                  {order.status === "Processing" && (
                    <button
                      style={{
                        padding: "10px 15px",
                        backgroundColor: "#8b3eea",
                        color: "#fff",
                        border: "none",
                        borderRadius: "4px",
                        cursor: "pointer",
                        alignSelf: "flex-end", // Button on the right
                        marginTop: "15px",
                      }}
                      onClick={() => handleCancelOrder(order.id)}
                    >
                      Cancel Order
                    </button>
                  )}
                </div>
              ))
            )}
          </div>
        </div>
      </div>
      <Toaster position="bottom-center" reverseOrder={false} />
    </section>
  );
};

export default OrdersArea;
