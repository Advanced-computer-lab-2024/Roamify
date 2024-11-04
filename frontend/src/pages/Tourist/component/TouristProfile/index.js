import React, { useEffect, useState } from "react";
import axios from "axios";
import Icon from "../../../../assets/img/icon/right.png";

const TouristProfileArea = () => {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3000/api/tourist/get-profile",
          {
            withCredentials: true, // Include credentials
          }
        );
        setProfile(response.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <section id="tour_booking_submission" className="section_padding">
      <div className="container">
        <div className="row">
          <div className="col-lg-8">
            <div className="tou_booking_form_Wrapper">
              <div className="tour_booking_form_box mb-4">
                <div className="booking_success_arae">
                  <div className="booking_success_img">
                    <img src={Icon} alt="img" />
                  </div>
                  <div className="booking_success_text">
                    <h3>
                      {profile.firstName} {profile.lastName}, your order was
                      submitted successfully!
                    </h3>
                    <h6>
                      Your booking details have been sent to: {profile.email}
                    </h6>
                  </div>
                </div>
              </div>
              <div className="booking_tour_form">
                <h3 className="heading_theme">Your information</h3>
                <div className="tour_booking_form_box">
                  <div className="your_info_arae">
                    <ul>
                      <li>
                        <span className="name_first">First name:</span>{" "}
                        <span className="last_name">{profile.firstName}</span>
                      </li>
                      <li>
                        <span className="name_first">Last name:</span>{" "}
                        <span className="last_name">{profile.lastName}</span>
                      </li>
                      <li>
                        <span className="name_first">Email address:</span>{" "}
                        <span className="last_name">{profile.email}</span>
                      </li>
                      <li>
                        <span className="name_first">Mobile number:</span>{" "}
                        <span className="last_name">
                          {profile.mobileNumber}
                        </span>
                      </li>
                      <li>
                        <span className="name_first">Nationality:</span>{" "}
                        <span className="last_name">{profile.nationality}</span>
                      </li>
                      <li>
                        <span className="name_first">Date of Birth:</span>{" "}
                        <span className="last_name">
                          {new Date(profile.dateOfBirth).toLocaleDateString()}
                        </span>
                      </li>
                      <li>
                        <span className="name_first">Occupation:</span>{" "}
                        <span className="last_name">{profile.occupation}</span>
                      </li>
                      <li>
                        <span className="name_first">Adult:</span>{" "}
                        <span className="last_name">
                          {profile.adult ? "Yes" : "No"}
                        </span>
                      </li>
                      <li>
                        <span className="name_first">Card Number:</span>{" "}
                        <span className="last_name">{profile.cardNumber}</span>
                      </li>
                      <li>
                        <span className="name_first">Card Valid Until:</span>{" "}
                        <span className="last_name">
                          {new Date(
                            profile.cardValidUntil
                          ).toLocaleDateString()}
                        </span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TouristProfileArea;
