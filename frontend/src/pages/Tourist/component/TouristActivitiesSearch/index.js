import React from "react";
// import FlightForm
// import FlightSearchWrapper
import TouristActivitiesWrapper from "./TouristActivitiesSearchArea";

const TouristActivitiesArea = ({ filter }) => {
  return (
    <>
      {/* <TouristActivitiesForm /> */}
      <TouristActivitiesWrapper filter={filter} />
    </>
  );
};

export default TouristActivitiesArea;
