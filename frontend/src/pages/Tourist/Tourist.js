import React from "react";
import { Routes, Route } from "react-router-dom";

import Home from "../../page/Home";
import About from "../../page/About";
import Header from "../../layout/Header";
import TouristProducts from "../../page/TouristProducts";
import TourDetails from "../../page/TourDetails";
import ActivityBooking from "../../page/ActivityBooking";
import TouristPlaces from "../../page/TouristPlaces";
import DestinationDetails from "../../page/DestinationDetails";
import TouristActivities from "../../page/TouristActivities";
import BookingConfirmation from "../../page/BookingConfirmation";
import Profile from "../../page/Profile";
import TourGuides from "../../page/TourGuides";
import CopyRight from "../../layout/CopyRight";
import { HeaderData } from "./TouristHeaderData.js";

const Tourist = () => {
  return (
    <>
      <Header HeaderData={HeaderData} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/tour-guids" element={<TourGuides />} />
        <Route path="/tourist-products" element={<TouristProducts />} />
        <Route path="/tour-details/:id" element={<TourDetails />} />
        <Route path="/activity-booking/:id" element={<ActivityBooking />} />
        <Route path="/tourist-places" element={<TouristPlaces />} />
        <Route path="/destinations-details" element={<DestinationDetails />} />
        <Route path="/tourist-activities" element={<TouristActivities />} />
        <Route path="/booking-confirmation" element={<BookingConfirmation />} />
        <Route path="/profile/:id" element={<Profile />} />
        {/* <Route path="/testimonials" element={<Testimonials />} />
        <Route path="/faqs" element={<FaqsArea />} />
        <Route path="/become-expert" element={<BecomeExpert />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/verifyOTP" element={<VerifyOtp />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/forget-password" element={<ForgetPassword />} />
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
        <Route path="*" element={<Error />} />
        <Route path="/news" element={<News />} />
        <Route path="/news-details" element={<NewsDetails />} />
        <Route path="/contact" element={<Contact />} /> */}
      </Routes>
      <CopyRight />
    </>
  );
};

export default Tourist;
