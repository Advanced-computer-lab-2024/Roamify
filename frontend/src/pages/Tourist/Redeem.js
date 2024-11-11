import React from "react";
import CommonBanner from "../../component/Common/CommonBanner";
import RedeemPointsForm from "./component/RedeemPts";
const TouristLevel = () => {
  return (
    <>
      <CommonBanner heading="Point" pagination="Level" />
      <RedeemPointsForm/>
    </>
  );
};

export default TouristLevel;