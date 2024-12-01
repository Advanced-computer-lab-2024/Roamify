import React from "react";
import { Routes, Route } from "react-router-dom";

import Header from "../../layout/Header";

// import BookingConfirmation from "../../page/BookingConfirmation";

import CopyRight from "../../layout/CopyRight";
import { HeaderData } from "./TourGuideHeaderData.js";
import TourGuideProfile from "./TourGuideProfile.js";
import TourGuideItinerary from "./TourGuideItinerary.js";
import Dashboard from "./Dashboard/Dashboard.js";
const TourGuide = () => {
  return (
    <>
      <Header HeaderData={HeaderData} />
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/itineraries" element={<TourGuideItinerary />} />
      </Routes>
      <CopyRight />
    </>
  );
};

export default TourGuide;
