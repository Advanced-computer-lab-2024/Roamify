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
      { name: "Advertisers" },
    ],
  },
  {
    icon: <ProfileIcon />,
    name: "Preference Tags",
    children: null,
    route: "/admin/preference-tags",
  },
  {
    icon: <ProfileIcon />,
    name: "Activity Categories",
    children: null,
    route: "/admin/activity-categories",
  },
  {
    icon: <ProfileIcon />,
    name: "Products",
    children: null,
    route: "/admin/products",
  },
];
export const sellerNavBarItems = [
  {
    icon: <ProfileIcon />,
    name: "Products",
    children: null,
    route: "/seller/products",
  },
  {
    icon: <ProfileIcon />,
    name: "Account",
    children: [
      { name: "Create" },
      { name: "Edit" },
      

  ],
  },
];
