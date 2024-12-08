export const HeaderData = [
  {
    menu: "Home",
    link: "",
  },
  {
    menu: "Transportations",
    link: "transportations",
  },
  {
    menu: "Activities",
    submenu: true,
    subMenuitem: [
      {
        subItem: "View All",
        linkL: "/tourist/tourist-activities",
        subMenuActive: false,
      },

      {
        subItem: " My Booked Activities",
        linkL: "/tourist/activity-booking",
        subMenuActive: false,
      },
      {
        subItem: " My Completed Activities",
        linkL: "/tourist/completed-activity",
        subMenuActive: false,
      },
    ],
  },
  {
    menu: "Itineraries",
    submenu: true,
    subMenuitem: [
      {
        subItem: "View All",
        linkL: "/tourist/tourist-itinerary",
        subMenuActive: false,
      },

      {
        subItem: " My Booked Itineraries",
        linkL: "/tourist/itinerary-booking",
        subMenuActive: false,
      },
      {
        subItem: " My Completed Itineraries",
        linkL: "/tourist/completed-itinerary",
        subMenuActive: false,
      },
      {
        subItem: "Previous Tour Guides",
        linkL: "/tourist/tour-guides",
        subMenuActive: false,
      },
    ],
  },
  {
    menu: "Products",
    submenu: true,
    subMenuitem: [
      {
        subItem: "View All",
        linkL: "products",
        subMenuActive: false,
      },
    ],
  },
  {
    menu: "Places",
    link: "tourist-places",
    submenu: false,
  },
  {
    menu: "Complain",
    submenu: true,
    subMenuitem: [
      {
        subItem: "File A Complain",
        linkL: "/tourist/tourist-complain",
        subMenuActive: false,
      },

      {
        subItem: "View All",
        linkL: "/tourist/tourist-view",
        subMenuActive: false,
      },
    ],
  },
  {
    menu: "Points",
    submenu: true,
    subMenuitem: [
      {
        subItem: "View My Level",
        linkL: "/tourist/point",
        subMenuActive: false,
      },

      {
        subItem: "Redeem My Points",
        linkL: "/tourist/redeem",
        subMenuActive: false,
      },
    ],
  },
  {
    menu: " Orders",
    link: "orders",
  },
];
