import React from "react";
import CommonBanner from "../../component/Common/CommonBanner";
import BookedActivitiesWrapper from "./component/ActivityBooking";
const TouristBooking = () => {
  return (
    <>
      <h2
        style={{
          fontSize: "24px",
          fontWeight: "bold",
          textAlign: "center",
          textDecoration: "underline",
          textDecorationColor: "#8b3eea", // Underline color
          textDecorationThickness: "3px", // Thickness of the underline
          marginBottom: "20px", // Space below the title
        }}
      >
        Upcoming Booked Activities
      </h2>
      <BookedActivitiesWrapper />
    </>
  );
};

export default TouristBooking;