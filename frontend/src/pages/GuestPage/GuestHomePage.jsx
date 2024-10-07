import React from "react";
import NavBar from "../../components/GuestNavBar/GNavBar.jsx";
import { guestNavBarItems } from "../../components/GuestNavBar/guestNavBar.jsx"
import GuestHomePageBody from "./GuestHomePageBody.jsx";

const GuestHomePage = () => {
  return (
    <div className="flex flex-row">
      <NavBar items={guestNavBarItems} />
      <GuestHomePageBody />
    </div>
  );
};

export default GuestHomePage;
