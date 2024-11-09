import React from "react";
// import FlightForm

import CommonBanner from "../../../component/Common/CommonBanner";
import ItineraryArea from "./ItineraryArea";
const Itineraries = () => {
  return (
    <>
      <CommonBanner heading="Itineraries" pagination="Itineraries" />
      <ItineraryArea />
    </>
  );
};

export default Itineraries;
