import React from "react";
import { Routes, Route } from "react-router-dom";
// Import Home Page
import Home from "./page/Home";
// Import About Page
import About from "./page/About";
// Import TourGuides
import TourGuides from "./page/TourGuides";
// Import TourSearch
import TouristProducts from "./pages/Tourist/TouristProducts";
// Import TourDetails
import TourDetails from "./page/TourDetails";
// Import TourBooking
import ActivityBooking from "./page/ActivityBooking";
// Import TopDestinations
import TopDestinationsMain from "./pages/Tourist/TouristPlaces";
// Import DestinationDetails
import DestinationDetails from "./page/DestinationDetails";
// Import FlightSearch
// import TouristActivities from "./page/TouristActivities";

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

// import TouristPlaces from "./pages/Tourist/TouristPlaces";
// import ProductDetails from "./page/ProductDetails";
// import TouristItinerary from "./page/TouristItinerary";
// import TouristProfile from "./pages/Tourist/TouristProfile";
import Profile from "./pages/Profile/Profile";
import Tourist from "./pages/Tourist/Tourist";
import LoginArea from "./component/Login";
import Admin from "./pages/Admin/Admin";
import ProductDetails from "./pages/Admin/Products/ProductDetails";
import Seller from "./pages/Seller/Seller";
import TourismGovernor from "./pages/TourismGovernor/TourismGovernor";

const App = () => {
  return (
    <>
      <Routes>
        {/* <Route path="/" element={<Home />} /> */}
        <Route path="/about" element={<About />} />
        {/* <Route path="/tour-guids" element={<TourGuides />} /> */}
        {/* <Route path="/tourist-profile" element={<TouristProfile />} />
        <Route path="/tourist-products" element={<TouristProducts />} />
        <Route path="/tourist-itinerary" element={<TouristItinerary />} />
        <Route path="/tour-details/:id" element={<TourDetails />} /> */}
        {/* <Route path="/product-details/:id" element={<ProductDetails />} /> */}
        {/* <Route path="/activity-booking/:id" element={<ActivityBooking />} />
        <Route path="/tourist-places" element={<TouristPlaces />} /> */}
        {/* <Route path="/destinations-details" element={<DestinationDetails />} /> */}
        {/* <Route path="/tourist-activities" element={<TouristActivities />} /> */}
        {/* <Route path="/testimonials" element={<Testimonials />} /> */}
        {/* <Route path="/faqs" element={<FaqsArea />} /> */}
        {/* <Route path="/become-expert" element={<BecomeExpert />} /> */}
        {/* <Route path="/login" element={<Login />} /> */}
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/tourist/*" element={<Tourist />} />
        <Route path="/admin/*" element={<Admin />} />
        <Route path="/advertisor/*" element={<Tourist />} />
        <Route path="/tourism-governor/*" element={<TourismGovernor />} />
        <Route path="/tour-guide/*" element={<Tourist />} />
        <Route path="/seller/*" element={<Seller />} />
        <Route path="/product-details/:id" element={<ProductDetails />} />
        <Route path="/profile/*" element={<Profile />} />
        <Route
          path="/destinations-details/:id"
          element={<DestinationDetails />}
        />
      </Routes>
    </>
  );
};

export default App;
