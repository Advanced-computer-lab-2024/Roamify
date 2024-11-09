import React from "react";
import { Routes, Route } from "react-router-dom";

import Home from "../../page/Home";
import About from "../../page/About";
import Header from "../../layout/Header";
import TouristProducts from "./TouristProducts.js";
import TourDetails from "../../page/TourDetails";
import ActivityBooking from "../../page/ActivityBooking";
import TouristPlaces from "./TouristPlaces.js";
import DestinationDetails from "../../page/DestinationDetails";
import TouristActivities from "./TouristActivities.js";
// import BookingConfirmation from "../../page/BookingConfirmation";
import Profile from "../../page/Profile";
import TourGuides from "../../page/TourGuides";
import CopyRight from "../../layout/CopyRight";
import { HeaderData } from "./TouristHeaderData.js";
import TouristProfile from "./TouristProfile.js";
import TouristItinerary from "./TouristItinerary.js";
import TouristComplain from "./TouristComplain.js";
import TouristView from "./TouristView.js";
import TouristBooking from "./TouristBooking.js";
const Tourist = () => {
  return (
    <>
      <Header HeaderData={HeaderData} />
      <Routes>
        <Route path="/tourist-profile" element={<TouristProfile />} />
        <Route path="/tourist-products" element={<TouristProducts />} />
        <Route path="/tourist-itinerary" element={<TouristItinerary />} />
        <Route path="/tour-details/:id" element={<TourDetails />} />
        <Route path="/tourist-places" element={<TouristPlaces />} />
        <Route path="/tourist-activities" element={<TouristActivities />} />
        <Route path="/tourist-complain" element={<TouristComplain />} />
        <Route path="/tourist-view" element={<TouristView/>} />
        <Route path="/tourist-booking" element={<TouristBooking/>} />
      </Routes>
      <CopyRight /> 
    </>
  );
};

export default Tourist;
