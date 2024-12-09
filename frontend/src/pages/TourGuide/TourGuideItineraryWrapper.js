import React, { useEffect, useState } from "react";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import SectionHeading from "../../component/Common/SectionHeading";
import CreateItineraryModal from "./CreateItineraryModal";
import { renderStars } from "../../functions/renderStars";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFlag, faFlagCheckered } from "@fortawesome/free-solid-svg-icons";
import EditIcon from "../../component/Icons/EditIcon";
import DeleteIcon from "../../component/Icons/DeleteIcon.js";

import LoadingLogo from "../../component/LoadingLogo.js";

const TourGuideItineraryWrapper = () => {
  const [itineraries, setItineraries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isEditMode, setIsEditMode] = useState(false);
  const [selectedItinerary, setSelectedItinerary] = useState(null);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const openCreateModal = () => setShowCreateModal(true);
  const closeCreateModal = () => setShowCreateModal(false);

  const openEditModal = (itinerary) => {
    setSelectedItinerary(itinerary);
    setIsEditMode(true);
  };

  const closeEditModal = () => {
    setIsEditMode(false);
    setSelectedItinerary(null);
  };

  const fetchItineraries = async () => {
    try {
      const response = await axios.get(
        "http://localhost:3000/api/tourGuide/get-my-itineraries",
        {
          withCredentials: true,
        }
      );
      setItineraries(response.data.itineraries);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching itineraries:", error);
      setLoading(true);
    }
  };

  useEffect(() => {
    fetchItineraries();
  }, []);

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);

    // If search term is empty, fetch all itineraries again
    if (!value) {
      fetchItineraries();
    } else {
      // Filter itineraries based on the search term
      const filteredItineraries = itineraries.filter((itinerary) =>
        itinerary.name.toLowerCase().includes(value.toLowerCase())
      );
      setItineraries(filteredItineraries);
    }
  };

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
      toast.success("Itinerary updated successfully!");
    } catch (error) {
      console.error("Error updating itinerary:", error);
      toast.error(error.message);
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
      toast.success("Itinerary deleted successfully!");
    } catch (error) {
      console.error("Error deleting itinerary:", error);
      toast.error("Failed to delete itinerary.");
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
      toast.success(
        `Itinerary ${
          newStatus === "active" ? "activated" : "deactivated"
        } successfully!`
      );
      setTimeout(() => window.location.reload(), 1000);
    } catch (error) {
      console.error("Error updating itinerary status:", error);
      toast.error(error.response.data.message);
    }
  };

  return (
    <>
      <Toaster />
      <section
        id="explore_area"
        className="section_padding"
        style={{ minHeight: "100vh" }}
      >
        <div className="container">
          <SectionHeading heading={`${itineraries.length} itineraries found`} />
          <div
            className="row"
            style={{ display: "flex", flexDirection: "column" }}
          >
            <div>
              <div
                className=""
                style={{ width: "100%", display: "flex", marginBottom: "20px" }}
              >
                <input
                  type="text"
                  placeholder="Search itineraries..."
                  value={searchTerm}
                  onChange={handleSearchChange}
                  style={{
                    padding: "8px",
                    paddingLeft: "1vw",
                    borderRadius: "4px",
                    border: "1px solid var(--border-color)",
                    marginRight: "20px",
                    color: "var(--dashboard-title-color)",
                    width: "300px",
                    background: "var(--secondary-color)",
                  }}
                />
                <button
                  onClick={openCreateModal}
                  style={{ marginLeft: "auto" }}
                >
                  <i className="fas fa-plus" style={{ marginRight: "8px" }}></i>
                  Create
                </button>
                <CreateItineraryModal
                  showModal={showCreateModal}
                  closeModal={closeCreateModal}
                />
              </div>
            </div>
            <div className="col-lg-9" style={{ width: "100%" }}>
              {loading ? (
                <LoadingLogo />
              ) : (
                <div className="flight_search_result_wrapper">
                  {itineraries?.map((itinerary, index) => (
                    <div key={itinerary._id}>
                      <div
                        className="flight_search_items"
                        style={{
                          background: "var(--secondary-color)",
                          height: "30vh",
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
                                {index <
                                  itinerary.preferenceTags.length - 1 && (
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
                            width: "20%",
                            display: "flex",
                            gap: "20px",
                            flexDirection: "column",
                            position: "relative",
                            color: "white",
                            // alignItems: "center",
                            // justifyContent: "space-evenly",
                          }}
                        >
                          <h2>${itinerary.price}</h2>
                          <div
                            style={{
                              flex: "1",
                              display: "flex",
                              alignItems: "center",
                              gap: "10px",
                            }}
                          >
                            <button
                              className="btn btn_theme btn_sm"
                              onClick={() => handleEdit(itinerary)}
                              style={{
                                flex: 1,
                                background: "var(--secondary-color)",
                                color: "var(--text-color)",
                                borderRadius: "10px",
                                height: "60px",
                                width: "60px",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                              }}
                            >
                              <EditIcon fill="var(--text-color)" />
                            </button>
                            {isEditMode &&
                              selectedItinerary?._id === itinerary._id && (
                                <EditItineraryForm
                                  isOpen={isEditMode}
                                  closeModal={closeEditModal}
                                  itinerary={selectedItinerary}
                                  onUpdate={handleUpdate}
                                />
                              )}
                            <button
                              className="btn btn_theme btn_sm"
                              onClick={() => handleDelete(itinerary._id)}
                              style={{
                                flex: 1,
                                background: "var(--main-color)",
                                height: "60px",
                                width: "60px",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                borderRadius: "10px",
                              }}
                            >
                              <DeleteIcon fill="white" />
                            </button>
                          </div>
                          <div className="toggle-container">
                            <button
                              onClick={() => handleToggleStatus(itinerary)}
                              className={`toggle-btn ${
                                itinerary.status === "active" ? "active" : ""
                              }`}
                            >
                              <span className="dot"></span>
                            </button>
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
                          <div
                            className="flight_refund_policy"
                            style={{ flex: 2 }}
                          >
                            <div
                              className="TabPanelInner flex_widht_less"
                              style={{ flex: 1 }}
                            >
                              <h4>Pickup Dates</h4>
                              <div className="flight_info_taable">
                                {itinerary.availableDates.map((date, index) => (
                                  <p className="fz12">
                                    -{" "}
                                    {new Date(date).toISOString().split("T")[0]}
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
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

const EditItineraryForm = ({ isOpen, closeModal, itinerary, onUpdate }) => {
  const [formData, setFormData] = useState({
    activities: itinerary.activities || [""],
    language: itinerary.language || "",
    price: itinerary.price || 0,
    availableDates: itinerary.availableDates || [""],
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

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleSearch = () => {
    fetchItineraries(); // Re-fetch the itineraries if you want to search server-side, or filter locally.
    // If you want to search locally, filter based on searchTerm
    const filteredItineraries = itineraries.filter((itinerary) =>
      itinerary.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setItineraries(filteredItineraries);
  };

  const formatDate = (date) => {
    const isoDate = new Date(date); // Create a Date object from the ISO string
    const year = isoDate.getFullYear();
    const month = String(isoDate.getMonth() + 1).padStart(2, "0"); // Get month (0-indexed, so +1)
    const day = String(isoDate.getDate()).padStart(2, "0"); // Get day of the month
    return `${year}-${month}-${day}`; // Format as yyyy-mm-dd
  };
  const handleEditDate = (index) => {
    // Set the index of the date being edited and initialize newDate to current value
    setFormData({
      ...formData,
      editingDateIndex: index,
      newDate: formData.availableDates[index],
    });
  };

  const handleSelectDateToEdit = (e) => {
    const selectedIndex = e.target.value;
    setFormData({
      ...formData,
      selectedDateIndex: selectedIndex,
      newDate: formData.availableDates[selectedIndex], // Pre-fill the new date with the selected one
    });
  };

  const handleDateChange = (e) => {
    setFormData({
      ...formData,
      newDate: e.target.value, // Update the new date
    });
  };

  const handleSaveDate = () => {
    if (formData.selectedDateIndex !== undefined && formData.newDate !== "") {
      // Save the old and new date (send to the API)
      const updatedAvailableDates = [...formData.availableDates];
      const oldDate = updatedAvailableDates[formData.selectedDateIndex];
      const newDate = formData.newDate;

      // Call API or onUpdate with the old and new date
      onUpdate({
        oldDate,
        newDate,
      });

      // Update the available dates
      updatedAvailableDates[formData.selectedDateIndex] = newDate;
      setFormData({
        ...formData,
        availableDates: updatedAvailableDates, // Update the available dates with the new date
        selectedDateIndex: undefined, // Reset selected date
        newDate: "", // Reset the new date input
      });
    }
  };

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
      activities: [...prevFormData.activities, ""],
    }));
  };

  const addDateField = () => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      availableDates: [...prevFormData.availableDates, ""],
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
    <div
      style={{
        display: isOpen ? "flex" : "none",
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
      }}
    >
      <div
        style={{
          height: "80%",
          backgroundColor: "#fff",
          display: "flex",
          flexDirection: "column",
          width: "80%",
          maxWidth: "600px",
          borderRadius: "8px",
          overflowY: "auto",
        }}
      >
        <div
          className="modal-body"
          style={{ background: "var(--background-color)" }}
        >
          <div style={{ display: "flex", alignItems: "center" }}>
            <h4>Edit Itinerary</h4>
            <button
              onClick={closeModal}
              style={{
                backgroundColor: "transparent",
                border: "none",
                fontSize: "24px",
                fontWeight: "bold",
                cursor: "pointer",
                marginLeft: "auto",
              }}
            >
              &times;
            </button>
          </div>

          <form onSubmit={handleSubmit} className="edit-itinerary-form">
            <div className="tou_booking_form_Wrapper">
              <div
                className="tour_booking_form_box mb-4"
                style={{ background: "var(--secondary-color)" }}
              >
                <div className="your_info_arae">
                  <ul>
                    <li>
                      <label>Activities:</label>
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
                            value={activity}
                            onChange={(e) =>
                              handleActivityChange(index, e.target.value)
                            }
                          >
                            <option value="">Select an activity</option>
                            {activityOptions.map((option) => (
                              <option key={option._id} value={option._id}>
                                {option.name}
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
                    </li>
                    <li>
                      <label>
                        Language:
                        <input
                          type="text"
                          name="language"
                          value={formData.language}
                          onChange={handleChange}
                        />
                      </label>
                    </li>
                    <li>
                      <label>
                        Price:
                        <input
                          type="number"
                          name="price"
                          value={formData.price}
                          onChange={handleChange}
                        />
                      </label>
                    </li>
                    <li>
                      <h4>Edit Available Date</h4>

                      {/* Dropdown to select the date to edit */}
                      <label>Select a date to edit:</label>
                      <select
                        value={formData.selectedDateIndex || ""}
                        onChange={handleSelectDateToEdit}
                        style={{
                          marginBottom: "10px",
                          padding: "5px",
                          border: "1px solid #ccc",
                          borderRadius: "4px",
                        }}
                      >
                        <option value="" disabled>
                          Select a date
                        </option>
                        {formData.availableDates.map((date, index) => (
                          <option key={index} value={index}>
                            {formatDate(date)}
                          </option>
                        ))}
                      </select>

                      {/* Show the date picker to select a new date once a date is selected */}
                      {formData.selectedDateIndex !== undefined && (
                        <div style={{ marginBottom: "10px" }}>
                          {/* Old selected date */}
                          <input
                            type="date"
                            value={formatDate(
                              formData.availableDates[
                                formData.selectedDateIndex
                              ]
                            )}
                            readOnly
                            style={{
                              marginRight: "10px",
                              padding: "5px",
                              border: "1px solid #ccc",
                              borderRadius: "4px",
                            }}
                          />

                          {/* New date input */}
                          <input
                            type="date"
                            value={formData.newDate}
                            onChange={handleDateChange}
                            style={{
                              marginRight: "10px",
                              padding: "5px",
                              border: "1px solid #ccc",
                              borderRadius: "4px",
                            }}
                          />

                          {/* Save button */}
                          <button
                            type="button"
                            onClick={handleSaveDate}
                            style={{
                              backgroundColor: "#28a745",
                              color: "white",
                              border: "none",
                              padding: "5px 10px",
                              cursor: "pointer",
                            }}
                          >
                            Save
                          </button>
                        </div>
                      )}
                    </li>

                    <li>
                      <label>
                        Pick-Up Location:
                        <input
                          type="text"
                          name="pickUpLocation"
                          value={formData.pickUpLocation}
                          onChange={handleChange}
                        />
                      </label>
                    </li>

                    <li>
                      <label>
                        Drop-Off Location:
                        <input
                          type="text"
                          name="dropOffLocation"
                          value={formData.dropOffLocation}
                          onChange={handleChange}
                        />
                      </label>
                    </li>

                    <li>
                      <label>
                        Accessibility:
                        <input
                          type="checkbox"
                          name="accessibility"
                          checked={formData.accessibility}
                          onChange={handleCheckboxChange}
                        />
                      </label>
                    </li>

                    <button type="submit" style={{ width: "100%" }}>
                      Save Changes
                    </button>
                  </ul>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default TourGuideItineraryWrapper;
