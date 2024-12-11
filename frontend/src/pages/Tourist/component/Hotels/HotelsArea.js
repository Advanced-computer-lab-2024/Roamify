import React, { useEffect, useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const HotelsArea = () => {
  const [cities, setCities] = useState([]);
  const [selectedCity, setSelectedCity] = useState("");
  const [cityCode, setCityCode] = useState("");
  const [hotels, setHotels] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchInput, setSearchInput] = useState("");

  // Fetch cities based on search input
  const fetchCities = async () => {
    if (!searchInput) return;

    setLoading(true);
    try {
      const response = await axios.get(
        `https://api.aviationstack.com/v1/cities`
      );

      if (response.data.length === 0) {
        toast.info("No cities found");
        setCities([]);
      } else {
        setCities(response.data);
      }
    } catch (error) {
      console.error("Error fetching cities:", error);
      toast.error("An error occurred while fetching cities.");
    }
    setLoading(false);
  };

  // Fetch hotels based on selected city code
  const fetchHotels = async (cityCode) => {
    if (!cityCode) return;

    setLoading(true);
    try {
      const response = await axios.get(
        "http://localhost:3000/api/hotels/search",
        {
          params: { cityCode },
          withCredentials: true,
        }
      );

      if (response.data.message === "No hotels found") {
        toast.info("No hotels found for the selected city");
        setHotels([]);
      } else {
        setHotels(response.data.hotels || []);
      }
    } catch (error) {
      console.error("Error fetching hotels:", error);
      toast.error("An error occurred while fetching hotels.");
    }
    setLoading(false);
  };

  // Handle city select from search results
  const handleCitySelect = (city) => {
    setSelectedCity(city.name);
    setCityCode(city.code);
    fetchHotels(city.code);
  };

  const handleSearchInputChange = (event) => {
    setSearchInput(event.target.value);
  };

  const handleSearchClick = () => {
    fetchCities();
  };

  return (
    <section
      id="hotels_section"
      className="section_padding"
      style={{ paddingTop: "50px", minHeight: "100vh" }}
    >
      <ToastContainer />
      <div className="container">
        {/* Search Bar Section */}
        <div
          className="row"
          style={{
            marginBottom: "30px",

            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {/* Left side: Search bar for Cities */}
          <div className="col-md-10 col-sm-12">
            <div
              className="search-container"
              style={{
                backgroundColor: "#fff",
                padding: "15px",
                borderRadius: "8px",
                boxShadow: "0 2px 5px rgba(0, 0, 0, 0.1)",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <div
                style={{ display: "flex", alignItems: "center", width: "80%" }}
              >
                <input
                  className="form-control"
                  type="text"
                  placeholder="Enter city name"
                  value={searchInput}
                  onChange={handleSearchInputChange}
                  style={{
                    padding: "10px",
                    borderRadius: "4px",
                    border: "1px solid #ddd",
                    width: "100%",
                  }}
                />
                <button
                  onClick={handleSearchClick}
                  className="btn btn_theme"
                  style={{
                    marginLeft: "10px",
                    backgroundColor: "#007bff",
                    color: "#fff",
                    padding: "10px 15px",
                    border: "none",
                    borderRadius: "4px",
                  }}
                >
                  Search Cities
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Cities List */}
        <div className="city-list" style={{ marginBottom: "30px" }}>
          {loading ? (
            <p>Loading cities...</p>
          ) : (
            cities.length > 0 && (
              <div className="city-options">
                {cities.map((city, index) => (
                  <div
                    key={index}
                    className="city-option"
                    onClick={() => handleCitySelect(city)}
                    style={{
                      padding: "10px",
                      marginBottom: "10px",
                      border: "1px solid #ddd",
                      borderRadius: "5px",
                      cursor: "pointer",
                      backgroundColor: "#f9f9f9",
                    }}
                  >
                    <h6>
                      {city.name} ({city.code})
                    </h6>
                  </div>
                ))}
              </div>
            )
          )}
        </div>

        {/* Hotels Grid */}
        <div className="row">
          {loading ? (
            <p>Loading hotels...</p>
          ) : (
            hotels.map((hotel, index) => (
              <div
                className="col-lg-4 col-md-6 col-sm-12"
                key={hotel._id || index}
                style={{ padding: "10px" }}
              >
                <div
                  className="hotel-box"
                  style={{
                    padding: "15px",
                    border: "1px solid #ddd",
                    borderRadius: "8px",
                    boxShadow: "0 2px 5px rgba(0, 0, 0, 0.1)",
                    transition: "transform 0.3s ease",
                    cursor: "pointer",
                  }}
                >
                  <img
                    src={hotel.image || "default-image.jpg"}
                    alt={hotel.name}
                    style={{
                      width: "100%",
                      height: "200px",
                      objectFit: "cover",
                      borderRadius: "8px",
                      marginBottom: "10px",
                    }}
                  />
                  <h5>{hotel.name}</h5>
                  <p>{hotel.location}</p>
                  <p>{hotel.price} EGP/night</p>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </section>
  );
};

export default HotelsArea;
