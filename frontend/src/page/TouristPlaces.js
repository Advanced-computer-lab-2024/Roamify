import React from "react";
// import ComonBanner
import CommonBanner from "../component/Common/CommonBanner";
// import TopDestinationsArea
import TouristPlacesArea from "../component/TouristPlaces";

const TouristPlaces = () => {
  return (
    <>
      <CommonBanner heading="Top destinations" pagination="Top destinations" />
      <TouristPlacesArea />
    </>
  );
};

export default TouristPlaces;
