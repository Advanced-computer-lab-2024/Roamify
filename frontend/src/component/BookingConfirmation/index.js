import React from 'react'
// import Icon
import Icon from '../..//assets/img/icon/right.png'

const BookingConfirmationArea = () => {
  return (
    <>
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
                                    <h3>John Doe, your order was submitted successfully!</h3>
                                    <h6>Your booking details has been sent to: yourmail@domain.com</h6>
                                </div>
                            </div>
                        </div>
                        <div className="booking_tour_form">
                            <h3 className="heading_theme">Your information</h3>
                            <div className="tour_booking_form_box">
                                <div className="your_info_arae">
                                    <ul>
                                        <li><span className="name_first">First name:</span> <span
                                                className="last_name">John</span></li>
                                        <li><span className="name_first">Last name:</span> <span
                                                className="last_name">Doe</span></li>
                                        <li><span className="name_first">Email address:</span> <span
                                                className="last_name">yourmail@domain.com</span></li>
                                        <li><span className="name_first">Address:</span> <span className="last_name">1901
                                                Thornridge Cir. Shiloh, Hawaii 81063</span></li>
                                        <li><span className="name_first">City:</span> <span
                                                className="last_name">Thornridge</span></li>
                                        <li><span className="name_first">State:</span> <span className="last_name">Hawaii</span>
                                        </li>
                                        <li><span className="name_first">Postal code:</span> <span
                                                className="last_name">81063</span></li>
                                        <li><span className="name_first">Country:</span> <span className="last_name">USA</span>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-lg-4">
                    <div className="tour_details_right_sidebar_wrapper">
                        <div className="tour_detail_right_sidebar">
                            <div className="tour_details_right_boxed">
                                <div className="tour_details_right_box_heading">
                                    <h3>Booking details</h3>
                                </div>
                                <div className="tour_booking_amount_area">
                                    <ul>
                                        <li>Booking ID: <span>#RB5783GH</span></li>
                                        <li>Booking date: <span>10 February 2022</span></li>
                                        <li>Payment method: <span>Bank transfer</span></li>
                                        <li>Booking status: <span>Success</span></li>
                                    </ul>
                                    <ul>
                                        <li>Adult Price x 1 <span>$40,000.00</span></li>
                                        <li className="remove_coupon_tour">Discount <span>10%</span></li>
                                        <li>Tax <span>5%</span></li>
                                    </ul>
                                    <div className="tour_bokking_subtotal_area">
                                        <h6 className="remove_coupon_tour">Subtotal <span>$38,000.00</span></h6>
                                    </div>
                                    <div className="coupon_add_area">
                                        <h6><span className="remove_coupon_tour">Remove</span> Coupon code (OFF 5000)
                                            <span>$5,000.00</span>
                                        </h6>
                                    </div>
                                    <div className="total_subtotal_booking">
                                        <h6 className="remove_coupon_tour">Total Amount <span>$33,000.00</span> </h6>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
    </>
  )
}

export default BookingConfirmationArea