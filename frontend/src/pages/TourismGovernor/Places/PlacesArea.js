import React, { useState, useEffect } from "react";
// import Section Heading
import SectionHeading from "../../../component/Common/SectionHeading";
// import Sidebar
import SideBar from "../../../component/TouristPlaces/SideBar";
// import Data
// import Link
import { Link } from "react-router-dom";

import axios from "axios";
import EditPlaceButton from "./EditPlaceButton";

const PlacesArea = () => {
  const [places, setPlaces] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Fetch the places from the API
    const fetchPlaces = async () => {
      try {
        const response = await axios.get("http://localhost:3000/api/places");
        setPlaces(response.data.places);
        setIsLoading(false);
      } catch (err) {
        console.error(err);
        setIsLoading(false);
      }
    };

    fetchPlaces();
  }, []);
  return (
    <>
      {/* <!-- Destinations Areas --> */}
      <section id="top_testinations" className="section_padding">
        <div className="container">
          {/* <!-- Section Heading --> */}
          <SectionHeading heading="19 destinations found" />
          <div className="row">
            <div className="col-lg-3">
              <SideBar />
            </div>
            <div className="col-lg-9">
              <div className="row">
                {isLoading ? (
                  <p>Loading...</p>
                ) : (
                  places.map((place, index) => (
                    <div
                      className="col-lg-4 col-md-6 col-sm-6 col-12"
                      key={index}
                    >
                      <div className="top_destinations_box img_hover">
                        <div className="heart_destinations">
                          <EditPlaceButton
                            itemId={place._id}
                            placeImages={place.placeImages}
                            description={place.description}
                            closingHours={place.closingHours}
                            openingHours={place.openingHours}
                            tagPlace={place.tagPlace}
                            ticketPrice={place.ticketPrice}
                          />
                        </div>
                        <Link to="/destinations-details">
                          <img
                            src={
                              "https://img.freepik.com/free-vector/flat-illustration-international-friendship-day-celebration_23-2150463971.jpg?t=st=1730318239~exp=1730321839~hmac=3e20245a98fe127802e60ac14b908ef3e8053d615192beb007ff8fd46d0a81fe&w=996"
                            }
                            alt="img"
                          />
                        </Link>
                        <div className="top_destinations_box_content">
                          <h4>
                            <Link to="/destinations-details">{place.name}</Link>
                          </h4>
                          <p>
                            <span className="review_rating">
                              {place.reviewRating}
                            </span>{" "}
                            <span className="review_count">
                              {place.reviewCount}
                            </span>
                          </p>
                          <h3>
                            {place.price}
                            <span>Price starts from</span>
                          </h3>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default PlacesArea;
