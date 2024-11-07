import React, { useState } from "react";

const RegisterArea = () => {
  const [selectedTab, setSelectedTab] = useState("tourist");

  return (
    <section id="common_author_area">
      <div className="container">
        <div className="row">
          <div className="col-lg-8 offset-lg-2">
            <div className="common_author_boxed">
              {/* Title */}
              <div className="common_author_heading">
                <h2>Register your account</h2>
              </div>

              {/* Tabs */}
              <div className="tab-container">
                <div
                  className={`tab ${selectedTab === "tourist" ? "active" : ""}`}
                  onClick={() => setSelectedTab("tourist")}
                >
                  Tourist
                </div>
                <div
                  className={`tab ${selectedTab === "business" ? "active" : ""}`}
                  onClick={() => setSelectedTab("business")}
                >
                  Business User
                </div>
              </div>

              {/* Form Section */}
              <div className="common_author_form">
                <form action="#" id="main_author_form">
                  {selectedTab === "tourist" && (
                    <div className="form_content">
                      {/* Tourist Registration Form */}
                      <div className="form-group">
                        <input type="email" className="form-control" placeholder="Email" required />
                      </div>
                      <div className="form-group">
                        <input type="text" className="form-control" placeholder="Username" required />
                      </div>
                      <div className="form-group">
                        <input type="password" className="form-control" placeholder="Password" required />
                      </div>
                      <div className="form-group">
                        <input type="text" className="form-control" placeholder="Mobile Number" required />
                      </div>
                      <div className="form-group">
                        <input type="text" className="form-control" placeholder="Nationality" required />
                      </div>
                      <div className="form-group">
                        <input type="date" className="form-control" placeholder="Date of Birth" required />
                      </div>
                     
                      <div className="form-group">
                        <select className="form-control">
                          <option value="employee">Employee</option>
                          <option value="student">Student</option>
                        </select>
                      </div>
                    </div>
                  )}

                  {selectedTab === "business" && (
                    <div className="form_content">
                      {/* Business User Registration Form */}
                      <div className="form-group">
                        <input type="email" className="form-control" placeholder="Email" required />
                      </div>
                      <div className="form-group">
                        <input type="text" className="form-control" placeholder="Username" required />
                      </div>
                      <div className="form-group">
                        <input type="password" className="form-control" placeholder="Password" required />
                      </div>
                      <div className="form-group">
                        <select className="form-control">
                          <option value="seller">Seller</option>
                          <option value="advertiser">Advertiser</option>
                          <option value="tourGuide">Tour Guide</option>
                        </select>
                      </div>
                    </div>
                  )}

                  <div className="common_form_submit">
                    <button className="btn_theme">Register</button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default RegisterArea;
