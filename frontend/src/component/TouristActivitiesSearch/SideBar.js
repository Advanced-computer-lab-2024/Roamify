import React from "react";

const SideBar = () => {
  return (
    <>
      <div className="left_side_search_area">
        <div className="left_side_search_boxed">
          <div className="left_side_search_heading">
            <h5>Filter by price</h5>
          </div>
          <div className="filter-price">
            <div id="price-slider"></div>
          </div>
          <button className="apply" type="button">
            Apply
          </button>
        </div>
        <div className="left_side_search_boxed">
          <div className="left_side_search_heading">
            <h5>Number of stops</h5>
          </div>
          <div className="tour_search_type">
            <div className="form-check">
              <input
                className="form-check-input"
                type="checkbox"
                defaultValue="1"
                id="flexCheckDefaultf1"
              />
              <label className="form-check-label" htmlFor="flexCheckDefaultf1">
                <span className="area_flex_one">
                  <span>1 stop</span>
                  <span>20</span>
                </span>
              </label>
            </div>
            <div className="form-check">
              <input
                className="form-check-input"
                type="checkbox"
                defaultValue="2"
                id="flexCheckDefaultf2"
              />
              <label className="form-check-label" htmlFor="flexCheckDefaultf2">
                <span className="area_flex_one">
                  <span>2 stop</span>
                  <span>16</span>
                </span>
              </label>
            </div>
            <div className="form-check">
              <input
                className="form-check-input"
                type="checkbox"
                defaultValue="3"
                id="flexCheckDefaultf3"
              />
              <label className="form-check-label" htmlFor="flexCheckDefaultf3">
                <span className="area_flex_one">
                  <span>3 stop</span>
                  <span>30</span>
                </span>
              </label>
            </div>
            <div className="form-check">
              <input
                className="form-check-input"
                type="checkbox"
                defaultValue="4"
                id="flexCheckDefaultf4"
              />
              <label className="form-check-label" htmlFor="flexCheckDefaultf4">
                <span className="area_flex_one">
                  <span>Non-stop</span>
                  <span>22</span>
                </span>
              </label>
            </div>
          </div>
        </div>
        <div className="left_side_search_boxed">
          <div className="left_side_search_heading">
            <h5>Flight className</h5>
          </div>
          <div className="tour_search_type">
            <div className="form-check">
              <input
                className="form-check-input"
                type="checkbox"
                defaultValue="5"
                id="flexCheckDefaultt1"
              />
              <label className="form-check-label" htmlFor="flexCheckDefaultt1">
                <span className="area_flex_one">
                  <span>Economy</span>
                  <span>20</span>
                </span>
              </label>
            </div>
            <div className="form-check">
              <input
                className="form-check-input"
                type="checkbox"
                defaultValue="6"
                id="flexCheckDefaultt2"
              />
              <label className="form-check-label" htmlFor="flexCheckDefaultt2">
                <span className="area_flex_one">
                  <span>Business</span>
                  <span>26</span>
                </span>
              </label>
            </div>
          </div>
        </div>
        <div className="left_side_search_boxed">
          <div className="left_side_search_heading">
            <h5>Airlines</h5>
          </div>
          <div className="tour_search_type">
            <div className="form-check">
              <input
                className="form-check-input"
                type="checkbox"
                defaultValue="7"
                id="flexCheckDefaults1"
              />
              <label className="form-check-label" htmlFor="flexCheckDefaults1">
                <span className="area_flex_one">
                  <span>Quatar Airways</span>
                  <span>17</span>
                </span>
              </label>
            </div>
            <div className="form-check">
              <input
                className="form-check-input"
                type="checkbox"
                defaultValue="8"
                id="flexCheckDefaults2"
              />
              <label className="form-check-label" htmlFor="flexCheckDefaults2">
                <span className="area_flex_one">
                  <span>Fly Amirates </span>
                  <span>14</span>
                </span>
              </label>
            </div>
            <div className="form-check">
              <input
                className="form-check-input"
                type="checkbox"
                defaultValue="9"
                id="flexCheckDefaults3"
              />
              <label className="form-check-label" htmlFor="flexCheckDefaults3">
                <span className="area_flex_one">
                  <span>Novo Air </span>
                  <span>62</span>
                </span>
              </label>
            </div>
            <div className="form-check">
              <input
                className="form-check-input"
                type="checkbox"
                defaultValue="10"
                id="flexCheckDefaults4"
              />
              <label className="form-check-label" htmlFor="flexCheckDefaults4">
                <span className="area_flex_one">
                  <span>Air Asia </span>
                  <span>08</span>
                </span>
              </label>
            </div>
            <div className="form-check">
              <input
                className="form-check-input"
                type="checkbox"
                defaultValue="11"
                id="flexCheckDefaults5"
              />
              <label className="form-check-label" htmlFor="flexCheckDefaults5">
                <span className="area_flex_one">
                  <span>Singapore Airlines </span>
                  <span>12</span>
                </span>
              </label>
            </div>
          </div>
        </div>
        <div className="left_side_search_boxed">
          <div className="left_side_search_heading">
            <h5>Refundable</h5>
          </div>
          <div className="tour_search_type">
            <div className="form-check">
              <input
                className="form-check-input"
                type="checkbox"
                defaultValue="12"
                id="flexCheckDefaultp1"
              />
              <label className="form-check-label" htmlFor="flexCheckDefaultp1">
                <span className="area_flex_one">
                  <span>Yes</span>
                  <span>17</span>
                </span>
              </label>
            </div>
            <div className="form-check">
              <input
                className="form-check-input"
                type="checkbox"
                defaultValue="13"
                id="flexCheckDefaultp2"
              />
              <label className="form-check-label" htmlFor="flexCheckDefaultp2">
                <span className="area_flex_one">
                  <span>No</span>
                  <span>14</span>
                </span>
              </label>
            </div>
            <div className="form-check">
              <input
                className="form-check-input"
                type="checkbox"
                defaultValue="14"
                id="flexCheckDefaultp3"
              />
              <label className="form-check-label" htmlFor="flexCheckDefaultp3">
                <span className="area_flex_one">
                  <span>As per rules</span>
                  <span>62</span>
                </span>
              </label>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SideBar;
