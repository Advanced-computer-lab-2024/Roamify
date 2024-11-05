import React from "react";
import { Link } from "react-router-dom";
import logo from ".././assets/img/logo.png";
import logoBlack from ".././assets/img/logo_black.png";
import ProfileButton from "../component/Profile/ProfileButton";

const Header = ({ HeaderData }) => {
  return (
    <>
      <header className="main_header_arae">
        <div className="topbar-area">
          <div className="container">
            <div className="row align-items-center">
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
            </div>
          </div>
        </div>

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
                <Link className="navbar-brand" to="/">
                  <img src={logo} alt="logo" />
                </Link>
                <div
                  className="collapse navbar-collapse mean-menu"
                  id="navbarSupportedContent"
                >
                  <ul className="navbar-nav">
                    {HeaderData.map((data, index) => (
                      <li className="nav-item" key={index}>
                        <Link to={data.link} className="nav-link active">
                          {data.menu}
                          {data.submenu && (
                            <i className="fas fa-angle-down"></i>
                          )}
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
                  <div className="others-options d-flex align-items-center">
                    <div className="option-item">
                      <ProfileButton />
                    </div>
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
                                  {data.menu}
                                  {data.submenu && (
                                    <i className="fas fa-angle-down"></i>
                                  )}
                                </Link>
                                {data.submenu && (
                                  <div className="nav-item">
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
