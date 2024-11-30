import React from "react";
import { Routes, Route } from "react-router-dom";

import Home from "../../page/Home";
import About from "../../page/About";
import Header from "../../layout/Header";
import { HeaderData } from "./AdvertiserHeaderData.js";
import TouristActivities from "../Tourist/TouristActivities.js";
import CopyRight from "../../layout/CopyRight.js";
import AdvertiserActivities from "./AdvertiserActivities.js";
import Dashboard from "./Dashboard/Dashboard.js";

const Advertiser = () => {
  return (
    <>
      <Header HeaderData={HeaderData} />
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/activities" element={<AdvertiserActivities />} />
      </Routes>
      <CopyRight />
    </>
  );
};

export default Advertiser;
