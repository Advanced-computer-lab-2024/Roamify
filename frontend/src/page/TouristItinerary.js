import React from "react";
// import  CommonBanner
import CommonBanner from "../component/Common/CommonBanner";
// import FlightSearchArea
import TouristItineraryArea from "../component/TouristItinerarySearch/index";

const TouristItinerary = () => {
  return (
    <>
      <CommonBanner
        heading="Tourist Itinerary"
        pagination="Tourist Itinerary"
      />
      <TouristItineraryArea />
    </>
  );
};

export default TouristItinerary;
