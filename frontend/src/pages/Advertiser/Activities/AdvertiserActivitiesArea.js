import React, { useEffect, useState } from "react";
import axios from "axios";
import SectionHeading from "../../../component/Common/SectionHeading";
import { ToastContainer, toast } from "react-toastify";
import DeleteButton from "../../Admin/Activities/DeleteButton";
import CreateActivityButton from "../CreateActivityButton";
import UpdateActivityButton from "../UpdateActivityButton";
import SkeletonLoader from "./SkeletonLoader";

const AdvertiserActivitiesArea = () => {
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showPopup, setShowPopup] = useState(false);
  const [popupMessage, setPopupMessage] = useState("");

  useEffect(() => {
    fetchActivities();
  }, []);

  const fetchActivities = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get(
        `http://localhost:3000/api/advertiser/get-my-activities`,
        {
          withCredentials: true,
        }
      );
      setActivities(response.data);
    } catch (error) {
      if (error.response && error.response.status === 404) {
        setActivities([]);
        setError("No activities found");
        toast.info("No data found");
      } else {
        console.error("Error fetching activities:", error);
        setError("An error occurred while fetching activities.");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (activityId) => {
    try {
      await axios.delete(
        `http://localhost:3000/api/advertiser/delete-activity/${activityId}`,
        { withCredentials: true }
      );
      setActivities(
        activities.filter((activity) => activity._id !== activityId)
      );
      toast.success("Activity deleted successfully");
    } catch (error) {
      console.error("Error deleting activity:", error);
      toast.error("Failed to delete activity.");
    }
  };

  return (
    <section
      id="explore_area"
      className="section_padding"
      style={{ minHeight: "100vh" }}
    >
      <div className="container">
        <SectionHeading heading={`${activities.length} activities found`} />
        <div className="row">
          <div className="col-lg-3">
            <div className="left_side_search_boxed">
              <div className="left_side_search_heading">
                <CreateActivityButton reFetch={fetchActivities} />
              </div>
            </div>
          </div>
          <div className="col-lg-9">
            {loading ? (
              <SkeletonLoader />
            ) : error ? (
              <p>{error}</p>
            ) : (
              <div className="flight_search_result_wrapper">
                {activities.map((activity) => (
                  <div
                    className="flight_search_item_wrappper"
                    key={activity._id}
                  >
                    <div className="flight_search_items">
                      <div className="multi_city_flight_lists">
                        <div className="flight_multis_area_wrapper">
                          <div className="flight_search_left">
                            <div className="flight_search_destination">
                              <p>Location</p>
                              <h3>{activity.location.name}</h3>
                              <h6>
                                Coordinates:{" "}
                                {activity.location.coordinates.join(", ")}
                              </h6>
                            </div>
                          </div>
                          <div className="flight_search_middel">
                            <div className="flight_right_arrow">
                              <h3>{activity.name}</h3>
                              <p>{activity.category.name}</p>
                            </div>
                            <div className="flight_search_destination">
                              <p>Date</p>
                              <h3>
                                {new Date(activity.date).toLocaleDateString()}
                              </h3>
                              <h6>Time: {activity.time}</h6>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="flight_search_right">
                        <h5>
                          {activity.discounts ? (
                            <del>
                              {(
                                activity.price *
                                (1 + activity.discounts / 100)
                              ).toFixed(2)}{" "}
                              EGP
                            </del>
                          ) : (
                            ""
                          )}
                        </h5>
                        <h2>
                          {activity.price} EGP
                          <sup>
                            {activity.discounts
                              ? `${activity.discounts}% off`
                              : ""}
                          </sup>
                        </h2>
                        <UpdateActivityButton
                          activity={activity}
                          fetchActivities={fetchActivities}
                        />
                        <DeleteButton
                          handleDelete={() => handleDelete(activity._id)}
                        />
                        {activity.discounts ? <p>*Discount available</p> : ""}
                        {activity.bookingAvailable && <p>Booking Available</p>}
                        <div
                          data-bs-toggle="collapse"
                          data-bs-target={`#collapseExample${activity._id}`}
                          aria-expanded="false"
                          aria-controls={`collapseExample${activity._id}`}
                        >
                          Show more <i className="fas fa-chevron-down"></i>
                        </div>
                      </div>
                    </div>
                    <div
                      className="flight_policy_refund collapse"
                      id={`collapseExample${activity._id}`}
                    >
                      <div className="flight_show_down_wrapper">
                        <div className="flight-shoe_dow_item">
                          <h4>Activity Details</h4>
                          <p className="fz12">
                            {activity.category.description}
                          </p>
                          <p className="fz12">Rating: {activity.rating} / 5</p>
                        </div>
                        <div className="flight_refund_policy">
                          <div className="TabPanelInner flex_widht_less">
                            <h4>Tags</h4>
                            {activity.tags.map((tag, i) => (
                              <p className="fz12" key={i}>
                                {tag.name} - {tag.description}
                              </p>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

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
    </section>
  );
};

export default AdvertiserActivitiesArea;
