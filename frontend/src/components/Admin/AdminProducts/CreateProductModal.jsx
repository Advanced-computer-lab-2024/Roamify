import React, { useState } from "react";
import "./AdminProducts.css";
import axios from "axios";
const CreateProductModal = ({ isOpen, onClose, onCreate }) => {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    quantity: "",
  });

  const userId = localStorage.getItem("userId");

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    const data = {
      name: formData.name,
      description: formData.description,
      price: formData.price,
      quantity: formData.quantity,
    };

    axios
      .post(`http://localhost:3000/product/add-product/${userId}`, data)
      .then((result) => {
        // onCreate(result.data); // Pass the created user data back
        onClose();
        if (res) console.log("product Data Sent:", result.data);
      })
      .catch((err) => {
        if (err.response && err.response.status === 400) {
          const errorMessage = err.response.data.message;
          if (errorMessage === "Email already exists") {
            alert("Error: Email already exists. Please use a different email.");
          } else if (errorMessage === "Username already Exists") {
            alert(
              "Error: Username already exists. Please choose a different username."
            );
          } else {
            alert(`Error: ${errorMessage}`);
          }
        } else {
          alert(`An unexpected error occurred: ${err.toString()}`);
        }
      });
  };

  if (!isOpen) return null;

  return (
    <div className="modal-backdrop">
      <div className="modal-content">
        <h2>Add New Product</h2>
        <form onSubmit={handleSubmit} className="product-form">
          <input
            type="text"
            name="name"
            placeholder="Product Name"
            value={formData.name}
            onChange={handleInputChange}
            required
          />
          <textarea
            name="description"
            placeholder="Product Description"
            value={formData.description}
            onChange={handleInputChange}
            required
          />
          <input
            type="number"
            name="price"
            placeholder="Product Price"
            value={formData.price}
            onChange={handleInputChange}
            required
          />
          <input
            type="number"
            name="quantity"
            placeholder="Available Quantity"
            value={formData.quantity}
            onChange={handleInputChange}
            required
          />

          {/* Buttons with added margin between them */}
          <div className="modal-buttons">
            <button type="submit" className="add-button">
              Add Product
            </button>
            <button type="button" onClick={onClose} className="cancel-button">
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateProductModal;
