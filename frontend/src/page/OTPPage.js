import React, { useState, useEffect } from "react";

const OTPPage = () => {
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [countdownTime, setCountdownTime] = useState(60);
  const [isResendDisabled, setIsResendDisabled] = useState(true);

  // Handle OTP input change
  const handleInputChange = (e, index) => {
    const value = e.target.value;
    if (/[^0-9]/.test(value)) return; // Only allow numbers

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Move focus to next input
    if (value && index < otp.length - 1) {
      document.getElementById(`otp${index + 2}`).focus();
    }
  };

  // Start countdown for resend OTP
  useEffect(() => {
    if (countdownTime === 0) {
      setIsResendDisabled(false);
    }
    const timer = setInterval(() => {
      if (countdownTime > 0) {
        setCountdownTime(countdownTime - 1);
      }
    }, 1000);

    return () => clearInterval(timer); // Cleanup on unmount
  }, [countdownTime]);

  // Resend OTP function
  const handleResend = () => {
    setOtp(["", "", "", "", "", ""]);
    setCountdownTime(30);
    setIsResendDisabled(true);
  };

  return (
    <div
      style={{
        fontFamily: "'Poppins', sans-serif",
        backgroundColor: "#f4f7fa",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        margin: "0",
      }}
    >
      <div
        style={{
          backgroundColor: "#fff",
          padding: "40px",
          borderRadius: "10px",
          boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
          textAlign: "center",
          width: "350px",
        }}
      >
        <h2
          style={{
            fontSize: "24px",
            marginBottom: "20px",
          }}
        >
          Enter OTP
        </h2>
        <p>
          A one-time password has been sent to your email. Please enter the
          6-digit OTP to proceed.
        </p>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            marginBottom: "20px",
          }}
        >
          {otp.map((digit, index) => (
            <input
              key={index}
              id={`otp${index + 1}`}
              type="text"
              value={digit}
              maxLength="1"
              onChange={(e) => handleInputChange(e, index)}
              style={{
                width: "45px",
                height: "45px",
                fontSize: "18px",
                textAlign: "center",
                border: "2px solid #ccc",
                borderRadius: "5px",
                outline: "none",
                transition: "all 0.3s",
                ...(digit && {
                  borderColor: "#007bff", // Focused input
                }),
                ...(digit === "" && {
                  borderColor: "red", // Invalid input (empty)
                }),
              }}
            />
          ))}
        </div>

        <div
          style={{
            marginBottom: "20px",
            fontSize: "16px",
            color: "#333",
          }}
        >
          You can resend OTP in: <span id="countdown">{countdownTime}</span>{" "}
          seconds
        </div>

        <button
          style={{
            backgroundColor: "#007bff",
            color: "white",
            border: "none",
            padding: "10px 20px",
            borderRadius: "5px",
            cursor: "pointer",
            fontSize: "16px",
            transition: "background-color 0.3s",
            ...(isResendDisabled && {
              backgroundColor: "#ccc",
              cursor: "not-allowed",
            }),
            ":hover": !isResendDisabled && {
              backgroundColor: "#0056b3",
            },
          }}
          onClick={handleResend}
          disabled={isResendDisabled}
        >
          Resend OTP
        </button>

        <div
          style={{
            fontSize: "14px",
            color: "#666",
            marginTop: "20px",
          }}
        >
          Haven't received the OTP? Check your spam folder.
        </div>
      </div>
    </div>
  );
};

export default OTPPage;
