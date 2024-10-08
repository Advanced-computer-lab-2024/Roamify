import React from "react";
import { Route, Routes } from "react-router-dom";
//import TouristProfile from "./TouristProfile.jsx";
import TouristActivities from "./TouristActivtiy.jsx";
import TouristPlace from "./TouristPlaces.jsx";
import Upcoming from "./UpcomingPage.jsx";
import TouristProducts from "./touristProducts/TouristProducts.jsx";
import AdminProducts from "../components/Admin/AdminProducts/AdminProducts.jsx";
import UpdateTouristProfile from "./updateTouristProfile.jsx";

const TouristHomePageBody = () => {
  return (
    <div className="flex-1 p-5">
      <Routes>
        <Route path="profile" element={<UpdateTouristProfile />} />
        <Route path="activities" element={<TouristActivities />} />

        <Route path="place" element={<TouristPlace />} />
        <Route path="upcoming" element={<Upcoming />} />
        <Route path="products" element={<AdminProducts />} />
      </Routes>
    </div>
  );
};

export default TouristHomePageBody;
