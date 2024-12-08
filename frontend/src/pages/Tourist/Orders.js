import React, { useState, useEffect } from "react";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";

const OrdersArea = () => {
  const [orders, setOrders] = useState([]);
  const [filter, setFilter] = useState("current"); // "current" or "past"

  const fetchOrders = async () => {
    try {
      const response = await axios.get(
        "http://localhost:3000/api/order/",
        {
          withCredentials: true,
        }
      );
      setOrders(response.data.orders || []);
    } catch (error) {
      console.error("Error fetching orders:", error);
      toast.error("Failed to fetch orders.");
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const handleCancelOrder = async () => {
    const orderId = localStorage.getItem('orderId');
    const url = `http://localhost:3000/api/order/${orderId}/cancel`;

    try {
        const response = await fetch(url, { method: 'PATCH', credentials: 'include' });
        const data = await response.json();
        if (!response.ok) throw new Error(data.message || "Failed to cancel order");

        toast.success("Order cancelled successfully!");
        fetchOrders(); // Re-fetch to update state
    } catch (error) {
        toast.error(`Error cancelling order: ${error.message}`);
        console.error("Error cancelling order:", error);
    }
};
;

  const filteredOrders = orders.filter((order) => {
    if (filter === "current") {
      const currentDate = new Date();
      const orderDate = new Date(order.date);
      return orderDate >= currentDate;
    }
    return new Date(order.date) < new Date();
  });

  return (
    <section id="order_area" className="section_padding">
      <div className="container">
        <div className="row">
          <div className="col-lg-9">
            <div style={{ display: "flex", gap: "10px", marginBottom: "20px" }}>
              <button
                type="button"
                className={`btn ${
                  filter === "current" ? "btn-primary" : "btn-outline-primary"
                }`}
                onClick={() => setFilter("current")}
              >
                Current Orders
              </button>
              <button
                type="button"
                className={`btn ${
                  filter === "past" ? "btn-primary" : "btn-outline-primary"
                }`}
                onClick={() => setFilter("past")}
              >
                Past Orders
              </button>
            </div>

            {filteredOrders.map((order, index) => (
              <div
                className="order_item_wrappper"
                key={index}
                style={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                  padding: "20px",
                  backgroundColor: "#f9f9f9",
                  borderRadius: "8px",
                  boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                  marginBottom: "20px",
                }}
              >
                <div style={{ flex: "1" }}>
                  <h3 style={{ marginBottom: "10px" }}>{order.name}</h3>
                  <p>Type: {order.type}</p>
                  <p>Pickup Location: {order.pickupLocation}</p>
                  <p>Drop-Off Location: {order.dropOffLocation}</p>
                  <p>Date: {new Date(order.date).toLocaleDateString()}</p>
                  <p>Time: {order.time}</p>
                  <p>Price: ${order.price}</p>
                </div>
                <button
                  style={{
                    padding: "10px 15px",
                    backgroundColor: "#ff4d4d",
                    color: "#fff",
                    border: "none",
                    borderRadius: "4px",
                    cursor: "pointer",
                  }}
                  onClick={() => handleCancelOrder(order._id)}
                >
                  Cancel
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
      <Toaster position="bottom-center" reverseOrder={false} />
    </section>
  );
};

export default OrdersArea;
