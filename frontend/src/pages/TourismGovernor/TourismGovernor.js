import React from "react";
import { Routes, Route } from "react-router-dom";

import Home from "../../page/Home.js";
import Header from "../../layout/Header";
import Profile from "../../page/Profile";
import CopyRight from "../../layout/CopyRight";
import { HeaderData } from "./TourismGovernorHeaderData.js";
import Products from "../Admin/Products/Products.js";
import Places from "./Places/Places.js";
import MyPlaces from "./Places/MyPlaces.js";
import HistoricalTags from "./HistoricalTags/HistoricalTags.js";

const TourismGovernor = () => {
  return (
    <>
      <Header HeaderData={HeaderData} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/places" element={<Places />} />
        <Route path="/my-places" element={<MyPlaces />} />
        <Route path="/historical-tags" element={<HistoricalTags />} />
        <Route path="/profile/:id" element={<Profile />} />
      </Routes>
      <CopyRight />
    </>
  );
};

export default TourismGovernor;
