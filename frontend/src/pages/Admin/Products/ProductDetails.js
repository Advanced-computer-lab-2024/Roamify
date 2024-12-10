import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import ProductDetailsArea from "./ProductDetailsArea";
import LoadingLogo from "../../../component/LoadingLogo";

const ProductDetails = () => {
  const { id } = useParams();
  const [desiredProduct, setDesiredProduct] = useState(null);

  console.log("Product ID from URL:", id);

  useEffect(() => {
    if (!id) {
      console.error("No ID provided from URL");
      return;
    }

    console.log("useEffect triggered with ID:", id);

    const fetchProducts = async () => {
      try {
        console.log("Fetching products...");
        const response = await axios.get(`http://localhost:3000/api/product`, {
          withCredentials: true,
        });
        console.log("Fetched products:", response.data.products);
        const product = response.data.products.find(
          (product) => product._id === id
        );
        setDesiredProduct(product || {});
      } catch (error) {
        console.error("Error fetching product:", error);
      }
    };

    fetchProducts();
  }, [id]);

  return (
    <div style={{ minHeight: "100vh" }}>
      {!desiredProduct ? (
        <LoadingLogo isVisible={true} size="100px" />
      ) : (
        <ProductDetailsArea
          name={desiredProduct.name}
          price={desiredProduct.price}
          img={desiredProduct.picture?.[0]?.url}
          rating={desiredProduct.rating}
          description={desiredProduct.description}
          reviews={desiredProduct.reviews}
          quantity={desiredProduct.quantity}
        />
      )}
    </div>
  );
};

export default ProductDetails;
