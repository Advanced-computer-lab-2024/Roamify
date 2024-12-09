import React, { useState } from 'react';
import axios from 'axios';

const TouristFlights = () => {
  // State for form data and API response
  const [origin, setOrigin] = useState('DXB');
  const [destination, setDestination] = useState('CAI');
  const [departureDate, setDepartureDate] = useState('2024-12-03');
  const [returnDate, setReturnDate] = useState('2024-12-30');
  const [flightData, setFlightData] = useState([]);

  // Handle form submission
  const handleSearch = async (e) => {
    e.preventDefault();

    try {
      // Make the API call
      const response = await axios.get('http://localhost:3000/api/flights/search', {
        origin,
        destination,
        departureDate,
        returnDate,
      },{
        withCredentials: true,
      });

      // Set the response data in state
      setFlightData(response.data); // Assuming response.data contains the flight results
    } catch (error) {
      console.error('Error fetching flights', error);
    }
  };

  return (
    <>
      <section id="theme_search_form_tour">
        <div className="container shadow-lg rounded p-4" style={{ width: '100%', background: 'var(--secondary-color)' }}>
          <h2 className="text-center mb-4">Flights</h2>
          <div className="row">
            <div className="col-lg-12">
              <div className="tab-content" id="myTabContent">
                <div className="tab-pane fade show active" id="flights" role="tabpanel" aria-labelledby="flights-tab">
                  <div className="row">
                    <div className="col-lg-12">
                      <div className="flight_categories_search">
                        <ul className="nav nav-tabs" role="tablist">
                          <li className="nav-item" role="presentation">
                            <button
                              className="nav-link active"
                              id="oneway-tab"
                              data-bs-toggle="tab"
                              data-bs-target="#oneway_flight"
                              type="button"
                              role="tab"
                              aria-controls="oneway_flight"
                              aria-selected="true"
                            >
                              One Way
                            </button>
                          </li>
                          <li className="nav-item" role="presentation">
                            <button
                              className="nav-link"
                              id="roundtrip-tab"
                              data-bs-toggle="tab"
                              data-bs-target="#roundtrip"
                              type="button"
                              role="tab"
                              aria-controls="roundtrip"
                              aria-selected="false"
                            >
                              Roundtrip
                            </button>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                  <div className="tab-content" id="myTabContent1">
                    <div
                      className="tab-pane fade show active"
                      id="oneway_flight"
                      role="tabpanel"
                      aria-labelledby="oneway-tab"
                    >
                      <div className="row">
                        <div className="col-lg-12">
                          <div className="oneway_search_form">
                            <form onSubmit={handleSearch}>
                              <div className="row">
                                <div className="col-lg-3 col-md-6 col-sm-12 col-12">
                                  <div className="flight_Search_boxed">
                                    <p>From</p>
                                    <select
                                      className="form-select"
                                      value={origin}
                                      onChange={(e) => setOrigin(e.target.value)}
                                    >
                                      <option value="DXB">DXB - Dubai International</option>
                                      <option value="CAI">CAI - Cairo International</option>
                                      <option value="JFK">JFK - John F. Kennedy International</option>
                                    </select>
                                  </div>
                                </div>
                                <div className="col-lg-3 col-md-6 col-sm-12 col-12">
                                  <div className="flight_Search_boxed">
                                    <p>To</p>
                                    <select
                                      className="form-select"
                                      value={destination}
                                      onChange={(e) => setDestination(e.target.value)}
                                    >
                                      <option value="DXB">DXB - Dubai International</option>
                                      <option value="CAI">CAI - Cairo International</option>
                                    </select>
                                  </div>
                                </div>
                                <div className="col-lg-4 col-md-6 col-sm-12 col-12">
                                  <div className="form_search_date">
                                    <div className="flight_Search_boxed date_flex_area">
                                      <div className="Journey_date">
                                        <p>Journey date</p>
                                        <input
                                          type="date"
                                          value={departureDate}
                                          onChange={(e) => setDepartureDate(e.target.value)}
                                        />
                                      </div>
                                    </div>
                                  </div>
                                </div>
                                <div className="top_form_search_button">
                                  <button type="submit" className="btn btn_theme btn_md">Search</button>
                                </div>
                              </div>
                            </form>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div
                      className="tab-pane fade"
                      id="roundtrip"
                      role="tabpanel"
                      aria-labelledby="roundtrip-tab"
                    >
                      {/* Roundtrip form (optional) */}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Display flight search results */}
      <section id="flight_results">
        {flightData.map((data, index) => (
          <div className="flight_search_item_wrappper" key={index}>
            <div className="flight_search_items">
              <div className="multi_city_flight_lists">
                <div className="flight_multis_area_wrapper">
                  <div className="flight_search_left">
                    <div className="flight_logo">
                      <img src={data.img} alt="img" />
                    </div>
                    <div className="flight_search_destination">
                      <p>From</p>
                      <h3>{data.from}</h3>
                      <h6>{data.airport}</h6>
                    </div>
                  </div>
                  <div className="flight_search_middel">
                    <div className="flight_right_arrow">
                      <img src={data.flightIcon} alt="icon" />
                      <h6>Non-stop</h6>
                      <p>{data.duration}</p>
                    </div>
                    <div className="flight_search_destination">
                      <p>To</p>
                      <h3>{data.to}</h3>
                      <h6>{data.toAirport}</h6>
                    </div>
                  </div>
                </div>
              </div>
              <div className="flight_search_right">
                <h5><del>{data.desPrice}</del></h5>
                <h2>
                  {data.realPrice}
                  <sup>{data.offer}</sup>
                </h2>
                <a href="/tour-booking" className="btn btn_theme btn_sm">Book now</a>
                <p>*Discount applicable on some conditions</p>
              </div>
            </div>
          </div>
        ))}
      </section>
    </>
  );
};

export default TouristFlights;
