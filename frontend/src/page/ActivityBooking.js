import React from "react";
import CommonBanner from "../component/Common/CommonBanner";
// import TourBooking
import ActivityBookingArea from "../component/ActivityBooking";
const ActivityBooking = () => {
  return (
    <>
      <CommonBanner
        heading="Booking submission"
        pagination="Booking submission"
      />
      <ActivityBookingArea />
    </>
  );
};

export default ActivityBooking;
