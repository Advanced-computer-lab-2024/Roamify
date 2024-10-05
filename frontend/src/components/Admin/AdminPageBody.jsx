import React from "react";
import { Route, Routes } from "react-router-dom";
import AdminDashboard from "./AdminDashboardPage/AdminDashboard.jsx";
import AdminUsers from "./UsersPage/AdminUsers.jsx";
import AdminTourismGovernor from "./AdminTourismGovernerPage/AdminTourismGoverner.jsx";
import AdminActivities from "./AdminActivitiesPage/AdminActivities.jsx";

const AdminPageBody = () => {
  return (
    <div className="flex-1 p-5">
      <Routes>
        <Route path="dashboard" element={<AdminDashboard />} />
        <Route
          path="users/tourists"
          element={<AdminUsers usersName="Tourists" />}
        />
        <Route
          path="users/sellers"
          element={<AdminUsers usersName="Sellers" />}
        />
        <Route
          path="users/tour-guides"
          element={<AdminUsers usersName="Tour Guides" />}
        />
        <Route
          path="users/tourism-governors"
          element={<AdminTourismGovernor />}
        />
        <Route path="activities/food" element={<AdminActivities />} />

        <Route path="/" element={<AdminDashboard />}></Route>
      </Routes>
    </div>
  );
};

export default AdminPageBody;
