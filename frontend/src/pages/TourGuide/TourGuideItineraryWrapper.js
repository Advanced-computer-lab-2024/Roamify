import React, { useEffect, useState } from "react";
import axios from "axios";
import SectionHeading from "../../component/Common/SectionHeading";

const TourGuideItineraryWrapper = () => {
  const [itineraries, setItineraries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isEditMode, setIsEditMode] = useState(false);
  const [selectedItinerary, setSelectedItinerary] = useState(null);

  useEffect(() => {
    const fetchItineraries = async () => {
      try {
        const response = await axios.get(
            "http://localhost:3000/api/tourGuide/get-my-itineraries",
            {
              withCredentials: true,
            }
        );
        setItineraries(response.data.itineraries);
        console.log(response.data.itineraries);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching itineraries:", error);
        setLoading(true);
      }
    };
    fetchItineraries();
  }, []);

  const handleEdit = (itinerary) => {
    setSelectedItinerary(itinerary);
    setIsEditMode(true);
  };

  const handleUpdate = async (updatedItinerary) => {
    try {
      const formattedItinerary = {
        activities: updatedItinerary.activities,
        language: updatedItinerary.language,
        price: updatedItinerary.price,
        availableDates: updatedItinerary.availableDates,
        pickUpLocation: updatedItinerary.pickUpLocation,
        dropOffLocation: updatedItinerary.dropOffLocation,
        accessibility: updatedItinerary.accessibility,
      };

      await axios.put(
          `http://localhost:3000/api/tourguide/update-itinerary/${updatedItinerary._id}`,
          formattedItinerary,
          { withCredentials: true }
      );

      setItineraries(
          itineraries.map((itinerary) =>
              itinerary._id === updatedItinerary._id
                  ? { ...itinerary, ...formattedItinerary }
                  : itinerary
          )
      );
      setIsEditMode(false);
      setSelectedItinerary(null);
    } catch (error) {
      console.error("Error updating itinerary:", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(
          `http://localhost:3000/api/tourguide/delete-itinerary/${id}`,
          {
            withCredentials: true,
          }
      );
      setItineraries(itineraries.filter((itinerary) => itinerary._id !== id));
    } catch (error) {
      console.error("Error deleting itinerary:", error);
    }
  };

  const handleToggleStatus = async (itinerary) => {
    const newStatus = itinerary.status === "active" ? "inactive" : "active";
    try {
      await axios.put(
          "http://localhost:3000/api/tourguide/set-status-itinerary",
          {
            itineraryId: itinerary._id,
            status: newStatus,
          },
          { withCredentials: true }
      );

      setItineraries((prevItineraries) =>
          prevItineraries.map((item) =>
              item._id === itinerary._id ? { ...item, status: newStatus } : item
          )
      );
    } catch (error) {
      console.error("Error updating itinerary status:", error);
    }
  };

  return (
      <>
        <section id="explore_area" className="section_padding">
          <div className="container">
            <SectionHeading heading={`${itineraries.length} tours found`} />
            <div className="row">
              <div className="col-lg-9">
                <div className="row">
                  <div className="col-lg-12">
                    <div className="flight_search_result_wrapper">
                      {loading ? (
                          <p>Loading itineraries...</p>
                      ) : (
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
                                          <h1>{itinerary.name}</h1>
                                        </div>
                                      </div>
                                      <div className="flight_search_middel">
                                        <div className="flight_right_arrow">
                                          <h6>{itinerary.activities[0]?.name}</h6>
                                          <p>
                                            {itinerary.activities[0]?.location?.name}
                                          </p>
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
                                    <button
                                        onClick={() => handleToggleStatus(itinerary)}
                                        className="btn btn_theme btn_sm"
                                    >
                                      {itinerary.status === "active"
                                          ? "Deactivate"
                                          : "Activate"}
                                    </button>
                                    <p>*Conditions apply</p>
                                    <div
                                        data-bs-toggle="collapse"
                                        data-bs-target={`#collapseExample${index}`}
                                        aria-expanded="false"
                                        aria-controls={`collapseExample${index}`}
                                    >
                                      Show more{" "}
                                      <i className="fas fa-chevron-down"></i>
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
                                        <p>
                                          Accessibility:{" "}
                                          {itinerary.accessibility ? "Yes" : "No"}
                                        </p>
                                        <p>Rating: {itinerary.rating}</p>
                                        <button
                                            className="btn btn_theme btn_sm"
                                            onClick={() => handleEdit(itinerary)}
                                        >
                                          Edit
                                        </button>
                                        <button
                                            className="btn btn_theme btn_sm"
                                            onClick={() => handleDelete(itinerary._id)}
                                        >
                                          Delete
                                        </button>
                                      </div>
                                    </div>
                                    {isEditMode &&
                                        selectedItinerary?._id === itinerary._id && (
                                            <EditItineraryForm
                                                itinerary={selectedItinerary}
                                                onUpdate={handleUpdate}
                                            />
                                        )}
                                  </div>
                                </div>
                              </div>
                          ))
                      )}
                    </div>
                    <div className="load_more_flight">
                      <button className="btn btn_md">
                        <i className="fas fa-spinner"></i> Load more..
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </>
  );
};

const EditItineraryForm = ({ itinerary, onUpdate }) => {
  const [formData, setFormData] = useState({
    activities: itinerary.activities || [''],
    language: itinerary.language || "",
    price: itinerary.price || 0,
    availableDates: itinerary.availableDates || [''],
    pickUpLocation: itinerary.pickUpLocation || "",
    dropOffLocation: itinerary.dropOffLocation || "",
    accessibility: itinerary.accessibility || false,
  });
  const [activityOptions, setActivityOptions] = useState([]);

  useEffect(() => {
    const fetchActivities = async () => {
      try {
        const response = await axios.get("http://localhost:3000/api/activity/");
        setActivityOptions(response.data.activities); // Assuming activities list is in response.data.activities
      } catch (error) {
        console.error("Error fetching activities:", error);
      }
    };
    fetchActivities();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleCheckboxChange = (e) => {
    setFormData({ ...formData, accessibility: e.target.checked });
  };

  const handleActivityChange = (index, value) => {
    const updatedActivities = [...formData.activities];
    updatedActivities[index] = value;
    setFormData({ ...formData, activities: updatedActivities });
  };

  const addActivityField = () => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      activities: [...prevFormData.activities, ''],
    }));
  };

  const handleDateChange = (index, value) => {
    const updatedDates = [...formData.availableDates];
    updatedDates[index] = value;
    setFormData({ ...formData, availableDates: updatedDates });
  };

  const addDateField = () => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      availableDates: [...prevFormData.availableDates, ''],
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const updatedItinerary = {
      ...itinerary,
      activities: formData.activities,
      availableDates: formData.availableDates,
      language: formData.language,
      price: formData.price,
      pickUpLocation: formData.pickUpLocation,
      dropOffLocation: formData.dropOffLocation,
      accessibility: formData.accessibility,
    };

    onUpdate(updatedItinerary);
  };

  return (
      <form onSubmit={handleSubmit} className="edit-itinerary-form">
        <h4>Edit Itinerary</h4>

        <label>Activities:</label>
        {formData.activities.map((activity, index) => (
            <div key={index} style={{ display: "flex", alignItems: "center", marginBottom: "5px" }}>
              <select
                  value={activity}
                  onChange={(e) => handleActivityChange(index, e.target.value)}
              >
                <option value="">Select an activity</option>
                {activityOptions.map((option) => (
                    <option key={option._id} value={option._id}>
                      {option.name}
                    </option>
                ))}
              </select>
              {index === formData.activities.length - 1 && (
                  <button type="button" onClick={addActivityField} style={{ marginLeft: "5px" }}>
                    +
                  </button>
              )}
            </div>
        ))}

        <label>
          Language:
          <input
              type="text"
              name="language"
              value={formData.language}
              onChange={handleChange}
          />
        </label>

        <label>
          Price:
          <input
              type="number"
              name="price"
              value={formData.price}
              onChange={handleChange}
          />
        </label>

        <label>Available Dates:</label>
        {formData.availableDates.map((date, index) => (
            <div key={index} style={{ display: "flex", alignItems: "center", marginBottom: "5px" }}>
              <input
                  type="date"
                  value={date}
                  onChange={(e) => handleDateChange(index, e.target.value)}
              />
              {index === formData.availableDates.length - 1 && (
                  <button type="button" onClick={addDateField} style={{ marginLeft: "5px" }}>
                    +
                  </button>
              )}
            </div>
        ))}

        <label>
          Pick-Up Location:
          <input
              type="text"
              name="pickUpLocation"
              value={formData.pickUpLocation}
              onChange={handleChange}
          />
        </label>

        <label>
          Drop-Off Location:
          <input
              type="text"
              name="dropOffLocation"
              value={formData.dropOffLocation}
              onChange={handleChange}
          />
        </label>

        <label>
          Accessibility:
          <input
              type="checkbox"
              name="accessibility"
              checked={formData.accessibility}
              onChange={handleCheckboxChange}
          />
        </label>

        <button type="submit" className="btn btn_theme btn_sm">
          Save Changes
        </button>
      </form>
  );
};

export default TourGuideItineraryWrapper;
