import React from "react";
import { Route, Routes } from "react-router-dom";
import CreateMuseums from "./CreateMuseums";
import EditMuseums from "./EditMuseums";
import MuseumsList from "./MuseumsList";

const TourismGovernerPageBody = () => {
    return (
        <div className="flex-1 p-5">
            <Routes>
                <Route path="historical-places/create" element={<CreateMuseums />} />
                <Route path="historical-places/edit" element={<EditMuseums />} />
                <Route path="historical-places/view" element={<MuseumsList />} />


                <Route path="/" element={<CreateMuseums />} />
            </Routes>
        </div>
    );
};

export default TourismGovernerPageBody;