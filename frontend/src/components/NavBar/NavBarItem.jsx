import React from "react";
import { useState } from "react";
import ArrowDownIcon from "../Icons/ArrowDownIcon";
import { Link } from "react-router-dom";

const NavBarItem = ({ icon, name, children, route }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSubMenu = () => {
    setIsOpen((prev) => !prev);
  };

  return (
    <li className="flex flex-col  first:font-semibold w-full">
      {children ? ( // If there are children, show a button to toggle the submenu
        <>
          <button
            onClick={toggleSubMenu}
            className="dropdown-btn flex items-center justify-start px-5 py-2 gap-2 hover:bg-primaryHover w-full"
          >
            {icon}
            <span className="text-lg text-white">{name}</span>
            <ArrowDownIcon
              height="30"
              width="30"
              fill="white"
              className={`ml-auto transform transition-transform duration-300 ${
                isOpen ? "rotate-180" : "rotate-270"
              }`}
            />
          </button>
          {isOpen && (
            <ul className="sub-menu transition-all duration-300 ease-in-out max-h-64">
              {children.map((child, index) => (
                <Link
                  key={index}
                  to={`/admin/${name.toLowerCase()}/${child.name
                    .toLowerCase()
                    .replace(/\s+/g, "-")}`} // Create a dynamic route
                  className="text-base text-white "
                >
                  <li className="flex px-10 py-1.5 hover:bg-primaryHover">
                    {child.name}
                  </li>
                </Link>
              ))}
            </ul>
          )}
        </>
      ) : (
        <Link
          to={route}
          className="flex items-center justify-start px-5 py-2 gap-2 hover:bg-primaryHover w-full"
        >
          {icon}
          <span className="text-lg text-white">{name}</span>
        </Link>
      )}
    </li>
  );
};

export default NavBarItem;
