// PlaceDetailsArea.jsx
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import ReviewArea from "../../../../component/TourDetails/ReviewArea";
import ProductDetailsSideBar from "../../../Admin/Products/ProductDetailsSideBar";
import CommonBanner from "../../../../component/Common/CommonBanner";
import Header from "../../../../layout/Header.js";
import { HeaderData } from "../../TouristHeaderData.js"
const PlaceDetails = () => {
  const { id } = useParams();
  const [place, setPlace] = useState(null);
  const [showPopup, setShowPopup] = useState(false);
  const [popupMessage, setPopupMessage] = useState("");

  useEffect(() => {
    const fetchPlaceDetails = async () => {
      try {
        const response = await axios.get("http://localhost:3000/api/places", { withCredentials: true });
        const foundPlace = response.data.places.find((place) => place._id === id);
        setPlace(foundPlace);
      } catch (error) {
        console.error("Error fetching place:", error);
      }
    };
    fetchPlaceDetails();
  }, [id]);

  const handleBooking = async () => {
    try {
      await axios.post(
        "http://localhost:3000/api/tourist/book-place",
        { place: place._id },
        { withCredentials: true }
      );
      setPopupMessage("Booking successful!");
      setShowPopup(true);
      setTimeout(() => setShowPopup(false), 3000);
    } catch (error) {
      setPopupMessage("Failed to book place. Please try again.");
      setShowPopup(true);
      setTimeout(() => setShowPopup(false), 3000);
      console.error("Error booking place:", error);
    }
  };

  if (!place) return <p>Loading place details...</p>;

  return (
    <>
    <Header HeaderData={HeaderData} />
      <CommonBanner heading={place.name} pagination="Place Details" />
      <section id="place_details_main" className="section_padding">
        <div className="container">
          <div className="row">
            <div className="col-lg-8">
              <div className="place_details_leftside_wrapper">
                <div className="place_details_heading_wrapper">
                  <div className="place_details_top_heading">
                    <h2>{place.name}</h2>
                    <h5>{place.location.name}</h5>
                  </div>
                  <div className="place_details_top_heading_right">
                    <p>{place.reviews?.length ?? 0} reviews</p>
                  </div>
                </div>

                <div className="place_details_img_wrapper">
                  {place.images?.length ? (
                    <img src={place.images[0]} alt={place.name} style={{ width: "100%", height: "400px", objectFit: "cover" }} />
                  ) : (
                    <img src="default-image.jpg" alt="default" style={{ width: "100%", height: "400px", objectFit: "cover" }} />
                  )}
                </div>

                <div className="place_details_boxed">
                  <h3 className="heading_theme">Description</h3>
                  <p>{place.description}</p>
                </div>

                <button onClick={handleBooking} className="btn btn_theme">
                  Book Now
                </button>
              </div>
            </div>

            <div className="col-lg-4">
              <ProductDetailsSideBar name={place.name} ticketPrice={place.ticketPrice} rating={place.rating} />
            </div>
          </div>
        </div>
        <ReviewArea reviews={place.reviews} />
      </section>

      
    </>
  );
};

export default PlaceDetails;
