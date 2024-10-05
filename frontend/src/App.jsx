import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import NavBar from "../src/components/NavBar/NavBar.jsx";
import AdminPage from "./pages/AdminPage.jsx";
import LoginPage from "./pages/LoginPage.jsx";
import { BrowserRouter as Router } from "react-router-dom";
import MainRoutes from "./Routes.jsx";

function App() {
  const [count, setCount] = useState(0);

  return <MainRoutes />;
}

import React from "react";
import ProductCard from "./components/Cards/ProductCard.jsx"; // Import the ProductCard component
import "./App.css";
function App() {
  // Sample product data
  const products = [
    {
      name: "Wireless Headphones",
      description: "High quality wireless headphones with noise cancellation.",
      price: 99.99,
      seller: "BestSound Inc.",
      rating: 4.5,
      imageUrl: "https://example.com/headphones.jpg", // replace with an actual image URL
      reviews: [
        {
          reviewer: "John Doe",
          comment: "Great sound quality and battery life!",
        },
        {
          reviewer: "Jane Smith",
          comment: "Very comfortable and easy to use.",
        },
      ],
    },
    {
      name: "Smartwatch",
      description:
        "Feature-packed smartwatch with fitness tracking and notifications.",
      price: 199.99,
      seller: "TechGear Pro",
      rating: 4.7,
      imageUrl: "https://example.com/smartwatch.jpg", // replace with an actual image URL
      reviews: [
        {
          reviewer: "Alice Johnson",
          comment: "Perfect for tracking my workouts and staying connected.",
        },
      ],
    },
  ];

  return (
    <div className="App">
      {/* Map over the products array to display multiple ProductCard components */}
      {products.map((product, index) => (
        <ProductCard key={index} product={product} />
      ))}
    </div>
  );
}

export default App;
