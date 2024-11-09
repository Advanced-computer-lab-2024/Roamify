import React from "react";

// import Review Area
import ReviewArea from "../../../component/TourDetails/ReviewArea";

import Img from "../../../assets/img/tour/big-img.png";
import ProductDetailsSideBar from "./ProductDetailsSideBar";

const ProductDetailsArea = ({ name, price, rating, description, reviews }) => {
  return (
    <>
      <section id="tour_details_main" className="section_padding">
        <div className="container">
          <div className="row">
            <div className="col-lg-8">
              <div className="tour_details_leftside_wrapper">
                <div className="tour_details_heading_wrapper">
                  <div className="tour_details_top_heading">
                    <h2>{name}</h2>
                  </div>
                  <div className="tour_details_top_heading_right">
                    <p>{reviews?.length ?? 0 + " reviewes"}</p>
                  </div>
                </div>

                <div className="tour_details_img_wrapper">
                  <div className="tour_react_big">
                    <img src={Img} alt="img" />
                  </div>
                </div>
                <div className="tour_details_boxed">
                  <h3 className="heading_theme">Description</h3>
                  <div
                    className="tour_details_boxed_inner"
                    style={{ minHeight: "40vh" }}
                  >
                    {description}
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-4">
              <ProductDetailsSideBar name={name} price={price} />
            </div>
          </div>
        </div>
        <ReviewArea reviews={reviews} />
      </section>
    </>
  );
};

export default ProductDetailsArea;
