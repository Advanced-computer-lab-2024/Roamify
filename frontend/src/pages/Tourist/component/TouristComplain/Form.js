import React, { useState } from "react";
import axios from "axios";

const Form = () => {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [errors, setErrors] = useState({});
  const [showPopup, setShowPopup] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    let formErrors = {};

    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
    } else {
      setErrors({});
      try {
        await axios.post(
          "http://localhost:3000/api/complaint/create",
          { title, body }, 
          {
            withCredentials: true,
          }
        );
        setShowPopup(true); // Show success popup
        setTimeout(() => setShowPopup(false), 3000); // Hide popup after 3 seconds
        setTitle(""); // Clear the form fields after submission
        setBody("");
      } catch (error) {
        console.error("Error submitting complaint:", error);
        
        if (error.response) {
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
              <label htmlFor="complaintBody" className="form-label">Body</label>
              <textarea
                id="complaintBody"
                className="form-control"
                value={body}
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

        {/* Popup as a mini modal */}
        {showPopup && (
          <div style={{
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
            textAlign: "center"
          }}>
            <h4 style={{ color: "green", marginBottom: "10px" }}>Submitted Successfully!</h4>
            <p>Your complaint has been filed.</p>
            <button onClick={() => setShowPopup(false)} className="btn btn_theme" style={{ marginTop: "10px" }}>
              Close
            </button>
          </div>
        )}

        {/* Optional: A semi-transparent overlay for the modal */}
        {showPopup && (
          <div style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            zIndex: 999
          }} onClick={() => setShowPopup(false)}></div>
        )}
      </div>
    </div>
  );
};

export default Form;
