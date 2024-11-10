import React from "react";
import CommonBanner from "../../component/Common/CommonBanner";
import BookedActivitiesWrapper from "./component/ActivityBooking";
const TouristBooking = () => {
  return (
    <>
      <CommonBanner heading="Booking" pagination="Booking" />
      <BookedActivitiesWrapper/>
    </>
  );
};

export default TouristBooking;