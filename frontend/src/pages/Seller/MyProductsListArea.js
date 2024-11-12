import React, { useState, useEffect } from "react";
import axios from "axios";
import ProductCard from "../Admin/Products/ProductCard";
import AddProductButton from "../Admin/Products/AddProductButton";
import SectionHeading from "../../component/Common/SectionHeading";

const MyProductsListArea = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3000/api/product/fetch-my-products",
          { withCredentials: true }
        );
        setProducts(response.data.products);
      } catch (error) {
        console.error("Error fetching products:", error);
        setProducts([]);
      } finally {
        setIsLoading(false);
      }
    };
    fetchProducts();
  }, []);

  // Function to toggle the archive status of a product
  const toggleArchive = async (productId) => {
    try {
      const response = await axios.post(
        `http://localhost:3000/api/product/archive/${productId}`,
        {}, // No body required as per your screenshot
        { withCredentials: true }
      );
      if (response.status === 200) {
        setProducts((prevProducts) =>
          prevProducts.map((product) =>
            product._id === productId
              ? { ...product, isArchived: !product.isArchived }
              : product
          )
        );
        alert("Product archive status updated successfully.");
      }
    } catch (error) {
      console.error("Error archiving product:", error);
      alert("Failed to update archive status.");
    }
  };

  return (
    <section id="explore_area" className="section_padding">
      <div className="container">
        <SectionHeading heading={`${products.length} Products found`} />
        <div className="row">
          <div className="col-lg-3">
            <AddProductButton />
          </div>
          <div className="col-lg-9">
            <div className="row">
              {isLoading ? (
                <p>Loading products...</p>
              ) : products.length > 0 ? (
                products.map((product) => (
                  <ProductCard
                    key={product._id}
                    id={product._id}
                    img={product.picture[0]?.url || ""}
                    name={product.name}
                    description={product.description}
                    quantity={product.quantity}
                    price={product.price}
                    isAdmin={true}
                    isArchived={product.isArchived}
                  />
                ))
              ) : (
                <p>No products found.</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MyProductsListArea;
