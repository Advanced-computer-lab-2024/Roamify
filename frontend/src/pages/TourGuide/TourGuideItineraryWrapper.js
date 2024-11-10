import React, { useEffect, useState } from "react";
import axios from "axios";
import SectionHeading from "../../component/Common/SectionHeading";
import toast, { Toaster } from "react-hot-toast";

const TourGuideItineraryWrapper = () => {
  const [itineraries, setItineraries] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchItineraries = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3000/api/tourGuide/get-my-itineraries",
          {
            withCredentials: true,
          }
        );
        setItineraries(response.data.itineraries);
        setLoading(false);
        toast.success("Itineraries loaded successfully!");
      } catch (error) {
        console.error("Error fetching itineraries:", error);
        setLoading(true);
        toast.error("Failed to load itineraries.");
      }
    };
    fetchItineraries();
  }, []);

  const handleToggleStatus = async (itinerary) => {
    const newStatus = itinerary.status === "active" ? "inactive" : "active";
    try {
      await axios.put(
        "http://localhost:3000/api/tourguide/set-status-itinerary",
        {
          itineraryId: itinerary._id,
          status: newStatus,
        },
        { withCredentials: true }
      );

      // Update the status in the local state
      setItineraries((prevItineraries) =>
        prevItineraries.map((item) =>
          item._id === itinerary._id ? { ...item, status: newStatus } : item
        )
      );
      toast.success(
        `Itinerary ${
          newStatus === "active" ? "activated" : "deactivated"
        } successfully!`
      );
    } catch (error) {
      console.error("Error updating itinerary status:", error);
      toast.error("Failed to update itinerary status.");
    }
  };

  return (
    <>
      <Toaster position="top-right" reverseOrder={false} />
      <section id="explore_area" className="section_padding">
        <div className="container">
          <SectionHeading heading={`${itineraries.length} tours found`} />
          <div className="row">
            <div className="col-lg-9">
              <div className="row">
                <div className="col-lg-12">
                  <div className="flight_search_result_wrapper">
                    {loading ? (
                      <p>Loading itineraries...</p>
                    ) : (
                      itineraries.map((itinerary, index) => (
                        <div
                          className="flight_search_item_wrappper"
                          key={itinerary._id}
                        >
                          <div className="flight_search_items">
                            <div className="multi_city_flight_lists">
                              <div className="flight_multis_area_wrapper">
                                <div className="flight_search_left">
                                  <div className="flight_search_destination">
                                    <h1>{itinerary.name}</h1>
                                  </div>
                                </div>
                                <div className="flight_search_middel">
                                  <div className="flight_right_arrow">
                                    <h6>{itinerary.activities[0]?.name}</h6>
                                    <p>
                                      {itinerary.activities[0]?.location?.name}
                                    </p>
                                  </div>
                                  <div className="flight_search_destination">
                                    <p>Tour Guide</p>
                                    <h3>{itinerary.tourGuide.username}</h3>
                                    <h6>{itinerary.tourGuide.email}</h6>
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div className="flight_search_right">
                              <h2>
                                ${itinerary.price}
                                <sup>Special offer</sup>
                              </h2>
                              <button
                                onClick={() => handleToggleStatus(itinerary)}
                                className="btn btn_theme btn_sm"
                              >
                                {itinerary.status === "active"
                                  ? "Deactivate"
                                  : "Activate"}
                              </button>
                              <p>*Conditions apply</p>
                              <div
                                data-bs-toggle="collapse"
                                data-bs-target={`#collapseExample${index}`}
                                aria-expanded="false"
                                aria-controls={`collapseExample${index}`}
                              >
                                Show more{" "}
                                <i className="fas fa-chevron-down"></i>
                              </div>
                            </div>
                          </div>
                          <div
                            className="flight_policy_refund collapse"
                            id={`collapseExample${index}`}
                          >
                            {/* Additional details here */}
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                  <div className="load_more_flight">
                    <button className="btn btn_md">
                      <i className="fas fa-spinner"></i> Load more..
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default TourGuideItineraryWrapper;
