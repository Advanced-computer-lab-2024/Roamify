import React, { useState, useEffect } from 'react';
import TouristCategoryActivity from './TouristCategoryActivities.js';
import axios from 'axios';
import TouristActivitiesArea from './index.js';

const TouristActivitiesForm = () => {
  const [activeTab, setActiveTab] = useState("view");
  const [categories, setCategories] = useState([]);
  
  // Fetch categories from the API
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get("http://localhost:3000/api/category/get-all");
        if (response.data.categories) {
          setCategories(response.data.categories);
          setActiveTab(response.data.categories[0]._id); // Set the first category as active by default
        }
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchCategories();
  }, []);

  return (
    <section id="theme_search_form_tour">
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <div className="theme_search_form_area">
              <div className="theme_search_form_tabbtn">
                <ul className="nav nav-tabs" role="tablist">
                <li className="nav-item" role="presentation">
                                            <button
                                                className={`nav-link ${activeTab === "view" ? "active" : ""}`}
                                                id="view-tab"
                                                data-bs-toggle="tab"
                                                data-bs-target="#view"
                                                type="button"
                                                role="tab"
                                                aria-controls="view"
                                                aria-selected={activeTab === "view"}
                                                onClick={() => setActiveTab("view")}
                                            >
                                                <i className="fas fa-globe"></i>View Activities
                                            </button>
                                        </li>
                  {categories.map((category) => (
                    <li className="nav-item" role="presentation" key={category._id}>
                      <button
                        className={`nav-link ${activeTab === category._id ? "active" : ""}`}
                        id={`${category.name}-tab`}
                        data-bs-toggle="tab"
                        data-bs-target={`#${category.name}`}
                        type="button"
                        role="tab"
                        aria-controls={category.name}
                        aria-selected={activeTab === category._id}
                        onClick={() => setActiveTab(category._id)} // Set the active tab on click
                      >
                        <i className="fas fa-globe"></i>{category.name.charAt(0).toUpperCase() + category.name.slice(1)}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>

        <div className="row">
          <div className="col-lg-12">
          {activeTab === "view" && (
                        <div className="row">
                            <div className="col-lg-12">
                                <TouristActivitiesArea />
                            </div>
                        </div>
                    )}
            {/* Dynamically render activity content based on active category */}
            {activeTab && (
              <div className="tab-content">
                {categories.map((category) => (
                  <div
                    key={category._id}
                    className={`tab-pane fade ${activeTab === category._id ? "show active" : ""}`}
                    id={category.name}
                    role="tabpanel"
                    aria-labelledby={`${category.name}-tab`}
                  >
                    <TouristCategoryActivity categoryId={category._id} />
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

export default TouristActivitiesForm;
