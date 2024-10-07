import React, { useState } from "react";
import NotificationIcon from "../Icons/NotificationIcon.jsx";
import ProfileCircleIcon from "../Icons/ProfileCircleIcon.jsx";
import EllipsisHorizontalIcon from "../Icons/EllipsisHorizontalIcon.jsx";
import ProfileOptionsMenu from "../Modals/ProfileOptionsMenu.jsx";

const NavBarBottomOptions = () => {
  const [isPorfileMenuOpen, setPorfileMenuOpen] = useState(false);
  const handleProfileClick = (userName) => {
    setPorfileMenuOpen(true);
  };

  const handleClosePorfileMenu = () => {
    setPorfileMenuOpen(false);
  };
  return (
    <div className="mt-auto w-full flex flex-col gap-5 relative">
      <NotificationIcon />
      <div
        onClick={handleProfileClick}
        className="flex h-20 w-full text-white gap-3 justify-center items-center cursor-pointer  rounded-[40px] hover:bg-primaryHover p-4 "
      >
        <ProfileCircleIcon />
        <p>Admin name</p>
        <EllipsisHorizontalIcon />
      </div>
      <ProfileOptionsMenu
        isOpen={isPorfileMenuOpen}
        onClose={handleClosePorfileMenu}
      />
    </div>
  );
};

export default NavBarBottomOptions;
