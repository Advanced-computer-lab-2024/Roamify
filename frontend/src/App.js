import React from "react";
import { Routes, Route } from "react-router-dom";
import About from "./page/About";
import Login from "./page/Login";
import Register from "./page/Register";
import Tourist from "./pages/Tourist/Tourist";
import Admin from "./pages/Admin/Admin";
import Seller from "./pages/Seller/Seller";
import TourismGovernor from "./pages/TourismGovernor/TourismGovernor";
import TourGuide from "./pages/TourGuide/TourGuide";
import ProductDetails from "./pages/Admin/Products/ProductDetails";
import Settings from "./pages/Profile/Settings";
import ActivityDetails from "./pages/Tourist/component/TouristActivitiesSearch/ActivityDetails";
import UploadDocuments from "./pages/SignUp/UploadDocuments";
import PendingAcceptance from "./pages/SignUp/PendingAcceptance";
import AcceptConditions from "./pages/SignUp/AcceptConditions";
import ProfileDetails from "./pages/SignUp/ProfileDetails";
import ItineraryDetails from "./pages/Tourist/component/TouristItinerarySearch/ItineraryDetails";
import PlaceDetails from "./pages/Tourist/component/TouristPlaces/PlaceDetails";
import Guest from "../src/pages/Guest/Guest"
const App = () => {
  return (
    <>
      <Routes>
        <Route path="/about" element={<About />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/tourist/*" element={<Tourist />} />
        <Route path="/admin/*" element={<Admin />} />
        <Route path="/advertisor/*" element={<Tourist />} />
        <Route path="/tourism-governor/*" element={<TourismGovernor />} />
        <Route path="/tour-guide/*" element={<TourGuide />} />
        <Route path="/seller/*" element={<Seller />} />
        <Route path="/product-details/:id" element={<ProductDetails />} />
        <Route path="/settings/*" element={<Settings />} />
        <Route path="/upload-documents" element={<UploadDocuments />} />
        <Route path="/pending-acceptance" element={<PendingAcceptance />} />
        <Route path="/accept-conditions" element={<AcceptConditions />} />
        <Route path="/profile-details" element={<ProfileDetails />} />
        <Route path="/activity-details/:id" element={<ActivityDetails />} />
        <Route path="/itinerary-details/:id" element={<ItineraryDetails />} />
        <Route path="/place-details/:id" element={<PlaceDetails />} />
        <Route path="/guest/*" element={<Guest/>}/>
      </Routes>
    </>
  );
};

export default App;
