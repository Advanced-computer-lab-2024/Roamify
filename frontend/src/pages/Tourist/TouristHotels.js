import React, { useState } from "react";
import axios from "axios";
import LoadingLogo from "../../component/LoadingLogo";
import { ToastContainer, toast } from "react-toastify";

const TouristHotels = () => {
  const [cityCode, setCityCode] = useState("");
  const [hotels, setHotels] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const cityCodes = [
    { code: "dxb", name: "Dubai" },
    { code: "nyc", name: "New York" },
    { code: "lhr", name: "London" },
    { code: "tokyo", name: "Tokyo" },
    { code: "cai", name: "Cairo" },
    // Add more city codes and names as needed
  ];

  const handleSearch = async () => {
    if (!cityCode) {
      toast.error("Please select a destination!");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const response = await axios.post(
        "http://localhost:3000/api/hotels/search",
        {
          cityCode,
        },
        { withCredentials: true }
      );
      setHotels(response.data); // Assuming the response contains hotel data
    } catch (error) {
      setError("Error fetching hotels.");
      toast.error("Error fetching hotels.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <section id="theme_search_form_tour" style={{ minHeight: "100vh" }}>
        <div
          className="container shadow-lg rounded p-4"
          style={{ width: "50%", background: "var(--secondary-color)" }}
        >
          <h2 className="text-center mb-4">Hotels</h2>
          <div className="row">
            <div className="col-lg-12">
              <div className="tour_search_form">
                <form action="#!">
                  <div
                    className="row"
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <div className="col-lg-6 col-md-12 col-sm-12 col-12">
                      <div
                        className="flight_Search_boxed"
                        style={{ width: "100%", padding: "20px" }}
                      >
                        <p style={{ fontSize: "25px", marginBottom: "20px" }}>
                          City
                        </p>
                        <select
                          value={cityCode}
                          onChange={(e) => setCityCode(e.target.value)}
                          className="form-control"
                        >
                          <option value="">Select a city</option>
                          {cityCodes.map((city) => (
                            <option key={city.code} value={city.code}>
                              {city.name}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>
                    <div className="top_form_search_button">
                      <button
                        type="button"
                        className="btn btn_theme btn_md"
                        onClick={handleSearch}
                      >
                        Search
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Loading state */}
      {loading && <LoadingLogo isVisible={true} />}

      {/* Display search results */}
      <section id="flight_results">
        <div
          className="flight_search_result_wrapper"
          style={{ flexDirection: "column" }}
        >
          {hotels.length > 0 ? (
            hotels?.map((hotel, index) => (
              <div key={hotel.hotelId}>
                <div
                  className="flight_search_items"
                  style={{
                    background: "var(--secondary-color)",
                    height: "10vh",
                  }}
                >
                  <div
                    className="left-side"
                    style={{
                      height: "100%",
                      padding: "30px 30px",
                      display: "flex",
                      gap: "20px",
                      flexDirection: "column",
                      alignItems: "baseline",
                      width: "100%",
                    }}
                  >
                    <p style={{ fontSize: "28px" }}>{hotel.name}</p>
                  </div>
                  <div
                    className="flight_search_right"
                    style={{
                      background: "var(--main-color)",
                      height: "100%",
                      width: "40%",
                      display: "flex",
                      gap: "20px",
                      flexDirection: "column",
                      justifyContent: "space-evenly",
                    }}
                  >
                    <h3>Hotel ID: {hotel.hotelId}</h3>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p>No Hotels available.</p>
          )}
        </div>
      </section>

      {/* Toast Notifications */}
      <ToastContainer position="top-right" autoClose={3000} />
    </>
  );
};

export default TouristHotels;
