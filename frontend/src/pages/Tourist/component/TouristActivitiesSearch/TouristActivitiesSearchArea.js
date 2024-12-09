import React, { useEffect, useState } from "react";
import axios from "axios";
import SectionHeading from "../../../../component/Common/SectionHeading";
import SideBar from "./SideBar";
import DateFilter from "./DateFilter";
import { ToastContainer, toast } from "react-toastify";
import { FaBookmark } from "react-icons/fa";
import LoadingLogo from "../../../../component/LoadingLogo";
import { renderStars } from "../../../../functions/renderStars";
import { FaBell } from "react-icons/fa";
import { Share } from "@mui/icons-material";
import ShareModal from "../TouristItinerarySearch/ShareModal";

const TouristActivitiesWrapper = () => {
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [priceRange, setPriceRange] = useState([0, 1000]);
  const [date, setDate] = useState(null);
  const [category, setCategory] = useState("");
  const [sortCriteria, setSortCriteria] = useState({
    field: "price",
    order: "asc",
  });
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
  const [isInBookmark, setIsInBookmark] = useState(false);
  const [bookmarkedActivities, setBookmarkedActivities] = useState({});
  const currencySymbol = localStorage.getItem("currencySymbol") || "$";
  const exchangeRate = parseFloat(localStorage.getItem("value")) || 1;
  const [notificationActive, setNotificationActive] = useState(false);

  const [isModalOpen, setIsModalOpen] = useState(false);

  const openShareModal = () => {
    setIsModalOpen(true);
  };

  // Function to close the modal
  const closeShareModal = () => {
    setIsModalOpen(false);
  };

  const fetchActivities = async (
    minBudget,
    maxBudget,
    date,
    minRating,
    category,
    tag
  ) => {
    setLoading(true);
    setError(null);
    try {
      // Fetch activities
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

      // Attempt to fetch bookmarks
      try {
        const bookmarkResponse = await axios.get(
          "http://localhost:3000/api/bookmark/activity",
          { withCredentials: true }
        );

        // Map bookmarked activities by ID
        const bookmarks = {};
        bookmarkResponse.data.bookmarkedActivities.forEach((activity) => {
          bookmarks[activity._id] = true;
        });
        setBookmarkedActivities(bookmarks);
      } catch (bookmarkError) {
        // Log and continue if bookmark fetch fails
        if (bookmarkError.response && bookmarkError.response.status === 400) {
          console.warn(
            "Bookmark fetch failed, but activities will still display."
          );
        } else {
          console.error("Error fetching bookmarks:", bookmarkError);
        }
        setBookmarkedActivities({}); // Reset bookmarks in case of failure
      }
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
        const response = await axios.get(
          "http://localhost:3000/api/category/get-all"
        );
        setCategories(response.data.categories);
        console.log(categories);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };
    fetchCategories();
    const fetchTags = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3000/api/preference-tag/get-all"
        );
        setTags(response.data.tags);
        console.log(tags);
      } catch (error) {
        console.error("Error fetching tags:", error);
      }
    };
    fetchTags();
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
      const matchingTag = tags.find(
        (tag) => tag.name.toLowerCase() === searchInputTag.toLowerCase()
      );

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

  const handleBooking = async (
    activityId,
    activityDate,
    method,
    paymentMethodId,
    promoCode
  ) => {
    try {
      // Format the activity date to ISO date format
      const formattedDate = new Date(activityDate).toISOString().split("T")[0];

      // Make the POST request to the API
      await axios.post(
        "http://localhost:3000/api/tourist/book-activity",
        {
          activity: activityId,
          date: formattedDate,
          method, // Payment method: "availableCredit" or "card"
          paymentMethodId, // Payment method ID
          promoCode, // Optional promo code
        },
        { withCredentials: true } // Include credentials for authentication
      );

      // Display success message
      setPopupMessage("Booking successful!");
      setShowPopup(true);
      setTimeout(() => setShowPopup(false), 3000);
    } catch (error) {
      // Handle errors and display appropriate message
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
    navigator.clipboard
      .writeText(activityUrl)
      .then(() => {
        alert("Link copied to clipboard!");
      })
      .catch((err) => {
        console.error("Failed to copy: ", err);
      });
  };

  // Function to send activity details via email
  const handleEmailShare = (activity) => {
    const subject = `Check out this activity: ${activity.name}`;
    const body = `I thought you'd be interested in this activity: ${
      activity.name
    }\n\nLocation: ${activity.location.name}\nDate: ${new Date(
      activity.date
    ).toLocaleDateString()}\nPrice: ${activity.price} EGP\n\n${
      activity.category.description
    }\n\nCheck it out: ${window.location.origin}/activity-details/${
      activity._id
    }`;
    const mailtoLink = `mailto:?subject=${encodeURIComponent(
      subject
    )}&body=${encodeURIComponent(body)}`;
    window.location.href = mailtoLink;
  };
  const handleDateApply = (selectedDate) => {
    setDate(selectedDate); // Update the date state with selected date
  };

  const handleRatingApply = (rating) => {
    setMinRating(rating); // Update minRating
    fetchActivities(priceRange[0], priceRange[1], date, rating, category); // Refetch activities with new minRating
  };

  const handleBookmark = async (activityId) => {
    try {
      if (bookmarkedActivities[activityId]) {
        // Remove from bookmarks
        await axios.delete("http://localhost:3000/api/bookmark/activity", {
          data: { activityId },
          withCredentials: true,
        });

        setBookmarkedActivities((prev) => ({
          ...prev,
          [activityId]: false,
        }));
        toast.success("Removed from bookmarks!");
      } else {
        // Add to bookmarks
        await axios.put(
          "http://localhost:3000/api/bookmark/activity",
          { activityId },
          { withCredentials: true }
        );

        setBookmarkedActivities((prev) => ({
          ...prev,
          [activityId]: true,
        }));
        toast.success("Added to bookmarks!");
      }
    } catch (err) {
      console.error("Error updating bookmark:", err);
      toast.error("Failed to update bookmark.");
    }
  };

  const handleNotifyMe = async (activityId) => {
    try {
      const response = await axios.put(
        "http://localhost:3000/api/tourist/enable-notifications-on-events",
        { activityId },
        { withCredentials: true }
      );
      setNotificationActive(true); // Update button state
      toast.success(response.data.message); // Show success toast
    } catch (error) {
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        toast.error(error.response.data.message);
      } else {
        console.error("Unexpected error:", error);
        toast.error("An unexpected error occurred.");
      }
    }
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
                  value={
                    searchType === "tag"
                      ? searchInputTag
                      : searchType === "category"
                      ? searchInputCategory
                      : searchInput
                  }
                  onChange={
                    searchType === "tag"
                      ? handleSearchInputTagChange
                      : searchType === "category"
                      ? handleSearchInputCategoryChange
                      : handleSearchInputChange
                  }
                  style={{ marginBottom: "10px" }}
                />

                <button
                  onClick={handleSearchClick}
                  className="btn btn_theme btn_sm"
                >
                  Apply
                </button>
              </div>
            </div>
            <SideBar
              priceRange={priceRange}
              setPriceRange={setPriceRange}
              onApplyFilters={fetchActivities}
              onCategoryApply={(selectedCategory) =>
                setCategory(selectedCategory)
              }
              onSortChange={(field, order) => setSortCriteria({ field, order })}
              onRatingApply={handleRatingApply}
            />
          </div>
          <div className="col-lg-9">
            {loading ? (
              <LoadingLogo isVisible={true} />
            ) : error ? (
              <p>{error}</p>
            ) : (
              <div className="flight_search_result_wrapper">
                {activities.map((activity) => (
                  <div
                    className="flight_search_item_wrappper"
                    key={activity._id}
                  >
                    <div
                      className="flight_search_items"
                      style={{
                        background: "var(--secondary-color)",
                        padding: "20px", // Adding padding to make the shadow effect more visible
                        borderRadius: "10px", // Optional: to round the corners of the box
                        boxShadow:
                          "0 4px 8px rgba(0, 0, 0, 0.1), 0 6px 20px rgba(0, 0, 0, 0.1)", // Shadow effect
                        transition: "box-shadow 0.3s ease", // Smooth transition on hover
                      }}
                    >
                      <div className="multi_city_flight_lists">
                        <div className="flight_multis_area_wrapper">
                          <div
                            className="flight_search_left"
                            style={{
                              height: "100%",
                              padding: "30px 30px",
                              display: "flex",
                              gap: "20px",
                              flexDirection: "column",
                              alignItems: "baseline",
                              width: "100%",
                            }}
                          >
                            <div className="flight_search_destination">
                              <h3 style={{ fontSize: "28px" }}>
                                {activity.name}
                              </h3>
                              <p>
                                {" "}
                                <i
                                  className="fas fa-map-marker-alt"
                                  style={{ marginRight: "8px" }}
                                ></i>
                                {activity.location.name}
                              </p>
                            </div>
                          </div>
                          <div className="flight_search_middel">
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
                        <span className="review-rating">
                          {renderStars(activity.rating)}
                        </span>
                        <div
                          style={{
                            position: "relative",
                            top: "10%",
                            left: "90%",
                            cursor: "pointer",
                          }}
                          onClick={() => handleBookmark(activity._id)}
                        >
                          <FaBookmark
                            size={24}
                            color={
                              bookmarkedActivities[activity._id]
                                ? "#8b3eea"
                                : "#ccc"
                            }
                          />
                        </div>

                        <h5>
                          {activity.discounts ? (
                            <del>
                              {(
                                (
                                  activity.price *
                                  (1 + activity.discounts / 100)
                                ).toFixed(2) * exchangeRate
                              ).toFixed(2)}{" "}
                              {currencySymbol}
                            </del>
                          ) : (
                            ""
                          )}
                        </h5>
                        <h2>
                          {(activity.price * exchangeRate).toFixed(2)}{" "}
                          {currencySymbol}
                          <sup>
                            {activity.discounts
                              ? `${activity.discounts}% off`
                              : ""}
                          </sup>
                        </h2>
                        {/* Book Now Button */}
                        {activity.bookingAvailable ? (
                          <button
                            onClick={() =>
                              handleBooking(activity._id, activity.date)
                            }
                            className="btn btn_theme btn_sm"
                          >
                            Book now
                          </button>
                        ) : (
                          <>
                            <button
                              disabled
                              className="btn btn_theme btn_sm"
                              style={{ cursor: "not-allowed" }}
                            >
                              Book now
                            </button>
                            <button
                              onClick={() => handleNotifyMe(activity._id)}
                              className={`btn ${
                                notificationActive
                                  ? "btn-success"
                                  : "btn-warning"
                              } btn-sm`}
                              style={{
                                marginLeft: "10px",
                              }}
                            >
                              Notify Me
                            </button>
                          </>
                        )}
                        {activity.discounts ? <p>*Discount available</p> : ""}

                        {/* Share Button */}
                        <div>
                          <button
                            onClick={openShareModal}
                            className=" btn-secondary "
                          >
                            <Share style={{ marginRight: "8px" }} />
                            Share
                          </button>
                          <ShareModal
                            handleCopy={() => handleCopyLink(activity._id)}
                            handleShareEmail={() => handleEmailShare(activity)}
                            isOpen={isModalOpen}
                            onClose={closeShareModal}
                          />
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
                          <p className="fz12">
                            Advertiser: {activity.advertiser.username} (
                            {activity.advertiser.email})
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
                            <h4>Category</h4>
                            <p>{activity.category.name}</p>
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
      {/* Toast Container for notifications */}
      <ToastContainer position="top-right" autoClose={3000} />
    </section>
  );
};

export default TouristActivitiesWrapper;
