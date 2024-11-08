import React, { useState } from "react";
import axios from "axios";

const Form = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");
  const [errors, setErrors] = useState({});
  const [apiData, setApiData] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    let formErrors = {};

    // Validation: Check if date is in the future
    if (new Date(date) > new Date()) {
      formErrors.date = "Invalid Date";
    }

    // Set errors or submit the form
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
    } else {
      setErrors({});
      try {
        const response = await axios.post(
          "http://localhost:3000/api/complaint/create",
          { title, description, date },
          {
            withCredentials: true, // Include HTTP-only cookies
          }
        );
        setApiData(response.data);
        console.log("Complaint Submitted:", response.data);
      } catch (error) {
        console.error("Error submitting complaint:", error);
      }
    }
  };

  return (
    <div style={{ display: "flex", justifyContent: "center", alignItems: "center", minHeight: "100vh" }}>
      <div className="left_side_search_area" style={{ maxWidth: "500px", width: "100%", padding: "20px" }}>
        <div className="left_side_search_boxed">
          <div className="left_side_search_heading">
            <h5>File a Complaint</h5>
          </div>
          <form onSubmit={handleSubmit} className="complaint_form">
            <div className="form-group">
              <label htmlFor="complaintTitle" className="form-label">Title</label>
              <input
                type="text"
                id="complaintTitle"
                className="form-control"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="complaintDescription" className="form-label">Description</label>
              <textarea
                id="complaintDescription"
                className="form-control"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
              />
            </div>
            <button type="submit" className="btn btn_theme btn_sm" style={{ marginTop: "15px" }}>
              Submit Complaint
            </button>
          </form>
        </div>
        {apiData && (
          <div className="api_data_section" style={{ marginTop: "20px" }}>
            <h5>Submitted Complaint</h5>
            <p>Title: {apiData.title}</p>
            <p>Description: {apiData.description}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Form;
