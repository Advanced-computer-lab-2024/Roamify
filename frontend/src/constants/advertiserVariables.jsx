import ProfileIcon from "../components/Icons/ProfileIcon";

export const advertiserNavBarItems = [

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
        name: "Activities",
        children: [
            { name: "Create" },
            { name: "My Activities" },
            { name: "All Activities" }

        ],
    },
];