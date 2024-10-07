import React from "react";
import NavBar from "../components/NavBar/NavBar";
import { tourGuideNavBarItems } from "../constants/tourGuideVariables.jsx";
import { BrowserRouter as Router } from "react-router-dom";
import TourGuidePageBody from "../components/TourGuide/TourGuidePageBody.jsx";

const TourGuidePage = () => {
    return (
        <div className="flex flex-row">
            <NavBar userType={"tour-guide"} items={tourGuideNavBarItems} />
            <TourGuidePageBody />
        </div>
    );
};

export default TourGuidePage;