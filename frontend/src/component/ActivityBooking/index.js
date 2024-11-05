import React from "react";
// import Sidebae
import SideBar from "./SideBar";
// import Booking Area
import BookingArea from "./BookingArea";
const ActivityBookingArea = () => {
  return (
    <>
      <section id="tour_booking_submission" className="section_padding">
        <div className="container">
          <div className="row">
            <div className="col-lg-8">
              <BookingArea />
            </div>
            <div className="col-lg-4">
              <SideBar />
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default ActivityBookingArea;
