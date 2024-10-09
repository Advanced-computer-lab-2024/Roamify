import React from "react";
import { Route, Routes } from "react-router-dom";
import CreateMuseums from "./CreateMuseums";
import ViewAllCreatedPlaces from "./ViewAllCreatedPlaces";
import MuseumsList from "./MuseumsList";
import CreateTag from "./CreateTag";

const TourismGovernerPageBody = () => {
  return (
    <div className="flex-1 p-5">
      <Routes>
        <Route path="historical-places/create" element={<CreateMuseums />} />
        <Route path="historical-places/my-places" element={<MuseumsList />} />
        <Route
          path="historical-places/all-places"
          element={<ViewAllCreatedPlaces />}
        />
        <Route path="historical-places/create-tag" element={<CreateTag />} />

        <Route path="/" element={<ViewAllCreatedPlaces />} />
      </Routes>
    </div>
  );
};

export default TourismGovernerPageBody;
