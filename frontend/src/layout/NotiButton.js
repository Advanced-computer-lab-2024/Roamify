import React, { useState, useEffect } from "react";
import { FaBell } from "react-icons/fa";
import axios from "axios";
import LoadingLogo from "../component/LoadingLogo";

const NotiButton = () => {
  const [notifications, setNotifications] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchNotifications = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get(
        "http://localhost:3000/api/notifications/",
        {
          withCredentials: true,
        }
      );
      setNotifications(response.data.notifications || []);
    } catch (error) {
      setError("Failed to fetch notifications.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNotifications();
  }, []);

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  const handleNotificationClick = async (id) => {
    try {
      await axios.put(
        "http://localhost:3000/api/notifications/",
        { notificationId: id },
        { withCredentials: true }
      );
      fetchNotifications();
    } catch (error) {
      console.error("Failed to mark notification as read:", error);
    }
  };

  const closeModal = (e) => {
    if (e.target.id === "notification-modal-overlay") {
      setIsModalOpen(false);
    }
  };
  const unreadCount = notifications.filter((notif) => !notif.read).length;

  return (
    <>
      <div style={{ position: "relative" }}>
        <div style={{ position: "relative", display: "inline-block" }}>
          <FaBell
            style={{
              fontSize: "20px", // Adjust the icon size
              color: "var(--text-color)", // Set the color for the icon
              cursor: "pointer",
            }}
            onClick={toggleModal}
          />
          {unreadCount > 0 && (
            <span
              style={{
                position: "absolute",
                top: "-5px",
                right: "-10px",
                background: "var(--main-color)",
                color: "white",
                fontSize: "12px",
                fontWeight: "bold",
                borderRadius: "50%",
                padding: "2px 6px",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              {unreadCount}
            </span>
          )}
        </div>

        {/* Modal */}
        {isModalOpen && (
          <div
            id="notification-modal-overlay"
            style={{
              position: "fixed",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              backgroundColor: "rgba(0, 0, 0, 0.5)",
              zIndex: 999,
            }}
            onClick={closeModal}
          >
            <div
              style={{
                position: "absolute",
                top: "80px",
                right: "140px",
                backgroundColor: "var(--secondary-color)",
                width: "500px",
                maxHeight: "300px", // Fixed height for overflow
                boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.2)",
                borderRadius: "8px",
                overflowY: "auto", // Scroll when content exceeds height
                zIndex: 1000, // Ensure the modal appears on top
              }}
              onClick={(e) => e.stopPropagation()} // Prevent modal close on content click
            >
              <div style={{}}>
                {loading ? (
                  <LoadingLogo isVisible={true} size="50px" />
                ) : error ? (
                  ""
                ) : notifications.length > 0 ? (
                  notifications.map((notification, index) => (
                    <div
                      key={index}
                      style={{
                        padding: "20px",
                        borderBottom: "1px solid var(--secondary-border-color)",
                        backgroundColor: notification.read
                          ? "var(--secondary-color)"
                          : "var(--background-color)", // Highlight unread notifications
                        cursor: notification.read ? "default" : "pointer",
                        position: "relative",
                      }}
                    >
                      <button
                        onClick={() =>
                          handleNotificationClick(notification._id)
                        }
                        style={{
                          position: "absolute",
                          top: "5px",
                          right: "5px",
                          background: "none",
                          border: "none",
                          color: "var(--text-color)",
                          fontSize: "20px",
                          cursor: "pointer",
                        }}
                      >
                        &times;
                      </button>

                      <p style={{ margin: 0 }}>
                        <strong>{notification.type}</strong>
                      </p>
                      <p style={{ margin: 0 }}>{notification.message}</p>
                      <small style={{ color: "#888" }}>
                        {notification.timestamp}
                      </small>
                    </div>
                  ))
                ) : (
                  <p>No notifications available.</p>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default NotiButton;
