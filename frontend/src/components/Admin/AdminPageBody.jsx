import React from "react";
import { Route, Routes } from "react-router-dom";
import AdminDashboard from "./AdminDashboard/AdminDashboard.jsx";
import AdminUsers from "./UsersPage/AdminUsers.jsx";
import AdminTourismGovernor from "./AdminTourismGoverner/AdminTourismGoverner.jsx";
import AdminActivities from "./AdminActivityCategories/AdminActivities.jsx";
import AdminAdvertisers from "./AdminAdvertisers/AdminAdvertisers.jsx";
import AdminProducts from "./AdminProducts/AdminProducts.jsx";
import AdminPreferenceTags from "./AdminPreferenceTags/AdminPreferenceTags.jsx";
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
        <Route
          path="users/advertisers"
          element={<AdminUsers usersName="Advertisers" />}
        />
        <Route path="products" element={<AdminProducts />} />

        <Route path="activity-categories" element={<AdminActivities />} />
        <Route path="preference-tags" element={<AdminPreferenceTags />} />

        <Route path="/" element={<AdminDashboard />}></Route>
      </Routes>
    </div>
  );
};

export default AdminPageBody;
