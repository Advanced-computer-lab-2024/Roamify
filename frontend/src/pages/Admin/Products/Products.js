import React from "react";
// import Commonbanner
import CommonBanner from "../../../component/Common/CommonBanner";
// import Search Form
// import Tour Search Area
import ProductsListArea from "./ProductsListArea";

const Products = () => {
  return (
    <>
      <CommonBanner heading="Tour search result" pagination="Tour" />
      {/* <SearchForm /> */}
      <ProductsListArea />
    </>
  );
};

export default Products;
