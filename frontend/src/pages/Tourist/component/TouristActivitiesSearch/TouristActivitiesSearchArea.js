import React, { useEffect, useState } from "react";
import axios from "axios";
import SectionHeading from "../../../../component/Common/SectionHeading";
import SideBar from "./SideBar";
import { Link } from "react-router-dom";
import PriceSlider from "./PriceSlider";

const TouristActivitiesWrapper = () => {
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [priceRange, setPriceRange] = useState([0, 1000]);
  const [date, setdate] = useState(null);
  const [category, setCategory] = useState("");
  const [sortCriteria, setSortCriteria] = useState({ field: "price", order: "asc" });
  const [error, setError] = useState(null); // Track errors
  const [minRating, setMinRating] = useState(0);
  const [searchQuery, setSearchQuery] = useState(""); // New: search input
  const [categoriesSearch, setCategoriesSearch] = useState([]);
  const [tags, setTags] = useState([]);

  const fetchActivities = async (minBudget, maxBudget, date, minRating, category, tag, searchQuery) => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get(`http://localhost:3000/api/activity`, {
        withCredentials: true,
        params: {
          minBudget,
          maxBudget,
          date: date ? date.toISOString().split("T")[0] : undefined,
          minRating: minRating || undefined,
          category: category || undefined,
          tag: tag || undefined,
          search: searchQuery || undefined,
          sortBy: sortCriteria.field,
          sortOrder: sortCriteria.order,
        },
      });
      setActivities(response.data.activities);
    } catch (error) {
      if (error.response && error.response.status === 404) {
        setActivities([]); // Set activities to empty if 404
        setError("No activities found"); // Display error message
      } else {
        console.error("Error fetching activities:", error);
        setError("An error occurred while fetching activities."); // Generic error message
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchActivities(priceRange[0], priceRange[1], date,  minRating, category);
  }, [priceRange, date, minRating, category, sortCriteria]);

  const applyFilters = (newPriceRange) => {
    setPriceRange(newPriceRange); // Update price range in state
  };

  const handleCategoryApply = (selectedCategory) => {
    setCategory(selectedCategory);
    applyFilters(priceRange);
    fetchActivities(priceRange[0], priceRange[1], date, minRating, selectedCategory);
  };
  
 
  const handleSortChange = (field, order) => {
    setSortCriteria({ field, order });
    // Trigger fetchActivities here to refetch with new sorting
    fetchActivities(priceRange[0], priceRange[1], date, minRating, category);
};
  const handleRatingApply = (rating) => {
    setMinRating(rating); // Update minRating
    fetchActivities(priceRange[0], priceRange[1], date, rating, category); // Refetch activities with new minRating
  };

  const [categories, setCategories] = useState([]);

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

  return (
    <section id="explore_area" className="section_padding">
      <div className="container">
        <SectionHeading heading={`${activities.length} activities found`} />
        <div className="row">
          <div className="col-lg-3">
          <div className="left_side_search_boxed">
          <div className="left_side_search_heading">
            <h5>Filter by price</h5>
          </div>
          <div className="filter-price">
            <div id="price-slider"><PriceSlider onApply={applyFilters}  /></div>
          </div>
          
        </div>
            <SideBar
              priceRange={priceRange}
              setPriceRange={setPriceRange}
              date={date}
              setdate={setdate}
              onApplyFilters={applyFilters}
              onCategoryApply={handleCategoryApply}
              onSortChange={handleSortChange}
              onRatingApply={handleRatingApply}
            />
            
          
          <div className="left_side_search_boxed">
        <div className="left_side_search_heading">
        <h5>Filter by category</h5>
        </div>
        <select onChange={(e) => handleCategoryApply(e.target.value)}>
          <option value="">All Categories</option>
          {categories.map((cat) => (
            <option key={cat._id} value={cat._id}>
              {cat.name}
            </option>
          ))}
        </select>
        </div>
        </div>
          <div className="col-lg-9">
            {loading ? (
              <p>Loading activities...</p>
            ) : error ? (
              <p>{error}</p>
            ) : (
              <div className="flight_search_result_wrapper">
                {activities.map((activity, index) => (
                  <div className="flight_search_item_wrappper" key={activity._id}>
                    <div className="flight_search_items">
                      <div className="multi_city_flight_lists">
                        <div className="flight_multis_area_wrapper">
                          <div className="flight_search_left">
                            <div className="flight_search_destination">
                              <p>Location</p>
                              <h3>{activity.location.name}</h3>
                              <h6>
                                Coordinates: {activity.location.coordinates.join(", ")}
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
                              <h3>{new Date(activity.date).toLocaleDateString()}</h3>
                              <h6>Time: {activity.time}</h6>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="flight_search_right">
                        <h5>
                          {activity.discounts ? (
                            <del>
                              {(activity.price * (1 + activity.discounts / 100)).toFixed(2)} EGP
                            </del>
                          ) : (
                            ""
                          )}
                        </h5>
                        <h2>
                          {activity.price} EGP
                          <sup>{activity.discounts ? `${activity.discounts}% off` : ""}</sup>
                        </h2>
                        <Link to={`/activity-booking/${activity._id}`} className="btn btn_theme btn_sm">
                          Book now
                        </Link>
                        {activity.discounts ? <p>*Discount available</p> : ""}
                        <div
                          data-bs-toggle="collapse"
                          data-bs-target={`#collapseExample${index}`}
                          aria-expanded="false"
                          aria-controls={`collapseExample${index}`}
                        >
                          Show more <i className="fas fa-chevron-down"></i>
                        </div>
                      </div>
                    </div>
                    <div className="flight_policy_refund collapse" id={`collapseExample${index}`}>
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
            {!loading && !error && (
              <div className="load_more_flight">
                <button className="btn btn_md">
                  <i className="fas fa-spinner"></i> Load more..
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TouristActivitiesWrapper;