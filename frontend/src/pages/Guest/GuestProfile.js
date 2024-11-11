import React from "react";
// import ComonBanner
import CommonBanner from "../../component/Common/CommonBanner";
// import GuestProfileArea
import GuestProfileArea from "./component/GuestProfile";

const GuestProfile = () => {
  return (
    <>
      <CommonBanner heading="Your Profile" pagination="profile" />
      <GuestProfileArea />
    </>
  );
};

export default GuestProfile;
