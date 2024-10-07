import React from "react";
import { Route, Routes } from "react-router-dom";
import CreateTourGuideProfile from "./CreateTourGuideProfile";
import EditTourGuideProfile from "./EditTourGuideProfile";
import CreateTourGuideItinerary from "./CreateTourGuideItinerary";
import EditTourGuideItinerary from "./EditTourGuideItinerary";
import CreateTouristItinerary from "./CreateTouristItinerary";
import EditTouristItinerary from "./EditTouristItinerary";
import ItineraryList from "./ItineraryList";
import ViewAllCreatedItineraries from "./ViewAllCreatedItineraries"

const TourGuidePageBody = () => {
    return (
        <div className="flex-1 p-5">
            <Routes>
                <Route path="profile/create/:id" element={<CreateTourGuideProfile />} />
                <Route path="profile/edit" element={<EditTourGuideProfile />} />
                <Route path="itineraries/create" element={<CreateTourGuideItinerary />} />
                <Route path="itineraries/edit" element={<EditTourGuideItinerary />} />
                <Route path="itineraries/view" element={<ItineraryList />} />
                <Route path="itineraries/all" element={<ViewAllCreatedItineraries />} />

                <Route path="tourist-itineraries/create" element={<CreateTouristItinerary />} />
                <Route path="tourist-itineraries/edit" element={<EditTouristItinerary />} />



                <Route path="/" element={<ViewAllCreatedItineraries />} />
            </Routes>
        </div>
    );
};

export default TourGuidePageBody;