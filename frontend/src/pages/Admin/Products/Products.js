import React from "react";
// import Commonbanner
import CommonBanner from "../../../component/Common/CommonBanner";
// import Search Form
// import Tour Search Area
import ProductsListArea from "./ProductsListArea";

const Products = ({ isAdmin }) => {
  return (
    <>
      {/* <SearchForm /> */}
      <ProductsListArea isAdmin={isAdmin} />
    </>
  );
};

export default Products;
