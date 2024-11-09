import React from "react";
// import ComonBanner
import CommonBanner from "../../component/Common/CommonBanner";
// import TopDestinationsArea
import TouristPlacesArea from "./component/TouristPlaces";

const TouristPlaces = () => {
  return (
    <>
      <CommonBanner heading="Top Places" pagination="Top places" />
      <TouristPlacesArea />
    </>
  );
};

export default TouristPlaces;
