import React from "react";
import CommonBanner from "../../component/Common/CommonBanner";
import BookedItinerariesWrapper from "./component/ItineraryBooking";
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
        Upcoming Booked Itinerary
      </h2>
      <BookedItinerariesWrapper/>
    </>
  );
};

export default TouristBooking;