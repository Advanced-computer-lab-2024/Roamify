import DashboardIcon from "../components/Icons/DashboardIcon";
import ProfileIcon from "../components/Icons/ProfileIcon";

export const adminNavBarItems = [
  {
    icon: <DashboardIcon />,
    name: "Dashboard",
    children: null,
    route: "/admin/dashboard",
  },
  {
    icon: <ProfileIcon />,
    name: "Users",
    children: [
      { name: "Tourists" },
      { name: "Sellers" },
      { name: "Tour Guides" },
      { name: "Tourism Governors" },
    ],
  },
  {
    icon: <ProfileIcon />,
    name: "Preferences",
    children: [
      { name: "Historic Areas" },
      { name: "Beaches" },
      { name: "Family-Friendly" },
      { name: "Shopping" },
      { name: "Budget-Friendly" },
    ],
  },
  {
    icon: <ProfileIcon />,
    name: "Activities",
    children: [
      { name: "Food" },
      { name: "Stand Up Comedy" },
      { name: "Concert" },
      { name: "Party" },
      { name: "Bazaars" },
      { name: "Exhibitions" },
    ],
  },
];
