import React, { useEffect, useState } from "react";
import axios from "axios";
import SectionHeading from "../../../../component/Common/SectionHeading";
import SideBar from "./SideBar";
import PriceSlider from "../TouristActivitiesSearch/PriceSlider";
import { Link } from "react-router-dom";
import "./TouristItinerary.css";

const TouristItineraryWrapper = () => {
  const [itineraries, setItineraries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [priceRange, setPriceRange] = useState([0, 1000]);
  const [date, setDate] = useState(null);
  const [sortCriteria, setSortCriteria] = useState({ field: "price", order: "asc" });
  const [error, setError] = useState(null);
  const [rating, setRating] = useState(0);
  const [preferences, setPreferences] = useState([]);
  const [preference, setPreference] = useState("");
  const [language, setLanguage] = useState("");
  const [showShareOptions, setShowShareOptions] = useState({});
  const [showPopup, setShowPopup] = useState(false);
  const [popupMessage, setPopupMessage] = useState("");

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
          preference: preference || undefined,
          sortBy: sortCriteria.field,
          sortOrder: sortCriteria.order,
          language: language || undefined,
        },
      });
      setItineraries(response.data.updatedItineraries || []);
    } catch (error) {
      setItineraries([]);
      setError(
        error.response && error.response.status === 404
          ? "No itineraries found"
          : "An error occurred while fetching itineraries."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchItineraries();
  }, [priceRange, date, rating, preference, language, sortCriteria]);

  const applyFilters = (newPriceRange) => setPriceRange(newPriceRange);

  const handlePreferenceApply = (selectedPreference) => {
    setPreference(selectedPreference);
  };

  const handleSortChange = (field, order) => {
    setSortCriteria({ field, order });
  };

  const handleRatingApply = (selectedRating) => {
    setRating(selectedRating);
  };

  useEffect(() => {
    const fetchPreferences = async () => {
      try {
        const response = await axios.get("http://localhost:3000/api/preference-tag/get-all");
        setPreferences(response.data.tags || []);
      } catch (error) {
        console.error("Error fetching preferences:", error);
      }
    };

    fetchPreferences();
  }, []);

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
      const errorMessage = error.response?.data?.message || "Failed to book itinerary.";
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
    navigator.clipboard.writeText(itineraryUrl)
      .then(() => alert("Link copied to clipboard!"))
      .catch(err => console.error("Failed to copy: ", err));
  };

  const handleEmailShare = (itinerary) => {
    const subject = `Check out this itinerary: ${itinerary.name}`;
    const body = `I thought you'd be interested in this itinerary: ${itinerary.name}\n\nLocation: ${itinerary.locations.join(", ")}\nAvailable Date: ${new Date(itinerary.availableDates[0]).toLocaleDateString()}\nPrice: ${itinerary.price} EGP\n\nCheck it out: ${window.location.origin}/itinerary-details/${itinerary._id}`;
    window.location.href = `mailto:?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  };

  return (
    <section id="explore_area" className="section_padding">
      <div className="container">
        <SectionHeading heading={`${itineraries?.length || 0} itineraries found`} />
        <div className="row">
          <div className="col-lg-3">
            <div className="left_side_search_boxed">
              <h5>Filter by price</h5>
              <PriceSlider onApply={applyFilters} />
            </div>
            <SideBar
              date={date}
              setDate={setDate}
              onSortChange={handleSortChange}
              onRatingApply={handleRatingApply}
            />
            <div className="left_side_search_boxed">
              <h5>Filter by Preference</h5>
              <select onChange={(e) => handlePreferenceApply(e.target.value)}>
                <option value="">All Preferences</option>
                {preferences.length > 0 ? (
                  preferences.map((cat) => (
                    <option key={cat._id} value={cat._id}>
                      {cat.name}
                    </option>
                  ))
                ) : (
                  <option disabled>Loading preferences...</option>
                )}
              </select>
            </div>
          </div>
          <div className="col-lg-9">
            {loading ? (
              <p>Loading itineraries...</p>
            ) : error ? (
              <p>{error}</p>
            ) : (
              <div className="flight_search_result_wrapper">
                {itineraries.length > 0 ? (
                  itineraries.map((itinerary) => (
                    <div className="flight_search_item_wrapper" key={itinerary._id}>
                      <div className="flight_search_items">
                        <h3 className="itinerary-name">{itinerary.title}</h3>
                        <div className="itinerary-section">
                        <p><strong>Name:</strong> {itinerary.name}</p>
                          <p><strong>Location:</strong> {itinerary.locations?.join(", ")}</p>
                          <p><strong>Language:</strong> {itinerary.language}</p>
                          <p><strong>Accessibility:</strong> {itinerary.accessibility ? "Yes" : "No"}</p>
                          <p><strong>Available Date:</strong> {Array.isArray(itinerary.availableDates) && itinerary.availableDates.length > 0 ? itinerary.availableDates[0] : "No dates available"}</p>
                        </div>
                        <div className="booking-section">
                          <h2>{itinerary.price} EGP</h2>
                          <button
                            onClick={() => handleBooking(itinerary._id, itinerary.availableDates[0])}
                            className="btn btn_theme btn_sm"
                            disabled={!itinerary.availableDates || itinerary.availableDates.length === 0}
                          >
                            Book now
                          </button>
                          <button
                            className="btn btn_theme btn_sm"
                            onClick={() => handleShareToggle(itinerary._id)}
                          >
                            Share
                          </button>
                          {showShareOptions[itinerary._id] && (
                            <div className="share-options">
                              <button className="btn btn_theme btn_sm" onClick={() => handleCopyLink(itinerary._id)}>Copy Link</button>
                              <button className="btn btn_theme btn_sm" onClick={() => handleEmailShare(itinerary)}>Share via Email</button>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <p>No itineraries available.</p>
                )}
              </div>
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
      </div>
    </section>
  );
};

export default TouristItineraryWrapper;