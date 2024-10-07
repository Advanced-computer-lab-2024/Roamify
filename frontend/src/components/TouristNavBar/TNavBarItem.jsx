import React from "react";
import { Link } from "react-router-dom";

const NavBarItem = ({ icon, name, route }) => {
  return (
    <li className="flex flex-col first:font-semibold w-full">
      <Link
        to={route}
        onClick={() => console.log('Navigating to:', route)}  // For debugging
        className="flex items-center justify-start px-5 py-2 gap-2 hover:bg-primaryHover w-full"
      >
        {icon}
        <span className="text-lg text-white">{name}</span>
      </Link>
    </li>
  );
};

export default NavBarItem;
