import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import CommonBanner from "../../../../component/Common/CommonBanner";
import ReviewArea from "./ReviewArea.js";
import Header from "../../../../layout/Header.js";
import { HeaderData } from "../../TouristHeaderData.js";
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
      <Header HeaderData={HeaderData} />
      <CommonBanner heading={activity.name} pagination="Activity Details" />
      <section className="activity_details_section">
        <div className="container">
          <div className="row">
            <div className="col-lg-8">
              <h2>{activity.name}</h2>
              <p>{activity.category.name}</p>
              <p>{activity.location.name}</p>
              <h3>{activity.price} EGP</h3>
              {activity.discounts && (
                <h5>
                  <del>
                    {(activity.price * (1 + activity.discounts / 100)).toFixed(
                      2
                    )}{" "}
                    EGP
                  </del>
                </h5>
              )}
              <p>{activity.description}</p>
              <button onClick={handleBooking} className="btn btn_theme">
                Book Now
              </button>
            </div>
            <div className="col-lg-4">
              <h4>Details</h4>
              <p>
                <strong>Location:</strong> {activity.location.name}
              </p>
              <p>
                <strong>Coordinates:</strong>{" "}
                {activity.location.coordinates.join(", ")}
              </p>
              <p>
                <strong>Time:</strong> {activity.time}
              </p>
              <p>
                <strong>Tags:</strong>{" "}
                {activity.tags.map((tag) => tag.name).join(", ")}
              </p>
            </div>
          </div>
        </div>
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
            style={{ marginTop: "10px" }}
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
