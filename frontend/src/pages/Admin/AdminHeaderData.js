export const HeaderData = [
  {
    menu: "Dashboard",
    link: "",
  },
  {
    menu: "Users",
    link: "/users",
    submenu: true,
    subMenuitem: [
      {
        subItem: "Tourists",
        linkL: "users/tourists",
        subMenuActive: false,
      },

      {
        subItem: "Sellers",
        linkL: "users/sellers",
        subMenuActive: false,
      },

      {
        subItem: "Tour Guides",
        linkL: "users/tour-guides",
        subMenuActive: false,
      },

      {
        subItem: "Tourism Governors",
        linkL: "users/tourism-governors",
        subMenuActive: false,
      },
      {
        subItem: "Advertisers",
        linkL: "users/advertisers",
        subMenuActive: false,
      },
    ],
  },
  {
    menu: "Preference Tags",
    link: "preference-tags",
    submenu: false,
  },
  {
    menu: "Activity Categories",
    link: "activity-categories",
    submenu: false,
  },
  {
    menu: "Products",
    link: "products",
    submenu: false,
  },
];
