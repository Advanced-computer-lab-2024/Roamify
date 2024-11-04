import React from "react";
// import Commonbanner
import CommonBanner from "../component/Common/CommonBanner";
// import Search Form
import SearchForm from "../component/Home/SearchForm";
// import Tour Search Area
import TouristProductsArea from "../component/TouristProducts";

const TouristProducts = () => {
  return (
    <>
      <CommonBanner heading="Tourist Products" pagination="products" />
      {/* <SearchForm /> */}
      <TouristProductsArea />
    </>
  );
};

export default TouristProducts;
