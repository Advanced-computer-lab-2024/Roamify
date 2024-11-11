import React, { useEffect, useState } from "react";
import axios from "axios";
import SectionHeading from "../../../../component/Common/SectionHeading";
import SideBar from "./SideBar";
import PriceSlider from "../GuesttActivitiesSearch/PriceSlider";
import { Link } from "react-router-dom";
import "./GuestItinerary.css";

const GuestItineraryWrapper = () => {
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
  const [language, setLanguage] = useState("");
  const [showShareOptions, setShowShareOptions] = useState({});
  const [showPopup, setShowPopup] = useState(false);
  const [popupMessage, setPopupMessage] = useState("");

  const fetchItineraries = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get("http://localhost:3000/api/itinerary/", {
       
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
      setItineraries(response.data || []);
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

  

  return (
    <section id="explore_area" className="section_padding">
      <div className="container">
        <SectionHeading
          heading={`${itineraries?.length || 0} itineraries found`}
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
                    <div
                      className="flight_search_item_wrapper"
                      key={itinerary._id}
                    >
                      <div className="flight_search_items">
                        <h3 className="itinerary-name">{itinerary.title}</h3>
                        <div className="itinerary-section">
                          <p>
                            <strong>Name:</strong> {itinerary.name}
                          </p>
                          <p>
                            <strong>Location:</strong>{" "}
                            {itinerary.locations?.join(", ")}
                          </p>
                          <p>
                            <strong>Language:</strong> {itinerary.language}
                          </p>
                          <p>
                            <strong>Accessibility:</strong>{" "}
                            {itinerary.accessibility ? "Yes" : "No"}
                          </p>
                          <p>
                            <strong>Available Date:</strong>{" "}
                            {Array.isArray(itinerary.availableDates) &&
                            itinerary.availableDates.length > 0
                              ? itinerary.availableDates[0]
                              : "No dates available"}
                          </p>
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
        
      </div>
    </section>
  );
};

export default GuestItineraryWrapper;
