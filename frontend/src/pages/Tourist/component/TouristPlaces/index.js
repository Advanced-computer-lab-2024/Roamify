import React from "react";
// import Section Heading
import SectionHeading from "../../../../component/Common/SectionHeading";
// import Sidebar
import SideBar from "./SideBar";
// import Data
import { places } from "./data";
// import Link
import { Link } from "react-router-dom";

const TouristPlacesArea = () => {
  return (
    <>
      {/* <!-- Form Area --> */}
      {/* <section id="theme_search_form_tour">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="theme_search_form_area">
                <div className="row">
                  <div className="col-lg-12">
                    <div className="tour_search_form">
                      <form action="#!">
                        <div className="row">
                          <div className="col-lg-6 col-md-12 col-sm-12 col-12">
                            <div className="flight_Search_boxed">
                              <p>Destination</p>
                              <input
                                type="text"
                                placeholder="Where are you going?"
                              />
                              <span>Where are you going?</span>
                            </div>
                          </div>
                          <div className="col-lg-4 col-md-6 col-sm-12 col-12">
                            <div className="form_search_date">
                              <div className="flight_Search_boxed date_flex_area">
                                <div className="Journey_date">
                                  <p>Journey date</p>
                                  <input type="date" />
                                  <span>Thursday</span>
                                </div>
                                <div className="Journey_date">
                                  <p>Return date</p>
                                  <input type="date" />
                                  <span>Thursday</span>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="col-lg-2  col-md-6 col-sm-12 col-12">
                            <div className="flight_Search_boxed dropdown_passenger_area">
                              <p>Passenger, className </p>
                              <div className="dropdown">
                                <button
                                  className="dropdown-toggle final-count"
                                  data-toggle="dropdown"
                                  type="button"
                                  id="dropdownMenuButton1"
                                  data-bs-toggle="dropdown"
                                  aria-expanded="false"
                                >
                                  0 Passenger
                                </button>
                                <div
                                  className="dropdown-menu dropdown_passenger_info"
                                  aria-labelledby="dropdownMenuButton1"
                                >
                                  <div className="traveller-calulate-persons">
                                    <div className="passengers">
                                      <h6>Passengers</h6>
                                      <div className="passengers-types">
                                        <div className="passengers-type">
                                          <div className="text">
                                            <span className="count pcount">
                                              2
                                            </span>
                                            <div className="type-label">
                                              <p>Adult</p>
                                              <span>12+ yrs</span>
                                            </div>
                                          </div>
                                          <div className="button-set">
                                            <button
                                              type="button"
                                              className="btn-add"
                                            >
                                              <i className="fas fa-plus"></i>
                                            </button>
                                            <button
                                              type="button"
                                              className="btn-subtract"
                                            >
                                              <i className="fas fa-minus"></i>
                                            </button>
                                          </div>
                                        </div>
                                        <div className="passengers-type">
                                          <div className="text">
                                            <span className="count ccount">
                                              0
                                            </span>
                                            <div className="type-label">
                                              <p className="fz14 mb-xs-0">
                                                Children
                                              </p>
                                              <span>2 - Less than 12 yrs</span>
                                            </div>
                                          </div>
                                          <div className="button-set">
                                            <button
                                              type="button"
                                              className="btn-add-c"
                                            >
                                              <i className="fas fa-plus"></i>
                                            </button>
                                            <button
                                              type="button"
                                              className="btn-subtract-c"
                                            >
                                              <i className="fas fa-minus"></i>
                                            </button>
                                          </div>
                                        </div>
                                        <div className="passengers-type">
                                          <div className="text">
                                            <span className="count incount">
                                              0
                                            </span>
                                            <div className="type-label">
                                              <p className="fz14 mb-xs-0">
                                                Infant
                                              </p>
                                              <span>Less than 2 yrs</span>
                                            </div>
                                          </div>
                                          <div className="button-set">
                                            <button
                                              type="button"
                                              className="btn-add-in"
                                            >
                                              <i className="fas fa-plus"></i>
                                            </button>
                                            <button
                                              type="button"
                                              className="btn-subtract-in"
                                            >
                                              <i className="fas fa-minus"></i>
                                            </button>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                              <span>Business</span>
                            </div>
                          </div>
                          <div className="top_form_search_button">
                            <button className="btn btn_theme btn_md">
                              Search
                            </button>
                          </div>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section> */}

      {/* <!-- Destinations Areas --> */}
      <section id="top_testinations" className="section_padding">
        <div className="container">
          {/* <!-- Section Heading --> */}
          <SectionHeading heading="19 destinations found" />
          <div className="row">
            <div className="col-lg-3">
              <SideBar />
            </div>
            <div className="col-lg-9">
              <div className="row">
                {places.map((data, index) => (
                  <div
                    className="col-lg-4 col-md-6 col-sm-6 col-12"
                    key={index}
                  >
                    <div className="top_destinations_box img_hover">
                      <div className="heart_destinations">
                        <i className="fas fa-heart"></i>
                      </div>
                      <Link to="/destinations-details">
                        <img
                          src={
                            "https://img.freepik.com/free-vector/flat-illustration-international-friendship-day-celebration_23-2150463971.jpg?t=st=1730318239~exp=1730321839~hmac=3e20245a98fe127802e60ac14b908ef3e8053d615192beb007ff8fd46d0a81fe&w=996"
                          }
                          alt="img"
                        />
                      </Link>
                      <div className="top_destinations_box_content">
                        <h4>
                          <Link to="/destinations-details">{data.name}</Link>
                        </h4>
                        <p>
                          <span className="review_rating">
                            {data.reviewRating}
                          </span>{" "}
                          <span className="review_count">
                            {data.reviewCount}
                          </span>
                        </p>
                        <h3>
                          {data.price}
                          <span>Price starts from</span>
                        </h3>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default TouristPlacesArea;
