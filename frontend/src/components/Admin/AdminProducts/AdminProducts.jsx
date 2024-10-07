import React, { useState, useEffect } from "react";
import AddProductButton from "./AddProductButton"; // Import the AddProductButton for adding products
import "./AdminProducts.css";
import axios from "axios";
import ProductsTable from "./ProductsTable";

const AdminProducts = () => {
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(1000);
  const [sortByRating, setSortByRating] = useState("none");

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/product/get-all`
        );
        setProducts(response.data.products);
        console.log(response.data.products);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchUsers();
  }, []);

  // Handle adding a new product to the list
  const handleAddProduct = (newProduct) => {
    setProducts([...products, { ...newProduct, id: products.length + 1 }]);
  };

  // Handle editing an existing product
  const handleEditProduct = (productId, updatedProductData) => {
    setProducts(
      products.map((product) =>
        product.id === productId
          ? { ...product, ...updatedProductData }
          : product
      )
    );
  };

  // Filter products by name and price
  const filteredProducts = products
    .filter(
      (product) =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
        product.price >= minPrice &&
        product.price <= maxPrice
    )
    .sort((a, b) => {
      if (sortByRating === "asc") {
        return a.rating - b.rating;
      } else if (sortByRating === "desc") {
        return b.rating - a.rating;
      }
      return 0; // No sorting
    });

  return (
    <div className="admin-products-page">
      <h1>Products</h1>

      {/* Search Bar */}
      <input
        type="text"
        placeholder="Search by product name..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="search-bar"
      />

      {/* Price Filter */}
      <div className="price-filter">
        <label>
          Min Price:
          <input
            type="number"
            value={minPrice}
            onChange={(e) => setMinPrice(Number(e.target.value))}
            min="0"
            className="price-input"
          />
        </label>
        <label>
          Max Price:
          <input
            type="number"
            value={maxPrice}
            onChange={(e) => setMaxPrice(Number(e.target.value))}
            min="0"
            className="price-input"
          />
        </label>
      </div>

      {/* Sort by Ratings and Add Product Button */}
      <div className="sort-and-add">
        <div className="sort-by-rating">
          <label>
            Sort by Rating:
            <select
              value={sortByRating}
              onChange={(e) => setSortByRating(e.target.value)}
              className="sort-select"
            >
              <option value="none">None</option>
              <option value="asc">Ascending</option>
              <option value="desc">Descending</option>
            </select>
          </label>
        </div>
        <AddProductButton onCreate={handleAddProduct} />
      </div>

      {/* Pass the filtered products to the ProductsTable */}
      <ProductsTable products={filteredProducts} />
    </div>
  );
};

export default AdminProducts;
