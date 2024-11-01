import React from "react";
import SectionHeading from "../Common/SectionHeading";
import SideBar from "./SideBar";
import { activities } from "./ActivitiesData";
import { Link } from "react-router-dom";

const TouristActivitiesWrapper = () => {
  return (
    <>
      <section id="explore_area" className="section_padding">
        <div className="container">
          <SectionHeading heading={`${activities.length} tours found`} />
          <div className="row">
            <div className="col-lg-3">
              <SideBar />
            </div>
            <div className="col-lg-9">
              <div className="row">
                <div className="col-lg-12">
                  <div className="flight_search_result_wrapper">
                    {activities.map((activity, index) => (
                      <div className="flight_search_item_wrappper" key={index}>
                        <div className="flight_search_items">
                          <div className="multi_city_flight_lists">
                            <div className="flight_multis_area_wrapper">
                              <div className="flight_search_left">
                                <div className="flight_search_destination">
                                  <p>Location</p>
                                  <h3>{activity.location.name}</h3>
                                  <h6>
                                    Coordinates:{" "}
                                    {activity.location.coordinates.join(", ")}
                                  </h6>
                                </div>
                              </div>
                              <div className="flight_search_middel">
                                <div className="flight_right_arrow">
                                  <h6>{activity.name}</h6>
                                  <p>{activity.category.name}</p>
                                </div>
                                <div className="flight_search_destination">
                                  <p>Date</p>
                                  <h3>
                                    {new Date(
                                      activity.date
                                    ).toLocaleDateString()}
                                  </h3>
                                  <h6>Time: {activity.time}</h6>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="flight_search_right">
                            <h5>
                              {activity.discount ? (
                                <del>
                                  {activity.price *
                                    (1 + activity.discounts / 100)}{" "}
                                  EGP
                                </del>
                              ) : (
                                ""
                              )}
                            </h5>
                            <h2>
                              {activity.price} EGP
                              <sup>
                                {activity.discount
                                  ? `${activity.discounts}% off`
                                  : ""}
                              </sup>
                            </h2>
                            <Link
                              to={`/activity-booking/${activity.id}`}
                              className="btn btn_theme btn_sm"
                            >
                              Book now
                            </Link>
                            <p>*Discount available</p>
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
                              <h4>Activity Details</h4>
                              <p className="fz12">
                                {activity.category.description}
                              </p>
                              <p className="fz12">
                                Advertiser: {activity.advertiser.username} (
                                {activity.advertiser.email})
                              </p>
                            </div>
                            <div className="flight_refund_policy">
                              <div className="TabPanelInner flex_widht_less">
                                <h4>Tags</h4>
                                {activity.tags.map((tag, i) => (
                                  <p className="fz12" key={i}>
                                    {tag.name} - {tag.description}
                                  </p>
                                ))}
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

export default TouristActivitiesWrapper;
