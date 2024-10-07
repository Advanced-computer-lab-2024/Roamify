import React from "react";
import NavBar from "../components/NavBar/NavBar";
import { tourismGovernerNavBarItems } from "../constants/tourismGovernerVariables.jsx";
import { BrowserRouter as Router } from "react-router-dom";
import TourismGovernerPageBody from "../components/TourismGoverner/TourismGovernerPageBody.jsx";

const TourismGovernerPage = () => {
    return (
        <div className="flex flex-row">
            <NavBar userType={"tourism-governer"} items={tourismGovernerNavBarItems} />
            <TourismGovernerPageBody />
        </div>
    );
};

export default TourismGovernerPage;