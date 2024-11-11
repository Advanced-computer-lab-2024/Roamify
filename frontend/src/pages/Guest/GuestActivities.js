import React from "react";
// import  CommonBanner
import CommonBanner from "../../component/Common/CommonBanner.js";
// import FlightSearchArea

import GuestActivitiesForm from "./component/GuesttActivitiesSearch/GuestActivitiesForm.js"
const GuestActivities = () => {
  return (
    <>
      <CommonBanner
        heading="Guest Activities"
        pagination="Guest Activities"
      />
      <GuestActivitiesForm/>
      {/* <GuestActivitiesArea /> */}
    </>
  );
};

export default GuestActivities;
