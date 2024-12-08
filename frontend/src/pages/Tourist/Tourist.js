import React from "react";
import { Routes, Route } from "react-router-dom";

import Home from "../../page/Home";
import About from "../../page/About";
import Header from "../../layout/Header";
import TouristProducts from "./TouristProducts.js";
import TourDetails from "../../page/TourDetails";
import TouristPlaces from "./TouristPlaces.js";
import TouristActivities from "./TouristActivities.js";
import CopyRight from "../../layout/CopyRight";
import { HeaderData } from "./TouristHeaderData.js";
import TouristProfile from "./TouristProfile.js";
import TouristItinerary from "./TouristItinerary.js";
import TouristComplain from "./TouristComplain.js";
import TouristView from "./TouristView.js";
import ActivityBooking from "./ActivityBooking.js";
import ItineraryBooking from "./ItineraryBooking.js";
import Transportations from "./Transportations/Transportations.js";
import Point from "./Point.js";
import Redeem from "./Redeem.js";
import CompletedItinerary from "./component/TouristItinerarySearch/CompletedItinerary.js";
import ReviewTourGuide from "./component/TouristItinerarySearch/ReviewTourGuide.js";
import CompletedActivity from "./component/TouristActivitiesSearch/CompletedActivity.js";
import Wallet from "../Profile/Wallet.js";
import Wishlist from "./Wishlist.js";
import Hotels from "./component/Hotels/Hotels.js";
import Cart from "./Cart.js";
import Address from "./Address.js";
import Billing from "./Billing.js";
import Orders from "./Orders.js";
const Tourist = () => {
  return (
    <>
      <Header HeaderData={HeaderData} />
      <Routes>
        <Route path="/tourist-profile" element={<TouristProfile />} />
        <Route path="/" element={<Hotels />} />
        <Route path="/products" element={<TouristProducts />} />
        <Route path="/tourist-itinerary" element={<TouristItinerary />} />
        <Route path="/tour-details/:id" element={<TourDetails />} />
        <Route path="/tourist-places" element={<TouristPlaces />} />
        <Route path="/tourist-activities" element={<TouristActivities />} />
        <Route path="/tourist-complain" element={<TouristComplain />} />
        <Route path="/tourist-view" element={<TouristView />} />
        <Route path="/activity-booking" element={<ActivityBooking />} />
        <Route path="/itinerary-booking" element={<ItineraryBooking />} />
        <Route path="/transportations" element={<Transportations />} />
        <Route path="/point" element={<Point />} />
        <Route path="/redeem" element={<Redeem />} />
        <Route path="/completed-itinerary" element={<CompletedItinerary />} />
        <Route path="/tour-guides" element={<ReviewTourGuide />} />
        <Route path="/completed-activity" element={<CompletedActivity />} />
        <Route path="/wallet" element={<Wallet />} />
        <Route path="/wishlist" element={<Wishlist />}/>
        <Route path="/cart" element={<Cart />}/>
        <Route path="/address" element={<Address />}/>
        <Route path="/billing" element={<Billing />}/>
        <Route path="/orders" element={<Orders />}/>
      </Routes>
      <CopyRight />
    </>
  );
};

export default Tourist;
