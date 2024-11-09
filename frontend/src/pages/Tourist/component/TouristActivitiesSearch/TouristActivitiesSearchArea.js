import React, { useEffect, useState } from "react";
import axios from "axios";
import SectionHeading from "../../../../component/Common/SectionHeading";
import SideBar from "./SideBar";

const TouristActivitiesWrapper = () => {
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [priceRange, setPriceRange] = useState([0, 1000]);
  const [date, setDate] = useState(null);
  const [category, setCategory] = useState("");
  const [sortCriteria, setSortCriteria] = useState({ field: "price", order: "asc" });
  const [error, setError] = useState(null);
  const [minRating, setMinRating] = useState(0);
  const [categories, setCategories] = useState([]);
  const [showPopup, setShowPopup] = useState(false);
  const [popupMessage, setPopupMessage] = useState("");

  const fetchActivities = async (minBudget, maxBudget, date, minRating, category) => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get("http://localhost:3000/api/activity", {
        withCredentials: true,
        params: {
          minBudget,
          maxBudget,
          date: date ? date.toISOString().split("T")[0] : undefined,
          minRating: minRating || undefined,
          category: category || undefined,
          sortBy: sortCriteria.field,
          sortOrder: sortCriteria.order,
        },
      });
      setActivities(response.data.activities);
    } catch (error) {
      if (error.response && error.response.status === 404) {
        setActivities([]);
        setError("No activities found");
      } else {
        console.error("Error fetching activities:", error);
        setError("An error occurred while fetching activities.");
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchActivities(priceRange[0], priceRange[1], date, minRating, category);
  }, [priceRange, date, minRating, category, sortCriteria]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get("http://localhost:3000/api/category/get-all");
        setCategories(response.data.categories);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };
    fetchCategories();
  }, []);

  const handleBooking = async (activityId, activityDate) => {
    try {
      const formattedDate = new Date(activityDate).toISOString().split("T")[0];
      await axios.post(
        "http://localhost:3000/api/tourist/book-activity",
        { activity: activityId, date: formattedDate },
        { withCredentials: true }
      );
      setPopupMessage("Booking successful!");
      setShowPopup(true);
      setTimeout(() => setShowPopup(false), 3000);
    } catch (error) {
      const errorMessage =
        error.response && error.response.data && error.response.data.message
          ? error.response.data.message
          : "Failed to book activity. Please try again.";
      setPopupMessage(errorMessage);
      setShowPopup(true);
      setTimeout(() => setShowPopup(false), 3000);
      console.error("Error booking activity:", error);
    }
  };

  // Function to copy activity link
  const handleCopyLink = (activityId) => {
    const activityUrl = `${window.location.origin}/activity-details/${activityId}`;
    navigator.clipboard.writeText(activityUrl).then(() => {
      alert("Link copied to clipboard!");
    }).catch(err => {
      console.error("Failed to copy: ", err);
    });
  };

  // Function to send activity details via email
  const handleEmailShare = (activity) => {
    const subject = `Check out this activity: ${activity.name}`;
    const body = `I thought you'd be interested in this activity: ${activity.name}\n\nLocation: ${activity.location.name}\nDate: ${new Date(activity.date).toLocaleDateString()}\nPrice: ${activity.price} EGP\n\n${activity.category.description}\n\nCheck it out: ${window.location.origin}/activity-details/${activity._id}`;
    const mailtoLink = `mailto:?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    window.location.href = mailtoLink;
  };

  return (
    <section id="explore_area" className="section_padding">
      <div className="container">
        <SectionHeading heading={`${activities.length} activities found`} />
        <div className="row">
          <div className="col-lg-3">
            <SideBar
              priceRange={priceRange}
              setPriceRange={setPriceRange}
              date={date}
              setDate={setDate}
              applyFilters={() => fetchActivities(priceRange[0], priceRange[1], date, minRating, category)}
              onCategoryApply={(selectedCategory) => setCategory(selectedCategory)}
              onSortChange={(field, order) => setSortCriteria({ field, order })}
              onRatingApply={(rating) => setMinRating(rating)}
              fetchActivities={fetchActivities}
            />
          </div>
          <div className="col-lg-9">
            {loading ? (
              <p>Loading activities...</p>
            ) : error ? (
              <p>{error}</p>
            ) : (
              <div className="flight_search_result_wrapper">
                {activities.map((activity) => (
                  <div className="flight_search_item_wrappper" key={activity._id}>
                    <div className="flight_search_items">
                      <div className="multi_city_flight_lists">
                        <div className="flight_multis_area_wrapper">
                          <div className="flight_search_left">
                            <div className="flight_search_destination">
                              <p>Location</p>
                              <h3>{activity.location.name}</h3>
                            </div>
                          </div>
                          <div className="flight_search_middel">
                            <div className="flight_right_arrow">
                              <h3>{activity.name}</h3>
                              <p>{activity.category.name}</p>
                            </div>
                            <div className="flight_search_destination">
                              <p>Date</p>
                              <h3>{new Date(activity.date).toLocaleDateString()}</h3>
                              <h6>Time: {activity.time}</h6>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="flight_search_right">
                        <h5>
                          {activity.discounts ? (
                            <del>{(activity.price * (1 + activity.discounts / 100)).toFixed(2)} EGP</del>
                          ) : (
                            ""
                          )}
                        </h5>
                        <h2>
                          {activity.price} EGP
                          <sup>{activity.discounts ? `${activity.discounts}% off` : ""}</sup>
                        </h2>
                        <button
                          onClick={() => handleBooking(activity._id, activity.date)}
                          className="btn btn_theme btn_sm"
                        >
                          Book now
                        </button>
                        {activity.discounts ? <p>*Discount available</p> : ""}

                        {/* Share Button */}
                        <div>
                          <button
                            onClick={() => handleCopyLink(activity._id)}
                            className="btn btn-secondary btn-sm me-2"
                          >
                            Copy Link
                          </button>
                          <button
                            onClick={() => handleEmailShare(activity)}
                            className="btn btn-primary btn-sm"
                          >
                            Share via Email
                          </button>
                        </div>

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
                    <div className="flight_policy_refund collapse" id={`collapseExample${activity._id}`}>
                      <div className="flight_show_down_wrapper">
                        <div className="flight-shoe_dow_item">
                          <h4>Activity Details</h4>
                          <p className="fz12">{activity.category.description}</p>
                          <p className="fz12">
                            Advertiser: {activity.advertiser.username} ({activity.advertiser.email})
                          </p>
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
          <h4 style={{ color: "green", marginBottom: "10px" }}>{popupMessage}</h4>
          <button onClick={() => setShowPopup(false)} className="btn btn_theme" style={{ marginTop: "10px" }}>
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

export default TouristActivitiesWrapper;
