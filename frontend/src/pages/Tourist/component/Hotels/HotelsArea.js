import React, { useEffect, useState } from "react";
import axios from "axios";
import SectionHeading from "../../../../component/Common/SectionHeading";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const HotelsArea = () => {
  const [cities, setCities] = useState([]);
  const [selectedCity, setSelectedCity] = useState("");
  const [cityCode, setCityCode] = useState("");
  const [hotels, setHotels] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchInput, setSearchInput] = useState("");

  const fetchCities = async () => {
    if (!searchInput) return;

    setLoading(true);
    try {
      const response = await axios.get(
        `https://www.aviationapi.com/v1/airports/${searchInput}`
      );

      if (response.data.length === 0) {
        toast.info("No cities found");
        setCities([]);
      } else {
        setCities(response.data); // Populate cities with data from API
      }
    } catch (error) {
      console.error(
        "Error fetching cities:",
        error.response || error.message || error
      );
      toast.error("An error occurred while fetching cities.");
    }
    setLoading(false);
  };

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
        setHotels(response.data.hotels || []); // Populate hotels with data from API
      }
    } catch (error) {
      console.error(
        "Error fetching hotels:",
        error.response || error.message || error
      );
      toast.error("An error occurred while fetching hotels.");
    }
    setLoading(false);
  };

  const handleCitySelect = (city) => {
    setSelectedCity(city.name);
    setCityCode(city.code);
    fetchHotels(city.code); // Fetch hotels based on the city code
  };

  const handleSearchInputChange = (event) => {
    setSearchInput(event.target.value);
  };

  const handleSearchClick = () => {
    fetchCities(); // Call to fetch cities based on the input
  };

  return (
    <section id="hotels_section" className="section_padding">
      <ToastContainer />
      <div className="container">
        <SectionHeading heading={`${hotels.length} hotels found`} />

        <div className="row">
          <div className="col-lg-3">
            <div className="left_side_search_boxed">
              <div className="left_side_search_heading">
                <h5>Search by City</h5>
              </div>
              <input
                className="form-control"
                type="text"
                placeholder="Enter city name"
                value={searchInput}
                onChange={handleSearchInputChange}
                style={{ marginBottom: "10px" }}
              />
              <button
                onClick={handleSearchClick}
                className="btn btn_theme btn_sm"
              >
                Search Cities
              </button>

              {loading ? (
                <p>Loading cities...</p>
              ) : (
                <div>
                  {cities.length > 0 && (
                    <div className="city-list">
                      {cities.map((city, index) => (
                        <div
                          key={index}
                          className="city-option"
                          onClick={() => handleCitySelect(city)}
                        >
                          <h6>
                            {city.name} ({city.code})
                          </h6>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>

          <div className="col-lg-9">
            <div className="row">
              {loading ? (
                <p>Loading hotels...</p>
              ) : (
                hotels.map((hotel, index) => (
                  <div
                    className="col-lg-4 col-md-6 col-sm-6 col-12"
                    key={hotel._id || index}
                  >
                    <div
                      className="hotel-box"
                      style={{
                        padding: "10px",
                        border: "1px solid #ddd",
                        marginBottom: "20px",
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
        </div>
      </div>
    </section>
  );
};

export default HotelsArea;
