import React from "react";
// import SectionHeading
import SectionHeading from "../Common/SectionHeading";
// import Sidebar
import SideBar from "./SideBar";
// import Flight Data
import { FlightData } from "./FlightData";
// import Link
import { Link } from "react-router-dom";

const FlightSearchWrapper = () => {
  return (
    <>
      <section id="explore_area" className="section_padding">
        <div className="container">
          <SectionHeading heading="42 tours found" />
          <div className="row">
            <div className="col-lg-3">
              <SideBar />
            </div>
            <div className="col-lg-9">
              <div className="row">
                <div className="col-lg-12">
                  <div className="flight_search_result_wrapper">
                    {FlightData.map((data, index) => (
                      <div className="flight_search_item_wrappper" key={index}>
                        <div className="flight_search_items">
                          <div className="multi_city_flight_lists">
                            <div className="flight_multis_area_wrapper">
                              <div className="flight_search_left">
                                <div className="flight_logo">
                                  <img src={data.img} alt="img" />
                                </div>
                                <div className="flight_search_destination">
                                  <p>From</p>
                                  <h3>{data.from}</h3>
                                  <h6>{data.airport}</h6>
                                </div>
                              </div>
                              <div className="flight_search_middel">
                                <div className="flight_right_arrow">
                                  <img src={data.flightIcon} alt="icon" />
                                  <h6>Non-stop</h6>
                                  <p>01h 05minute </p>
                                </div>
                                <div className="flight_search_destination">
                                  <p>To</p>
                                  <h3>{data.to} </h3>
                                  <h6>{data.toAirport}</h6>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="flight_search_right">
                            <h5>
                              <del>{data.desPrice}</del>
                            </h5>
                            <h2>
                              {data.realPrice}
                              <sup>{data.offer}</sup>
                            </h2>
                            <Link
                              to="/tour-booking"
                              className="btn btn_theme btn_sm"
                            >
                              Book now
                            </Link>
                            <p>*Discount applicable on some conditions</p>
                            <div
                              data-bs-toggle="collapse"
                              data-bs-target={"#collapseExample" + index}
                              aria-expanded="false"
                              aria-controls={"collapseExample" + index}
                            >
                              Show more <i className="fas fa-chevron-down"></i>
                            </div>
                          </div>
                        </div>
                        <div
                          className="flight_policy_refund collapse"
                          id={"collapseExample" + index}
                        >
                          <div className="flight_show_down_wrapper">
                            <div className="flight-shoe_dow_item">
                              <div className="airline-details">
                                <div className="img">
                                  <img src={data.flightIcon2} alt="img" />
                                </div>
                                <span className="airlineName fw-500">
                                  Biman Bangladesh Airlines &nbsp; BG435
                                </span>
                                <span className="flightNumber">
                                  BOEING 737-800 - 738
                                </span>
                              </div>
                              <div className="flight_inner_show_component">
                                <div className="flight_det_wrapper">
                                  <div className="flight_det">
                                    <div className="code_time">
                                      <span className="code">DAC</span>
                                      <span className="time">15:00</span>
                                    </div>
                                    <p className="airport">
                                      Hazrat Shahjalal International Airport
                                    </p>
                                    <p className="date">7th Jun 2022</p>
                                  </div>
                                </div>
                                <div className="flight_duration">
                                  <div className="arrow_right"></div>
                                  <span>01h 15m</span>
                                </div>
                                <div className="flight_det_wrapper">
                                  <div className="flight_det">
                                    <div className="code_time">
                                      <span className="code">DAC</span>
                                      <span className="time">15:00</span>
                                    </div>
                                    <p className="airport">
                                      Hazrat Shahjalal International Airport
                                    </p>
                                    <p className="date">7th Jun 2022</p>
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div className="flight_refund_policy">
                              <div className="TabPanelInner flex_widht_less">
                                <h4>Refund Policy</h4>
                                <p className="fz12">
                                  1. Refund and Date Change are done as per the
                                  following policies.
                                </p>
                                <p className="fz12">
                                  2. Refund Amount= Refund Charge (as per
                                  airline policy + ShareTrip Convenience Fee).{" "}
                                </p>
                                <p className="fz12">
                                  3. Date Change Amount= Date Change Fee (as per
                                  Airline Policy + ShareTrip Convenience Fee).
                                </p>
                              </div>
                              <div className="TabPanelInner">
                                <h4>Baggage</h4>
                                <div className="flight_info_taable">
                                  <h3>DAC-SPD</h3>
                                  <p>
                                    <span>20KG /</span> person
                                  </p>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
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

export default FlightSearchWrapper;
