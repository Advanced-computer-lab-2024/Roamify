import React, { useState, useEffect } from "react";
import axios from "axios";
import Icon from "../../assets/img/icon/right.png";
import { color } from "chart.js/helpers";

const CreateItineraryModal = ({ showModal, closeModal }) => {
  const [formData, setFormData] = useState({
    name: "",
    activities: [""], // Initialize as an array for multiple activity selections
    language: "",
    price: 0,
    availableDates: [""],
    pickUpLocation: "",
    dropOffLocation: "",
    accessibility: false,
  });
  const [activityOptions, setActivityOptions] = useState([]); // Store the list of available activities
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState(null);

  // Fetch all activities on component mount
  useEffect(() => {
    const fetchActivities = async () => {
      try {
        const response = await axios.get("http://localhost:3000/api/activity/");
        setActivityOptions(response.data.activities); // Assume response.data.activities contains the list of activities
      } catch (error) {
        console.error("Error fetching activities:", error);
        setError("Failed to load activities.");
      }
    };
    fetchActivities();
  }, []);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleDateChange = (index, value) => {
    const updatedDates = [...formData.availableDates];
    updatedDates[index] = value;
    setFormData({
      ...formData,
      availableDates: updatedDates,
    });
  };

  const addDateField = () => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      availableDates: [...prevFormData.availableDates, ""],
    }));
  };

  const handleActivityChange = (index, value) => {
    const updatedActivities = [...formData.activities];
    updatedActivities[index] = value;
    setFormData({
      ...formData,
      activities: updatedActivities,
    });
    console.log(formData);
  };

  const addActivityField = () => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      activities: [...prevFormData.activities, ""],
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const filteredActivities = formData.activities.filter((activity, index) => {
      return !(activity === "" && index === formData.activities.length - 1);
    });

    const filteredDates = formData.availableDates.filter((date, index) => {
      return !(date === "" && index === formData.availableDates.length - 1);
    });

    // Update formData to exclude empty strings from both activities and availableDates
    const updatedFormData = {
      ...formData,
      activities: filteredActivities,
      availableDates: filteredDates, // Add filtered availableDates
    };
    try {
      const response = await axios.post(
        "http://localhost:3000/api/tourguide/create-itinerary",
        updatedFormData,
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true, // Send credentials (cookies, etc.) with the request
        }
      );
      console.log("Itinerary created:", response.data);
      setSubmitted(true);
    } catch (error) {
      console.error(
        "Error creating itinerary:",
        error.response ? error.response.data : error.message
      );
      setError("An error occurred while submitting the itinerary.");
    }
  };

  // Inline styles
  const modalStyle = {
    display: showModal ? "flex" : "none",
    position: "fixed",
    top: "0",
    left: "0",
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    zIndex: "9999",
    overflow: "auto",
    alignItems: "center",
    justifyContent: "center",
  };

  const modalContentStyle = {
    height: "80%",
    backgroundColor: "#fff",
    display: "flex",
    flexDirection: "column",
    width: "80%",
    maxWidth: "600px",
    borderRadius: "8px",
    overflowY: "auto",
  };

  const modalHeaderStyle = {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "var(--main-color)",
    padding: "20px",
    color: "white",
  };

  const closeButtonStyle = {
    backgroundColor: "transparent",
    border: "none",
    fontSize: "24px",
    fontWeight: "bold",
    cursor: "pointer",
  };

  const inputStyle = {
    padding: "10px",
    margin: "10px 0",
    width: "100%",
    borderRadius: "5px",
    border: "1px solid #ccc",
  };

  const selectStyle = {
    padding: "10px",
    margin: "10px 0",
    width: "100%",
    borderRadius: "5px",
    border: "1px solid #ccc",
  };

  const successMessageStyle = {
    textAlign: "center",
  };

  const successIconStyle = {
    marginBottom: "10px",
  };

  return (
    <div style={modalStyle}>
      <div style={modalContentStyle}>
        <div style={modalHeaderStyle}>
          <h3>Create New Itinerary</h3>
          <button style={closeButtonStyle} onClick={closeModal}>
            &times;
          </button>
        </div>
        <div
          className="modal-body"
          style={{ background: "var(--background-color)" }}
        >
          {submitted ? (
            <div className="col-lg-8">
              <div className="tou_booking_form_Wrapper">
                <div className="tour_booking_form_box mb-4">
                  <div className="booking_success_arae">
                    <div className="booking_success_img">
                      <img src={Icon} alt="Success Icon" />
                    </div>
                    <div className="booking_success_text">
                      <h3>Your itinerary was submitted successfully!</h3>
                      <h6>We have sent your booking details to your email.</h6>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit}>
              <div className="tou_booking_form_Wrapper">
                <div
                  className="tour_booking_form_box mb-4"
                  style={{ background: "var(--secondary-color)" }}
                >
                  <div className="your_info_arae">
                    <ul>
                      <li>
                        <span className="name_first">Name:</span>
                        <span className="last_name">
                          <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                          />
                        </span>
                      </li>
                      <li>
                        <span className="name_first">Activities:</span>
                        <span className="last_name">
                          {formData.activities.map((activity, index) => (
                            <div
                              key={index}
                              style={{
                                display: "flex",
                                alignItems: "center",
                                marginBottom: "5px",
                              }}
                            >
                              <select
                                name="activity"
                                value={activity}
                                onChange={(e) =>
                                  handleActivityChange(index, e.target.value)
                                }
                              >
                                <option value="">Select an activity</option>
                                {activityOptions.map((activityOption) => (
                                  <option
                                    key={activityOption._id}
                                    value={activityOption._id}
                                  >
                                    {activityOption.name}
                                  </option>
                                ))}
                              </select>
                              {index === formData.activities.length - 1 && (
                                <button
                                  type="button"
                                  onClick={addActivityField}
                                  style={{ marginLeft: "5px" }}
                                >
                                  +
                                </button>
                              )}
                            </div>
                          ))}
                        </span>
                      </li>
                      <li>
                        <span className="name_first">Language:</span>
                        <span className="last_name">
                          <input
                            type="text"
                            name="language"
                            value={formData.language}
                            onChange={handleChange}
                          />
                        </span>
                      </li>
                      <li>
                        <span className="name_first">Price:</span>
                        <span className="last_name">
                          <input
                            type="number"
                            name="price"
                            value={formData.price}
                            onChange={handleChange}
                          />
                        </span>
                      </li>
                      <li>
                        <span className="name_first">Available Dates:</span>
                        <span className="last_name">
                          {formData.availableDates.map((date, index) => (
                            <div
                              key={index}
                              style={{
                                display: "flex",
                                alignItems: "center",
                                marginBottom: "5px",
                              }}
                            >
                              <input
                                type="date"
                                value={date}
                                onChange={(e) =>
                                  handleDateChange(index, e.target.value)
                                }
                              />
                              {index === formData.availableDates.length - 1 && (
                                <button
                                  type="button"
                                  onClick={addDateField}
                                  style={{ marginLeft: "5px" }}
                                >
                                  +
                                </button>
                              )}
                            </div>
                          ))}
                        </span>
                      </li>
                      <li>
                        <span className="name_first">Pick-Up Location:</span>
                        <span className="last_name">
                          <input
                            type="text"
                            name="pickUpLocation"
                            value={formData.pickUpLocation}
                            onChange={handleChange}
                          />
                        </span>
                      </li>
                      <li>
                        <span className="name_first">Drop-Off Location:</span>
                        <span className="last_name">
                          <input
                            type="text"
                            name="dropOffLocation"
                            value={formData.dropOffLocation}
                            onChange={handleChange}
                          />
                        </span>
                      </li>
                      <li>
                        <span className="name_first">Accessibility:</span>
                        <span className="last_name">
                          <input
                            type="checkbox"
                            name="accessibility"
                            checked={formData.accessibility}
                            onChange={handleChange}
                          />
                        </span>
                      </li>
                    </ul>
                    <button
                      type="submit"
                      className="btn btn-primary"
                      style={{
                        width: "100%",
                        background: "var(--main-color)",
                        color: "white",
                        marginTop: "20px",
                      }}
                    >
                      Submit
                    </button>
                  </div>
                </div>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default CreateItineraryModal;
