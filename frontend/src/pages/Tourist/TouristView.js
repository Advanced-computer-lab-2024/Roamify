import React from "react";
import CommonBanner from "../../component/Common/CommonBanner";
import ComplaintSearchWrapper from "./component/TouristComplain";
const TouristComplain = () => {
  return (
    <>
      <CommonBanner heading="Complains" pagination="Complains" />
      <ComplaintSearchWrapper/>
    </>
  );
};

export default TouristComplain;