import React, { useState, useEffect } from 'react';
import axios from 'axios';

const TouristCategoryActivity = ({ categoryId }) => {
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchActivities = async () => {
      setLoading(true);
      setError(null);
      try {
        // Fetch activities based on the categoryId using query parameter
        const response = await axios.get(`http://localhost:3000/api/activity`, {
          params: { category: categoryId },
        });

        // If activities exist, set them, otherwise set an empty array
        setActivities(response.data.activities || []);
      } catch (error) {
        if (error.response && error.response.status === 404) {
          
            setError("No activities found in this category");
          } else {
            console.error("Error fetching places:", error);
          }
        
      } finally {
        setLoading(false);
      }
    };

    if (categoryId) {
      fetchActivities();
    }
  }, [categoryId]); // Re-fetch activities when categoryId changes

  const handleBooking = async (activityId, activityDate) => {
    try {
      const formattedDate = new Date(activityDate).toISOString().split("T")[0];
      await axios.post("http://localhost:3000/api/tourist/book-activity", {
        activity: activityId,
        date: formattedDate,
      });
      alert("Booking successful!");
    } catch (error) {
      alert("Failed to book activity. Please try again.");
      console.error("Error booking activity:", error);
    }
  };

  if (loading) {
    return <p>Loading activities...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  if (activities.length === 0) {
    return <p>No activities of this category.</p>;
  }

  return (
    <section id="explore_area" className="section_padding">
      <div className="container">
        <div className="row">
          <div className="col-lg-9">
            {activities.length > 0 && (
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
                              <h6>Coordinates: {activity.location.coordinates.join(", ")}</h6>
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
    </section>
  );
};

export default TouristCategoryActivity;
