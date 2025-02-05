import React from "react";
// import  CommonBanner
import CommonBanner from "../../component/Common/CommonBanner";
// import FlightSearchArea
import TouristActivitiesArea from "./component/TouristActivitiesSearch/index.js";
import TouristActivitiesForm from "./component/TouristActivitiesSearch/TouristActivitiesForm.js";
const TouristActivities = () => {
  return (
    <>
      <CommonBanner
        heading="Tourist Activities"
        pagination="Tourist Activities"
      />
      <TouristActivitiesForm />
      {/* <TouristActivitiesArea /> */}
    </>
  );
};

export default TouristActivities;
