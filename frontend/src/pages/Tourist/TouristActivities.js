import React from "react";
// import  CommonBanner
import CommonBanner from "../../component/Common/CommonBanner";
// import FlightSearchArea
import TouristActivitiesArea from "../../component/TouristActivitiesSearch";

const TouristActivities = () => {
  return (
    <>
      <CommonBanner
        heading="Tourist Activities"
        pagination="Tourist Activities"
      />
      <TouristActivitiesArea />
    </>
  );
};

export default TouristActivities;
