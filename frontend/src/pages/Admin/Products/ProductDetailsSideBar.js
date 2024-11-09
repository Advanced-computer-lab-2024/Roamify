import React from "react";

const ProductDetailsSideBar = ({ name, price }) => {
  return (
    <>
      <div className="tour_details_right_sidebar_wrapper">
        <div className="tour_detail_right_sidebar">
          <div className="tour_details_right_boxed">
            <div className="tour_details_right_box_heading">
              <h3>{name}</h3>
            </div>
            <div className="tour_package_details_bar_list">
              <h5>Package details</h5>
              <ul>
                <li>
                  <i className="fas fa-circle"></i>Buffet breakfast as per the
                  Itinerary
                </li>
                <li>
                  <i className="fas fa-circle"></i>Visit eight villages
                  showcasing Polynesian culture
                </li>
                <li>
                  <i className="fas fa-circle"></i>Complimentary Camel safari,
                  Bonfire,
                </li>
                <li>
                  <i className="fas fa-circle"></i>All toll tax, parking, fuel,
                  and driver allowances
                </li>
                <li>
                  <i className="fas fa-circle"></i>Comfortable and hygienic
                  vehicle
                </li>
              </ul>
            </div>
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
