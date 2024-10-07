import React from "react";
import { Route, Routes } from "react-router-dom";
//import GuestProfile from "./GuestProfile.jsx";
import GuestActivities from "./GuestActivtiy.jsx";
import GuestPlacesPage from "./GuestPlaces.jsx";
import ItineraryPage from "./GuestUpcomingPage.jsx";


const GuestHomePageBody = () => {
  return (
    <div className="flex-1 p-5">
      <Routes>
       {/* <Route path="/Guest/profile" element={<GuestProfile />} /> */}
        <Route path="activities" element={<GuestActivities />}/>
        
        <Route path="place" element={<GuestPlacesPage />} />
        <Route path="upcoming" element={<ItineraryPage />} />
       
        
      </Routes>
    </div>
  );
};

export default GuestHomePageBody;