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
  const [showShareOptions, setShowShareOptions] = useState({});

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
  const handleShareToggle = (itineraryId) => {
    setShowShareOptions((prevState) => ({
      ...prevState,
      [itineraryId]: !prevState[itineraryId],
    }));
  };
  const handleCopyLink = (itineraryId) => {
    const activityUrl = `${window.location.origin}/itinerary-details/${itineraryId}`;
    navigator.clipboard.writeText(activityUrl).then(() => {
      alert("Link copied to clipboard!");
    }).catch(err => {
      console.error("Failed to copy: ", err);
    });
  };

  // Function to send activity details via email
  const handleEmailShare = (itinerary) => {
    const subject = `Check out this activity: ${itinerary.name}`;
    const body = `I thought you'd be interested in this activity: ${itinerary.name}\n\nLocation: ${itinerary.location.name}\nDate: ${new Date(itinerary.date).toLocaleDateString()}\nPrice: ${itinerary.price} EGP\n\nCheck it out: ${window.location.origin}/itinerary-details/${itinerary._id}`;
    const mailtoLink = `mailto:?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    window.location.href = mailtoLink;
  };


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
                  itineraries.map((itinerary, index) => (
                    <div
                      className="flight_search_item_wrappper"
                      key={itinerary._id}
                    >
                      <div className="flight_search_items">
                        <div className="multi_city_flight_lists">
                          <div className="flight_multis_area_wrapper">
                            <div className="flight_search_left">
                              <div className="flight_search_destination">
                                <h3>{itinerary.name}</h3>
                              </div>
                            </div>
                            <div className="flight_search_middel">
                              <div className="flight_right_arrow">
                                <h6>{itinerary.activities[0]?.name}</h6>
                                <p>{itinerary.activities[0]?.location?.name}</p>
                              </div>
                              <div className="flight_search_destination">
                                <p>Tour Guide</p>
                                <h3>{itinerary.tourGuide.username}</h3>
                                <h6>{itinerary.tourGuide.email}</h6>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="flight_search_right">
                          <h2>
                            ${itinerary.price}
                            <sup>Special offer</sup>
                          </h2>
                          <Link
                            to="/tour-booking"
                            className="btn btn_theme btn_sm"
                          >
                            Book now
                          </Link>
                          <p>*Conditions apply</p>
                          <button
                              className="btn btn_theme btn_sm"
                              onClick={() => handleShareToggle(itinerary._id)}
                            >
                              Share
                            </button>
                            {showShareOptions[itinerary._id] && (
                              <div className="share-options">
                                <button className="btn btn_theme btn_sm" onClick={() => handleCopyLink(itinerary._id)}>Copy Link</button>
                                <button className="btn btn_theme btn_sm" onClick={() => handleEmailShare(itinerary._id)}>Share via Email</button>
                              </div>
                            )}
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
                          <div className="flight-shoe_dow_item">
                            <div className="airline-details">
                              <span className="airlineName fw-500">
                                {itinerary.activities[0]?.name}
                              </span>
                              <span className="flightNumber">
                                {itinerary.activities[0]?.category?.name}
                              </span>
                            </div>
                            <div className="flight_inner_show_component">
                              <div className="flight_det_wrapper">
                                <div className="flight_det">
                                  <div className="code_time">
                                    <span className="code">Location</span>
                                    <span className="time">
                                      {itinerary.pickUpLocation}

                                    </span>
                                  </div>
                                  <p className="airport">Drop-off</p>
                                  <p className="date">
                                    {itinerary.dropOffLocation}
                                  </p>
                                </div>
                              </div>
                              <div className="flight_duration">
                                <span>{itinerary.language}</span>
                              </div>
                            </div>
                          </div>
                          <div className="flight_refund_policy">
                            <div className="TabPanelInner flex_widht_less">
                              <h4>Details</h4>
                              <p>Accessibility: {itinerary.accessibility ? "Yes" : "No"}</p>
                              <p>Rating: {itinerary.rating}</p>
                              
                            </div>
                          </div>
                          
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
