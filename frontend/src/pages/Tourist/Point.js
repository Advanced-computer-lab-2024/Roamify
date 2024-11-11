import React from "react";
import CommonBanner from "../../component/Common/CommonBanner";
import RedeemAndLoyalty from "./component/PointLevel";
const TouristPoints = () => {
  return (
    <>
      <CommonBanner heading="Point" pagination="Level" />
      <RedeemAndLoyalty/>
    </>
  );
};

export default TouristPoints;