import React, { useState, useEffect } from "react";
import axios from "axios";

const ComplaintSearchWrapper = () => {
  const [complaints, setComplaints] = useState([]);
  const [filter, setFilter] = useState("All");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Define the API endpoint based on the selected filter
    const fetchComplaints = async () => {
      setLoading(true);
      setError(null);
      
      let statusQuery = filter === "All" ? "" : `?status=${filter.toLowerCase()}`;
      const url = `http://localhost:3000/api/complaint/my-complaints${statusQuery}`;

      try {
        const response = await axios.get(url, { withCredentials: true });
        setComplaints(response.data.complaints);
      } catch (err) {
        setError("Failed to fetch complaints. Please try again later.");
        console.error("Error fetching complaints:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchComplaints();
  }, [filter]); // Fetch data every time `filter` changes

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

            {/* Display loading, error, or complaints */}
            {loading ? (
              <p>Loading complaints...</p>
            ) : error ? (
              <p style={{ color: "red" }}>{error}</p>
            ) : (
              <div className="flight_search_result_wrapper" style={{ display: "block", gap: "20px" }}>
                {complaints.map((data) => (
                  <div 
                    className="flight_search_item_wrappper" 
                    key={data._id}
                    style={{
                      width: "100%",
                      backgroundColor: "#f9f9f9",
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "center",
                      padding: "20px",
                      marginBottom: "20px",
                      borderRadius: "8px",
                      boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)"
                    }}
                  >
                    <h3 style={{ marginBottom: "10px" }}>{data.title}</h3>
                    <h5>Body: {data.body}</h5>
                    <h5>Date: {data.date}</h5>
                    <h5>Status: {data.status}</h5>
                    <h5>Reply: {data.reply}</h5>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ComplaintSearchWrapper;
