import React, { useState } from "react";
import axios from "axios";

const Form = () => {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState(""); // Renamed to `body` to match API requirement
  const [errors, setErrors] = useState({});
  const [apiData, setApiData] = useState(null);
  const [showPopup, setShowPopup] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    let formErrors = {};

    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
    } else {
      setErrors({});
      try {
        const response = await axios.post(
          "http://localhost:3000/api/complaint/create",
          { title, body }, // Updated to use `body` instead of `description`
          {
            withCredentials: true, // Include HTTP-only cookies
          }
        );
        setApiData(response.data);
        setShowPopup(true); // Show success popup
        setTimeout(() => setShowPopup(false), 3000); // Hide popup after 3 seconds
        console.log("Complaint Submitted:", response.data);
      } catch (error) {
        console.error("Error submitting complaint:", error);
        
        if (error.response) {
          console.log("Error response data:", error.response.data);
          setErrors({ apiError: error.response.data.message || "Submission failed. Please check your input." });
        } else {
          setErrors({ apiError: "An unknown error occurred. Please try again." });
        }
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
              <label htmlFor="complaintBody" className="form-label">Body</label> {/* Renamed to match backend field */}
              <textarea
                id="complaintBody"
                className="form-control"
                value={body} // Updated to use `body`
                onChange={(e) => setBody(e.target.value)}
                required
              />
            </div>
            <button type="submit" className="btn btn_theme btn_sm" style={{ marginTop: "15px" }}>
              Submit Complaint
            </button>
            {errors.apiError && (
              <p style={{ color: "red", marginTop: "10px" }}>{errors.apiError}</p>
            )}
          </form>
        </div>
        {apiData && (
          <div className="api_data_section" style={{ marginTop: "20px" }}>
            <h5>Submitted Complaint</h5>
            <p>Title: {apiData.title}</p>
            <p>Body: {apiData.body}</p> {/* Updated to show `body` */}
          </div>
        )}
        {showPopup && (
          <div style={{
            position: "fixed",
            bottom: "20px",
            right: "20px",
            padding: "10px 20px",
            backgroundColor: "green",
            color: "white",
            borderRadius: "5px",
            boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.2)"
          }}>
            Submitted successfully!
          </div>
        )}
      </div>
    </div>
  );
};

export default Form;
