import React, { useState, useEffect } from "react";
import axios from "axios";
import ProductCard from "../Admin/Products/ProductCard";
import AddProductButton from "../Admin/Products/AddProductButton";
import SectionHeading from "../../component/Common/SectionHeading";
import LoadingLogo from "../../component/LoadingLogo";
import EmptyResoinseLogo from "../../component/EmptyResponseLogo.js";
import EmptyResponseLogo from "../../component/EmptyResponseLogo.js";

const MyProductsListArea = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState(""); // State to manage the search term

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

  useEffect(() => {
    fetchProducts();
  }, []);

  // Filter products based on search term
  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

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
        <SectionHeading heading={`${filteredProducts.length} Products found`} />
        <div className="row">
          <div className="col-lg-3">
            <div className="left_side_search_boxed">
              <div className="left_side_search_heading">
                <h5>Search by name</h5>
              </div>
              <div className="name_search_form">
                <input
                  type="text"
                  className="form-control"
                  placeholder="e.g Deluxe bus"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)} // Update search term
                />
                <i className="fas fa-search"></i>
              </div>
            </div>
            <AddProductButton fetchProducts={fetchProducts} />
          </div>
          <div className="col-lg-9">
            <div className="row">
              {isLoading ? (
                <LoadingLogo isVisible={true} size="200px" />
              ) : filteredProducts.length > 0 ? (
                filteredProducts.map((product) => (
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
                    fetchProducts={fetchProducts}
                    grid={true}
                  />
                ))
              ) : (
                <EmptyResponseLogo
                  isVisible={true}
                  text={"You don't have any products"}
                  size="200px"
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MyProductsListArea;
