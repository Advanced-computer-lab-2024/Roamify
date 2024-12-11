import React, { useEffect, useState } from "react";
import axios from "axios";
import SectionHeading from "../../../../component/Common/SectionHeading";
import { useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast"; // Import toast for notifications
import LoadingLogo from "../../../../component/LoadingLogo";
import EmptyResponseLogo from "../../../../component/EmptyResponseLogo";
import ProfileIcon from "../../../../component/Icons/ProfileIcon";
import ReviewArea from "./TourGuideReviewArea";

const ReviewTourGuide = () => {
  const [itineraries, setItineraries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedTourGuideId, setSelectedTourGuideId] = useState(null); // State to track the selected tour guide for review

  const fetchItineraries = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get(
        "http://localhost:3000/api/tourist/tour-guide/unrated",
        {
          withCredentials: true,
        }
      );
      setItineraries(response.data.tourGuides || []);
    } catch (error) {
      setItineraries([]);
      setError(error.response.data.message || "Failed to fetch tour guides.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchItineraries();
  }, []);

  return (
    <>
      <section
        id="explore_area"
        className="section_padding"
        style={{ minHeight: "100vh" }}
      >
        <div className="container">
          <SectionHeading
            heading={`${itineraries?.length || 0} tour guides found`}
          />
          <div
            className="row"
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <div className="col-lg-9">
              {loading ? (
                <LoadingLogo isVisible={true} size="100px" />
              ) : error ? (
                <EmptyResponseLogo text={error} isVisible={true} size="200px" />
              ) : (
                <div className="row">
                  {itineraries.length > 0 ? (
                    itineraries.map((itinerary, index) => (
                      <div
                        className="col-md-4"
                        style={{ marginTop: index > 2 ? "25px" : "0px" }}
                        key={index}
                      >
                        <div
                          className="card"
                          style={{
                            borderRadius: "8px",
                            padding: "20px",
                            border: "none",
                            boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)", // Initial shadow
                            transition:
                              "transform 0.3s ease, box-shadow 0.3s ease", // Smooth transition
                            height: "40vh",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            background: "var(--secondary-color)",
                          }}
                          onMouseEnter={(e) => {
                            e.currentTarget.style.transform = "scale(1.05)"; // Enlarge
                            e.currentTarget.style.boxShadow =
                              "0px 8px 16px rgba(0, 0, 0, 0.2)"; // Stronger shadow
                          }}
                          onMouseLeave={(e) => {
                            e.currentTarget.style.transform = "scale(1)"; // Reset size
                            e.currentTarget.style.boxShadow =
                              "0px 4px 8px rgba(0, 0, 0, 0.1)"; // Reset shadow
                          }}
                        >
                          <div
                            className=""
                            style={{
                              display: "flex",
                              flexDirection: "column",
                              alignItems: "center",
                              justifyContent: "center",
                              width: "100%",
                              height: "100%",
                            }}
                          >
                            <div
                              style={{
                                flex: 5,
                                display: "flex",
                                alignItems: "center",
                              }}
                            >
                              <ProfileIcon
                                height="80px"
                                width="80px"
                                fill="var(--text-color)"
                              />
                            </div>
                            <div
                              style={{
                                display: "flex",
                                flexDirection: "column",
                                alignItems: "center",
                                justifyContent: "center",
                                width: "100%",
                                flex: 3,
                              }}
                            >
                              <p style={{ marginBottom: "20px" }}>
                                {itinerary.tourGuideName}
                              </p>

                              <button
                                onClick={() =>
                                  setSelectedTourGuideId(itinerary.tourGuideId)
                                } // Set the selected tour guide ID
                                className="btn btn_theme btn_sm"
                                style={{
                                  borderRadius: "8px",
                                  width: "100%",
                                  flex: 1,
                                  fontSize: "20px",
                                }}
                              >
                                Review
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))
                  ) : (
                    <EmptyResponseLogo
                      isVisible={true}
                      size="300px"
                      text="No tour guides available for review."
                    />
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Conditionally render the ReviewArea component as a pop-up */}
      {selectedTourGuideId && (
        <ReviewArea
          fetchTourGuides={fetchItineraries}
          tourGuideId={selectedTourGuideId}
          closeModal={() => setSelectedTourGuideId(null)}
        />
      )}
      <Toaster position="bottom-center" reverseOrder={false} />
    </>
  );
};

export default ReviewTourGuide;
