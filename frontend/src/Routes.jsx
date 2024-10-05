import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import AdminDashboard from "./components/Admin/AdminDashboardPage/AdminDashboard";
import AdminPageBody from "./components/Admin/AdminPageBody";
import AdminPage from "./pages/AdminPage";

const MainRoutes = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/admin/*" element={<AdminPage />} />
      </Routes>
    </Router>
  );
};

export default MainRoutes;
