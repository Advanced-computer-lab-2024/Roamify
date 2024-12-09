import React, { useEffect, useState } from "react";
import axios from "axios";
import SectionHeading from "../../../../component/Common/SectionHeading";
import SideBar from "./SideBar";
import PriceSlider from "../TouristActivitiesSearch/PriceSlider";
import "./DateFilter";
import "./TouristItinerary.css";
import { ToastContainer, toast } from "react-toastify";
import { renderStars } from "../../../../functions/renderStars";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFlag, faFlagCheckered } from "@fortawesome/free-solid-svg-icons";
import LoadingLogo from "../../../../component/LoadingLogo";
import { FaBookmark, FaShare } from "react-icons/fa";
import { Share } from "@mui/icons-material";
import ShareModal from "./ShareModal";
const TouristItineraryWrapper = () => {
  const [itineraries, setItineraries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [priceRange, setPriceRange] = useState([0, 1000]);
  const [date, setDate] = useState(null);
  const [sortCriteria, setSortCriteria] = useState({
    field: "price",
    order: "asc",
  });
  const [error, setError] = useState(null);
  const [rating, setRating] = useState(0);
  const [preferences, setPreferences] = useState([]);
  const [preference, setPreference] = useState("");
  const [languages, setLanguages] = useState([
    { _id: "en", name: "English" },
    { _id: "de", name: "German" },
    { _id: "es", name: "Spanish" },
  ]);
  const [language, setLanguage] = useState("");
  const [showShareOptions, setShowShareOptions] = useState({});
  const [showPopup, setShowPopup] = useState(false);
  const [popupMessage, setPopupMessage] = useState("");
  const [bookmarkedItineraries, setBookmarkedItineraries] = useState({});
  const [searchType, setSearchType] = useState("name");
  const [searchInput, setSearchInput] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openShareModal = () => {
    setIsModalOpen(true);
  };

  // Function to close the modal
  const closeShareModal = () => {
    setIsModalOpen(false);
  };

  const currencySymbol = localStorage.getItem("currencySymbol") || "$";
  const exchangeRate = parseFloat(localStorage.getItem("value")) || 1;

  const formatDate = (dateString) => {
    if (!dateString) return "No dates available";

    const date = new Date(dateString);
    let day = date.getDate();
    let month = date.getMonth() + 1; // getMonth() is zero-indexed
    let year = date.getFullYear();

    day = day < 10 ? "0" + day : day;
    month = month < 10 ? "0" + month : month;

    return `${day}/${month}/${year}`;
  };

  const fetchItineraries = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get("http://localhost:3000/api/itinerary/", {
        withCredentials: true,
        params: {
          minBudget: priceRange[0],
          maxBudget: priceRange[1],
          date: date ? date.toISOString().split("T")[0] : undefined,
          rating: rating || undefined,
          preferences: preference || undefined,
          sortBy: sortCriteria.field,
          sortOrder: sortCriteria.order,
          language: language || undefined,
          searchType: searchType,
          searchQuery: searchInput,
        },
      });
      setItineraries(response.data || []);
      // Attempt to fetch bookmarks
      try {
        const bookmarkResponse = await axios.get(
          "http://localhost:3000/api/bookmark/itinerary",
          { withCredentials: true }
        );

        // Map bookmarked activities by ID
        const bookmarks = {};
        bookmarkResponse.data.forEach((itinerary) => {
          bookmarks[itinerary._id] = true;
        });
        setBookmarkedItineraries(bookmarks);
      } catch (bookmarkError) {
        // Log and continue if bookmark fetch fails
        if (bookmarkError.response && bookmarkError.response.status === 400) {
          console.warn(
            "Bookmark fetch failed, but activities will still display."
          );
        } else {
          console.error("Error fetching bookmarks:", bookmarkError);
        }
        setBookmarkedItineraries({}); // Reset bookmarks in case of failure
      }
    } catch (error) {
      setItineraries([]);
      setError(
        error.response && error.response.status === 404
          ? "No itineraries found"
          : "An error occurred while fetching itineraries."
      );
      toast.info("No itineraries found");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchItineraries();
  }, [
    priceRange,
    date,
    rating,
    preference,
    language,
    sortCriteria,
    searchType,
    searchInput,
  ]);

  const applyFilters = (newPriceRange) => setPriceRange(newPriceRange);

  const handlePreferenceApply = (selectedPreference) => {
    setPreference(selectedPreference);
  };

  const handleLanguageApply = (selectedLanguage) => {
    setLanguage(selectedLanguage);
    fetchItineraries();
  };

  const handleSortChange = (field, order) => {
    setSortCriteria({ field, order });
  };

  const handleRatingApply = (selectedRating) => {
    setRating(selectedRating);
  };

  const handleDateApply = (selectedDate) => {
    setDate(selectedDate);
    fetchItineraries();
  };

  useEffect(() => {
    const fetchPreferences = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3000/api/preference-tag/get-all"
        );
        setPreferences(response.data.tags || []);
      } catch (error) {
        console.error("Error fetching preferences:", error);
      }
    };

    fetchPreferences();
  }, []);

  const handleSearchTypeChange = (event) => {
    setSearchType(event.target.value);
    setSearchInput("");
  };

  const handleSearchInputChange = (event) => {
    setSearchInput(event.target.value);
  };

  const handleBooking = async (itineraryId, itineraryDate) => {
    if (!itineraryId || !itineraryDate) {
      setPopupMessage("Booking failed: Itinerary ID and date are required.");
      setShowPopup(true);
      return;
    }

    try {
      const formattedDate = new Date(itineraryDate).toISOString().split("T")[0];
      const response = await axios.post(
        "http://localhost:3000/api/tourist/book-itinerary",
        { itinerary: itineraryId, date: formattedDate },
        { withCredentials: true }
      );
      setPopupMessage(response.data.message || "Booked successfully");
    } catch (error) {
      const errorMessage =
        error.response?.data?.message || "Failed to book itinerary.";
      setPopupMessage(errorMessage);
    } finally {
      setShowPopup(true);
      setTimeout(() => setShowPopup(false), 3000);
    }
  };

  const handleShareToggle = (itineraryId) => {
    setShowShareOptions((prevState) => ({
      ...prevState,
      [itineraryId]: !prevState[itineraryId],
    }));
  };

  const handleCopyLink = (itineraryId) => {
    const itineraryUrl = `${window.location.origin}/itinerary-details/${itineraryId}`;
    navigator.clipboard
      .writeText(itineraryUrl)
      .then(() => alert("Link copied to clipboard!"))
      .catch((err) => console.error("Failed to copy: ", err));
  };

  const handleEmailShare = (itinerary) => {
    const subject = `Check out this itinerary: ${itinerary.name}`;
    const body = `I thought you'd be interested in this itinerary: ${
      itinerary.name
    }\n\nLocation: ${itinerary.locations.join(
      ", "
    )}\nAvailable Date: ${formatDate(itinerary.availableDates[0])}\nPrice: ${
      itinerary.price
    } EGP\n\nCheck it out: ${window.location.origin}/itinerary-details/${
      itinerary._id
    }`;
    window.location.href = `mailto:?subject=${encodeURIComponent(
      subject
    )}&body=${encodeURIComponent(body)}`;
  };

  const handleBookmark = async (itineraryId) => {
    try {
      if (bookmarkedItineraries[itineraryId]) {
        // Remove from bookmarks
        await axios.delete("http://localhost:3000/api/bookmark/itinerary", {
          data: { itineraryId },
          withCredentials: true,
        });

        setBookmarkedItineraries((prev) => ({
          ...prev,
          [itineraryId]: false,
        }));
        toast.success("Removed from bookmarks!");
      } else {
        // Add to bookmarks
        await axios.put(
          "http://localhost:3000/api/bookmark/itinerary",
          { itineraryId },
          { withCredentials: true }
        );

        setBookmarkedItineraries((prev) => ({
          ...prev,
          [itineraryId]: true,
        }));
        toast.success("Added to bookmarks!");
      }
    } catch (err) {
      console.error("Error updating bookmark:", err);
      toast.error("Failed to update bookmark.");
    }
  };

  return (
    <section id="explore_area" className="section_padding">
      <div className="container">
        <SectionHeading
          heading={`${itineraries.length || 0} itineraries found`}
        />
        <div className="row">
          <div className="col-lg-3">
            <div className="left_side_search_boxed">
              <h5>Filter by price</h5>
              <PriceSlider onApply={applyFilters} />
            </div>
            <SideBar
              date={date}
              setDate={setDate}
              onDateApply={handleDateApply}
              onSortChange={handleSortChange}
              onRatingApply={handleRatingApply}
            />
            <div className="left_side_search_boxed">
              <h5>Filter by Preference</h5>
              <select onChange={(e) => handlePreferenceApply(e.target.value)}>
                <option value="">All Preferences</option>
                {preferences.length > 0 ? (
                  preferences.map((preference) => (
                    <option key={preference._id} value={preference._id}>
                      {preference.name}
                    </option>
                  ))
                ) : (
                  <option disabled>Loading preferences...</option>
                )}
              </select>
            </div>
            <div className="left_side_search_boxed">
              <h5>Filter by Language</h5>
              <select onChange={(e) => handleLanguageApply(e.target.value)}>
                <option value="">All Languages</option>
                {languages.map((lang) => (
                  <option key={lang._id} value={lang._id}>
                    {lang.name}
                  </option>
                ))}
              </select>
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
                  placeholder={`Search by ${searchType}...`}
                  value={searchInput}
                  onChange={handleSearchInputChange}
                  style={{ marginBottom: "10px" }}
                />
                <button
                  onClick={fetchItineraries}
                  className="btn btn_theme btn_sm"
                >
                  Apply
                </button>
              </div>
            </div>
          </div>
          <div
            className="col-lg-9"
            style={{ display: "flex", flexDirection: "column", gap: "20px" }}
          >
            {loading ? (
              <LoadingLogo isVisible={true} />
            ) : error ? (
              <p>{error}</p>
            ) : (
              itineraries?.map((itinerary, index) => (
                <div key={itinerary._id}>
                  <div
                    className="flight_search_items"
                    style={{
                      background: "var(--secondary-color)",
                      height: "40vh",
                    }}
                  >
                    <div
                      className="left-side"
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
                      <p style={{ fontSize: "28px" }}>{itinerary.name}</p>
                      <span className="review-rating">
                        {renderStars(itinerary.rating)}
                      </span>
                      <div
                        className="activity-tags"
                        style={{
                          display: "flex",
                          flexWrap: "wrap",
                          gap: "10px",
                          justifyContent: "flex-start",
                        }}
                      >
                        {itinerary.preferenceTags.map((tag, index) => (
                          <>
                            <span
                              key={index}
                              style={{
                                whiteSpace: "nowrap",
                                fontSize: "14px",
                                color: "var(--dashboard-title-color)",
                              }}
                            >
                              {tag.name}
                            </span>
                            {index < itinerary.preferenceTags.length - 1 && (
                              <span
                                style={{
                                  margin: "0px 5px",
                                  color: "var(--main-color)", // You can replace this with your desired color
                                  display: "flex",
                                  justifyContent: "center",
                                  alignItems: "center",
                                }}
                              >
                                <i
                                  className="fas fa-circle"
                                  style={{ fontSize: "7px" }}
                                ></i>
                              </span>
                            )}
                          </>
                        ))}
                      </div>
                      <span className="review-rating">
                        Language :{" "}
                        <span
                          style={{
                            color: "var(--dashboard-title-color)",
                          }}
                        >
                          {itinerary.language}
                        </span>
                      </span>
                    </div>
                    <div
                      className="flight_search_right"
                      style={{
                        background: "var(--scroll-bar-color)",
                        height: "100%",
                        width: "40%",
                        display: "flex",
                        gap: "20px",
                        flexDirection: "column",
                        // alignItems: "center",
                        justifyContent: "space-evenly",
                        position: "relative",
                        color: "white",
                      }}
                    >
                      <div
                        style={{
                          top: "20px",
                          right: "20px",
                          position: "absolute",
                          cursor: "pointer",
                        }}
                        onClick={() => handleBookmark(itinerary._id)}
                      >
                        <FaBookmark
                          size={24}
                          color={
                            bookmarkedItineraries[itinerary._id]
                              ? "#8b3eea"
                              : "#ccc"
                          }
                        />
                      </div>
                      <h2>${itinerary.price}</h2>

                      {/* Share Button */}
                      <div
                        style={{
                          display: "flex",
                          flexDirection: "column",
                          gap: "10px",
                        }}
                      >
                        <button
                          onClick={() =>
                            handleBooking(
                              itinerary._id,
                              itinerary.availableDates[0]
                            )
                          }
                          className="btn  "
                          disabled={
                            !itinerary.availableDates ||
                            itinerary.availableDates.length === 0
                          }
                          style={{ background: "var(--main-color)" }}
                        >
                          Book now
                        </button>
                        <button
                          onClick={openShareModal}
                          className=" btn-secondary "
                        >
                          <Share style={{ marginRight: "8px" }} />
                          Share
                        </button>
                        <ShareModal
                          handleCopy={() => handleCopyLink(itinerary._id)}
                          handleShareEmail={() => handleEmailShare(itinerary)}
                          isOpen={isModalOpen}
                          onClose={closeShareModal}
                        />
                      </div>
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
                  <div
                    className="flight_policy_refund collapse"
                    id={`collapseExample${index}`}
                  >
                    <div className="flight_show_down_wrapper">
                      <div
                        className="flight-shoe_dow_item"
                        style={{
                          flex: "1",
                          display: "flex",
                          flexDirection: "column",
                          alignItems: "center",
                          justifyContent: "center",
                          padding: "50px 20px",
                        }}
                      >
                        <div className="flight_inner_show_component">
                          <div className="flight_det_wrapper">
                            <div className="flight_det">
                              <p className="airport">
                                {itinerary.pickUpLocation}
                              </p>
                            </div>
                          </div>
                          <div className="flight_duration">
                            <div className="arrow_right"></div>
                            <span>01h 15m</span>
                          </div>
                          <div className="flight_det_wrapper">
                            <div className="flight_det">
                              <p className="airport">
                                {itinerary.dropOffLocation}
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="flight_refund_policy" style={{ flex: 2 }}>
                        <div
                          className="TabPanelInner flex_widht_less"
                          style={{ flex: 1 }}
                        >
                          <h4>Pickup Dates</h4>
                          <div className="flight_info_taable">
                            {itinerary.availableDates.map((date, index) => (
                              <p className="fz12">
                                - {new Date(date).toISOString().split("T")[0]}
                              </p>
                            ))}
                          </div>
                        </div>
                        <div
                          className="TabPanelInner flex_widht_less"
                          style={{ flex: 1 }}
                        >
                          <h4>Activities</h4>
                          <div className="flight_info_taable">
                            {itinerary.activities.map((activity, index) => (
                              <p className="fz12">
                                {index + 1}. {activity.name}
                              </p>
                            ))}
                          </div>
                        </div>
                        <div className="TabPanelInner" style={{ flex: 1 }}>
                          <h4>Locations</h4>
                          <div className="flight_info_taable">
                            {itinerary.locations.map((location) => (
                              <h3>{location}</h3>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
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
      </div>
      {/* Toast Container for notifications */}
      <ToastContainer position="top-right" autoClose={3000} />
    </section>
  );
};

export default TouristItineraryWrapper;
