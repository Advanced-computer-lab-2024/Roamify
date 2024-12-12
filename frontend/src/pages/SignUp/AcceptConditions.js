import React from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AcceptConditions = () => {
  const navigate = useNavigate();

  const handleAccept = async (e) => {
    e.preventDefault();
    try {
      await axios.put(
        "http://localhost:3000/api/user/accept-reject-terms-and-conditions",
        { accepted: true },
        { withCredentials: true }
      );
      toast.success("You have accepted the terms and conditions.");
      navigate("/profile-details");
    } catch (error) {
      console.error("Error accepting terms and conditions:", error);
      toast.error("Failed to accept terms and conditions. Please try again.");
    }
  };

  const boxStyle = {
    border: '1px solid #ccc',
    padding: '20px',
    maxWidth: '600px',
    margin: '20px auto',
    textAlign: 'left',
    backgroundColor: '#f8f8f8',
    borderRadius: '8px',
    marginTop: '40px'
  };

  return (
    <div style={boxStyle}>
      <h2 style={{ textAlign: 'center', fontSize:'24px', marginBottom:'10px' }}>Terms and Conditions</h2>
      <div style={{ fontSize: '18px', marginBottom: '10px' }}>Please read and accept our terms and conditions:</div>
      <div style={{ marginBottom: '10px' }}>
        <strong>1. Introduction</strong>
        <p>These Terms and Conditions govern your use of our website and services. By using this website, you accept these terms in full. If you disagree with any part of these terms, please do not use our website.</p>
      </div>
      <div style={{ marginBottom: '10px' }}>
        <strong>2. Eligibility</strong>
        <p>Users must be at least 18 years old to make bookings. Users under 18 can browse the website but are prohibited from booking services or events.</p>
      </div>
      <div style={{ marginBottom: '10px' }}>
        <strong>3. User Registration</strong>
        <p>Users must provide accurate and complete information during registration. Business users must register under their appropriate roles: Seller, Advertiser, or Tour Guide. Tourist users must provide details like DOB, email, username, and status as a student or professional.</p>
      </div>
      <div style={{ marginBottom: '10px' }}>
        <strong>4. Booking Policies</strong>
        <p>All bookings are subject to availability. Prices and availability are subject to change without notice. It is the user’s responsibility to review all booking details before confirmation.</p>
      </div>
      <div style={{ marginBottom: '10px' }}>
        <strong>5. Payment and Refund Policy</strong>
        <p>Refunds are issued in accordance with our Cancellation Policy. Users will earn loyalty points upon successful payment, redeemable as per our loyalty program.</p>
      </div>
      <div style={{ marginBottom: '10px' }}>
        <strong>6. Cancellation Policy</strong>
        <p>Cancellations must be made within the specified timeframe to qualify for refunds.</p>
      </div>
      <div style={{ marginBottom: '10px' }}>
        <strong>7. Loyalty Program</strong>
        <p>Loyalty points are earned after payments and can be redeemed for discounts or vouchers.</p>
      </div>
      <div style={{ marginBottom: '10px' }}>
        <strong>8. User Responsibilities</strong>
        <p>Users are responsible for ensuring their account security and confidentiality. Providing false information may result in account suspension or termination.</p>
      </div>
      <div style={{ marginBottom: '10px' }}>
        <strong>9. Prohibited Activities</strong>
        <p>Users must not use the website for unlawful purposes. They are also prohibited from violating intellectual property rights or other applicable laws.</p>
      </div>
      <div style={{ marginBottom: '20px' }}>
        <strong>10. Contact Us</strong>
        <p>For any questions or concerns regarding these terms, please contact us at roamify@gmail.com.</p>
      </div>
      <form onSubmit={handleAccept}>
        <button type="submit" style={{ width: '100%', padding: '10px', backgroundColor: '#8b3eea', color: 'white', border: 'none', borderRadius: '5px' }}>
          Accept Terms and Conditions
        </button>
      </form>
      <ToastContainer position="top-center" autoClose={5000} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover />
    </div>
  );
};

export default AcceptConditions;
