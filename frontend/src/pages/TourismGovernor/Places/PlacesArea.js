import React, { useState, useEffect } from "react";
// import Section Heading
import SectionHeading from "../../../component/Common/SectionHeading";
// import Sidebar
import SideBar from "../../Tourist/component/TouristPlaces/SideBar";
// import Link
import { Link } from "react-router-dom";
import axios from "axios";
import EditPlaceButton from "./EditPlaceButton";
import CreatePlaceButton from "./CreatePlaceButton"; // Import CreatePlaceButton

const PlacesArea = ({ myPlaces }) => {
  const [places, setPlaces] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const endpoint = myPlaces
    ? "http://localhost:3000/api/tourismgovernor/get-my-places"
    : "http://localhost:3000/api/places";

  useEffect(() => {
    const fetchPlaces = async () => {
      try {
        const response = await axios.get(endpoint, { withCredentials: true });
        setPlaces(myPlaces ? response.data : response.data.places);
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
      <section id="top_testinations" className="section_padding">
        <div className="container">
          <SectionHeading heading={`${places.length} destinations found`} />
          <div className="row">
            <div className="col-lg-3">
              <SideBar />
              {/* Add the CreatePlaceButton under the sidebar */}
              <CreatePlaceButton />
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
                          <img src={place.pictures[0].url} alt="img" />
                        </Link>
                        <div className="top_destinations_box_content">
                          <h4>
                            <Link
                              to="/destinations-details"
                              style={{ color: "var(--main-color)" }}
                            >
                              {place.name}
                            </Link>
                          </h4>
                          <p>
                            <span
                              className="review_rating"
                              style={{ color: "var(--main-color)" }}
                            >
                              {place.reviewRating}
                            </span>{" "}
                            <span
                              className="review_count"
                              style={{ color: "var(--main-color)" }}
                            >
                              {place.reviewCount}
                            </span>
                          </p>
                          <h3 style={{ color: "var(--main-color)" }}>
                            ${place.ticketPrice.Native}
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
