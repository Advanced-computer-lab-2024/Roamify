import React, { useState } from "react";


const ComplaintData = [
  { title: "Complaint 1", description: "This is a description for Complaint 1.", date: "2024-10-05", status: "Pending" },
  { title: "Complaint 2", description: "This is a description for Complaint 2.", date: "2024-10-12", status: "Resolved" },
  { title: "Complaint 3", description: "This is a description for Complaint 3.", date: "2024-10-20", status: "Pending" },
];

const ComplaintSearchWrapper = () => {
  const [filter, setFilter] = useState("All");

  // Filter complaints based on selected status
  const filteredComplaints = filter === "All" ? ComplaintData : ComplaintData.filter((data) => data.status === filter);

  return (
    <section id="explore_area" className="section_padding">
      <div className="container">
        <div className="row">
          <div className="col-lg-9">
            {/* Filter Buttons */}
            <div style={{ display: "flex", gap: "10px", marginBottom: "20px" }}>
              <button
                type="button"
                className={`btn ${filter === "All" ? "btn-primary" : "btn-outline-primary"}`}
                onClick={() => setFilter("All")}
              >
                All
              </button>
              <button
                type="button"
                className={`btn ${filter === "Pending" ? "btn-primary" : "btn-outline-primary"}`}
                onClick={() => setFilter("Pending")}
              >
                Pending
              </button>
              <button
                type="button"
                className={`btn ${filter === "Resolved" ? "btn-success" : "btn-outline-success"}`}
                onClick={() => setFilter("Resolved")}
              >
                Resolved
              </button>
            </div>

            {/* Complaint Boxes - Stacked Vertically */}
            <div className="flight_search_result_wrapper" style={{ display: "block", gap: "20px" }}>
              {filteredComplaints.map((data, index) => (
                <div 
                  className="flight_search_item_wrappper" 
                  key={index}
                  style={{
                    width: "100%",                // Full width for each complaint
                    backgroundColor: "#f9f9f9",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    padding: "20px",
                    marginBottom: "20px",          // Space between boxes
                    borderRadius: "8px",
                    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)"
                  }}
                >
                  <h3 style={{ marginBottom: "10px" }}>{data.title}</h3>
                  <p style={{ marginBottom: "10px" }}>{data.description}</p>
                  <h5>Date: {data.date}</h5>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ComplaintSearchWrapper;
