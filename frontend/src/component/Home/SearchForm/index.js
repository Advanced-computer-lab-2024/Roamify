import React from 'react'

const SearchForm = () => {
  return (
    <>
        <section id="theme_search_form">
        <div className="container">
            <div className="row">
                <div className="col-lg-12">
                    <div className="theme_search_form_area">
                        <div className="theme_search_form_tabbtn">
                            <ul className="nav nav-tabs" role="tablist">
                                <li className="nav-item" role="presentation">
                                    <button className="nav-link active" id="flights-tab" data-bs-toggle="tab"
                                        data-bs-target="#flights" type="button" role="tab" aria-controls="flights"
                                        aria-selected="true"><i className="fas fa-plane-departure"></i>Flights</button>
                                </li>
                                <li className="nav-item" role="presentation">
                                    <button className="nav-link" id="tours-tab" data-bs-toggle="tab" data-bs-target="#tours"
                                        type="button" role="tab" aria-controls="tours" aria-selected="false"><i
                                            className="fas fa-globe"></i>Tours</button>
                                </li>
                                <li className="nav-item" role="presentation">
                                    <button className="nav-link" id="hotels-tab" data-bs-toggle="tab"
                                        data-bs-target="#hotels" type="button" role="tab" aria-controls="hotels"
                                        aria-selected="false"><i className="fas fa-hotel"></i>Hotels</button>
                                </li>
                            </ul>
                        </div>
                        <div className="tab-content" id="myTabContent">
                            <div className="tab-pane fade show active" id="flights" role="tabpanel"
                                aria-labelledby="flights-tab">
                                <div className="row">
                                    <div className="col-lg-12">
                                        <div className="flight_categories_search">
                                            <ul className="nav nav-tabs" role="tablist">
                                                <li className="nav-item" role="presentation">
                                                    <button className="nav-link active" id="oneway-tab" data-bs-toggle="tab"
                                                        data-bs-target="#oneway_flight" type="button" role="tab"
                                                        aria-controls="oneway_flight" aria-selected="true">One
                                                        Way</button>
                                                </li>
                                                <li className="nav-item" role="presentation">
                                                    <button className="nav-link" id="roundtrip-tab" data-bs-toggle="tab"
                                                        data-bs-target="#roundtrip" type="button" role="tab"
                                                        aria-controls="roundtrip"
                                                        aria-selected="false">Roundtrip</button>
                                                </li>
                                                <li className="nav-item" role="presentation">
                                                    <button className="nav-link" id="multi_city-tab" data-bs-toggle="tab"
                                                        data-bs-target="#multi_city" type="button" role="tab"
                                                        aria-controls="multi_city" aria-selected="false">Multi
                                                        city</button>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                                <div className="tab-content" id="myTabContent1">
                                    <div className="tab-pane fade show active" id="oneway_flight" role="tabpanel"
                                        aria-labelledby="oneway-tab">
                                        <div className="row">
                                            <div className="col-lg-12">
                                                <div className="oneway_search_form">
                                                    <form action="#!">
                                                        <div className="row">
                                                            <div className="col-lg-3 col-md-6 col-sm-12 col-12">
                                                                <div className="flight_Search_boxed">
                                                                    <p>From</p>
                                                                    <input type="text" />
                                                                    <span>JFK - John F. Kennedy International...</span>
                                                                    <div className="plan_icon_posation">
                                                                        <i className="fas fa-plane-departure"></i>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div className="col-lg-3 col-md-6 col-sm-12 col-12">
                                                                <div className="flight_Search_boxed">
                                                                    <p>To</p>
                                                                    <input type="text"  />
                                                                    <span>LCY, London city airport </span>
                                                                    <div className="plan_icon_posation">
                                                                        <i className="fas fa-plane-arrival"></i>
                                                                    </div>
                                                                    <div className="range_plan">
                                                                        <i className="fas fa-exchange-alt"></i>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div className="col-lg-4  col-md-6 col-sm-12 col-12">
                                                                <div className="form_search_date">
                                                                    <div className="flight_Search_boxed date_flex_area">
                                                                        <div className="Journey_date">
                                                                            <p>Journey date</p>
                                                                            <input type="date" />
                                                                            <span>Thursday</span>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div className="col-lg-2  col-md-6 col-sm-12 col-12">
                                                                <div
                                                                    className="flight_Search_boxed dropdown_passenger_area">
                                                                    <p>Passenger, className </p>
                                                                    <div className="dropdown">
                                                                        <button className="dropdown-toggle final-count"
                                                                            data-toggle="dropdown" type="button"
                                                                            id="dropdownMenuButton1"
                                                                            data-bs-toggle="dropdown"
                                                                            aria-expanded="false">
                                                                            0 Passenger
                                                                        </button>
                                                                        <div className="dropdown-menu dropdown_passenger_info"
                                                                            aria-labelledby="dropdownMenuButton1">
                                                                            <div className="traveller-calulate-persons">
                                                                                <div className="passengers">
                                                                                    <h6>Passengers</h6>
                                                                                    <div className="passengers-types">
                                                                                        <div className="passengers-type">
                                                                                            <div className="text"><span
                                                                                                    className="count pcount">2</span>
                                                                                                <div className="type-label">
                                                                                                    <p>Adult</p>
                                                                                                    <span>12+
                                                                                                        yrs</span>
                                                                                                </div>
                                                                                            </div>
                                                                                            <div className="button-set">
                                                                                                <button type="button"
                                                                                                    className="btn-add">
                                                                                                    <i
                                                                                                        className="fas fa-plus"></i>
                                                                                                </button>
                                                                                                <button type="button"
                                                                                                    className="btn-subtract">
                                                                                                    <i
                                                                                                        className="fas fa-minus"></i>
                                                                                                </button>
                                                                                            </div>
                                                                                        </div>
                                                                                        <div className="passengers-type">
                                                                                            <div className="text"><span
                                                                                                    className="count ccount">0</span>
                                                                                                <div className="type-label">
                                                                                                    <p
                                                                                                        className="fz14 mb-xs-0">
                                                                                                        Children
                                                                                                    </p><span>2
                                                                                                        - Less than 12
                                                                                                        yrs</span>
                                                                                                </div>
                                                                                            </div>
                                                                                            <div className="button-set">
                                                                                                <button type="button"
                                                                                                    className="btn-add-c">
                                                                                                    <i
                                                                                                        className="fas fa-plus"></i>
                                                                                                </button>
                                                                                                <button type="button"
                                                                                                    className="btn-subtract-c">
                                                                                                    <i
                                                                                                        className="fas fa-minus"></i>
                                                                                                </button>
                                                                                            </div>
                                                                                        </div>
                                                                                        <div className="passengers-type">
                                                                                            <div className="text"><span
                                                                                                    className="count incount">0</span>
                                                                                                <div className="type-label">
                                                                                                    <p
                                                                                                        className="fz14 mb-xs-0">
                                                                                                        Infant
                                                                                                    </p><span>Less
                                                                                                        than 2
                                                                                                        yrs</span>
                                                                                                </div>
                                                                                            </div>
                                                                                            <div className="button-set">
                                                                                                <button type="button"
                                                                                                    className="btn-add-in">
                                                                                                    <i
                                                                                                        className="fas fa-plus"></i>
                                                                                                </button>
                                                                                                <button type="button"
                                                                                                    className="btn-subtract-in">
                                                                                                    <i
                                                                                                        className="fas fa-minus"></i>
                                                                                                </button>
                                                                                            </div>
                                                                                        </div>
                                                                                    </div>
                                                                                </div>
                                                                                <div className="cabin-selection">
                                                                                    <h6>Cabin className</h6>
                                                                                    <div className="cabin-list">
                                                                                        <button type="button"
                                                                                            className="label-select-btn">
                                                                                            <span
                                                                                                className="muiButton-label">Economy
                                                                                            </span>
                                                                                        </button>
                                                                                        <button type="button"
                                                                                            className="label-select-btn active">
                                                                                            <span
                                                                                                className="muiButton-label">
                                                                                                Business
                                                                                            </span>
                                                                                        </button>
                                                                                        <button type="button"
                                                                                            className="label-select-btn">
                                                                                            <span
                                                                                                className="MuiButton-label">First
                                                                                                className </span>
                                                                                        </button>
                                                                                    </div>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                    <span>Business</span>
                                                                </div>
                                                            </div>
                                                            <div className="top_form_search_button">
                                                                <button className="btn btn_theme btn_md">Search</button>
                                                            </div>
                                                        </div>
                                                    </form>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="tab-pane fade" id="roundtrip" role="tabpanel"
                                        aria-labelledby="roundtrip-tab">
                                        <div className="row">
                                            <div className="col-lg-12">
                                                <div className="oneway_search_form">
                                                    <form action="#!">
                                                        <div className="row">
                                                            <div className="col-lg-3  col-md-6 col-sm-12 col-12">
                                                                <div className="flight_Search_boxed">
                                                                    <p>From</p>
                                                                    <input type="text"  />
                                                                    <span>JFK - John F. Kennedy International...</span>
                                                                    <div className="plan_icon_posation">
                                                                        <i className="fas fa-plane-departure"></i>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div className="col-lg-3  col-md-6 col-sm-12 col-12">
                                                                <div className="flight_Search_boxed">
                                                                    <p>To</p>
                                                                    <input type="text" />
                                                                    <span>LCY, London city airport </span>
                                                                    <div className="plan_icon_posation">
                                                                        <i className="fas fa-plane-arrival"></i>
                                                                    </div>
                                                                    <div className="range_plan">
                                                                        <i className="fas fa-exchange-alt"></i>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div className="col-lg-4  col-md-6 col-sm-12 col-12">
                                                                <div className="form_search_date">
                                                                    <div className="flight_Search_boxed date_flex_area">
                                                                        <div className="Journey_date">
                                                                            <p>Journey date</p>
                                                                            <input type="date" />
                                                                            <span>Thursday</span>
                                                                        </div>
                                                                        <div className="Journey_date">
                                                                            <p>Return date</p>
                                                                            <input type="date" />
                                                                            <span>Saturday</span>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div className="col-lg-2  col-md-6 col-sm-12 col-12">
                                                                <div
                                                                    className="flight_Search_boxed dropdown_passenger_area">
                                                                    <p>Passenger, className </p>
                                                                    <div className="dropdown">
                                                                        <button className="dropdown-toggle final-count"
                                                                            data-toggle="dropdown" type="button"
                                                                            id="dropdownMenuButton1"
                                                                            data-bs-toggle="dropdown"
                                                                            aria-expanded="false">
                                                                            0 Passenger
                                                                        </button>
                                                                        <div className="dropdown-menu dropdown_passenger_info"
                                                                            aria-labelledby="dropdownMenuButton1">
                                                                            <div className="traveller-calulate-persons">
                                                                                <div className="passengers">
                                                                                    <h6>Passengers</h6>
                                                                                    <div className="passengers-types">
                                                                                        <div className="passengers-type">
                                                                                            <div className="text"><span
                                                                                                    className="count pcount">2</span>
                                                                                                <div className="type-label">
                                                                                                    <p>Adult</p>
                                                                                                    <span>12+
                                                                                                        yrs</span>
                                                                                                </div>
                                                                                            </div>
                                                                                            <div className="button-set">
                                                                                                <button type="button"
                                                                                                    className="btn-add">
                                                                                                    <i
                                                                                                        className="fas fa-plus"></i>
                                                                                                </button>
                                                                                                <button type="button"
                                                                                                    className="btn-subtract">
                                                                                                    <i
                                                                                                        className="fas fa-minus"></i>
                                                                                                </button>
                                                                                            </div>
                                                                                        </div>
                                                                                        <div className="passengers-type">
                                                                                            <div className="text"><span
                                                                                                    className="count ccount">0</span>
                                                                                                <div className="type-label">
                                                                                                    <p
                                                                                                        className="fz14 mb-xs-0">
                                                                                                        Children
                                                                                                    </p><span>2
                                                                                                        - Less than 12
                                                                                                        yrs</span>
                                                                                                </div>
                                                                                            </div>
                                                                                            <div className="button-set">
                                                                                                <button type="button"
                                                                                                    className="btn-add-c">
                                                                                                    <i
                                                                                                        className="fas fa-plus"></i>
                                                                                                </button>
                                                                                                <button type="button"
                                                                                                    className="btn-subtract-c">
                                                                                                    <i
                                                                                                        className="fas fa-minus"></i>
                                                                                                </button>
                                                                                            </div>
                                                                                        </div>
                                                                                        <div className="passengers-type">
                                                                                            <div className="text"><span
                                                                                                    className="count incount">0</span>
                                                                                                <div className="type-label">
                                                                                                    <p
                                                                                                        className="fz14 mb-xs-0">
                                                                                                        Infant
                                                                                                    </p><span>Less
                                                                                                        than 2
                                                                                                        yrs</span>
                                                                                                </div>
                                                                                            </div>
                                                                                            <div className="button-set">
                                                                                                <button type="button"
                                                                                                    className="btn-add-in">
                                                                                                    <i
                                                                                                        className="fas fa-plus"></i>
                                                                                                </button>
                                                                                                <button type="button"
                                                                                                    className="btn-subtract-in">
                                                                                                    <i
                                                                                                        className="fas fa-minus"></i>
                                                                                                </button>
                                                                                            </div>
                                                                                        </div>
                                                                                    </div>
                                                                                </div>
                                                                                <div className="cabin-selection">
                                                                                    <h6>Cabin className</h6>
                                                                                    <div className="cabin-list">
                                                                                        <button type="button"
                                                                                            className="label-select-btn">
                                                                                            <span
                                                                                                className="muiButton-label">Economy
                                                                                            </span>
                                                                                        </button>
                                                                                        <button type="button"
                                                                                            className="label-select-btn active">
                                                                                            <span
                                                                                                className="muiButton-label">
                                                                                                Business
                                                                                            </span>
                                                                                        </button>
                                                                                        <button type="button"
                                                                                            className="label-select-btn">
                                                                                            <span
                                                                                                className="MuiButton-label">First
                                                                                                className </span>
                                                                                        </button>
                                                                                    </div>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                    <span>Business</span>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="top_form_search_button">
                                                            <button className="btn btn_theme btn_md">Search</button>
                                                        </div>
                                                    </form>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="tab-pane fade" id="multi_city" role="tabpanel"
                                        aria-labelledby="multi_city-tab">
                                        <div className="row">
                                            <div className="col-lg-12">
                                                <div className="oneway_search_form">
                                                    <form action="#!">
                                                        <div className="multi_city_form_wrapper">
                                                            <div className="multi_city_form">
                                                                <div className="row">
                                                                    <div className="col-lg-3 col-md-6 col-sm-12 col-12">
                                                                        <div className="flight_Search_boxed">
                                                                            <p>From</p>
                                                                            <input type="text" />
                                                                            <span>DAC, Hazrat Shahajalal
                                                                                International...</span>
                                                                            <div className="plan_icon_posation">
                                                                                <i className="fas fa-plane-departure"></i>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                    <div className="col-lg-3 col-md-6 col-sm-12 col-12">
                                                                        <div className="flight_Search_boxed">
                                                                            <p>To</p>
                                                                            <input type="text"/>
                                                                            <span>LCY, London city airport </span>
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
                                                                            <div
                                                                                className="flight_Search_boxed date_flex_area">
                                                                                <div className="Journey_date">
                                                                                    <p>Journey date</p>
                                                                                    <input type="date"/>
                                                                                    <span>Thursday</span>
                                                                                </div>
                                                                                <div className="Journey_date">
                                                                                    <p>Return date</p>
                                                                                    <input type="date" />
                                                                                    <span>Saturday</span>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                    <div className="col-lg-2  col-md-6 col-sm-12 col-12">
                                                                        <div
                                                                            className="flight_Search_boxed dropdown_passenger_area">
                                                                            <p>Passenger, className </p>
                                                                            <div className="dropdown">
                                                                                <button
                                                                                    className="dropdown-toggle final-count"
                                                                                    data-toggle="dropdown" type="button"
                                                                                    id="dropdownMenuButton1"
                                                                                    data-bs-toggle="dropdown"
                                                                                    aria-expanded="false">
                                                                                    0 Passenger
                                                                                </button>
                                                                                <div className="dropdown-menu dropdown_passenger_info"
                                                                                    aria-labelledby="dropdownMenuButton1">
                                                                                    <div
                                                                                        className="traveller-calulate-persons">
                                                                                        <div className="passengers">
                                                                                            <h6>Passengers</h6>
                                                                                            <div
                                                                                                className="passengers-types">
                                                                                                <div
                                                                                                    className="passengers-type">
                                                                                                    <div className="text">
                                                                                                        <span
                                                                                                            className="count pcount">2</span>
                                                                                                        <div
                                                                                                            className="type-label">
                                                                                                            <p>Adult</p>
                                                                                                            <span>12+
                                                                                                                yrs</span>
                                                                                                        </div>
                                                                                                    </div>
                                                                                                    <div
                                                                                                        className="button-set">
                                                                                                        <button
                                                                                                            type="button"
                                                                                                            className="btn-add">
                                                                                                            <i
                                                                                                                className="fas fa-plus"></i>
                                                                                                        </button>
                                                                                                        <button
                                                                                                            type="button"
                                                                                                            className="btn-subtract">
                                                                                                            <i
                                                                                                                className="fas fa-minus"></i>
                                                                                                        </button>
                                                                                                    </div>
                                                                                                </div>
                                                                                                <div
                                                                                                    className="passengers-type">
                                                                                                    <div className="text">
                                                                                                        <span
                                                                                                            className="count ccount">0</span>
                                                                                                        <div
                                                                                                            className="type-label">
                                                                                                            <p
                                                                                                                className="fz14 mb-xs-0">
                                                                                                                Children
                                                                                                            </p><span>2
                                                                                                                - Less
                                                                                                                than 12
                                                                                                                yrs</span>
                                                                                                        </div>
                                                                                                    </div>
                                                                                                    <div
                                                                                                        className="button-set">
                                                                                                        <button
                                                                                                            type="button"
                                                                                                            className="btn-add-c">
                                                                                                            <i
                                                                                                                className="fas fa-plus"></i>
                                                                                                        </button>
                                                                                                        <button
                                                                                                            type="button"
                                                                                                            className="btn-subtract-c">
                                                                                                            <i
                                                                                                                className="fas fa-minus"></i>
                                                                                                        </button>
                                                                                                    </div>
                                                                                                </div>
                                                                                                <div
                                                                                                    className="passengers-type">
                                                                                                    <div className="text">
                                                                                                        <span
                                                                                                            className="count incount">0</span>
                                                                                                        <div
                                                                                                            className="type-label">
                                                                                                            <p
                                                                                                                className="fz14 mb-xs-0">
                                                                                                                Infant
                                                                                                            </p><span>Less
                                                                                                                than 2
                                                                                                                yrs</span>
                                                                                                        </div>
                                                                                                    </div>
                                                                                                    <div
                                                                                                        className="button-set">
                                                                                                        <button
                                                                                                            type="button"
                                                                                                            className="btn-add-in">
                                                                                                            <i
                                                                                                                className="fas fa-plus"></i>
                                                                                                        </button>
                                                                                                        <button
                                                                                                            type="button"
                                                                                                            className="btn-subtract-in">
                                                                                                            <i
                                                                                                                className="fas fa-minus"></i>
                                                                                                        </button>
                                                                                                    </div>
                                                                                                </div>
                                                                                            </div>
                                                                                        </div>
                                                                                        <div className="cabin-selection">
                                                                                            <h6>Cabin className</h6>
                                                                                            <div className="cabin-list">
                                                                                                <button type="button"
                                                                                                    className="label-select-btn">
                                                                                                    <span
                                                                                                        className="muiButton-label">Economy
                                                                                                    </span>
                                                                                                </button>
                                                                                                <button type="button"
                                                                                                    className="label-select-btn active">
                                                                                                    <span
                                                                                                        className="muiButton-label">
                                                                                                        Business
                                                                                                    </span>
                                                                                                </button>
                                                                                                <button type="button"
                                                                                                    className="label-select-btn">
                                                                                                    <span
                                                                                                        className="MuiButton-label">First
                                                                                                        className </span>
                                                                                                </button>
                                                                                            </div>
                                                                                        </div>
                                                                                    </div>
                                                                                </div>
                                                                            </div>
                                                                            <span>Business</span>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div className="multi_city_form">
                                                                <div className="row">
                                                                    <div className="col-lg-3 col-md-6 col-sm-12 col-12">
                                                                        <div className="flight_Search_boxed">
                                                                            <p>From</p>
                                                                            <input type="text" />
                                                                            <span>DAC, Hazrat Shahajalal
                                                                                International...</span>
                                                                            <div className="plan_icon_posation">
                                                                                <i className="fas fa-plane-departure"></i>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                    <div className="col-lg-3 col-md-6 col-sm-12 col-12">
                                                                        <div className="flight_Search_boxed">
                                                                            <p>To</p>
                                                                            <input type="text" />
                                                                            <span>LCY, London city airport </span>
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
                                                                            <div
                                                                                className="flight_Search_boxed date_flex_area">
                                                                                <div className="Journey_date">
                                                                                    <p>Journey date</p>
                                                                                    <input type="date" />
                                                                                    <span>Thursday</span>
                                                                                </div>
                                                                                <div className="Journey_date">
                                                                                    <p>Return date</p>
                                                                                    <input type="date" />
                                                                                    <span>Saturday</span>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                    <div className="col-lg-2  col-md-6 col-sm-12 col-12">
                                                                        <div
                                                                            className="flight_Search_boxed dropdown_passenger_area">
                                                                            <p>Passenger, className </p>
                                                                            <div className="dropdown">
                                                                                <button
                                                                                    className="dropdown-toggle final-count"
                                                                                    data-toggle="dropdown" type="button"
                                                                                    id="dropdownMenuButton1"
                                                                                    data-bs-toggle="dropdown"
                                                                                    aria-expanded="false">
                                                                                    0 Passenger
                                                                                </button>
                                                                                <div className="dropdown-menu dropdown_passenger_info"
                                                                                    aria-labelledby="dropdownMenuButton1">
                                                                                    <div
                                                                                        className="traveller-calulate-persons">
                                                                                        <div className="passengers">
                                                                                            <h6>Passengers</h6>
                                                                                            <div
                                                                                                className="passengers-types">
                                                                                                <div
                                                                                                    className="passengers-type">
                                                                                                    <div className="text">
                                                                                                        <span
                                                                                                            className="count pcount">2</span>
                                                                                                        <div
                                                                                                            className="type-label">
                                                                                                            <p>Adult</p>
                                                                                                            <span>12+
                                                                                                                yrs</span>
                                                                                                        </div>
                                                                                                    </div>
                                                                                                    <div
                                                                                                        className="button-set">
                                                                                                        <button
                                                                                                            type="button"
                                                                                                            className="btn-add">
                                                                                                            <i
                                                                                                                className="fas fa-plus"></i>
                                                                                                        </button>
                                                                                                        <button
                                                                                                            type="button"
                                                                                                            className="btn-subtract">
                                                                                                            <i
                                                                                                                className="fas fa-minus"></i>
                                                                                                        </button>
                                                                                                    </div>
                                                                                                </div>
                                                                                                <div
                                                                                                    className="passengers-type">
                                                                                                    <div className="text">
                                                                                                        <span
                                                                                                            className="count ccount">0</span>
                                                                                                        <div
                                                                                                            className="type-label">
                                                                                                            <p
                                                                                                                className="fz14 mb-xs-0">
                                                                                                                Children
                                                                                                            </p><span>2
                                                                                                                - Less
                                                                                                                than 12
                                                                                                                yrs</span>
                                                                                                        </div>
                                                                                                    </div>
                                                                                                    <div
                                                                                                        className="button-set">
                                                                                                        <button
                                                                                                            type="button"
                                                                                                            className="btn-add-c">
                                                                                                            <i
                                                                                                                className="fas fa-plus"></i>
                                                                                                        </button>
                                                                                                        <button
                                                                                                            type="button"
                                                                                                            className="btn-subtract-c">
                                                                                                            <i
                                                                                                                className="fas fa-minus"></i>
                                                                                                        </button>
                                                                                                    </div>
                                                                                                </div>
                                                                                                <div
                                                                                                    className="passengers-type">
                                                                                                    <div className="text">
                                                                                                        <span
                                                                                                            className="count incount">0</span>
                                                                                                        <div
                                                                                                            className="type-label">
                                                                                                            <p
                                                                                                                className="fz14 mb-xs-0">
                                                                                                                Infant
                                                                                                            </p><span>Less
                                                                                                                than 2
                                                                                                                yrs</span>
                                                                                                        </div>
                                                                                                    </div>
                                                                                                    <div
                                                                                                        className="button-set">
                                                                                                        <button
                                                                                                            type="button"
                                                                                                            className="btn-add-in">
                                                                                                            <i
                                                                                                                className="fas fa-plus"></i>
                                                                                                        </button>
                                                                                                        <button
                                                                                                            type="button"
                                                                                                            className="btn-subtract-in">
                                                                                                            <i
                                                                                                                className="fas fa-minus"></i>
                                                                                                        </button>
                                                                                                    </div>
                                                                                                </div>
                                                                                            </div>
                                                                                        </div>
                                                                                        <div className="cabin-selection">
                                                                                            <h6>Cabin className</h6>
                                                                                            <div className="cabin-list">
                                                                                                <button type="button"
                                                                                                    className="label-select-btn">
                                                                                                    <span
                                                                                                        className="muiButton-label">Economy
                                                                                                    </span>
                                                                                                </button>
                                                                                                <button type="button"
                                                                                                    className="label-select-btn active">
                                                                                                    <span
                                                                                                        className="muiButton-label">
                                                                                                        Business
                                                                                                    </span>
                                                                                                </button>
                                                                                                <button type="button"
                                                                                                    className="label-select-btn">
                                                                                                    <span
                                                                                                        className="MuiButton-label">First
                                                                                                        className </span>
                                                                                                </button>
                                                                                            </div>
                                                                                        </div>
                                                                                    </div>
                                                                                </div>
                                                                            </div>
                                                                            <span>Business</span>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="row">
                                                            <div className="col-lg-12">
                                                                <div className="add_multy_form">
                                                                    <button type="button" id="addMulticityRow">+ Add
                                                                        another
                                                                        flight</button>
                                                                </div>
                                                            </div>
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
                            <div className="tab-pane fade" id="tours" role="tabpanel" aria-labelledby="tours-tab">
                                <div className="row">
                                    <div className="col-lg-12">
                                        <div className="tour_search_form">
                                            <form action="#!">
                                                <div className="row">
                                                    <div className="col-lg-6 col-md-12 col-sm-12 col-12">
                                                        <div className="flight_Search_boxed">
                                                            <p>Destination</p>
                                                            <input type="text" placeholder="Where are you going?" />
                                                            <span>Where are you going?</span>
                                                        </div>
                                                    </div>
                                                    <div className="col-lg-4 col-md-6 col-sm-12 col-12">
                                                        <div className="form_search_date">
                                                            <div className="flight_Search_boxed date_flex_area">
                                                                <div className="Journey_date">
                                                                    <p>Journey date</p>
                                                                    <input type="date"/>
                                                                    <span>Thursday</span>
                                                                </div>
                                                                <div className="Journey_date">
                                                                    <p>Return date</p>
                                                                    <input type="date" />
                                                                    <span>Thursday</span>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="col-lg-2  col-md-6 col-sm-12 col-12">
                                                        <div className="flight_Search_boxed dropdown_passenger_area">
                                                            <p>Passenger, className </p>
                                                            <div className="dropdown">
                                                                <button className="dropdown-toggle final-count"
                                                                    data-toggle="dropdown" type="button"
                                                                    id="dropdownMenuButton1" data-bs-toggle="dropdown"
                                                                    aria-expanded="false">
                                                                    0 Passenger
                                                                </button>
                                                                <div className="dropdown-menu dropdown_passenger_info"
                                                                    aria-labelledby="dropdownMenuButton1">
                                                                    <div className="traveller-calulate-persons">
                                                                        <div className="passengers">
                                                                            <h6>Passengers</h6>
                                                                            <div className="passengers-types">
                                                                                <div className="passengers-type">
                                                                                    <div className="text"><span
                                                                                            className="count pcount">2</span>
                                                                                        <div className="type-label">
                                                                                            <p>Adult</p>
                                                                                            <span>12+
                                                                                                yrs</span>
                                                                                        </div>
                                                                                    </div>
                                                                                    <div className="button-set">
                                                                                        <button type="button"
                                                                                            className="btn-add">
                                                                                            <i className="fas fa-plus"></i>
                                                                                        </button>
                                                                                        <button type="button"
                                                                                            className="btn-subtract">
                                                                                            <i className="fas fa-minus"></i>
                                                                                        </button>
                                                                                    </div>
                                                                                </div>
                                                                                <div className="passengers-type">
                                                                                    <div className="text"><span
                                                                                            className="count ccount">0</span>
                                                                                        <div className="type-label">
                                                                                            <p className="fz14 mb-xs-0">
                                                                                                Children
                                                                                            </p><span>2
                                                                                                - Less than 12
                                                                                                yrs</span>
                                                                                        </div>
                                                                                    </div>
                                                                                    <div className="button-set">
                                                                                        <button type="button"
                                                                                            className="btn-add-c">
                                                                                            <i className="fas fa-plus"></i>
                                                                                        </button>
                                                                                        <button type="button"
                                                                                            className="btn-subtract-c">
                                                                                            <i className="fas fa-minus"></i>
                                                                                        </button>
                                                                                    </div>
                                                                                </div>
                                                                                <div className="passengers-type">
                                                                                    <div className="text"><span
                                                                                            className="count incount">0</span>
                                                                                        <div className="type-label">
                                                                                            <p className="fz14 mb-xs-0">
                                                                                                Infant
                                                                                            </p><span>Less
                                                                                                than 2
                                                                                                yrs</span>
                                                                                        </div>
                                                                                    </div>
                                                                                    <div className="button-set">
                                                                                        <button type="button"
                                                                                            className="btn-add-in">
                                                                                            <i className="fas fa-plus"></i>
                                                                                        </button>
                                                                                        <button type="button"
                                                                                            className="btn-subtract-in">
                                                                                            <i className="fas fa-minus"></i>
                                                                                        </button>
                                                                                    </div>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                        <div className="cabin-selection">
                                                                            <h6>Cabin className</h6>
                                                                            <div className="cabin-list">
                                                                                <button type="button"
                                                                                    className="label-select-btn">
                                                                                    <span
                                                                                        className="muiButton-label">Economy
                                                                                    </span>
                                                                                </button>
                                                                                <button type="button"
                                                                                    className="label-select-btn active">
                                                                                    <span className="muiButton-label">
                                                                                        Business
                                                                                    </span>
                                                                                </button>
                                                                                <button type="button"
                                                                                    className="label-select-btn">
                                                                                    <span className="MuiButton-label">First
                                                                                        className </span>
                                                                                </button>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <span>Business</span>
                                                        </div>
                                                    </div>
                                                    <div className="top_form_search_button">
                                                        <button className="btn btn_theme btn_md">Search</button>
                                                    </div>
                                                </div>
                                            </form>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="tab-pane fade" id="hotels" role="tabpanel" aria-labelledby="hotels-tab">
                                <div className="row">
                                    <div className="col-lg-12">
                                        <div className="tour_search_form">
                                            <form action="#!">
                                                <div className="row">
                                                    <div className="col-lg-6 col-md-12 col-sm-12 col-12">
                                                        <div className="flight_Search_boxed">
                                                            <p>Destination</p>
                                                            <input type="text" placeholder="Where are you going?" />
                                                            <span>Where are you going?</span>
                                                        </div>
                                                    </div>
                                                    <div className="col-lg-4 col-md-6 col-sm-12 col-12">
                                                        <div className="form_search_date">
                                                            <div className="flight_Search_boxed date_flex_area">
                                                                <div className="Journey_date">
                                                                    <p>Journey date</p>
                                                                    <input type="date"/>
                                                                    <span>Thursday</span>
                                                                </div>
                                                                <div className="Journey_date">
                                                                    <p>Return date</p>
                                                                    <input type="date"/>
                                                                    <span>Thursday</span>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="col-lg-2  col-md-6 col-sm-12 col-12">
                                                        <div className="flight_Search_boxed dropdown_passenger_area">
                                                            <p>Passenger, className </p>
                                                            <div className="dropdown">
                                                                <button className="dropdown-toggle final-count"
                                                                    data-toggle="dropdown" type="button"
                                                                    id="dropdownMenuButton1" data-bs-toggle="dropdown"
                                                                    aria-expanded="false">
                                                                    0 Passenger
                                                                </button>
                                                                <div className="dropdown-menu dropdown_passenger_info"
                                                                    aria-labelledby="dropdownMenuButton1">
                                                                    <div className="traveller-calulate-persons">
                                                                        <div className="passengers">
                                                                            <h6>Passengers</h6>
                                                                            <div className="passengers-types">
                                                                                <div className="passengers-type">
                                                                                    <div className="text"><span
                                                                                            className="count pcount">2</span>
                                                                                        <div className="type-label">
                                                                                            <p>Adult</p>
                                                                                            <span>12+
                                                                                                yrs</span>
                                                                                        </div>
                                                                                    </div>
                                                                                    <div className="button-set">
                                                                                        <button type="button"
                                                                                            className="btn-add">
                                                                                            <i className="fas fa-plus"></i>
                                                                                        </button>
                                                                                        <button type="button"
                                                                                            className="btn-subtract">
                                                                                            <i className="fas fa-minus"></i>
                                                                                        </button>
                                                                                    </div>
                                                                                </div>
                                                                                <div className="passengers-type">
                                                                                    <div className="text"><span
                                                                                            className="count ccount">0</span>
                                                                                        <div className="type-label">
                                                                                            <p className="fz14 mb-xs-0">
                                                                                                Children
                                                                                            </p><span>2
                                                                                                - Less than 12
                                                                                                yrs</span>
                                                                                        </div>
                                                                                    </div>
                                                                                    <div className="button-set">
                                                                                        <button type="button"
                                                                                            className="btn-add-c">
                                                                                            <i className="fas fa-plus"></i>
                                                                                        </button>
                                                                                        <button type="button"
                                                                                            className="btn-subtract-c">
                                                                                            <i className="fas fa-minus"></i>
                                                                                        </button>
                                                                                    </div>
                                                                                </div>
                                                                                <div className="passengers-type">
                                                                                    <div className="text"><span
                                                                                            className="count incount">0</span>
                                                                                        <div className="type-label">
                                                                                            <p className="fz14 mb-xs-0">
                                                                                                Infant
                                                                                            </p><span>Less
                                                                                                than 2
                                                                                                yrs</span>
                                                                                        </div>
                                                                                    </div>
                                                                                    <div className="button-set">
                                                                                        <button type="button"
                                                                                            className="btn-add-in">
                                                                                            <i className="fas fa-plus"></i>
                                                                                        </button>
                                                                                        <button type="button"
                                                                                            className="btn-subtract-in">
                                                                                            <i className="fas fa-minus"></i>
                                                                                        </button>
                                                                                    </div>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                        <div className="cabin-selection">
                                                                            <h6>Cabin className</h6>
                                                                            <div className="cabin-list">
                                                                                <button type="button"
                                                                                    className="label-select-btn">
                                                                                    <span
                                                                                        className="muiButton-label">Economy
                                                                                    </span>
                                                                                </button>
                                                                                <button type="button"
                                                                                    className="label-select-btn active">
                                                                                    <span className="muiButton-label">
                                                                                        Business
                                                                                    </span>
                                                                                </button>
                                                                                <button type="button"
                                                                                    className="label-select-btn">
                                                                                    <span className="MuiButton-label">First
                                                                                        className </span>
                                                                                </button>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <span>Business</span>
                                                        </div>
                                                    </div>
                                                    <div className="top_form_search_button">
                                                        <button className="btn btn_theme btn_md">Search</button>
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
            </div>
        </div>
    </section>
    </>
  )
}

export default SearchForm