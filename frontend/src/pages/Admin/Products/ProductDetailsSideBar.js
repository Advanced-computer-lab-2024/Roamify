import React from "react";

const ProductDetailsSideBar = ({ name, price, rating, description }) => {
  return (
    <>
      <div className="tour_details_right_sidebar_wrapper">
        <div className="tour_detail_right_sidebar">
          <div className="tour_details_right_boxed">
            <div className="tour_details_right_box_heading">
              <h3>{name}</h3>
            </div>

            {/* Displaying the description */}
            <div className="tour_package_details_bar_list">
              <h5>Description</h5>
              <p>{description}</p>
            </div>

            {/* Displaying the rating */}
            <div className="tour_package_details_bar_list">
              <h5>Rating</h5>
              <p>{rating} / 5</p>
            </div>

            {/* Displaying the price */}
            <div className="tour_package_details_bar_price">
              <h5>Price</h5>
              <div className="tour_package_bar_price">
                <h6 style={{ fontSize: "1.5rem" }}>{"$ " + price}</h6>
              </div>
            </div>
          </div>

          <div className="tour_select_offer_bar_bottom">
            <button
              className="btn btn_theme btn_md w-100"
              data-bs-toggle="offcanvas"
              data-bs-target="#offcanvasRight"
              aria-controls="offcanvasRight"
            >
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductDetailsSideBar;
