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
import LoadingLogo from "../../../../component/LoadingLogo";
import EmptyResponseLogo from "../../../../component/EmptyResponseLogo";
import ProfileIcon from "../../../../component/Icons/ProfileIcon";

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
      
      <CommonBanner heading="Rate Tour Guide" pagination="tourguide" />
      <section id="explore_area" className="section_padding">
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
                <p>{error}</p>
              ) : (
                <div className="flight_search_result_wrapper">
                  {itineraries.length > 0 ? (
                    itineraries.map((itinerary, index) => (
                      <div
                        className="flight_search_item_wrapper"
                        key={itinerary.tourGuideId}
                      >
                        <div className="flight_search_items">
                          <h3 className="itinerary-name">
                            {itinerary.tourGuideName}
                          </h3>
                          <div className="itinerary-section">
                            <p>
                              <strong>Name:</strong> {itinerary.tourGuideName}
                            </p>
                          </div>
                          <div className="booking-section">
                            <button
                              onClick={() =>
                                setSelectedTourGuideId(itinerary.tourGuideId)
                              } // Set the selected tour guide ID
                              className="btn btn_theme btn_sm"
                            >
                              Review
                            </button>
                          </div>
                        </div>
                      </div>
                    ))
                  ) : (
                    <EmptyResponseLogo
                      isVisible={true}
                      size="300px"
                      text={error}
                    />
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {selectedTourGuideId && (
        <div className="popup-container">
          <div className="popup-content">
            <button
              onClick={() => setSelectedTourGuideId(null)}
              className="close-button"
            >
              &times;
            </button>
            <ReviewArea tourGuideId={selectedTourGuideId} />
          </div>
        </div>
      )}
    </>
  );
};

export default ReviewTourGuide;
