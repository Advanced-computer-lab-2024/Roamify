import React from "react";
import NavBar from "../components/TouristNavBar/TNavBar.jsx";
import { touristNavBarItems } from "../components/touristNavBar.jsx";
import TouristHomePageBody from "./TouristHomePageBody.jsx"

const TouristHomePage = () => {
  return (
    <div className="flex flex-row">
      <NavBar items={touristNavBarItems} />
      <TouristHomePageBody />
    </div>
  );
};

export default TouristHomePage;
