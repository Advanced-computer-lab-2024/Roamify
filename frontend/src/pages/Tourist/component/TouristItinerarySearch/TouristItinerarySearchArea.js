import React, { useEffect, useState } from "react";
import axios from "axios";
import SectionHeading from "../../../../component/Common/SectionHeading";
import SideBar from "./SideBar";
import { Link } from "react-router-dom";
import PriceSlider from "../TouristActivitiesSearch/PriceSlider";

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
  const [language, setLanguage] = useState("");

  const fetchItineraries = async (
    minBudget,
    maxBudget,
    date,
    rating,
    selectedPreference,
    language
  ) => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get(`http://localhost:3000/api/itinerary/`, {
        withCredentials: true,
        params: {
          minBudget,
          maxBudget,
          date: date ? date.toISOString().split("T")[0] : undefined,
          rating: rating || undefined,
          preference: selectedPreference || undefined,
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
    fetchItineraries(priceRange[0], priceRange[1], date, rating, preference, language);
  }, [priceRange, date, rating, preference, language, sortCriteria]);

  const applyFilters = (newPriceRange) => setPriceRange(newPriceRange);

  const handlePreferenceApply = (selectedPreference) => {
    setPreference(selectedPreference);
    fetchItineraries(priceRange[0], priceRange[1], date, rating, selectedPreference, language);
  };

  const handleSortChange = (field, order) => {
    setSortCriteria({ field, order });
    fetchItineraries(priceRange[0], priceRange[1], date, rating, preference, language);
  };

  const handleRatingApply = (selectedRating) => {
    setRating(selectedRating);
    fetchItineraries(priceRange[0], priceRange[1], date, selectedRating, preference, language);
  };

  useEffect(() => {
    const fetchPreferences = async () => {
      try {
        const preferenceResponse = await axios.get("http://localhost:3000/api/preference-tag/get-all");
        setPreferences(preferenceResponse.data.tags || []);
      } catch (error) {
        console.error("Error fetching preferences:", error);
      }
    };

    fetchPreferences();
  }, []);

  return (
    <section id="explore_area" className="section_padding">
      <div className="container">
        <SectionHeading heading={`${itineraries?.length || 0} itineraries found`} />

        <div className="row">
          <div className="col-lg-3">
            <div className="left_side_search_boxed">
              <div className="left_side_search_heading">
                <h5>Filter by price</h5>
              </div>
              <div className="filter-price">
                <PriceSlider onApply={applyFilters} />
              </div>
            </div>
            <SideBar date={date} setDate={setDate} onSortChange={handleSortChange} onRatingApply={handleRatingApply} />

            <div className="left_side_search_boxed">
              <div className="left_side_search_heading">
                <h5>Filter by Preference</h5>
              </div>
              <select onChange={(e) => handlePreferenceApply(e.target.value)}>
                <option value="">All Preference</option>
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
    <div className="flight_search_item_wrappper" key={itinerary._id}>
      <div className="flight_search_items">
        <div className="multi_city_flight_lists">
          <div className="flight_multis_area_wrapper">
            <div className="flight_search_left">
              <div className="flight_search_destination">
                <p>Location</p>
                <h3>{itinerary.locations?.join(", ")}</h3>
              </div>
              <p><strong>Tour Guide:</strong> {itinerary.tourGuide}</p>
              <p><strong>Language:</strong> {itinerary.language}</p>
              <p><strong>Accessibility:</strong> {itinerary.accessibility ? "Yes" : "No"}</p>
            </div>

            <div className="flight_search_middel">
              <h3>{itinerary.activities[0]?.name}</h3>
              <p><strong>Category:</strong> {itinerary.activities[0]?.category?.name || "N/A"}</p>
              <p><strong>Price:</strong> {itinerary.activities[0]?.price} EGP</p>
              <p><strong>Rating:</strong> {itinerary.activities[0]?.rating || 0} / 5</p>
              <p><strong>Available Dates:</strong> {itinerary.availableDates?.join(", ")}</p>
              <p><strong>Preference Tags:</strong> {itinerary.preferenceTags?.map(tag => tag.name).join(", ") || "None"}</p>
              <p><strong>Pick-Up Location:</strong> {itinerary.pickUpLocation}</p>
              <p><strong>Drop-Off Location:</strong> {itinerary.dropOffLocation}</p>
            </div>
          </div>
        </div>
        <div className="flight_search_right">
          <h2>{itinerary.price} EGP</h2>
          <p><strong>Booked:</strong> {itinerary.booked ? "Yes" : "No"}</p>
          <Link to={`/itinerary-booking/${itinerary._id}`} className="btn btn_theme btn_sm">
            Book now
          </Link>
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

export default TouristItineraryWrapper;
