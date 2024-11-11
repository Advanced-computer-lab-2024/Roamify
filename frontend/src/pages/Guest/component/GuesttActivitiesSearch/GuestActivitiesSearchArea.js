import React, { useEffect, useState } from "react";
import axios from "axios";
import SectionHeading from "../../../../component/Common/SectionHeading";
import SideBar from "./SideBar";
import DateFilter from "./DateFilter";
import { ToastContainer, toast } from "react-toastify";

const GuestActivitiesWrapper = () => {
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
  const [searchType, setSearchType] = useState("name");
  const [searchInput, setSearchInput] = useState("");
  const [searchInputTag, setSearchInputTag] = useState("");
  const [searchInputCategory, setSearchInputCategory] = useState("");
  const [tags, setTags] = useState([]);
  const fetchActivities = async (minBudget, maxBudget, date, minRating, category, tag) => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get(`http://localhost:3000/api/activity`, {
        
        params: {
          minBudget,
          maxBudget,
          date: date ? date.toISOString().split("T")[0] : undefined,
          minRating: minRating || undefined,
          category: category || undefined,
          tag: tag || undefined,
          sortBy: sortCriteria.field,
          sortOrder: sortCriteria.order,
        },
      });
      setActivities(response.data.activities);
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

  useEffect(() => {
    fetchActivities(priceRange[0], priceRange[1], date, minRating, category);
  }, [priceRange, date, minRating, category, sortCriteria]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get("http://localhost:3000/api/category/get-all");
        setCategories(response.data.categories);
        console.log(categories)
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };
    fetchCategories();
    const fetchTags = async () => {
      try {
        const response = await axios.get("http://localhost:3000/api/preference-tag/get-all");
        setTags(response.data.tags);
        console.log(tags)
      } catch (error) {
        console.error("Error fetching tags:", error);
      }
    }; fetchTags();

  }, []);


  
  const handleDateApply = (selectedDate) => {
    setDate(selectedDate); // Update the date state with selected date
  };

  const handleRatingApply = (rating) => {
    setMinRating(rating); // Update minRating
    fetchActivities(priceRange[0], priceRange[1], date, rating, category); // Refetch activities with new minRating
  };
  return (
    <section id="explore_area" className="section_padding">
      <div className="container">
        <SectionHeading heading={`${activities.length} activities found`} />
        <div className="row">
          <div className="col-lg-3">
            <div className="left_side_search_boxed">
              <div className="left_side_search_heading">
                <h5>Filter by Date</h5>
              </div>
              <DateFilter
                date={date}
                setDate={setDate}
                onApply={handleDateApply}
              />
            </div>
            {/* Search Bar Section */}
            
            
            <SideBar
              priceRange={priceRange}
              setPriceRange={setPriceRange}

              onApplyFilters={fetchActivities}
              onCategoryApply={(selectedCategory) => setCategory(selectedCategory)}
              onSortChange={(field, order) => setSortCriteria({ field, order })}
              onRatingApply={handleRatingApply}
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

export default GuestActivitiesWrapper;
