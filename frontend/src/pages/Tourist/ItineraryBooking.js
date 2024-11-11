import React from "react";
import CommonBanner from "../../component/Common/CommonBanner";
import BookedItinerariesWrapper from "./component/ItineraryBooking";
const TouristBooking = () => {
  return (
    <>
      <CommonBanner heading="Booking" pagination="Booking" />
      <BookedItinerariesWrapper/>
    </>
  );
};

export default TouristBooking;