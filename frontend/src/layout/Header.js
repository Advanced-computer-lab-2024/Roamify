import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import logo from ".././assets/img/logo.png";
import logoBlack from ".././assets/img/logo_black.png";
import ProfileButton from "../component/Profile/ProfileButton";
import ThemeToggleButton from "../pages/Home/ThemeToggleButton";
import { useFlexLayout } from "react-table";
import { color } from "chart.js/helpers";
import { FaHeart, FaBell } from "react-icons/fa";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import NotiButton from "./NotiButton";
import CreatePromoCodeButton from "../pages/Admin/createPromoCodeButton";

const Header = ({ HeaderData }) => {
  const role = localStorage.getItem("role");
  const [currency, setCurrency] = useState(
    localStorage.getItem("currency") || "USD"
  );
  const [currencySymbol, setCurrencySymbol] = useState(
    localStorage.getItem("currencySymbol") || "$"
  );
  const [currencyOptions, setCurrencyOptions] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchCurrencyOptions = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3000/api/exchange-rate/fetch-all"
        );
        setCurrencyOptions(response.data.exchangeRates);
      } catch (error) {
        console.error("Error fetching currencies:", error);
      }
    };

    if (role === "tourist") {
      fetchCurrencyOptions();
    }
  }, [role]);

  const handleCurrencyChange = (
    selectedCurrency,
    selectedSymbol,
    exchangeRate
  ) => {
    setCurrency(selectedCurrency);
    setCurrencySymbol(selectedSymbol);
    localStorage.setItem("currency", selectedCurrency);
    localStorage.setItem("currencySymbol", selectedSymbol);
    localStorage.setItem("value", exchangeRate); // Save exchange rate as "value"
    window.location.reload(); // Trigger a page reload
  };

  // Filtered list based on search term
  const filteredCurrencyOptions = currencyOptions.filter((currencyOption) =>
    currencyOption.currency.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
      <header
        className="main_header_arae"
        style={{
          borderBottom: "2px solid var(--secondary-color)",
          padding: "10px 0px",
        }}
      >
        {/* <div className="topbar-area" style={{ borderBottom: "none" }}>
          <div className="container">
            <div className="row align-items-center justify-content-between">
              <div className="col-lg-6 col-md-6">
                <ul className="topbar-list">
                  <li>
                    <Link to="#!">
                      <i className="fab fa-facebook"></i>
                    </Link>
                    <Link to="#!">
                      <i className="fab fa-twitter-square"></i>
                    </Link>
                    <Link to="#!">
                      <i className="fab fa-instagram"></i>
                    </Link>
                    <Link to="#!">
                      <i className="fab fa-linkedin"></i>
                    </Link>
                  </li>
                  <li>
                    <Link to="#!">
                      <span>+011 234 567 89</span>
                    </Link>
                  </li>
                  <li>
                    <Link to="#!">
                      <span>contact@domain.com</span>
                    </Link>
                  </li>
                </ul>
              </div>
              <div
                className="col-lg-3 text-end"
                style={{ display: "flex", justifyContent: "end" }}
              >
                <ThemeToggleButton />
                {role === "tourist" && (
                  <div style={{ position: "relative" }}>
                    <select
                      value={currency}
                      onChange={(e) => {
                        const selectedCurrency = e.target.value;
                        const selectedOption = currencyOptions.find(
                          (option) => option.currency === selectedCurrency
                        );
                        handleCurrencyChange(
                          selectedCurrency,
                          selectedOption ? selectedOption.symbol : "$",
                          selectedOption ? selectedOption.value : 1 // Save exchange rate
                        );
                      }}
                      style={{
                        padding: "5px",
                        borderRadius: "5px",
                        border: "1px solid #ddd",
                        backgroundColor: "#f8f8f8",
                        color: "#333",
                        fontSize: "14px",
                        width: "6vw",
                      }}
                      className="currency-dropdown"
                    >
                      {filteredCurrencyOptions.map((currencyOption) => (
                        <option
                          key={currencyOption.currency}
                          value={currencyOption.currency}
                        >
                          {currencyOption.currency} ({currencyOption.symbol})
                        </option>
                      ))}
                    </select>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div> */}

        <div className="navbar-area">
          <div className="main-responsive-nav">
            <div className="container">
              <div className="main-responsive-menu">
                <div className="row">
                  <div className="col-lg-6">
                    <div className="logo">
                      <Link to="/">
                        <img src={logo} alt="logo" />
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="main-navbar">
            <div className="container">
              <nav className="navbar navbar-expand-md navbar-light">
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "flex-start",
                    flex: 2,
                  }}
                >
                  <Link to="/">
                    <img src={"/logo.svg"} alt="Logo" style={{}} />
                  </Link>
                </div>
                <div
                  style={{
                    flex: 6,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <div
                    className="collapse navbar-collapse mean-menu"
                    id="navbarSupportedContent"
                    style={{
                      borderRadius: "50px",
                      border: "1px solid rgba(255, 255, 255, 0.2)",
                      padding: "0px 1vw",
                      backgroundColor: "var(--secondary-color)",
                      boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                      width: "fit-content",
                    }}
                  >
                    <ul className="navbar-nav">
                      {HeaderData.map((data, index) => (
                        <li
                          className="nav-item"
                          key={index}
                          style={{
                            padding: "2vh 1vw",
                            textWrap: "nowrap",
                          }}
                        >
                          <Link to={data.link} className="nav-link active">
                            <p style={{ color: "var(--text-color)" }}>
                              {data.menu}
                            </p>
                          </Link>
                          {data.submenu && (
                            <ul className="dropdown-menu">
                              {data.subMenuitem.map((item, index1) => (
                                <li className="nav-item" key={index1}>
                                  <Link to={item.linkL} className="nav-link">
                                    {item.subItem}
                                  </Link>
                                  {item.subItems && (
                                    <ul className="dropdown-menu">
                                      {item.subItems.map((item1, index2) => (
                                        <li className="nav-item" key={index2}>
                                          <Link
                                            to={item1.link}
                                            className="nav-link"
                                          >
                                            {item1.item}
                                          </Link>
                                        </li>
                                      ))}
                                    </ul>
                                  )}
                                </li>
                              ))}
                            </ul>
                          )}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
                <div
                  className="others-options d-flex align-items-center"
                  style={{
                    flex: 2,
                    display: "flex",
                    gap: "10px",
                    justifyContent: "end",
                    marginLeft: "2vw",
                  }}
                >
                  <div
                    className="option-item"
                    style={{
                      marginRight: "0px",
                      transform: "scale(0.8)",
                      transformOrigin: "center",
                    }}
                  >
                    <ThemeToggleButton />
                  </div>
                  {role === "tourist" && (
                    <div style={{ position: "relative" }}>
                      <select
                        value={currency}
                        onChange={(e) => {
                          const selectedCurrency = e.target.value;
                          const selectedOption = currencyOptions.find(
                            (option) => option.currency === selectedCurrency
                          );
                          handleCurrencyChange(
                            selectedCurrency,
                            selectedOption ? selectedOption.symbol : "$",
                            selectedOption ? selectedOption.value : 1 // Save exchange rate
                          );
                        }}
                        style={{
                          padding: "10px",
                          borderRadius: "999px",
                          border: "1px solid var(--secondary-border-color)",
                          backgroundColor: "var(--secondary-color)",
                          color: "var(--text-color)",
                          fontSize: "12px",
                          height: "6vh ",
                          width: "6vh",
                          appearance: "none",
                          backgroundImage: "none",
                          cursor: "pointer",
                        }}
                        className="currency-dropdown"
                      >
                        {filteredCurrencyOptions.map((currencyOption) => (
                          <option
                            key={currencyOption.currency}
                            value={currencyOption.currency}
                          >
                            {currencyOption.currency} ({currencyOption.symbol})
                          </option>
                        ))}
                      </select>
                    </div>
                  )}

                  {role === "tourist" && (
                    <div className="option-item" style={{ marginRight: "0px" }}>
                      <Link to="/tourist/cart">
                        <ShoppingCartIcon
                          style={{
                            fontSize: "20px", // Adjust the icon size
                            color: "var(--text-color)", // Set the color for the icon
                          }}
                        />
                      </Link>
                    </div>
                  )}

                  {role === "admin" && <CreatePromoCodeButton />}

                  <div className="option-item" style={{ marginRight: "0px" }}>
                    <NotiButton />
                  </div>

                  <div className="option-item">
                    <ProfileButton />
                  </div>
                </div>
              </nav>
            </div>
          </div>
          <div className="others-option-for-responsive">
            <div className="container">
              <div className="dot-menu">
                <button
                  className="btn btn-primary"
                  type="button"
                  data-bs-toggle="offcanvas"
                  data-bs-target="#offcanvasRight"
                  aria-controls="offcanvasRight"
                >
                  Menu
                </button>
                <div
                  className="offcanvas offcanvas-end"
                  id="offcanvasRight"
                  aria-labelledby="offcanvasRightLabel"
                >
                  <div className="offcanvas-header-two">
                    <div className="offcanvas-logo">
                      <img src={logoBlack} alt="img" />
                    </div>
                    <div className="offcanvas_off">
                      <button
                        type="button"
                        className="btn-close text-reset"
                        data-bs-dismiss="offcanvas"
                        aria-label="Close"
                      ></button>
                    </div>
                  </div>
                  <div className="offcanvas-body">
                    <nav className="navbar navbar-expand-lg navbar-light bg-light">
                      <div className="container-fluid">
                        <div>
                          <ul className="navbar-nav">
                            {HeaderData.map((data, index) => (
                              <li className="nav-item" key={index}>
                                <Link
                                  to={data.link}
                                  className="nav-link active"
                                >
                                  <p style={{ color: "var(--text-color)" }}>
                                    {data.menu}
                                  </p>
                                </Link>
                                {data.submenu && (
                                  <div
                                    className="nav-item"
                                    style={{ position: "relative" }}
                                  >
                                    <ul className="dropdown-menu">
                                      {data.subMenuitem.map((item, index1) => (
                                        <li className="nav-item" key={index1}>
                                          <Link
                                            to={item.linkL}
                                            className="nav-link"
                                          >
                                            {item.subItem}
                                          </Link>
                                          {item.subItems && (
                                            <ul className="dropdown-menu">
                                              {item.subItems.map(
                                                (item1, index2) => (
                                                  <li
                                                    className="nav-item"
                                                    key={index2}
                                                  >
                                                    <Link
                                                      to={item1.link}
                                                      className="nav-link"
                                                    >
                                                      {item1.item}
                                                    </Link>
                                                  </li>
                                                )
                                              )}
                                            </ul>
                                          )}
                                        </li>
                                      ))}
                                    </ul>
                                  </div>
                                )}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </nav>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>
    </>
  );
};

export default Header;
