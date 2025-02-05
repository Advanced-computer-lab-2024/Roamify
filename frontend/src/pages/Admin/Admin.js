import React from "react";
import { Routes, Route } from "react-router-dom";

import Home from "../../page/Home";
import About from "../../page/About";
import Header from "../../layout/Header";
import TouristProducts from "../Tourist/TouristProducts.js";
import TourDetails from "../../page/TourDetails";
import ActivityBooking from "../../page/ActivityBooking";
import TouristPlaces from "../Tourist/TouristPlaces.js";
import DestinationDetails from "../../page/DestinationDetails";
// import TouristActivities from "../../page/TouristActivities";
// import BookingConfirmation from "../../page/BookingConfirmation";
import Profile from "../../page/Profile";
import TourGuides from "../../page/TourGuides";
import CopyRight from "../../layout/CopyRight";
import { HeaderData } from "./AdminHeaderData.js";
import Activities from "./Activities/Activities.js";
import PreferenceTags from "./PreferenceTags/PreferenceTags.js";
import AdminUsers from "./Users/AdminUsers.js";
import Products from "./Products/Products.js";
import Complaints from "./Complaints/Complaints.js";
import PendingUsers from "./Users/PendingUsers.js";
import Itineraries from "./Itineraries/Itineraries.js";
import Dashboard from "./Dashboard/Dashboard.js";

const Admin = () => {
  return (
    <>
      <Header HeaderData={HeaderData} />
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/about" element={<About />} />
        <Route path="/activity-categories" element={<Activities />} />
        <Route path="/preference-tags" element={<PreferenceTags />} />
        <Route path="/itineraries" element={<Itineraries />} />
        <Route path="/users/pending" element={<PendingUsers />} />
        <Route
          path="/users/tourists"
          element={<AdminUsers usersName="Tourists" />}
        />
        <Route
          path="/users/sellers"
          element={<AdminUsers usersName="Sellers" />}
        />
        <Route
          path="/users/tour-guides"
          element={<AdminUsers usersName="Tour Guides" />}
        />
        <Route
          path="/users/tourism-governors"
          element={<AdminUsers usersName="Tourism Governors" />}
        />
        <Route
          path="/users/advertisers"
          element={<AdminUsers usersName="Advertisers" />}
        />
        <Route path="/tour-guids" element={<TourGuides />} />
        <Route path="/products" element={<Products isAdmin={true} />} />
        <Route path="/tour-details/:id" element={<TourDetails />} />
        <Route path="/activity-booking/:id" element={<ActivityBooking />} />
        <Route path="/tourist-places" element={<TouristPlaces />} />
        <Route path="/destinations-details" element={<DestinationDetails />} />
        {/* <Route path="/tourist-activities" element={<TouristActivities />} /> */}
        {/* <Route path="/booking-confirmation" element={<BookingConfirmation />} /> */}
        <Route path="/complaints" element={<Complaints />} />
      </Routes>
      <CopyRight />
    </>
  );
};

export default Admin;
