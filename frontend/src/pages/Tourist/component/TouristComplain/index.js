import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import EmptyResponseLogo from "../../../../component/EmptyResponseLogo";
import LoadingLogo from "../../../../component/LoadingLogo";

const ComplaintSearchWrapper = () => {
  const [complaints, setComplaints] = useState([]);
  const [filter, setFilter] = useState("All");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchComplaints = async () => {
      setLoading(true);
      setError(null);

      let statusQuery =
        filter === "All" ? "" : `?status=${filter.toLowerCase()}`;
      const url = `http://localhost:3000/api/complaint/my-complaints${statusQuery}`;

      try {
        const response = await axios.get(url, { withCredentials: true });
        setComplaints(response.data.complaints);
      } catch (err) {
        setError(err.response.data.message);
        console.error("Error fetching complaints:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchComplaints();
  }, [filter]);

  // Helper function to convert date format
  const formatDate = (dateString) => {
    const [year, month, day] = dateString.split("-"); // Assuming dateString is in "yyyy-mm-dd"
    return `${day}/${month}/${year}`;
  };

  return (
    <section
      id="explore_area"
      className="section_padding"
      style={{ minHeight: "100vh" }}
    >
      <div className="container">
        <div className="row">
          <div className="col-lg-9" style={{ width: "100%" }}>
            {/* Filter Buttons */}
            <div
              style={{
                display: "flex",
                marginBottom: "20px",
                borderBottom: "1px solid var(--main-color)",
              }}
            >
              <div style={{ display: "flex", gap: "10px" }}>
                <button
                  type="button"
                  className={`btn ${
                    filter === "All" ? "btn-primary" : "btn-outline-primary"
                  }`}
                  onClick={() => setFilter("All")}
                >
                  All
                </button>
                <button
                  type="button"
                  className={`btn ${
                    filter === "pending" ? "btn-primary" : "btn-outline-primary"
                  }`}
                  onClick={() => setFilter("pending")}
                  style={{
                    borderRadius: "0px",
                  }}
                >
                  Pending
                </button>
                <button
                  type="button"
                  className={`btn ${
                    filter === "Resolved"
                      ? "btn-primary"
                      : "btn-outline-primary"
                  }`}
                  onClick={() => setFilter("Resolved")}
                  style={{
                    borderRadius: "0px",
                  }}
                >
                  Resolved
                </button>
              </div>
              <Link
                to="/tourist/tourist-complain"
                style={{ marginLeft: "auto" }}
              >
                <div
                  style={{
                    backgroundColor: "var(--main-color)",
                    color: "white",
                    padding: "10px",
                    height: "100%",
                  }}
                >
                  File Complaint
                </div>
              </Link>
            </div>

            {/* Display loading, error, or complaints */}
            {loading ? (
              <LoadingLogo isVisible={true} size="100px" />
            ) : error ? (
              <EmptyResponseLogo isVisible={true} text={error} size="200px" />
            ) : (
              <div
                className="flight_search_result_wrapper"
                style={{ display: "block", gap: "20px" }}
              >
                {complaints.map((data) => (
                  <div
                    className="flight_search_item_wrappper"
                    key={data._id}
                    style={{
                      width: "100%",
                      backgroundColor: "var(--secondary-color)",
                      display: "flex",
                      flexDirection: "row",
                      justifyContent: "space-between",
                      alignItems: "center",
                      padding: "20px",
                      marginBottom: "20px",
                      borderRadius: "8px",
                      boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                    }}
                  >
                    <div
                      style={{
                        flex: "3",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "flex-start",
                      }}
                    >
                      <h3
                        style={{
                          marginBottom: "10px",
                          color: "var(--text-color)",
                        }}
                      >
                        {data.title}
                      </h3>
                    </div>
                    <h5
                      style={{
                        color: "var(--dashboard-title-color)",
                        flex: "1",
                      }}
                    >
                      Date: {new Date(data.date).toISOString().split("T")[0]}
                    </h5>{" "}
                    {/* Format the date here */}
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
