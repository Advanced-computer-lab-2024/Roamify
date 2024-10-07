import React from "react";
import NavBar from "../../components/NavBar/NavBar.jsx";
import { sellerNavBarItems } from "../../constants/variables.jsx";
import AdminUsers from "../../components/Admin/UsersPage/AdminUsers.jsx";
import { BrowserRouter as Router } from "react-router-dom";

import { SellerPageBody } from "../../components/Seller/SellerPageBody.jsx";

const SellerPage = () => {
  return (
    <div className="flex flex-row">
      <NavBar userType={"seller"} items={sellerNavBarItems} />
      <SellerPageBody />
    </div>
  );
};

export default SellerPage;
