import React, { useState } from "react";
import { Link } from "react-router-dom";
import NavBarItem from "./NavBarItem";
import DashboardIcon from "../Icons/DashboardIcon";
import ProfileIcon from "../Icons/ProfileIcon";
import AcceptButton from "../Buttons/AcceptButton.jsx";
import NavBarBottomOptions from "./NavBarBottomOptions.jsx";

const NavBar = ({ items }) => {
  return (
    <div className="sidebar flex flex-col items-center py-10 bg-primary w-1/6 min-h-[98vh] gap-3 rounded-lg ">
      <p className="text-left w-full pl-10 mb-5">Logo</p>
      {items.map((item, index) => (
        <NavBarItem
          key={index}
          icon={item.icon}
          name={item.name}
          children={item.children}
          route={item.route}
        />
      ))}
      <NavBarBottomOptions />
    </div>
  );
};

export default NavBar;
