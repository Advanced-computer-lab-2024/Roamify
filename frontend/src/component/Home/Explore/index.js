import React from "react";
// Common Card
import CommonCard from "../../Common/CommonCard";
// Section Heading
import { ExploreData } from "../../Common/CommonCard/Data";
// Section Heading
import SectionHeading from "../../Common/SectionHeading";

const ExploreArea = () => {
  return (
    <>
      <section id="explore_area" className="section_padding_top">
        <div className="container">
          <SectionHeading heading="Explore our hot deals" />
          <div className="row">
            <div className="col-lg-6 offset-lg-3">
              <div className="theme_nav_tab">
                <nav className="theme_nav_tab_item">
                  <div className="nav nav-tabs" id="nav-tab1" role="tablist">
                    <button
                      className="nav-link active"
                      id="nav-hotels-tab"
                      data-bs-toggle="tab"
                      data-bs-target="#nav-hotels"
                      type="button"
                      role="tab"
                      aria-controls="nav-hotels"
                      aria-selected="true"
                    >
                      Hotels
                    </button>
                    <button
                      className="nav-link"
                      id="nav-tours-tab"
                      data-bs-toggle="tab"
                      data-bs-target="#nav-tours"
                      type="button"
                      role="tab"
                      aria-controls="nav-tours"
                      aria-selected="false"
                    >
                      Tours
                    </button>
                    <button
                      className="nav-link"
                      id="nav-space-tab"
                      data-bs-toggle="tab"
                      data-bs-target="#nav-space"
                      type="button"
                      role="tab"
                      aria-controls="nav-space"
                      aria-selected="false"
                    >
                      Space
                    </button>
                    <button
                      className="nav-link"
                      id="nav-events-tab"
                      data-bs-toggle="tab"
                      data-bs-target="#nav-events"
                      type="button"
                      role="tab"
                      aria-controls="nav-events"
                      aria-selected="false"
                    >
                      Events
                    </button>
                  </div>
                </nav>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-lg-12">
              <div className="tab-content" id="nav-tabContent">
                <div
                  className="tab-pane fade show active"
                  id="nav-hotels"
                  role="tabpanel"
                  aria-labelledby="nav-hotels-tab"
                >
                  <div className="row">
                    {ExploreData.slice(0, 8).map((data, index) => (
                     <CommonCard img={data.img} heading={data.heading} location={data.location}
                      discount={data.discount} discountPrice={data.discountPrice} reviewRating={data.reviewRating} reviewCount={data.reviewCount} price={data.price} key={index}  />
                    ))}
                  </div>
                </div>
                <div
                  className="tab-pane fade"
                  id="nav-tours"
                  role="tabpanel"
                  aria-labelledby="nav-tours-tab"
                >
                 <div className="row">
                    {ExploreData.slice(0, 6).map((data, index1) => (
                      <CommonCard img={data.img} heading={data.heading} location={data.location}
                      discount={data.discount} discountPrice={data.discountPrice} reviewRating={data.reviewRating} reviewCount={data.reviewCount} price={data.price} key={index1}  />
                    ))}
                  </div>
                </div>
                <div
                  className="tab-pane fade"
                  id="nav-space"
                  role="tabpanel"
                  aria-labelledby="nav-space-tab"
                >
                  <div className="row">
                    {ExploreData.slice(4, 8).map((data, index2) => (
                      <CommonCard img={data.img} heading={data.heading} location={data.location}
                      discount={data.discount} discountPrice={data.discountPrice} reviewRating={data.reviewRating} reviewCount={data.reviewCount} price={data.price} key={index2}  />
                    ))}
                  </div>
                </div>
                <div
                  className="tab-pane fade"
                  id="nav-events"
                  role="tabpanel"
                  aria-labelledby="nav-events-tab"
                >
                  <div className="row">
                    {ExploreData.slice(3, 8).map((data, index3) => (
                     <CommonCard img={data.img} heading={data.heading} location={data.location}
                     discount={data.discount} discountPrice={data.discountPrice} reviewRating={data.reviewRating} reviewCount={data.reviewCount} price={data.price} key={index3}  />
                    ))}
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

export default ExploreArea;
