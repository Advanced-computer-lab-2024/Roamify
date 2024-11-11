import React from "react";
import { Routes, Route } from "react-router-dom";


import Header from "../../layout/Header.js";

import GuestPlaces from "./GuestPlaces.js";
import GuestActivities from "./GuestActivities.js";
import CopyRight from "../../layout/CopyRight.js";
import { HeaderData } from "./GuestHeaderData.js";

import GuestItinerary from "./GuestItinerary.js";


const Guest = () => {
  return (
    <>
      <Header HeaderData={HeaderData} />
      <Routes>
        {/* <Route path="/" element={<Login />} /> */}
        <Route path="/guest-itinerary" element={<GuestItinerary />} />
        <Route path="/guest-places" element={<GuestPlaces />} />
        <Route path="/guest-activities" element={<GuestActivities />} />
      </Routes>
      <CopyRight />
    </>
  );
};

export default Guest;
