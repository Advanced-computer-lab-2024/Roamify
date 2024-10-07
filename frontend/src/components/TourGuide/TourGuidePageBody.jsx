import React from "react";
import { Route, Routes } from "react-router-dom";
import CreateTourGuideProfile from "./createTourGuideProfile";
import EditTourGuideProfile from "./editTourGuideProfile";
import CreateTourGuideItinerary from "./CreateTourGuideItinerary";
import EditTourGuideItinerary from "./EditTourGuideItinerary";
import ItineraryList from "./ItineraryList";
import ViewAllCreatedItineraries from "./ViewAllCreatedIteneraries";


const TourGuidePageBody = () => {
    return (
        <div className="flex-1 p-5">
            <Routes>
                <Route path="profile/create" element={<CreateTourGuideProfile />} />
                <Route path="profile/edit" element={<EditTourGuideProfile />} />
                <Route path="itineraries/create" element={<CreateTourGuideItinerary />} />
                <Route path="itineraries/edit" element={<EditTourGuideItinerary />} />
                <Route path="itineraries/my-itineraries" element={<ItineraryList />} />
                <Route path="itineraries/all-itineraries" element={<ViewAllCreatedItineraries />} />

                <Route path="/" element={<ViewAllCreatedItineraries />} />
            </Routes>
        </div>
    );
};

export default TourGuidePageBody;