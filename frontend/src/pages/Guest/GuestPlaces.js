import React from "react";
// import ComonBanner
import CommonBanner from "../../component/Common/CommonBanner";
// import TopDestinationsArea
import GuestPlacesArea from "./component/GuestPlaces";

const GuestPlaces = () => {
  return (
    <>
      <CommonBanner heading="Top Places" pagination="Top places" />
      <GuestPlacesArea />
    </>
  );
};

export default GuestPlaces;
