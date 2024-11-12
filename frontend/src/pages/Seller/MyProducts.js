import React from "react";
// import Commonbanner
import CommonBanner from "../../component/Common/CommonBanner";

import MyProductsListArea from "./MyProductsListArea";

const MyProducts = () => {
  return (
    <>
      <CommonBanner heading="Tour search result" pagination="Tour" />
      {/* <SearchForm /> */}
      <MyProductsListArea />
    </>
  );
};

export default MyProducts;
