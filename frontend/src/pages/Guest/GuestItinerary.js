import React from "react";
// import  CommonBanner
import CommonBanner from "../../component/Common/CommonBanner.js";
// import FlightSearchArea
import GuestItineraryArea from "./component/GuestItinerarySearch/index.js";

const GuestItinerary = () => {
  return (
    <>
      <CommonBanner
        heading="Guest Itinerary"
        pagination="Guest Itinerary"
      />
      <GuestItineraryArea />
    </>
  );
};

export default GuestItinerary;
