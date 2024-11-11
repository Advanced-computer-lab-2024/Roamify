import React from "react";
// import ComonBanner
import CommonBanner from "../../../component/Common/CommonBanner";
import HistoricalTagsArea from "./HistoricalTagsArea";

const HistoricalTags = () => {
  return (
    <>
      <CommonBanner heading="Places" pagination="Places" />
      <HistoricalTagsArea myPlaces={true} />
    </>
  );
};

export default HistoricalTags;
