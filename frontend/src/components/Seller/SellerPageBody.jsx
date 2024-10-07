import React from "react";
import { Route, Routes } from "react-router-dom";
import SellerProducts from "./SellerProducts/SellerProducts";
import AdminProducts from "../Admin/AdminProducts/AdminProducts";

export const SellerPageBody = () => {
  return (
    <div className="flex-1 p-5">
      <Routes>
        <Route path="products" element={<AdminProducts />} />
      </Routes>
    </div>
  );
};

export default SellerPageBody;
