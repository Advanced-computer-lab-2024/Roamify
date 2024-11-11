import React, { useEffect, useState } from "react";
import axios from "axios";
import SectionHeading from "../../../../component/Common/SectionHeading";
import SideBar from "./SideBar";
import DateFilter from "./DateFilter";
import { ToastContainer, toast } from "react-toastify";

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
        withCredentials: true,
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
  const handleSearchTypeChange = (event) => {
    setSearchType(event.target.value);
    setSearchInput("");
  };

  const handleSearchInputChange = (event) => {
    setSearchInput(event.target.value);
  };

  const handleSearchInputTagChange = (event) => {
    setSearchInputTag(event.target.value);
  };
  const handleSearchInputCategoryChange = (event) => {
    setSearchInputCategory(event.target.value);
  };
  const handleSearchClick = async () => {
    const searchParams = {};

    // Handle search by name
    if (searchType === "name" && searchInput) {
      searchParams.name = searchInput;
    } else if (searchType === "tag" && searchInputTag) {
      // Find the tag ID by matching the tag name
      const matchingTag = tags.find((tag) => tag.name.toLowerCase() === searchInputTag.toLowerCase());

      if (matchingTag) {
        searchParams.tags = [matchingTag._id]; // Use the ID for the search
      } else {
        toast.info("Tag not found");
        return;
      }
    } else if (searchType === "category" && searchInputCategory) {
      // Find the category ID by matching the category name
      const matchingCategory = categories.find(
        (cat) => cat.name.toLowerCase() === searchInputCategory.toLowerCase()
      );

      if (matchingCategory) {
        searchParams.category = matchingCategory._id; // Use the ID for the search
        console.log(matchingCategory._id);
      } else {
        toast.info("Category not found");
        return;
      }
    }

    // Fetch activities with the search parameters
    await fetchActivities(
      priceRange[0],
      priceRange[1],
      date,
      minRating,
      searchParams.category,
      searchParams.tags
    );

    // Apply search filter locally for "name" search
    if (searchType === "name" && searchInput) {
      setActivities((prevActivities) =>
        prevActivities.filter((activity) =>
          activity.name.toLowerCase().includes(searchInput.toLowerCase())
        )
      );
    }
  };



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
            <div className="left_side_search_boxed">
              <div className="left_side_search_heading">
                <h5>Search by</h5>
              </div>
              <div className="name_search_form" style={{ display: "block" }}>
                <select
                  className="form-control"
                  value={searchType}
                  onChange={handleSearchTypeChange}
                  style={{ marginBottom: "10px" }}
                >
                  <option value="name">Name</option>
                  <option value="tag">Tag</option>
                  <option value="category">Category</option>
                </select>
                <input
                  className="form-control"
                  type="text"
                  placeholder={`Search by ${searchType} or category...`}
                  value={searchType === "tag" ? searchInputTag : searchType === "category" ? searchInputCategory : searchInput}
                  onChange={searchType === "tag" ? handleSearchInputTagChange
                    : searchType === "category" ? handleSearchInputCategoryChange
                      : handleSearchInputChange}
                  style={{ marginBottom: "10px" }}
                />

                <button onClick={handleSearchClick} className="btn btn_theme btn_sm">
                  Apply
                </button>
              </div>
            </div>
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
