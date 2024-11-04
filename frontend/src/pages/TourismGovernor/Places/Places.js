import React from "react";
// import ComonBanner
import CommonBanner from "../../../component/Common/CommonBanner";
// import TopDestinationsArea
import PlacesArea from "./PlacesArea";

const Places = () => {
  return (
    <>
      <CommonBanner heading="Places" pagination="Places" />
      <PlacesArea />
    </>
  );
};

export default Places;
