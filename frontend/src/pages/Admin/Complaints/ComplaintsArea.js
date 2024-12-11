import React, { useState, useEffect } from "react";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import ComplaintModal from "./ComplaintModal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSortAmountUpAlt,
  faSortAmountDownAlt,
} from "@fortawesome/free-solid-svg-icons";

const ComplaintsArea = () => {
  const [complaints, setComplaints] = useState([]);
  const [filter, setFilter] = useState("All");
  const [sortOrder, setSortOrder] = useState("desc"); // Track sorting order
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedComplaint, setSelectedComplaint] = useState(null);

  // Fetch complaints based on the filter and sort order
  const fetchComplaints = async () => {
    try {
      const params = {
        sortOrder: sortOrder,
        ...(filter !== "All" && { status: filter }),
      };

      const response = await axios.get("http://localhost:3000/api/complaint", {
        withCredentials: true,
        params,
      });

      setComplaints(response.data.complaints || []);
    } catch (error) {
      console.error("Error fetching complaints:", error);
    }
  };

  useEffect(() => {
    fetchComplaints();
  }, [filter, sortOrder]); // Refetch when filter or sortOrder changes

  const getComplaintDetails = async (complaintId) => {
    try {
      const response = await axios.get(
        `http://localhost:3000/api/complaint/details/${complaintId}`,
        { withCredentials: true }
      );
      return response.data.complaint;
    } catch (error) {
      console.error("Error fetching complaint details:", error);
      throw error;
    }
  };

  const openModal = async (complaintId) => {
    try {
      const complaintDetails = await getComplaintDetails(complaintId);
      setSelectedComplaint(complaintDetails);
      setModalOpen(true);
    } catch (error) {
      console.error("Failed to fetch and open complaint details:", error);
    }
  };

  const closeModal = () => {
    setSelectedComplaint(null);
    setModalOpen(false);
  };

  const handleResolveComplaint = async (complaintId) => {
    try {
      await axios.patch(
        `http://localhost:3000/api/complaint/resolve/${complaintId}`,
        {},
        { withCredentials: true }
      );
      toast.success("Complaint resolved successfully!");
      fetchComplaints(); // Re-fetch complaints after resolving
    } catch (error) {
      toast.error("Error resolving complaint.");
      console.error("Error resolving complaint:", error);
    }
  };

  // Toggle sort order between ascending and descending
  const toggleSortOrder = () => {
    setSortOrder((prevOrder) => (prevOrder === "asc" ? "desc" : "asc"));
  };

  return (
    <section
      id="explore_area"
      className="section_padding"
      style={{ minHeight: "100vh" }}
    >
      <div
        className="container"
        style={{
          display: "flex",
          flexDirection: "column",
        }}
      >
        <div
          style={{ fontSize: "24px", fontWeight: "bold", marginBottom: "1vh" }}
        >
          Complaints
        </div>
        <div
          className="row"
          style={{
            width: "100%",
            margin: "0px",
            padding: "0px",
            display: "flex",
          }}
        >
          <div className="col-lg-9" style={{ width: "100%" }}>
            {/* Filter Buttons */}
            <div
              style={{
                display: "flex",
                marginBottom: "20px",
                borderBottom: "1px solid var(--main-color)",
              }}
            >
              <button
                type="button"
                className={`btn ${
                  filter === "All" ? "btn-primary" : "btn-outline-primary"
                }`}
                onClick={() => setFilter("All")}
                style={{
                  borderRadius: "0px",
                }}
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
                  filter === "resolved" ? "btn-primary" : "btn-outline-primary"
                }`}
                onClick={() => setFilter("resolved")}
                style={{
                  borderRadius: "0px",
                }}
              >
                Resolved
              </button>
              <button
                type="button"
                className="btn btn-outline-secondary"
                onClick={toggleSortOrder}
                style={{
                  display: "flex",
                  alignItems: "center",
                  marginLeft: "auto",
                  border: "none",
                  borderRadius: "0px",
                }}
              >
                Date{" "}
                <FontAwesomeIcon
                  icon={
                    sortOrder === "asc"
                      ? faSortAmountUpAlt
                      : faSortAmountDownAlt
                  }
                  style={{ marginLeft: "5px" }}
                />
              </button>
            </div>

            {/* Complaint Boxes */}
            <div
              className="flight_search_result_wrapper"
              style={{ display: "block", gap: "20px" }}
            >
              {complaints.map((complaint, index) => (
                <div
                  className="flight_search_item_wrappper"
                  key={index}
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
                  <div style={{ flex: "1" }}>
                    <h3
                      style={{
                        marginBottom: "10px",
                        color: "var(--text-color)",
                        textAlign: "left",
                      }}
                    >
                      {complaint.title}
                    </h3>
                    <h5 style={{ color: "var(--dashboard-title-color)" }}>
                      Date:{" "}
                      {new Date(complaint.date).toISOString().split("T")[0]}
                    </h5>
                  </div>

                  <div style={{ display: "flex", gap: "10px" }}>
                    <button
                      style={{
                        padding: "10px 15px",
                        backgroundColor: "transparent",
                        color: "var(--text-color)",
                        border: "1px solid var(--main-color)",
                        borderRadius: "4px",
                        cursor: "pointer",
                      }}
                      onClick={() => openModal(complaint._id)}
                      onMouseOver={(e) => {
                        e.target.style.backgroundColor = "var(--main-color)";
                      }}
                      onMouseOut={(e) => {
                        e.target.style.backgroundColor = "transparent";
                      }}
                    >
                      View Details
                    </button>

                    {complaint.status === "pending" && (
                      <button
                        style={{
                          padding: "10px 15px",
                          backgroundColor: "var(--main-color)",
                          color: "#fff",
                          border: "none",
                          borderRadius: "4px",
                          cursor: "pointer",
                        }}
                        onClick={() => handleResolveComplaint(complaint._id)}
                        onMouseOver={(e) => {
                          e.target.style.backgroundColor =
                            "var(--main-color-hover)";
                          e.target.style.color = "#fff";
                        }}
                        onMouseOut={(e) => {
                          e.target.style.backgroundColor = "var(--main-color)";
                          e.target.style.color = "var(--text-color)";
                        }}
                      >
                        Resolve
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {modalOpen && selectedComplaint && (
        <ComplaintModal
          isOpen={modalOpen}
          onClose={closeModal}
          description={selectedComplaint.body}
          isReplied={selectedComplaint.isReplied}
          reply={selectedComplaint.reply || ""}
          complaintId={selectedComplaint._id}
        />
      )}
      <Toaster position="bottom-center" reverseOrder={false} />
    </section>
  );
};

export default ComplaintsArea;
