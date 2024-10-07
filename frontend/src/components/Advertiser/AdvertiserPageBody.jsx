import React from "react";
import { Route, Routes } from "react-router-dom";
import CreateAdvertiserProfile from "./CreateAdvertiserProfile.jsx"; // Import the CreateAdvertiserProfile component
import UpdateAdvertiserProfile from "./UpdateAdvertiserProfile.jsx"; // Import the UpdateAdvertiserProfile component
import CreateAdvertiserActivity from "./CreateAdvertiserActivity.jsx";
import ActivityListAdvertiser from "./ActivityListAdvertiser.jsx";
import ViewAllCreatedActivities from "./ViewAllCreatedActivities.jsx";


const AdvertiserPageBody = () => {
    return (
        <div className="flex-1 p-5">
            <Routes>
                <Route path="profile/create" element={<CreateAdvertiserProfile />} />
                <Route path="profile/edit" element={<UpdateAdvertiserProfile />} />
                <Route path="activities/create" element={<CreateAdvertiserActivity />} />
                <Route path="activities/my-activities" element={<ActivityListAdvertiser />} />
                <Route path="activities/all-activities" element={<ViewAllCreatedActivities />} />


                <Route path="/" element={<ViewAllCreatedActivities />} />
            </Routes>
        </div>
    );
};

export default AdvertiserPageBody;