export const HeaderData = [
  {
    menu: "Home",
    link: "tourist-profile",
  },

  {
    menu: "Activities",
    submenu: true,
    subMenuitem:[
      {
          subItem:"View All",
          linkL:"/tourist/tourist-activities",
          subMenuActive:false,
      },
     
      {
          subItem:"Booked Activities",
          linkL:"/tourist/tourist-view",
          subMenuActive:false,
      },
   ]
  },
  {
    menu: "Itineraries",
    link: "tourist-itinerary",
    submenu: false,
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
    submenu:true,
    subMenuitem:[
       {
           subItem:"File A Complain",
           linkL:"/tourist/tourist-complain",
           subMenuActive:false,
       },
      
       {
           subItem:"View All",
           linkL:"/tourist/tourist-view",
           subMenuActive:false,
       },
    ]
  },
];
