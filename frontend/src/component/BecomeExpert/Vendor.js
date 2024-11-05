import React from 'react'
// import Img
import img from "../../assets/img/common/vendor.png"
const VendorArea = () => {
  return (
    <>
    <section id="vendor_form_area" className="section_padding_bottom">
        <div className="container">
            <div className="row">
                <div className="col-lg-12">
                    <div className="vendor_form_heading">
                        <h2>Become a vendor</h2>
                        <p>Eu sint minim tempor anim aliqua officia voluptate incididunt deserunt.
                            <br /> Velitgo quis Lorem culpa qui pariatur occaecat.
                        </p>
                    </div>
                </div>
                <div className="col-lg-8">
                    <div className="vendor_form">
                        <div className="tour_booking_form_box">
                            <form action="!#" id="tour_bookking_form_item">
                                <div className="row">
                                    <div className="col-lg-6">
                                        <div className="form-group">
                                            <input type="text" className="form-control bg_input" placeholder="First name*" />
                                        </div>
                                    </div>
                                    <div className="col-lg-6">
                                        <div className="form-group">
                                            <input type="text" className="form-control bg_input" placeholder="Last name*" />
                                        </div>
                                    </div>
                                    <div className="col-lg-6">
                                        <div className="form-group">
                                            <input type="text" className="form-control bg_input"
                                                placeholder="Email address (Optional)" />
                                        </div>
                                    </div>
                                    <div className="col-lg-6">
                                        <div className="form-group">
                                            <input type="text" className="form-control bg_input"
                                                placeholder="Mobile number*" />
                                        </div>
                                    </div>
                                    <div className="col-lg-12">
                                        <div className="form-group">
                                            <input type="text" className="form-control bg_input"
                                                placeholder="Street address" />
                                        </div>
                                    </div>
                                    <div className="col-lg-6">
                                        <div className="form-group">
                                            <input type="text" className="form-control bg_input"
                                                placeholder="Apartment, Suite, House no (optional)" />
                                        </div>
                                    </div>
                                    <div className="col-lg-6">
                                        <div className="form-group">
                                            <select className="form-control form-select bg_input">
                                                <option>Khulna</option>
                                                <option >New York</option>
                                                <option>Barisal</option>
                                                <option>Nator</option>
                                                <option>Joybangla</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div className="col-lg-6">
                                        <div className="form-group">
                                            <select className="form-control form-select bg_input">
                                                <option>State</option>
                                                <option>New York</option>
                                                <option>Barisal</option>
                                                <option>Nator</option>
                                                <option>Joybangla</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div className="col-lg-6">
                                        <div className="form-group">
                                            <select className="form-control form-select bg_input">
                                                <option>Country</option>
                                                <option>New York</option>
                                                <option>Barisal</option>
                                                <option>Nator</option>
                                                <option>Joybangla</option>
                                            </select>
                                        </div>
                                    </div>
                                </div>
                            </form>
                        </div>
                        <div className="booking_tour_form_submit pt-4">
                            <div className="form-check write_spical_check">
                                <input className="form-check-input" type="checkbox" id="flexCheckDefaultf1" />
                                <label className="form-check-label" htmlFor="flexCheckDefaultf1">
                                    I have read and accept the <a href="terms-service.html">Terms and
                                        conditions</a> and <a href="privacy-policy.html">Privacy policy</a>
                                </label>
                            </div>
                            <a href="#!" className="btn btn_theme btn_md">Sign up</a>
                        </div>
                    </div>
                </div>
                <div className="col-lg-4">
                    <div className="vendor_img">
                        <img src={img} alt="img" />
                    </div>
                </div>
            </div>
        </div>
    </section>
    </>
  )
}

export default VendorArea