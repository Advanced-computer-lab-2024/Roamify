import React from "react";
import { Routes, Route } from "react-router-dom";

import Home from "../../page/Home.js";
import Header from "../../layout/Header";
import Profile from "../../page/Profile";
import CopyRight from "../../layout/CopyRight";
import { HeaderData } from "./SellerHeaderData.js";
import Products from "../Admin/Products/Products.js";
import MyProducts from "./MyProducts.js";
import Settings from "../Profile/Settings.js";

const Seller = () => {
  return (
    <>
      <Header HeaderData={HeaderData} />
      <Routes>
        {/* <Route path="/" element={<Home />} /> */}
        <Route path="/" element={<Products isAdmin={false} />} />
        <Route path="/my-products" element={<MyProducts />} />
        <Route path="/profile/:id" element={<Profile />} />
        <Route path="/settings/*" element={<Settings />} />
      </Routes>
      <CopyRight />
    </>
  );
};

export default Seller;
