import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import TouristHomePage from "./pages/TouristHomePage.jsx";

const TouristRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* Redirect "/" to "/tourist" */}
        <Route path="/" element={<Navigate to="/tourist" />} />
        <Route path="/tourist/*" element={<TouristHomePage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default TouristRoutes;
