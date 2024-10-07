import React from "react";
import { Route, Routes } from "react-router-dom";
import CreateAdvertiserProfile from "./CreateAdvertiserProfile.jsx"; // Import the CreateAdvertiserProfile component
import UpdateAdvertiserProfile from "./UpdateAdvertiserProfile.jsx"; // Import the UpdateAdvertiserProfile component
import CreateAdvertiserActivity from "./CreateAdvertiserActivity.jsx";
import EditAdvertiserActivity from "./EditAdvertiserActivity.jsx";
import ActivityListAdvertiser from "./ActivityList.jsx";


const AdvertiserPageBody = () => {
    return (
        <div className="flex-1 p-5">
            <Routes>
                <Route path="profile/create/:id" element={<CreateAdvertiserProfile />} />
                <Route path="profile/edit" element={<UpdateAdvertiserProfile />} />
                <Route path="activities/create" element={<CreateAdvertiserActivity />} />
                <Route path="activities/edit" element={<EditAdvertiserActivity />} />
                <Route path="activities/view" element={<ActivityListAdvertiser />} />

                <Route path="/" element={<CreateAdvertiserProfile />} />
            </Routes>
        </div>
    );
};

export default AdvertiserPageBody;