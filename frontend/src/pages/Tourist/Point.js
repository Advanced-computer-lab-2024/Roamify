import React from "react";
import CommonBanner from "../../component/Common/CommonBanner";
import RedeemAndLoyalty from "./component/PointLevel";
const TouristBooking = () => {
  return (
    <>
      <CommonBanner heading="Point" pagination="Level" />
      <RedeemAndLoyalty/>
    </>
  );
};

export default TouristBooking;