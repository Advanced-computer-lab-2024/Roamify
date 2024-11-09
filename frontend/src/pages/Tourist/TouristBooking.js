import React from "react";
import CommonBanner from "../../component/Common/CommonBanner";
import BookedActivitiesWrapper from "./component/TouristBooking";
const TouristBooking = () => {
  return (
    <>
      <CommonBanner heading="Booking" pagination="Booking" />
      <BookedActivitiesWrapper/>
    </>
  );
};

export default TouristBooking;