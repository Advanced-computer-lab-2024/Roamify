import React from "react";
import { Route, Routes } from "react-router-dom";
import AdminProducts from "../Admin/AdminProducts/AdminProducts";
import CreateSellerProfile from "./CreateSellerProfile";
import EditSellerProfile from "./EditSellerProfile";
export const SellerPageBody = () => {
  return (
    <div className="flex-1 p-5">
      <Routes>
        <Route path="products" element={<AdminProducts />} />
        <Route path="account/create/:id" element={<CreateSellerProfile />} />
        <Route path="account/edit" element={<EditSellerProfile />} />
      </Routes>
    </div>
  );
};

export default SellerPageBody;
