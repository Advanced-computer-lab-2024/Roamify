import React from "react";
// Import usepArams
// import { useParams } from 'react-router-dom'
// import Sectin Heading
import SectionHeading from "../Common/SectionHeading";
// import Common Card
import CommonCard from "../Common/CommonCard";
// import  ExploreData
import { ExploreData } from "../Common/CommonCard/Data";

const TouristProductsArea = () => {
  // let  ExploreData  = useParams();
  return (
    <>
      <section id="explore_area" className="section_padding">
        <div className="container">
          <SectionHeading heading="42 tours found" />
          <div className="row">
            <div className="col-lg-3">
              <div className="left_side_search_area">
                <div className="left_side_search_boxed">
                  <div className="left_side_search_heading">
                    <h5>Search by name</h5>
                  </div>
                  <div className="name_search_form">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="e.g Deluxe bus"
                    />
                    <i className="fas fa-search"></i>
                  </div>
                </div>
                <div className="left_side_search_boxed">
                  <div className="left_side_search_heading">
                    <h5>Filter by Review</h5>
                  </div>
                  <div className="filter_review">
                    <form className="review_star">
                      <div className="form-check">
                        <input
                          className="form-check-input"
                          type="checkbox"
                          id="flexCheckDefault"
                        />
                        <label
                          className="form-check-label"
                          htmlFor="flexCheckDefault"
                        >
                          <i className="fas fa-star color_theme"></i>
                          <i className="fas fa-star color_theme"></i>
                          <i className="fas fa-star color_theme"></i>
                          <i className="fas fa-star color_theme"></i>
                          <i className="fas fa-star color_theme"></i>
                        </label>
                      </div>
                      <div className="form-check">
                        <input
                          className="form-check-input"
                          type="checkbox"
                          id="flexCheckDefault1"
                        />
                        <label
                          className="form-check-label"
                          htmlFor="flexCheckDefault1"
                        >
                          <i className="fas fa-star color_theme"></i>
                          <i className="fas fa-star color_theme"></i>
                          <i className="fas fa-star color_theme"></i>
                          <i className="fas fa-star color_theme"></i>
                          <i className="fas fa-star color_asse"></i>
                        </label>
                      </div>
                      <div className="form-check">
                        <input
                          className="form-check-input"
                          type="checkbox"
                          id="flexCheckDefault2"
                        />
                        <label
                          className="form-check-label"
                          htmlFor="flexCheckDefault2"
                        >
                          <i className="fas fa-star color_theme"></i>
                          <i className="fas fa-star color_theme"></i>
                          <i className="fas fa-star color_theme"></i>
                          <i className="fas fa-star color_asse"></i>
                          <i className="fas fa-star color_asse"></i>
                        </label>
                      </div>
                      <div className="form-check">
                        <input
                          className="form-check-input"
                          type="checkbox"
                          id="flexCheckDefault3"
                        />
                        <label
                          className="form-check-label"
                          htmlFor="flexCheckDefault3"
                        >
                          <i className="fas fa-star color_theme"></i>
                          <i className="fas fa-star color_theme"></i>
                          <i className="fas fa-star color_asse"></i>
                          <i className="fas fa-star color_asse"></i>
                          <i className="fas fa-star color_asse"></i>
                        </label>
                      </div>
                      <div className="form-check">
                        <input
                          className="form-check-input"
                          type="checkbox"
                          id="flexCheckDefault5"
                        />
                        <label
                          className="form-check-label"
                          htmlFor="flexCheckDefault5"
                        >
                          <i className="fas fa-star color_theme"></i>
                          <i className="fas fa-star color_asse"></i>
                          <i className="fas fa-star color_asse"></i>
                          <i className="fas fa-star color_asse"></i>
                          <i className="fas fa-star color_asse"></i>
                        </label>
                      </div>
                    </form>
                  </div>
                </div>
                <div className="left_side_search_boxed">
                  <div className="left_side_search_heading">
                    <h5>Filter by hotel star</h5>
                  </div>
                  <div className="filter_review">
                    <form className="review_star">
                      <div className="form-check">
                        <input
                          className="form-check-input"
                          type="checkbox"
                          id="flexCheckDefaulta"
                        />
                        <label
                          className="form-check-label"
                          htmlFor="flexCheckDefaulta"
                        >
                          <i className="fas fa-star color_theme"></i>
                          <i className="fas fa-star color_theme"></i>
                          <i className="fas fa-star color_theme"></i>
                          <i className="fas fa-star color_theme"></i>
                          <i className="fas fa-star color_theme"></i>
                        </label>
                      </div>
                      <div className="form-check">
                        <input
                          className="form-check-input"
                          type="checkbox"
                          id="flexCheckDefaulf21"
                        />
                        <label
                          className="form-check-label"
                          htmlFor="flexCheckDefaulf21"
                        >
                          <i className="fas fa-star color_theme"></i>
                          <i className="fas fa-star color_theme"></i>
                          <i className="fas fa-star color_theme"></i>
                          <i className="fas fa-star color_theme"></i>
                          <i className="fas fa-star color_asse"></i>
                        </label>
                      </div>
                      <div className="form-check">
                        <input
                          className="form-check-input"
                          type="checkbox"
                          id="flexCheckDefaultf3"
                        />
                        <label
                          className="form-check-label"
                          htmlFor="flexCheckDefaultf3"
                        >
                          <i className="fas fa-star color_theme"></i>
                          <i className="fas fa-star color_theme"></i>
                          <i className="fas fa-star color_theme"></i>
                          <i className="fas fa-star color_asse"></i>
                          <i className="fas fa-star color_asse"></i>
                        </label>
                      </div>
                      <div className="form-check">
                        <input
                          className="form-check-input"
                          type="checkbox"
                          id="flexCheckDefaultf4"
                        />
                        <label
                          className="form-check-label"
                          htmlFor="flexCheckDefaultf4"
                        >
                          <i className="fas fa-star color_theme"></i>
                          <i className="fas fa-star color_theme"></i>
                          <i className="fas fa-star color_asse"></i>
                          <i className="fas fa-star color_asse"></i>
                          <i className="fas fa-star color_asse"></i>
                        </label>
                      </div>
                      <div className="form-check">
                        <input
                          className="form-check-input"
                          type="checkbox"
                          id="flexCheckDefaultf5"
                        />
                        <label
                          className="form-check-label"
                          htmlFor="flexCheckDefaultf5"
                        >
                          <i className="fas fa-star color_theme"></i>
                          <i className="fas fa-star color_asse"></i>
                          <i className="fas fa-star color_asse"></i>
                          <i className="fas fa-star color_asse"></i>
                          <i className="fas fa-star color_asse"></i>
                        </label>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-9">
              <div className="row">
                {ExploreData.map((data, index) => (
                  <CommonCard
                    id={data.id}
                    img={data.img}
                    heading={data.heading}
                    location={data.location}
                    discount={data.discount}
                    discountPrice={data.discountPrice}
                    reviewRating={data.reviewRating}
                    reviewCount={data.reviewCount}
                    price={data.price}
                    key={index}
                    grid={true}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default TouristProductsArea;
