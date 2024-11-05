import React from "react";
import { Routes, Route } from "react-router-dom";

import Home from "../../page/Home.js";
import Header from "../../layout/Header";
import Profile from "../../page/Profile";
import CopyRight from "../../layout/CopyRight";
import { HeaderData } from "./SellerHeaderData.js";
import Products from "../Admin/Products/Products.js";

const Seller = () => {
  return (
    <>
      <Header HeaderData={HeaderData} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<Products />} />
        <Route path="/profile/:id" element={<Profile />} />
      </Routes>
      <CopyRight />
    </>
  );
};

export default Seller;
