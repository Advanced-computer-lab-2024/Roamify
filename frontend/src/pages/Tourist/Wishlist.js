import React, { useState, useEffect } from "react";
import axios from "axios";
import { FaTrashAlt } from "react-icons/fa";
import { FaShoppingCart } from "react-icons/fa";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import LoadingLogo from "../../component/LoadingLogo";
import EmptyResponseLogo from "../../component/EmptyResponseLogo.js";

const Wishlist = () => {
  const [wishlistData, setWishlistData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [productToDelete, setProductToDelete] = useState(null);

  // Fetch wishlist data from the server
  const fetchWishlistData = async () => {
    try {
      const response = await axios.get("http://localhost:3000/api/wishlist/", {
        withCredentials: true,
      });
      setWishlistData(response.data);
    } catch (err) {
      if (err.response && err.response.status === 404) {
        setError("Wishlist is empty.");
      } else {
        setError(err.message);
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWishlistData();
  }, []);

  if (loading) {
    return <LoadingLogo isVisible={true} />;
  }

  if (error) {
    return <p> {error}</p>;
  }

  // Function to handle deleting a product from the wishlist
  const handleDelete = async (productId) => {
    setProductToDelete(productId); // Set the product to be deleted
    setShowModal(true); // Show the confirmation modal
  };

  const confirmDelete = async () => {
    try {
      // API call to remove the product from the wishlist
      await axios.delete(
        `http://localhost:3000/api/wishlist/${productToDelete}`,
        {
          withCredentials: true,
        }
      );

      // Re-fetch the wishlist data after deletion
      fetchWishlistData();

      setShowModal(false); // Close the modal after deleting
    } catch (err) {
      setError("Failed to remove item from wishlist.");
      setShowModal(false); // Close the modal in case of an error
    }
  };

  const cancelDelete = () => {
    setShowModal(false); // Close the modal without deleting
  };

  // Function to handle adding a product to the cart (placeholder)

  const handleAddToCart = async (productId) => {
    try {
      const response = await axios.post(
        `http://localhost:3000/api/wishlist/${productId}/cart`,
        {},
        { withCredentials: true }
      );
      // Show success message as toast
      toast.success(response.data.message || "Added to cart successfully!");

      // Re-fetch the wishlist data to remove the item from the list
      fetchWishlistData();
    } catch (err) {
      // Show error message as toast
      toast.error(err.response?.data?.message || "Failed to add to cart.");
      console.error("Error adding to cart:", err);
    }
  }; // Function to close the popup modal
  const closePopup = () => {
    setShowModal(false);
  };

  return (
    <>
      <div style={styles.pageContainer}>
        <h2 style={{ textAlign: "center", marginBottom: "20px" }}>
          Your Wishlist
        </h2>

        {wishlistData?.wishlist?.length > 0 ? (
          <div style={styles.cardsContainer}>
            {wishlistData.wishlist.map((item, index) => (
              <div
                className="flight_search_item_wrappper"
                key={index}
                style={{
                  boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)", // Initial shadow
                  transition: "transform 0.3s ease, box-shadow 0.3s ease", // Smooth transition
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "scale(1.05)"; // Enlarge
                  e.currentTarget.style.boxShadow =
                    "0px 8px 16px rgba(0, 0, 0, 0.2)"; // Stronger shadow
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "scale(1)"; // Reset size
                  e.currentTarget.style.boxShadow =
                    "0px 4px 8px rgba(0, 0, 0, 0.1)"; // Reset shadow
                }}
              >
                <div
                  className="flight_search_items"
                  style={{
                    background: "#ffffff",
                    border: "1px solid #dddddd",
                    borderRadius: "12px",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    display: "inline",
                  }}
                >
                  <div>
                    <div className="flight_multis_area_wrapper">
                      <div className="flight_search_left">
                        <div
                          className="flight_logo"
                          style={{ width: "250px", height: "250px" }}
                        >
                          <img src={item.picture[0].url} alt={item.name} />
                        </div>
                        <div>
                          <h2>{item.name}</h2>
                          <h5>by {item.sellerName}</h5>
                          <h5>Price ${item.price}</h5>
                        </div>
                      </div>
                      <div style={{ display: "flex", alignItems: "end" }}>
                        <button
                          onClick={() => handleAddToCart(item.productId)}
                          style={{
                            background: "#007bff",
                            border: "none",
                            cursor: "pointer",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            padding: "12px",
                            margin: "5px",
                            marginBottom: "1px",
                          }}
                        >
                          <FaShoppingCart size={20} />
                        </button>
                        <button
                          onClick={() => handleDelete(item.productId)}
                          style={{ margin: "2px" }}
                        >
                          <FaTrashAlt size={20} />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <EmptyResponseLogo
            isVisible={true}
            text={"Your wishlist is empty"}
            size="400px"
          />
        )}
      </div>

      {/* Popup Modal */}
      {showModal && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <div
            style={{
              backgroundColor: "#fff",
              padding: "20px",
              borderRadius: "8px",
              maxWidth: "500px",
              textAlign: "center",
            }}
          >
            <p>
              Are you sure you want to remove this product from your wishlist?
            </p>
            {productToDelete ? (
              <div>
                <button
                  onClick={confirmDelete}
                  style={{
                    marginTop: "10px",
                    padding: "10px 20px",
                    backgroundColor: "#8b3eea", // Purple Cancel
                    color: "#fff",
                    border: "none",
                    borderRadius: "5px",
                    cursor: "pointer",
                  }}
                >
                  Yes, Remove
                </button>
                <button
                  onClick={cancelDelete}
                  style={{
                    marginTop: "10px",
                    padding: "10px 20px",
                    backgroundColor: "#333",
                    color: "#fff",
                    border: "none",
                    borderRadius: "5px",
                    cursor: "pointer",
                    marginLeft: "10px",
                  }}
                >
                  No, I changed my mind
                </button>
              </div>
            ) : (
              <button
                onClick={closePopup}
                style={{
                  marginTop: "10px",
                  padding: "10px 20px",
                  backgroundColor: "#333",
                  color: "#fff",
                  border: "none",
                  borderRadius: "5px",
                  cursor: "pointer",
                }}
              >
                Close
              </button>
            )}
          </div>
        </div>
      )}
      <ToastContainer position="top-right" autoClose={3000} />
    </>
  );
};

// Styles for the page
const styles = {
  pageContainer: {
    padding: "20px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    minHeight: "100vh",
  },
  infoContainer: {
    width: "100%",
    maxWidth: "800px",
    backgroundColor: "#fff",
    padding: "20px",
    borderRadius: "8px",
    boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)",
  },
  cardsContainer: {
    width: "100%",
  },
  modalOverlay: {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 1000,
  },
  modalContainer: {
    backgroundColor: "#fff",
    padding: "20px",
    borderRadius: "8px",
    boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)",
    textAlign: "center",
    minWidth: "300px",
  },
  modalActions: {
    display: "flex",
    justifyContent: "space-between",
    marginTop: "20px",
  },
  confirmBtn: {
    backgroundColor: "#007bff",
    color: "#fff",
    padding: "8px 16px",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
  },
  cancelBtn: {
    backgroundColor: "gray",
    color: "#fff",
    padding: "8px 16px",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
  },
};

export default Wishlist;
