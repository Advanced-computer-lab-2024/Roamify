import React from "react";

const BookingArea = () => {
  return (
    <>
      <div className="tou_booking_form_Wrapper">
        <div className="booking_tour_form">
          <h3 className="heading_theme">Booking submission</h3>
          <div className="tour_booking_form_box">
            <form action="!#" id="tour_bookking_form_item">
              <div className="row">
                <div className="col-lg-6">
                  <div className="form-group">
                    <input
                      type="text"
                      className="form-control bg_input"
                      placeholder="First name*"
                    />
                  </div>
                </div>
                <div className="col-lg-6">
                  <div className="form-group">
                    <input
                      type="text"
                      className="form-control bg_input"
                      placeholder="Last name*"
                    />
                  </div>
                </div>
                <div className="col-lg-6">
                  <div className="form-group">
                    <input
                      type="text"
                      className="form-control bg_input"
                      placeholder="Email address (Optional)"
                    />
                  </div>
                </div>
                <div className="col-lg-6">
                  <div className="form-group">
                    <input
                      type="text"
                      className="form-control bg_input"
                      placeholder="Mobile number*"
                    />
                  </div>
                </div>
                <div className="col-lg-12">
                  <div className="form-group">
                    <input
                      type="text"
                      className="form-control bg_input"
                      placeholder="Street address"
                    />
                  </div>
                </div>
                <div className="col-lg-6">
                  <div className="form-group">
                    <input
                      type="text"
                      className="form-control bg_input"
                      placeholder="Apartment, Suite, House no (optional)"
                    />
                  </div>
                </div>
                <div className="col-lg-6">
                  <div className="form-group">
                    <select className="form-control form-select bg_input">
                      <option>Khulna</option>
                      <option>New York</option>
                      <option>Barisal</option>
                      <option>Nator</option>
                      <option>Joybangla</option>
                    </select>
                  </div>
                </div>
                <div className="col-lg-6">
                  <div className="form-group">
                    <select className="form-control form-select bg_input">
                      <option>State</option>
                      <option>New York</option>
                      <option>Barisal</option>
                      <option>Nator</option>
                      <option>Joybangla</option>
                    </select>
                  </div>
                </div>
                <div className="col-lg-6">
                  <div className="form-group">
                    <select className="form-control form-select bg_input">
                      <option>Country</option>
                      <option>New York</option>
                      <option>Barisal</option>
                      <option>Nator</option>
                      <option>Joybangla</option>
                    </select>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
        <div className="booking_tour_form">
          <h3 className="heading_theme">Payment method</h3>
          <div className="tour_booking_form_box">
            <div className="booking_payment_boxed">
              <form action="!#" id="payment_checked">
                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="radio"
                    name="flexRadioDefault"
                    id="flexRadioDefault1"
                  />
                  <label className="form-check-label" htmlFor="flexRadioDefault1">
                    Payment by card
                  </label>
                </div>
                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="radio"
                    name="flexRadioDefault"
                    id="flexRadioDefault2"
                  />
                  <label className="form-check-label" htmlFor="flexRadioDefault2">
                    Paypal
                  </label>
                </div>
                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="radio"
                    name="flexRadioDefault"
                    id="flexRadioDefault3"
                  />
                  <label className="form-check-label" htmlFor="flexRadioDefault3">
                    Payoneer
                  </label>
                </div>
                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="radio"
                    name="flexRadioDefault"
                    id="flexRadioDefault4"
                  />
                  <label className="form-check-label" htmlFor="flexRadioDefault4">
                    Cash on delivery
                  </label>
                </div>
              </form>
            </div>
          </div>
        </div>
        <div className="booking_tour_form_submit">
          <div className="form-check write_spical_check">
            <input
              className="form-check-input"
              type="checkbox"
              id="flexCheckDefaultf1"
            />
            <label className="form-check-label" htmlFor="flexCheckDefaultf1">
              <span className="main_spical_check">
                <span>
                  I read and accept all
                  <a href="terms-service.html">Terms and conditios</a>
                </span>
              </span>
            </label>
          </div>
          <a href="booking-confirmation.html" className="btn btn_theme btn_md">
            Submit
          </a>
        </div>
      </div>
    </>
  );
};

export default BookingArea;
