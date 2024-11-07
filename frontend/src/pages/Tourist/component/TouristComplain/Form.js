import React, { useState } from "react";

const Form = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");
  const [errors, setErrors] = useState({});

  const handleSubmit = (e) => {
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
      console.log("Complaint Submitted:", { title, description, date });
    }
  };

  return (
    <div style={{ display: "flex", justifyContent: "center", alignItems: "center", minHeight: "100vh" }}>
      <div className="left_side_search_area" style={{ maxWidth: "500px", width: "100%", padding: "20px" }}>
        <div className="left_side_search_boxed">
          <div className="left_side_search_heading">
            <h5>File a Complain</h5>
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
            <div className="form-group">
              <label htmlFor="complaintDate" className="form-label">Date</label>
              <input
                type="date"
                id="complaintDate"
                className="form-control"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                required
              />
              {errors.date && <small className="text-danger">{errors.date}</small>}
            </div>
            <button type="submit" className="btn btn_theme btn_sm" style={{ marginTop: "15px" }}>
              Submit Complain
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Form;
