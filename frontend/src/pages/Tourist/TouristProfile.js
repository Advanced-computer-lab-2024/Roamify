import React from "react";
// import ComonBanner
import CommonBanner from "../../component/Common/CommonBanner";
// import TouristProfileArea
import TouristProfileArea from "./component/TouristProfile";

const TouristProfile = () => {
  return (
    <>
      <CommonBanner heading="Your Profile" pagination="profile" />
      <TouristProfileArea />
    </>
  );
};

export default TouristProfile;
