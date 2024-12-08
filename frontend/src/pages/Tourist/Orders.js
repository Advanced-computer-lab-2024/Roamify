import React, { useState, useEffect } from "react";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";

const OrdersArea = () => {
  const [orders, setOrders] = useState([]);
  const [filter, setFilter] = useState("current"); // "current", "past", or "cancelled"

  const fetchOrders = async () => {
    try {
      const response = await axios.get("http://localhost:3000/api/order/", {
        withCredentials: true,
      });
      console.log("API Response:", response.data);
      setOrders(response.data.orders || []);
    } catch (error) {
      console.error("Error fetching orders:", error);
      toast.error("Failed to fetch orders.");
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const handleCancelOrder = async (orderId) => {
    const url = `http://localhost:3000/api/order/${orderId}/cancel`;
    try {
      const response = await fetch(url, { method: "PATCH", credentials: "include" });
      const data = await response.json();
      if (!response.ok) throw new Error(data.message || "Failed to cancel order");
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
    <section id="order_area" className="section_padding">
      <div className="container">
        <div className="row">
          <div className="col-lg-9">
            <div style={{ display: "flex", gap: "10px", marginBottom: "20px" }}>
              <button
                type="button"
                className={`btn ${filter === "current" ? "btn-primary" : "btn-outline-primary"}`}
                onClick={() => handleFilterChange("current")}
              >
                Current Orders
              </button>
              <button
                type="button"
                className={`btn ${filter === "past" ? "btn-primary" : "btn-outline-primary"}`}
                onClick={() => handleFilterChange("past")}
              >
                Past Orders
              </button>
              <button
                type="button"
                className={`btn ${filter === "cancelled" ? "btn-primary" : "btn-outline-primary"}`}
                onClick={() => handleFilterChange("cancelled")}
              >
                Cancelled Orders
              </button>
            </div>
            {filteredOrders.length > 0 ? (
              filteredOrders.map((order, index) => (
                <div
                  className="order_item_wrappper"
                  key={index}
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                    alignItems: "flex-start",
                    padding: "20px",
                    backgroundColor: "#f9f9f9",
                    borderRadius: "8px",
                    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                    marginBottom: "20px",
                  }}
                >
                  <div style={{ flex: "1", marginBottom: "15px" }}>
                    <h3 style={{ marginBottom: "10px" }}>Order Summary</h3>
                    <p>Status: {order.status}</p>
                    <p>Total Receipt Price: ${order.receipt?.price || "N/A"}</p>
                    <p>Date and Time: {formatDateAndTime(order.createdAt)}</p>
                    <p>
                      Delivery Address: {order.deliveryAddress.street},{" "}
                      {order.deliveryAddress.city}
                    </p>
                  </div>
                  <div style={{ flex: "1" }}>
                    <h4>Products:</h4>
                    {order.products.map((product, productIndex) => (
                      <div
                        key={productIndex}
                        style={{
                          padding: "10px",
                          marginBottom: "10px",
                          backgroundColor: "#fff",
                          border: "1px solid #ddd",
                          borderRadius: "5px",
                        }}
                      >
                        <p>Product Name: {product.name}</p>
                        <p>Price at Purchase: ${product.priceAtPurchase}</p>
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
                      }}
                      onClick={() => handleCancelOrder(order.id)}
                    >
                      Cancel Order
                    </button>
                  )}
                </div>
              ))
            ) : (
              <p>No orders to display</p>
            )}
          </div>
        </div>
      </div>
      <Toaster position="bottom-center" reverseOrder={false} />
    </section>
  );
};

export default OrdersArea;
