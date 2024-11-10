export const HeaderData = [
  {
    menu: "Home",
    link: "tourist-profile",
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
    ],
  },
  {
    menu: "Itineraries",
    submenu: true,
    subMenuitem: [
      {
          subItem:"View All",
          linkL:"/tourist/tourist-itinerary",
          subMenuActive:false,
      },

      {
          subItem:" My Booked Itineraries",
          linkL:"/tourist/itinerary-booking",
          subMenuActive:false,
      },
    ],
  },
  {
    menu: "Products",
    link: "tourist-products",
    submenu: false,
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
    menu: "My Points",
    submenu:true,
    subMenuitem: [
      {
        subItem: "My Level",
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
];
