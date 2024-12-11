import React, { useState } from "react";
import axios from "axios";
import LoadingLogo from "../../component/LoadingLogo";
import toast, { Toaster } from "react-hot-toast";
import EmptyResponseLogo from "../../component/EmptyResponseLogo";

const TouristFlights = () => {
  // State for form data
  const [origin, setOrigin] = useState("DXB");
  const [destination, setDestination] = useState("CAI");
  const [departureDate, setDepartureDate] = useState("2024-12-03");
  const [returnDate, setReturnDate] = useState("2024-12-30");

  // State for search results
  const [searchOrigin, setSearchOrigin] = useState("DXB");
  const [searchDestination, setSearchDestination] = useState("CAI");
  const [flightData, setFlightData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSearch = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const params = {
      origin,
      destination,
      departureDate,
    };

    try {
      const response = await axios.post(
        "http://localhost:3000/api/flights/search",
        params,
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );

      setFlightData(response.data.flights);
      setSearchOrigin(origin); // Update search-specific origin
      setSearchDestination(destination); // Update search-specific destination
    } catch (error) {
      setError("Failed to fetch flight data. Please try again later.");
      toast.error(
        error.response?.data?.message || "An unexpected error occurred."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ minHeight: "100vh" }}>
      <section id="theme_search_form_tour">
        <div
          className="container shadow-lg rounded p-4"
          style={{ width: "100%", background: "var(--secondary-color)" }}
        >
          <h2 className="text-center mb-4">Flights</h2>
          <div className="row">
            <div className="col-lg-12">
              <div className="tab-content" id="myTabContent">
                <div className="row">
                  <div className="col-lg-12">
                    <div className="oneway_search_form">
                      <form onSubmit={handleSearch}>
                        <div className="row">
                          <div
                            style={{
                              display: "flex",
                              width: "100%",
                              justifyContent: "space-around",
                            }}
                          >
                            <div className="col-lg-3 col-md-6 col-sm-12 col-12">
                              <div className="flight_Search_boxed">
                                <p>From</p>
                                <select
                                  value={origin}
                                  onChange={(e) => setOrigin(e.target.value)}
                                  style={{ marginTop: "20px" }}
                                >
                                  <option value="DXB">
                                    DXB - Dubai International
                                  </option>
                                  <option value="CAI">
                                    CAI - Cairo International
                                  </option>
                                  <option value="JFK">
                                    JFK - John F. Kennedy International
                                  </option>
                                </select>
                                <div className="plan_icon_posation">
                                  <i className="fas fa-plane-departure"></i>
                                </div>
                              </div>
                            </div>
                            <div className="col-lg-3 col-md-6 col-sm-12 col-12">
                              <div className="flight_Search_boxed">
                                <p>To</p>
                                <select
                                  value={destination}
                                  onChange={(e) =>
                                    setDestination(e.target.value)
                                  }
                                  style={{ marginTop: "20px" }}
                                >
                                  <option value="DXB">
                                    DXB - Dubai International
                                  </option>
                                  <option value="CAI">
                                    CAI - Cairo International
                                  </option>
                                </select>
                                <div className="plan_icon_posation">
                                  <i className="fas fa-plane-arrival"></i>
                                </div>
                              </div>
                            </div>
                            <div className="col-lg-4 col-md-6 col-sm-12 col-12">
                              <div className="flight_Search_boxed">
                                <p>Departure date</p>
                                <input
                                  type="date"
                                  value={departureDate}
                                  onChange={(e) =>
                                    setDepartureDate(e.target.value)
                                  }
                                />
                              </div>
                            </div>
                          </div>

                          <div
                            className="col-lg-2 col-md-6 col-sm-12 col-12"
                            style={{
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                              width: "100%",
                              marginTop: "20px",
                            }}
                          >
                            <button
                              type="submit"
                              className="btn btn_theme btn_md"
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
            </div>
          </div>
        </div>
      </section>

      {loading ? (
        <LoadingLogo isVisible={true} />
      ) : error ? (
        <EmptyResponseLogo isVisible={true} text={error} size="200px" />
      ) : (
        <section id="flight_results">
          {flightData.map((flight, index) => (
            <div
              className="flight_search_item_wrappper"
              key={index}
              style={{ padding: "20px 50px" }}
            >
              <div className="flight_search_items">
                <div className="multi_city_flight_lists">
                  <div className="flight_multis_area_wrapper">
                    <div className="flight_search_left">
                      <div className="flight_search_destination">
                        <p>From</p>
                        <h3>{searchOrigin}</h3>
                      </div>
                    </div>
                    <div className="flight_search_middel">
                      <div className="flight_search_destination">
                        <p>To</p>
                        <h3>{searchDestination}</h3>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flight_search_right">
                  <h2>{flight.price}</h2>
                  <a href="/tour-booking" className="btn btn_theme btn_sm">
                    Book now
                  </a>
                </div>
              </div>
            </div>
          ))}
        </section>
      )}
      <Toaster position="bottom-center" reverseOrder={false} />
    </div>
  );
};

export default TouristFlights;
