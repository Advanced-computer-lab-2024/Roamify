import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import ReviewArea from "./ReviewArea.js";
import Header from "../../../../layout/Header.js";
import { HeaderData } from "../../TouristHeaderData.js";
import { FaMapMarkerAlt, FaCalendarAlt } from "react-icons/fa"; // Location & Time Icons
import { GiPriceTag } from "react-icons/gi"; // Price Icon

const ActivityDetails = () => {
  const { id } = useParams();
  const [activity, setActivity] = useState(null);
  const [showPopup, setShowPopup] = useState(false);
  const [popupMessage, setPopupMessage] = useState("");

  // Fetch activity details based on activity ID
  useEffect(() => {
    const fetchActivities = async () => {
      try {
        const response = await axios.get("http://localhost:3000/api/activity", {
          withCredentials: true,
        });
        const foundActivity = response.data.activities.find(
          (activity) => activity._id === id
        );
        setActivity(foundActivity);
      } catch (error) {
        console.error("Error fetching activity:", error);
      }
    };
    fetchActivities();
  }, [id]);

  const handleBooking = async () => {
    try {
      await axios.post(
        "http://localhost:3000/api/tourist/book-activity",
        { activity: activity._id },
        { withCredentials: true }
      );
      setPopupMessage("Booking successful!");
      setShowPopup(true);
      setTimeout(() => setShowPopup(false), 3000);
    } catch (error) {
      setPopupMessage("Failed to book activity. Please try again.");
      setShowPopup(true);
      setTimeout(() => setShowPopup(false), 3000);
      console.error("Error booking activity:", error);
    }
  };

  if (!activity) return <p>Loading activity details...</p>;

  return (
    <>
      {/* <Header HeaderData={HeaderData} /> */}
      <section
        className="activity_details_section"
        style={{
          padding: "50px 0",
          backgroundColor: "var(--secondary-color)",
        }}
      >
        <div className="container">
          <div className="row">
            {/* Left Column: Main Activity Info */}
            <div className="col-lg-8">
              <div
                className="activity-card"
                style={{
                  padding: "20px",
                  borderRadius: "8px",
                  backgroundColor: "var(--secondary-color)",
                  boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
                  color: "#fff",
                }}
              >
                <h2 style={{ fontSize: "2rem", fontWeight: "600" }}>
                  {activity.name}
                </h2>
                <p style={{ fontSize: "1.1rem", margin: "10px 0" }}>
                  <strong>Category:</strong> {activity.category.name}
                </p>
                <p style={{ fontSize: "1.1rem", margin: "10px 0" }}>
                  <strong>Location:</strong> {activity.location.name}
                </p>
                <div
                  style={{
                    fontSize: "1.5rem",
                    fontWeight: "500",
                    color: "#27ae60",
                    margin: "10px 0",
                  }}
                >
                  <GiPriceTag style={{ marginRight: "10px" }} />
                  {activity.price} EGP
                </div>
                {activity.discounts && (
                  <h5 style={{ color: "#f39c12", textDecoration: "line-through" }}>
                    {(activity.price * (1 + activity.discounts / 100)).toFixed(
                      2
                    )}{" "}
                    EGP
                  </h5>
                )}
                <p style={{ margin: "20px 0", lineHeight: "1.6" }}>
                  {activity.description}
                </p>
                <button
                  onClick={handleBooking}
                  className="btn btn_theme"
                  style={{
                    padding: "12px 30px",
                    fontSize: "1rem",
                    backgroundColor: "#27ae60",
                    color: "#fff",
                    border: "none",
                    borderRadius: "8px",
                    cursor: "pointer",
                    boxShadow: "0 4px 8px rgba(0,0,0,0.2)",
                  }}
                >
                  Book Now
                </button>
              </div>
            </div>

            {/* Right Column: Activity Details */}
            <div className="col-lg-4">
              <div
                className="activity-card"
                style={{
                  padding: "20px",
                  borderRadius: "8px",
                  backgroundColor: "var(--secondary-color)",
                  boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
                  color: "#fff",
                }}
              >
                <h4>Activity Details</h4>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    marginBottom: "10px",
                  }}
                >
                  <FaMapMarkerAlt
                    style={{ marginRight: "10px", color: "#3498db" }}
                  />
                  <p>
                    <strong>Location:</strong> {activity.location.name}
                  </p>
                </div>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    marginBottom: "10px",
                  }}
                >
                  <FaCalendarAlt
                    style={{ marginRight: "10px", color: "#f39c12" }}
                  />
                  <p>
                    <strong>Time:</strong> {activity.time}
                  </p>
                </div>
                <p>
                  <strong>Tags:</strong>{" "}
                  {activity.tags.map((tag) => tag.name).join(", ")}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Review Section */}
        <ReviewArea itineraryId={id} />
      </section>

      {/* Popup for booking confirmation */}
      {showPopup && (
        <div
          style={{
            position: "fixed",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            backgroundColor: "#fff",
            padding: "20px",
            borderRadius: "8px",
            boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.2)",
            zIndex: 1000,
            minWidth: "300px",
            textAlign: "center",
          }}
        >
          <h4 style={{ color: "green", marginBottom: "10px" }}>
            {popupMessage}
          </h4>
          <button
            onClick={() => setShowPopup(false)}
            className="btn btn_theme"
            style={{
              marginTop: "10px",
              backgroundColor: "#27ae60",
              color: "#fff",
              border: "none",
              borderRadius: "8px",
              padding: "8px 20px",
              cursor: "pointer",
            }}
          >
            Close
          </button>
        </div>
      )}
      {showPopup && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            zIndex: 999,
          }}
          onClick={() => setShowPopup(false)}
        />
      )}
    </>
  );
};

export default ActivityDetails;
