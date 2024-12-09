import React, { useState } from 'react';
import axios from 'axios';
import LoadingLogo from '../../component/LoadingLogo';
import toast, { Toaster } from "react-hot-toast"; // Import the toast function
const TouristFlights = () => {
    // State for form data and API response
    const [origin, setOrigin] = useState('DXB');
    const [destination, setDestination] = useState('CAI');
    const [departureDate, setDepartureDate] = useState('2024-12-03');
    const [returnDate, setReturnDate] = useState('2024-12-30');
    const [flightData, setFlightData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [isRoundTrip, setIsRoundTrip] = useState(false);

    const handleSearch = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        const params = {
            origin,
            destination,
            departureDate,
            ...(isRoundTrip && { returnDate })
        };

        try {
            const response = await axios.get('http://localhost:3000/api/flights/search', params, {
                headers: {
                  'Content-Type': 'application/json', // Ensuring the payload is JSON
                },
                withCredentials: true,
              });

            setFlightData(response.data);
            console.log(response.data)
        } catch (error) {
            setError('Failed to fetch flight data. Please try again later.');
            toast.error(error.response.data.message);
        } finally {
            setLoading(false);
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
                                                            onClick={setIsRoundTrip}
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
                                            <div className="row">
                                                <div className="col-lg-12">
                                                    <div className="oneway_search_form">
                                                        <form onSubmit={handleSearch}>
                                                            <div className="row">
                                                                <div className="col-lg-3 col-md-6 col-sm-12 col-12">
                                                                    <div className="flight_Search_boxed">
                                                                        <p>From</p>
                                                                        <select className="form-select">
                                                                            <option value="JFK">JFK - John F. Kennedy International</option>
                                                                            <option value="LAX">LAX - Los Angeles International</option>
                                                                            <option value="ORD">ORD - Chicago O'Hare International</option>
                                                                            <option value="DXB">DXB - Dubai International</option>
                                                                        </select>
                                                                        <div className="plan_icon_posation">
                                                                            <i className="fas fa-plane-departure"></i>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                <div className="col-lg-3 col-md-6 col-sm-12 col-12">
                                                                    <div className="flight_Search_boxed">
                                                                        <p>To</p>
                                                                        <select className="form-select">
                                                                            <option value="LCY">LCY - London City Airport</option>
                                                                            <option value="SFO">SFO - San Francisco International</option>
                                                                            <option value="DXB">DXB - Dubai International</option>
                                                                            <option value="CAI">CAI - Cairo International Airport</option>
                                                                        </select>
                                                                        <div className="plan_icon_posation">
                                                                            <i className="fas fa-plane-arrival"></i>
                                                                        </div>
                                                                        <div className="range_plan">
                                                                            <i className="fas fa-exchange-alt"></i>
                                                                        </div>
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
                                                                                <span>Thursday</span>
                                                                            </div>
                                                                            <div className="Journey_date">
                                                                                <p>Return date</p>
                                                                                <input
                                                                                    type="date"
                                                                                    value={returnDate}
                                                                                    onChange={(e) => setReturnDate(e.target.value)}
                                                                                />
                                                                                <span>Saturday</span>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                <div className="col-lg-2 col-md-6 col-sm-12 col-12"></div>
                                                            </div>
                                                            <div className="top_form_search_button">
                                                                <button className="btn btn_theme btn_md">Search</button>
                                                            </div>
                                                        </form>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            {loading && <LoadingLogo isVisible={true} />}
            {error && <p>{error}</p>}
            {/* Display flight search results */}
            <section id="flight_results">
                {flightData.length === 0 ? (
                    <p>No flights available for the selected dates and destinations.</p>
                ) : (
                    flightData.map((flight, index) => (
                        <div className="flight_search_item_wrappper" key={index}>
                            <div className="flight_search_items">
                                <div className="multi_city_flight_lists">
                                    <div className="flight_multis_area_wrapper">
                                        <div className="flight_search_left">
                                            <div className="flight_search_destination">
                                                <p>From</p>
                                                <h3>{origin}</h3>
                                                <h6>Departure: {new Date(flight.departure).toLocaleString()}</h6>
                                            </div>
                                        </div>
                                        <div className="flight_search_middel">
                                            <div className="flight_right_arrow">
                                                <h6>Non-stop</h6>
                                                <p>Duration: {Math.abs(new Date(flight.arrival) - new Date(flight.departure)) / 1000 / 60 / 60} hours</p>
                                            </div>
                                        </div>
                                        <div className="flight_search_right">
                                            <p>Available Seats: {flight.availableSeats}</p>
                                            <h2>{flight.price} {flight.currency}</h2>
                                            <a href="/tour-booking" className="btn btn_theme btn_sm">Book now</a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))
                )}
            </section>
        </>
    );
};

export default TouristFlights;
