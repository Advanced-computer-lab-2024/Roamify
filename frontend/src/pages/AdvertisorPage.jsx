import React from "react";
import NavBar from "../components/NavBar/NavBar";
import { advertiserNavBarItems } from "../constants/advertiserVariables.jsx";
import { BrowserRouter as Router } from "react-router-dom";
import AdvertiserPageBody from "../components/Advertiser/AdvertiserPageBody.jsx";


const AdvertiserPage = () => {
    return (
        <div className="flex flex-row">
            <NavBar userType={"advertiser"} items={advertiserNavBarItems} />
            <AdvertiserPageBody />
        </div>
    );
};

export default AdvertiserPage;
