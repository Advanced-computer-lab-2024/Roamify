import React, { useState, useEffect } from "react";
// import Common Banner
import CommonBanner from "../../../component/Common/CommonBanner";
// import TourDetails

import { useParams } from "react-router-dom";
import axios from "axios";
import ProductDetailsArea from "./ProductDetailsArea";

const ProductDetails = () => {
  const { id } = useParams();
  const [desiredProduct, setDesiredProduct] = useState({});
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/api/product`, {
          withCredentials: true,
        });
        const products = response.data.products;
        setDesiredProduct(products.find((product) => product._id === id));
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchProducts();
  }, []);

  return (
    <>
      <CommonBanner heading="Product Details" pagination="Product Details" />
      <ProductDetailsArea
        name={desiredProduct.name}
        price={desiredProduct.price}
        rating={desiredProduct.reviewRating}
        description={desiredProduct.description}
        reviews={desiredProduct.reviewCount}
      />
    </>
  );
};

export default ProductDetails;
