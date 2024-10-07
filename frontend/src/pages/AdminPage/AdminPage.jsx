import React from "react";
import NavBar from "../../components/NavBar/NavBar.jsx";
import { adminNavBarItems } from "../../constants/variables.jsx";
import AdminUsers from "../../components/Admin/UsersPage/AdminUsers.jsx";
import { BrowserRouter as Router } from "react-router-dom";
import AdminPageBody from "../../components/Admin/AdminPageBody.jsx";

const AdminPage = () => {
  return (
    <div className="flex flex-row">
      <NavBar userType={"admin"} items={adminNavBarItems} />
      <AdminPageBody />
    </div>
  );
};

export default AdminPage;
