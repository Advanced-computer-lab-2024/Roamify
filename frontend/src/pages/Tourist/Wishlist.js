import React, { useState, useEffect } from "react";
import axios from "axios";
import { FaTrashAlt } from "react-icons/fa";

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
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWishlistData();
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  // Function to handle deleting a product from the wishlist
  const handleDelete = async (productId) => {
    setProductToDelete(productId); // Set the product to be deleted
    setShowModal(true); // Show the confirmation modal
  };

  const confirmDelete = async () => {
    try {
      // API call to remove the product from the wishlist
      await axios.delete(`http://localhost:3000/api/wishlist/remove-product/${productToDelete}`, {
        withCredentials: true,
      });

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
  const handleAddToCart = (productId) => {
    console.log(`Adding product ${productId} to cart`);
  };

  // Function to close the popup modal
  const closePopup = () => {
    setShowModal(false);
  };

  return (
    <>
      <div style={styles.pageContainer}>
        <h2 style={{ textAlign: "center", marginBottom: "20px" }}>Your Wishlist</h2>
        <div style={styles.infoContainer}>
          {wishlistData?.wishlist?.length > 0 ? (
            <div style={styles.cardsContainer}>
              {wishlistData.wishlist.map((item, index) => (
                <div className="flight_search_item_wrappper" key={index}>
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
                          <div className="flight_logo">
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
                            style={styles.addToCartBtn}
                          >
                            Add to Cart
                          </button>
                          <button
                            onClick={() => handleDelete(item.productId)}
                            style={styles.deleteBtn}
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
            <p>Your wishlist is empty.</p>
          )}
        </div>
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
            <p>Are you sure you want to remove this product from your wishlist?</p>
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
    minHeight:"100vh"
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
