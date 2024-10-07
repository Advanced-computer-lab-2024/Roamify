import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginPage from "./pages/LoginPage/LoginPage.jsx";
import AdminDashboard from "./components/Admin/AdminDashboard/AdminDashboard.jsx";
import AdminPageBody from "./components/Admin/AdminPageBody";
import AdminPage from "./pages/AdminPage/AdminPage.jsx";
import AdvertisorPage from "./pages/AdvertiserPage/AdvertiserPage.jsx";
import SellerPage from "./pages/SellerPage/SellerPage.jsx";
import AdvertiserPage from "./pages/AdvertisorPage.jsx";
import AdvertiserPageBody from "./components/Advertiser/AdvertiserPageBody";
import TourGuidePage from "./pages/TourGuidePage";
import TourGuidePageBody from "./components/TourGuide/TourGuidePageBody";
import TourismGovernerPage from "./pages/TourismGovernerPage";
import TourismGovernerPageBody from "./components/TourGuide/TourGuidePageBody.jsx";

import HomePage from "./pages/HomePage";
import SignUpPage from "./pages/SignupPage";

const MainRoutes = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/signup" element={<SignUpPage />} />

        <Route path="/login" element={<LoginPage />} />
        {/* <Route path="/" element={<SignUpPage />} /> */}

        <Route path="/admin/*" element={<AdminPage />} />
        <Route path="/advertiser/*" element={<AdvertiserPage />} />
        <Route path="/tourist/*" element={<AdminPage />} />
        <Route path="/seller/*" element={<SellerPage />} />                <Route path="/advertiser/*" element={<AdvertiserPage />} />
        <Route path="/tour-guide/*" element={<TourGuidePage />} />
        <Route path="/tourism-governer/*" element={<TourismGovernerPage />} />

      </Routes>
    </Router>
  );
};

export default MainRoutes;
