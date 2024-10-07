import ProfileIcon from "../components/Icons/ProfileIcon";

export const tourGuideNavBarItems = [

    {
        icon: <ProfileIcon />,
        name: "Profile",
        children: [
            { name: "Create" },
            { name: "Edit" },
        ],
    },

    {
        icon: <ProfileIcon />,
        name: " Itineraries",
        children: [
            { name: "Create" },
            { name: "Edit" },
            { name: "View" },
            { name: "All" },


        ],
    },

    {
        icon: <ProfileIcon />,
        name: " Tourist-Itineraries",
        children: [
            { name: "Create" },
            { name: "Edit" },
        ],
    },

];