import React from "react";
import CommonBanner from "../../component/Common/CommonBanner";
import LoyaltyLevelForm from "./component/PointLevel";
const TouristBooking = () => {
  return (
    <>
      <CommonBanner heading="Point" pagination="Level" />
      <LoyaltyLevelForm/>
    </>
  );
};

export default TouristBooking;