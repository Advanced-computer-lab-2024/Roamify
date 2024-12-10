import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { Tooltip } from "react-tooltip";
import { FaMapMarkerAlt, FaClock, FaTimes } from "react-icons/fa";
import "react-toastify/dist/ReactToastify.css";
import "react-tooltip/dist/react-tooltip.css";

const Bookmarks = () => {
  const [activities, setActivities] = useState([]);
  const [itineraries, setItineraries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activitiesError, setActivitiesError] = useState(null);
  const [itinerariesError, setItinerariesError] = useState(null);
  const navigate = useNavigate();

  const fetchBookmarks = async () => {
    setLoading(true);

    // Fetch activities
    try {
      const activityResponse = await axios.get(
        "http://localhost:3000/api/bookmark/activity",
        { withCredentials: true }
      );
      setActivities(activityResponse.data.bookmarkedActivities || []);
    } catch (err) {
      if (err.response?.status === 400) {
        setActivitiesError("No bookmarked activities.");
      } else {
        toast.error("Error fetching activities.");
      }
    }

    // Fetch itineraries
    try {
      const itineraryResponse = await axios.get(
        "http://localhost:3000/api/bookmark/itinerary",
        { withCredentials: true }
      );
      setItineraries(itineraryResponse.data.bookmarkedItineraries || []);
    } catch (err) {
      if (err.response?.status === 400) {
        setItinerariesError("No bookmarked itineraries.");
      } else {
        toast.error("Error fetching itineraries.");
      }
    }

    setLoading(false);
  };

  const handleRemoveBookmark = async (id, type) => {
    const endpoint =
      type === "activity"
        ? "http://localhost:3000/api/bookmark/activity"
        : "http://localhost:3000/api/bookmark/itinerary";

    const requestData =
      type === "activity" ? { activityId: id } : { itineraryId: id };

    try {
      await axios.delete(endpoint, {
        data: requestData, // Correctly send the ID in JSON format
        withCredentials: true,
      });
      toast.success("Removed from bookmarks.");
      fetchBookmarks(); // Refresh bookmarks after removal
    } catch (err) {
      toast.error("Error removing from bookmarks.");
    }
  };

  useEffect(() => {
    fetchBookmarks();
  }, []);

  if (loading) {
    return <p>Loading bookmarks...</p>;
  }

  return (
    <div style={styles.pageContainer}>
      <h2 style={{ textAlign: "center", marginBottom: "20px" }}>
        Your Bookmarks
      </h2>

      {/* Activities Section */}
      <div style={styles.section}>
        <h3>Bookmarked Activities</h3>
        {activitiesError ? (
          <p>{activitiesError}</p>
        ) : activities.length > 0 ? (
          <div style={styles.cardsContainer}>
            {activities.map((activity) => (
              <div
                className="flight_search_item_wrappper"
                key={activity._id}
                style={styles.card}
              >
                {/* Remove Button */}
                <div
                  data-tooltip-id={`remove-activity-tooltip-${activity._id}`}
                  data-tooltip-content="Remove from bookmarks"
                  onClick={() => handleRemoveBookmark(activity._id, "activity")}
                  style={styles.removeButton}
                >
                  <FaTimes />
                </div>

                {/* Content */}
                <div
                  data-tooltip-id="activity-tooltip"
                  data-tooltip-content="Go to Activity"
                  onClick={() =>
                    navigate(`/tourist/activity-details/${activity._id}`)
                  }
                  style={styles.clickable}
                >
                  <h4 style={styles.title}>{activity.name}</h4>
                  <p>
                    <FaMapMarkerAlt /> {activity.location.name}
                  </p>
                  <p>
                    <FaClock /> {new Date(activity.date).toLocaleDateString()} |{" "}
                    {activity.time}
                  </p>
                  <p>Price: {activity.price} USD</p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p>No bookmarked activities.</p>
        )}
      </div>

      {/* Itineraries Section */}
      <div style={styles.section}>
        <h3>Bookmarked Itineraries</h3>
        {itinerariesError ? (
          <p>{itinerariesError}</p>
        ) : itineraries.length > 0 ? (
          <div style={styles.cardsContainer}>
            {itineraries.map((itinerary) => (
              <div
                className="flight_search_item_wrappper"
                key={itinerary._id}
                style={styles.card}
              >
                {/* Remove Button */}
                <div
                  data-tooltip-id={`remove-itinerary-tooltip-${itinerary._id}`}
                  data-tooltip-content="Remove from bookmarks"
                  onClick={() =>
                    handleRemoveBookmark(itinerary._id, "itinerary")
                  }
                  style={styles.removeButton}
                >
                  <FaTimes />
                </div>

                {/* Content */}
                <div
                  data-tooltip-id="itinerary-tooltip"
                  data-tooltip-content="Go to Itinerary"
                  onClick={() =>
                    navigate(`/tourist/itinerary-details/${itinerary._id}`)
                  }
                  style={styles.clickable}
                >
                  <h4 style={styles.title}>{itinerary.name}</h4>
                  <p>
                    <FaMapMarkerAlt /> {itinerary.locations.join(", ")}
                  </p>
                  <p>Language: {itinerary.language}</p>
                  <p>Price: {itinerary.price} USD</p>
                  <p>
                    Next Available:{" "}
                    {itinerary.availableDates.length > 0
                      ? new Date(
                          itinerary.availableDates[0]
                        ).toLocaleDateString()
                      : "No dates available"}
                  </p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p>No bookmarked itineraries.</p>
        )}
      </div>

      <ToastContainer position="top-right" autoClose={3000} />
      <Tooltip id="activity-tooltip" />
      <Tooltip id="itinerary-tooltip" />
      {activities.map((activity) => (
        <Tooltip
          id={`remove-activity-tooltip-${activity._id}`}
          key={`remove-activity-tooltip-${activity._id}`}
        />
      ))}
      {itineraries.map((itinerary) => (
        <Tooltip
          id={`remove-itinerary-tooltip-${itinerary._id}`}
          key={`remove-itinerary-tooltip-${itinerary._id}`}
        />
      ))}
    </div>
  );
};

const styles = {
  pageContainer: {
    padding: "20px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    minHeight: "100vh",
    backgroundColor: "#f8f9fa",
  },
  section: {
    marginBottom: "30px",
    width: "100%",
    maxWidth: "800px",
  },
  cardsContainer: {
    display: "grid",
    gridTemplateColumns: "1fr",
    gap: "15px",
  },
  card: {
    background: "#fff",
    border: "1px solid #dddddd",
    borderRadius: "12px",
    padding: "15px",
    boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
    position: "relative",
    transition: "transform 0.3s ease, box-shadow 0.3s ease",
  },
  clickable: {
    cursor: "pointer",
  },
  title: {
    textAlign: "center",
    fontWeight: "bold",
    marginBottom: "10px",
  },
  removeButton: {
    position: "absolute",
    top: "10px",
    right: "10px",
    cursor: "pointer",
    color: "red",
  },
};

export default Bookmarks;
