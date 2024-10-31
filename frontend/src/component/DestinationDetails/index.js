import React from "react";
// import Sidebar
import Sidebar from "./Sidebar";
import ReviewArea from "./ReviewArea";
// Import img
import Img from "../../assets/img/tour/big-img.png"


const DestinationDetailsArea = () => {
  return (
    <>
      <section id="top_destination_main" className="section_padding">
        <div className="container">
          <div className="row">
            <div className="col-lg-8">
              <div className="tour_details_leftside_wrapper">
                <div className="tour_details_heading_wrapper">
                  <div className="tour_details_top_heading">
                    <h2>Explore the evergreen forest</h2>
                    <h5>
                      <i className="fas fa-map-marker-alt"></i> Amazon evergreen
                      forest, Amazon.
                    </h5>
                  </div>
                  <div className="tour_details_top_heading_right">
                    <h4>Excellent</h4>
                    <h6>4.8/5</h6>
                    <p>(1214 reviewes)</p>
                  </div>
                </div>
                <div className="tour_details_top_bottom">
                  <div className="toru_details_top_bottom_item">
                    <div className="tour_details_top_bottom_icon">
                      <i className="fas fa-clock"></i>
                    </div>
                    <div className="tour_details_top_bottom_text">
                      <h5>Duration</h5>
                      <p>10 days</p>
                    </div>
                  </div>
                  <div className="toru_details_top_bottom_item">
                    <div className="tour_details_top_bottom_icon">
                      <i className="fas fa-paw"></i>
                    </div>
                    <div className="tour_details_top_bottom_text">
                      <h5>Tour type</h5>
                      <p>Group tour</p>
                    </div>
                  </div>
                  <div className="toru_details_top_bottom_item">
                    <div className="tour_details_top_bottom_icon">
                      <i className="fas fa-users"></i>
                    </div>
                    <div className="tour_details_top_bottom_text">
                      <h5>Group size</h5>
                      <p>50 people</p>
                    </div>
                  </div>
                  <div className="toru_details_top_bottom_item">
                    <div className="tour_details_top_bottom_icon">
                      <i className="fas fa-map-marked"></i>
                    </div>
                    <div className="tour_details_top_bottom_text">
                      <h5>Location</h5>
                      <p>Amazon rain forest</p>
                    </div>
                  </div>
                </div>
                <div className="tour_details_img_wrapper">
                  <div className="tour_react_big">
                    <img src={Img} alt="img" />
                  </div>
                </div>
                <div className="tour_details_boxed">
                  <h3 className="heading_theme">Overview</h3>
                  <div className="tour_details_boxed_inner">
                    <p>
                      Lorem ipsum dolor sit amet, consetetur sadipscing elitr,
                      sed diam nonumy eirmod tempor invidunt ut labore et dolore
                      magna aliquyam erat, sed diam voluptua. At vero eos et
                      accusam et justo duo dolores et ea rebum. Stet clita kasd
                      gubergren, no sea takimata sanctus est.
                    </p>
                    <p>
                      Stet clita kasd gubergren, no sea takimata sanctus est
                      Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet,
                      consetetur sadipscing elitr, sed diam nonumy eirmod.
                    </p>
                    <ul>
                      <li>
                        <i className="fas fa-circle"></i>Buffet breakfast as per
                        the Itinerary
                      </li>
                      <li>
                        <i className="fas fa-circle"></i>Visit eight villages
                        showcasing Polynesian culture
                      </li>
                      <li>
                        <i className="fas fa-circle"></i>Complimentary Camel
                        safari, Bonfire, and Cultural Dance at Camp
                      </li>
                      <li>
                        <i className="fas fa-circle"></i>All toll tax, parking,
                        fuel, and driver allowances
                      </li>
                      <li>
                        <i className="fas fa-circle"></i>Comfortable and
                        hygienic vehicle (SUV/Sedan) for sightseeing on all days
                        as per the itinerary.
                      </li>
                    </ul>
                  </div>
                </div>
                <div className="tour_details_boxed">
                  <h3 className="heading_theme">Itinerary</h3>
                  <div className="tour_details_boxed_inner">
                    <div className="accordion" id="accordionExample">
                      <div className="accordion_flex_area">
                        <div className="accordion_left_side">
                          <h5>Day 1</h5>
                        </div>
                        <div className="accordion-item">
                          <h2 className="accordion-header" id="headingOne">
                            <button
                              className="accordion-button"
                              type="button"
                              data-bs-toggle="collapse"
                              data-bs-target="#collapseOne"
                              aria-expanded="true"
                              aria-controls="collapseOne"
                            >
                              Stet clita kasd gubergren, no sea takimata sanctus
                              est
                            </button>
                          </h2>
                          <div
                            id="collapseOne"
                            className="accordion-collapse collapse show"
                            aria-labelledby="headingOne"
                            data-bs-parent="#accordionExample"
                          >
                            <div className="accordion-body">
                              <div className="accordion_itinerary_list">
                                <ul>
                                  <li>
                                    <i className="fas fa-circle"></i>
                                    There are many variations of passages of
                                    Lorem Ipsum available, but the majority have
                                    suffered alteration in some form
                                  </li>
                                  <li>
                                    <i className="fas fa-circle"></i>
                                    Contrary to popular belief, Lorem Ipsum is
                                    not simply random
                                  </li>
                                  <li>
                                    <i className="fas fa-circle"></i>
                                    Many desktop publishing packages and web
                                    page editors now use
                                  </li>
                                  <li>
                                    <i className="fas fa-circle"></i>
                                    Lorem Ipsum is that it has a more-or-less
                                    normal distribution of letters, to using
                                    'Content here
                                  </li>
                                  <li>
                                    <i className="fas fa-circle"></i>
                                    The standard chunk of Lorem Ipsum used since
                                    the 1500s is reproduced below for those
                                    interested.
                                  </li>
                                </ul>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="accordion_flex_area">
                        <div className="accordion_left_side">
                          <h5>Day 2</h5>
                        </div>
                        <div className="accordion-item">
                          <h2 className="accordion-header" id="headingTwo">
                            <button
                              className="accordion-button collapsed"
                              type="button"
                              data-bs-toggle="collapse"
                              data-bs-target="#collapseTwo"
                              aria-expanded="false"
                              aria-controls="collapseTwo"
                            >
                              Stet clita kasd gubergren, no sea takimata sanctus
                              est
                            </button>
                          </h2>
                          <div
                            id="collapseTwo"
                            className="accordion-collapse collapse"
                            aria-labelledby="headingTwo"
                            data-bs-parent="#accordionExample"
                          >
                            <div className="accordion-body">
                              <div className="accordion_itinerary_list">
                                <ul>
                                  <li>
                                    <i className="fas fa-circle"></i>
                                    There are many variations of passages of
                                    Lorem Ipsum available, but the majority have
                                    suffered alteration in some form
                                  </li>
                                  <li>
                                    <i className="fas fa-circle"></i>
                                    Lorem Ipsum is that it has a more-or-less
                                    normal distribution of letters, to using
                                    'Content here
                                  </li>
                                  <li>
                                    <i className="fas fa-circle"></i>
                                    The standard chunk of Lorem Ipsum used since
                                    the 1500s is reproduced below for those
                                    interested.
                                  </li>
                                </ul>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="accordion_flex_area">
                        <div className="accordion_left_side">
                          <h5>Day 3</h5>
                        </div>
                        <div className="accordion-item">
                          <h2 className="accordion-header" id="headingThree">
                            <button
                              className="accordion-button collapsed"
                              type="button"
                              data-bs-toggle="collapse"
                              data-bs-target="#collapseThree"
                              aria-expanded="false"
                              aria-controls="collapseThree"
                            >
                              Stet clita kasd gubergren, no sea takimata sanctus
                              est
                            </button>
                          </h2>
                          <div
                            id="collapseThree"
                            className="accordion-collapse collapse"
                            aria-labelledby="headingThree"
                            data-bs-parent="#accordionExample"
                          >
                            <div className="accordion-body">
                              <div className="accordion_itinerary_list">
                                <ul>
                                  <li>
                                    <i className="fas fa-circle"></i>
                                    Contrary to popular belief, Lorem Ipsum is
                                    not simply random
                                  </li>
                                  <li>
                                    <i className="fas fa-circle"></i>
                                    Many desktop publishing packages and web
                                    page editors now use
                                  </li>
                                  <li>
                                    <i className="fas fa-circle"></i>
                                    Lorem Ipsum is that it has a more-or-less
                                    normal distribution of letters, to using
                                    'Content here
                                  </li>
                                  <li>
                                    <i className="fas fa-circle"></i>
                                    The standard chunk of Lorem Ipsum used since
                                    the 1500s is reproduced below for those
                                    interested.
                                  </li>
                                </ul>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="accordion_flex_area">
                        <div className="accordion_left_side">
                          <h5>Day 4</h5>
                        </div>
                        <div className="accordion-item">
                          <h2 className="accordion-header" id="headingFour">
                            <button
                              className="accordion-button collapsed"
                              type="button"
                              data-bs-toggle="collapse"
                              data-bs-target="#collapseFour"
                              aria-expanded="false"
                              aria-controls="collapseFour"
                            >
                              Stet clita kasd gubergren, no sea takimata sanctus
                              est
                            </button>
                          </h2>
                          <div
                            id="collapseFour"
                            className="accordion-collapse collapse"
                            aria-labelledby="headingFour"
                            data-bs-parent="#accordionExample"
                          >
                            <div className="accordion-body">
                              <div className="accordion_itinerary_list">
                                <ul>
                                  <li>
                                    <i className="fas fa-circle"></i>
                                    There are many variations of passages of
                                    Lorem Ipsum available, but the majority have
                                    suffered alteration in some form
                                  </li>
                                  <li>
                                    <i className="fas fa-circle"></i>
                                    Contrary to popular belief, Lorem Ipsum is
                                    not simply random
                                  </li>
                                  <li>
                                    <i className="fas fa-circle"></i>
                                    Many desktop publishing packages and web
                                    page editors now use
                                  </li>
                                  <li>
                                    <i className="fas fa-circle"></i>
                                    The standard chunk of Lorem Ipsum used since
                                    the 1500s is reproduced below for those
                                    interested.
                                  </li>
                                </ul>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="tour_details_boxed">
                  <h3 className="heading_theme">Included/Excluded</h3>
                  <div className="tour_details_boxed_inner">
                    <p>
                      Stet clitaStet clita kasd gubergren, no sea takimata
                      sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor
                      sit amet, consetetur sadipscing elitr, sed diam nonumy
                      eirmod.
                    </p>
                    <ul>
                      <li>
                        <i className="fas fa-circle"></i>Buffet breakfast as per
                        the Itinerary
                      </li>
                      <li>
                        <i className="fas fa-circle"></i>Visit eight villages
                        showcasing Polynesian culture
                      </li>
                      <li>
                        <i className="fas fa-circle"></i>Complimentary Camel
                        safari, Bonfire, and Cultural Dance at Camp
                      </li>
                      <li>
                        <i className="fas fa-circle"></i>All toll tax, parking,
                        fuel, and driver allowances
                      </li>
                      <li>
                        <i className="fas fa-circle"></i>Comfortable and
                        hygienic vehicle (SUV/Sedan) for sightseeing on all days
                        as per the itinerary.
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-4">
              <Sidebar />
            </div>
          </div>
        </div>
        <ReviewArea />
      </section>
    </>
  );
};

export default DestinationDetailsArea;
