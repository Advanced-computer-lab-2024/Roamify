import React, { useState } from "react";
import ItineraryList from "./ItineraryList";

const ItineraryArea = () => {
  const [activeTab, setActiveTab] = useState("view");

  return (
    <>
      <section id="theme_search_form_tour">
        <div className="container">
          {/* <div className="row">
            <div className="col-lg-12">
              <div className="theme_search_form_area">
                <div className="theme_search_form_tabbtn">
                  <ul className="nav nav-tabs" role="tablist">
                    <li className="nav-item" role="presentation">
                      <button
                        className={`nav-link ${
                          activeTab === "view" ? "active" : ""
                        }`}
                        id="view-tab"
                        data-bs-toggle="tab"
                        data-bs-target="#view"
                        type="button"
                        role="tab"
                        aria-controls="view"
                        aria-selected={activeTab === "view"}
                        onClick={() => setActiveTab("view")}
                      >
                        <i className="fas fa-globe"></i>View Itineraries
                      </button>
                    </li>
                    <li className="nav-item" role="presentation">
                      <button
                        className={`nav-link ${
                          activeTab === "create" ? "active" : ""
                        }`}
                        id="create-tab"
                        data-bs-toggle="tab"
                        data-bs-target="#create"
                        type="button"
                        role="tab"
                        aria-controls="create"
                        aria-selected={activeTab === "create"}
                        onClick={() => setActiveTab("create")}
                      >
                        <i className="fas fa-globe"></i>Create Itinerary
                      </button>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div> */}

          {/* Conditionally render TourGuideItineraryWrapper when "View Itineraries" is selected */}

          <div className="row">
            <div className="col-lg-12">
              <ItineraryList />
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default ItineraryArea;
