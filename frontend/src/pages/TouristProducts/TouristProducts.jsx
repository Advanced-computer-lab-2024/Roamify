import React, { useState,useEffect } from "react";
import ProductsTable from "./ProductsTable.jsx"; // Import the ProductsTable component
import "./TouristProducts.css";

const TouristProducts = () => {
  const productsData = [
    {
      id: 1,
      name: "Wireless Headphones",
      description: "High quality wireless headphones with noise cancellation.",
      price: 99.99,
      seller: "BestSound Inc.",
      rating: 4.5,
      imageUrl: "https://example.com/headphones.jpg",
      reviews: [
        { reviewer: "John Doe", comment: "Nice" },
        {
          reviewer: "Jane Smith",
          comment: "Great sound quality and battery life!",
        },
      ],
    },
    {
      id: 2,
      name: "Smartwatch",
      description:
        "Feature-packed smartwatch with fitness tracking and notifications.",
      price: 199.99,
      seller: "TechGear Pro",
      rating: 4.7,
      imageUrl: "https://example.com/smartwatch.jpg",
      reviews: [
        {
          reviewer: "Alice Johnson",
          comment: "Perfect for tracking workouts.",
        },
      ],
    },
    {
      id: 3,
      name: "Bluetooth Speaker",
      description: "Portable Bluetooth speaker with amazing sound quality.",
      price: 49.99,
      seller: "SoundPro",
      rating: 4.2,
      imageUrl: "https://example.com/speaker.jpg",
      reviews: [],
    },
  ];

  const [products, setProducts] = useState(productsData);
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
        setProducts(response.data);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchUsers();
  }, [products]);

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
      </div>

      {/* Pass the filtered products to the ProductsTable */}
      <ProductsTable
        products={filteredProducts}
      />
    </div>
  );
};

export default TouristProducts;
