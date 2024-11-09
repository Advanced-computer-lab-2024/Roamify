import React from "react";

const SideBar = () => {
  return (
    <>
      <div className="tour_details_right_sidebar_wrapper">
        <div className="tour_detail_right_sidebar">
          <div className="tour_details_right_boxed">
            <div className="tour_details_right_box_heading">
              <h3>Super deluxe package</h3>
            </div>
            <div className="valid_date_area">
              <div className="valid_date_area_one">
                <h5>Valid from</h5>
                <p>01 Feb 2022</p>
              </div>
              <div className="valid_date_area_one">
                <h5>Valid till</h5>
                <p>15 Feb 2022</p>
              </div>
            </div>
            <div className="tour_package_details_bar_list">
              <h5>Package details</h5>
              <ul>
                <li>
                  <i className="fas fa-circle"></i>Buffet breakfast as per the
                  Itinerary
                </li>
                <li>
                  <i className="fas fa-circle"></i>Visit eight villages showcasing
                  Polynesian culture
                </li>
                <li>
                  <i className="fas fa-circle"></i>Complimentary Camel safari,
                  Bonfire,
                </li>
                <li>
                  <i className="fas fa-circle"></i>All toll tax, parking, fuel, and
                  driver allowances
                </li>
                <li>
                  <i className="fas fa-circle"></i>Comfortable and hygienic vehicle
                </li>
              </ul>
            </div>
            <div className="tour_package_details_bar_price">
              <h5>Price</h5>
              <div className="tour_package_bar_price">
                <h6>
                  <del>$ 35,500</del>
                </h6>
                <h3>
                  $ 30,500 <sub>/Per serson</sub>
                </h3>
              </div>
            </div>
          </div>
        </div>
        <div className="tour_detail_right_sidebar">
          <div className="tour_details_right_boxed">
            <div className="tour_details_right_box_heading">
              <h3>Travel date</h3>
            </div>
            <div className="edit_date_form">
              <div className="form-group">
                <label htmlFor="dates">Edit Date</label>
                <input
                  type="date"
                  id="dates"
                  className="form-control"
                />
              </div>
            </div>
            <div className="tour_package_details_bar_list">
              <h5>Tourist</h5>
              <div className="select_person_item">
                <div className="select_person_left">
                  <h6>Adult</h6>
                  <p>12y+</p>
                </div>
                <div className="select_person_right">
                  <h6>01</h6>
                </div>
              </div>

              <div className="select_person_item">
                <div className="select_person_left">
                  <h6>Children</h6>
                  <p>2 - 12 years</p>
                </div>
                <div className="select_person_right">
                  <h6>01</h6>
                </div>
              </div>
              <div className="select_person_item">
                <div className="select_person_left">
                  <h6>Infant</h6>
                  <p>Below 2 years</p>
                </div>
                <div className="select_person_right">
                  <h6>01</h6>
                </div>
              </div>
            </div>
            <div className="edit_person">
              <p>Edit person</p>
            </div>
          </div>
        </div>
        <div className="tour_detail_right_sidebar">
          <div className="tour_details_right_boxed">
            <div className="tour_details_right_box_heading">
              <h3>Coupon code</h3>
            </div>
            <div className="coupon_code_area_booking">
              <form action="#!">
                <div className="form-group">
                  <input
                    type="text"
                    className="form-control bg_input"
                    placeholder="Enter coupon code"
                  />
                </div>
                <div className="coupon_code_submit">
                  <button className="btn btn_theme btn_md">Apply voucher</button>
                </div>
              </form>
            </div>
          </div>
        </div>
        <div className="tour_detail_right_sidebar">
          <div className="tour_details_right_boxed">
            <div className="tour_details_right_box_heading">
              <h3>Booking amount</h3>
            </div>

            <div className="tour_booking_amount_area">
              <ul>
                <li>
                  Adult Price x 1 <span>$40,000.00</span>
                </li>
                <li>
                  Discount <span>-10%</span>
                </li>
                <li>
                  Tax<span>5%</span>
                </li>
              </ul>
              <div className="tour_bokking_subtotal_area">
                <h6>
                  Subtotal <span>$38,000.00</span>
                </h6>
              </div>
              <div className="coupon_add_area">
                <h6>
                  <span className="remove_coupon_tour">Remove</span> Coupon code
                  (OFF 5000)
                  <span>$5,000.00</span>
                </h6>
              </div>
              <div className="total_subtotal_booking">
                <h6>
                  Total Amount <span>$33,000.00</span>
                </h6>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SideBar;
