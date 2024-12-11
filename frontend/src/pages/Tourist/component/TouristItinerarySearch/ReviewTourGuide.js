import React, { useEffect, useState } from "react";
import axios from "axios";
import SectionHeading from "../../../../component/Common/SectionHeading";
import { useNavigate } from "react-router-dom";

const styles = {
  exploreArea: {
    padding: '20px 0',
    backgroundColor: '#f4f4f4'
  },
  container: {
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '0 15px'
  },
  flightSearchResultWrapper: {
    backgroundColor: '#ffffff',
    border: '1px solid #dddddd',
    borderRadius: '8px',
    padding: '15px',
    marginBottom: '20px'
  },
  flightSearchItemWrapper: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '10px',
    borderBottom: '1px solid #eeeeee'
  },
  itineraryName: {
    fontSize: '16px',
    color: '#333',
    fontWeight: 'bold',
    marginRight: '10px'
  },
  text: {
    fontSize: '16px',
    color: '#333',
    margin: 0,
    display: 'flex',
    alignItems: 'center'
  },
  btnTheme: {
    fontSize: '16px',
    backgroundColor: '#6200ea',
    color: '#ffffff',
    border: 'none',
    borderRadius: '4px',
    padding: '8px 16px',
    cursor: 'pointer',
    transition: 'background-color 0.3s ease'
  },
  popupContainer: {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1000
  },
  popupContent: {
    backgroundColor: '#fff',
    padding: '20px',
    borderRadius: '8px',
    boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
    width: '90%',
    maxWidth: '500px'
  },
  closeButton: {
    fontSize: '24px',
    lineHeight: '24px',
    width: '24px',
    height: '24px',
    textAlign: 'center',
    border: 'none',
    background: 'none',
    cursor: 'pointer',
    position: 'absolute',
    right: '10px',
    top: '10px'
  }
};

const ReviewTourGuide = () => {
  const [itineraries, setItineraries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedTourGuideId, setSelectedTourGuideId] = useState(null);

  const navigate = useNavigate();

  const fetchItineraries = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get(
        "http://localhost:3000/api/tourist/tour-guide/unrated",
        { withCredentials: true }
      );
      setItineraries(response.data.tourGuides || []);
    } catch (error) {
      setItineraries([]);
      setError(error.response.data.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchItineraries();
  }, []);

  return (
    <>
      <section id="explore_area" style={styles.exploreArea}>
        <div style={styles.container}>
          <SectionHeading
            heading={`${itineraries?.length || 0} itineraries found`}
          />
          <div className="row">
            <div className="col-lg-9">
              {loading ? (
                <p>Loading tourguides...</p>
              ) : error ? (
                <p>{error}</p>
              ) : (
                <div style={styles.flightSearchResultWrapper}>
                  {itineraries.length > 0 ? (
                    itineraries.map((itinerary) => (
                      <div
                        style={styles.flightSearchItemWrapper}
                        key={itinerary.tourGuideId}
                      >
                        <div style={{ display: 'flex', alignItems: 'center' }}>
                          <h3 style={styles.itineraryName}>
                            {itinerary.tourGuideName}
                          </h3>
                          <p style={styles.text}>
                            <strong>Name:</strong> {itinerary.tourGuideName}
                          </p>
                        </div>
                        <button
                          onClick={() =>
                            setSelectedTourGuideId(itinerary.tourGuideId)
                          }
                          style={styles.btnTheme}
                        >
                          Review
                        </button>
                      </div>
                    ))
                  ) : (
                    <p>No tour guides available.</p>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {selectedTourGuideId && (
        <div style={styles.popupContainer}>
          <div style={styles.popupContent}>
            <button
              onClick={() => setSelectedTourGuideId(null)}
              style={styles.closeButton}
            >
              &times;
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default ReviewTourGuide;
