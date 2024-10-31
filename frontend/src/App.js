import React from "react";
import { Routes, Route } from "react-router-dom";
// Import Home Page
import Home from "./page/Home";
// Import About Page
import About from "./page/About";
// Import TourGuides
import TourGuides from "./page/TourGuides";
// Import TourSearch
import TouristProducts from "./page/TouristProducts";
// Import TourDetails
import TourDetails from "./page/TourDetails";
// Import TourBooking
import ActivityBooking from "./page/ActivityBooking";
// Import TopDestinations
import TopDestinationsMain from "./page/TouristPlaces";
// Import DestinationDetails
import DestinationDetails from "./page/DestinationDetails";
// Import FlightSearch
import TouristActivities from "./page/TouristActivities";
// Import BookingConfirmation
import BookingConfirmation from "./page/BookingConfirmation";
// Import Testimonials
import Testimonials from "./page/Testimonials";
// Import FaqsArea
import FaqsArea from "./page/Faqs";
// Import BecomeExpert
import BecomeExpert from "./page/BecomeExpert";
// Import Login
import Login from "./page/Login";
//  Import Register
import Register from "./page/Register";
//  Import VerifyOtp
import VerifyOtp from "./page/VerifyOtp";
// Import ResetPassword
import ResetPassword from "./page/ResetPassword";
// Import ForgetPassword
import ForgetPassword from "./page/ForgetPassword";
// Import PrivacyPolicy
import PrivacyPolicy from "./page/PrivacyPolicy";
// Import Error
import Error from "./page/Error";
// Import News
import News from "./page/News";
// Import NewsDetails
import NewsDetails from "./page/NewsDetails";
// Import ContactArea
import Contact from "./page/Contact";

// Layout Component
import Header from "./layout/Header";
import CtaArea from "./layout/CtaArea";
import Footer from "./layout/Footer";
import CopyRight from "./layout/CopyRight";
import TouristPlaces from "./page/TouristPlaces";

const App = () => {
  return (
    <>
      <Header />
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
        <Route path="/testimonials" element={<Testimonials />} />
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
        <Route path="/contact" element={<Contact />} />
      </Routes>
      <CtaArea />
      <Footer />
      <CopyRight />
    </>
  );
};

export default App;
