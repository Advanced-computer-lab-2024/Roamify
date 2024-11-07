import React, { useState } from 'react';
import axios from 'axios';
import Icon from '../../assets/img/icon/right.png';

const TourGuideCreateItinerary = () => {
    const [formData, setFormData] = useState({
        name: '',
        activities: [''],
        language: '',
        price: 0,
        availableDates: [''],
        pickUpLocation: '',
        dropOffLocation: '',
        accessibility: false,
    });
    const [submitted, setSubmitted] = useState(false);
    const [error, setError] = useState(null);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData({
            ...formData,
            [name]: type === 'checkbox' ? checked : value,
        });
    };

    const handleDateChange = (index, value) => {
        const updatedDates = [...formData.availableDates];
        updatedDates[index] = value;
        setFormData({
            ...formData,
            availableDates: updatedDates,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(
                'http://localhost:3000/api/tourguide/create-itinerary',
                formData,
                {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    withCredentials: true, // Send credentials (cookies, etc.) with the request
                }
            );
            console.log('Itinerary created:', response.data);
            setSubmitted(true);
        } catch (error) {
            console.error('Error creating itinerary:', error.response ? error.response.data : error.message);
            setError('An error occurred while submitting the itinerary.');
        }
    };

    return (
        <section id="tour_booking_submission" className="section_padding">
            <div className="container">
                <div className="row">
                    {submitted ? (
                        <div className="col-lg-8">
                            <div className="tou_booking_form_Wrapper">
                                <div className="tour_booking_form_box mb-4">
                                    <div className="booking_success_arae">
                                        <div className="booking_success_img">
                                            <img src={Icon} alt="Success Icon" />
                                        </div>
                                        <div className="booking_success_text">
                                            <h3>Your itinerary was submitted successfully!</h3>
                                            <h6>We have sent your booking details to your email.</h6>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ) : (
                        <div className="col-lg-8">
                            <form onSubmit={handleSubmit}>
                                <div className="tou_booking_form_Wrapper">
                                    <div className="tour_booking_form_box mb-4">
                                        <h3>Create New Itinerary</h3>
                                        <div className="your_info_arae">
                                            <ul>
                                                <li>
                                                    <span className="name_first">Name:</span>
                                                    <span className="last_name">
                                                        <input
                                                            type="text"
                                                            name="name"
                                                            value={formData.name}
                                                            onChange={handleChange}
                                                        />
                                                    </span>
                                                </li>
                                                <li>
                                                    <span className="name_first">Activities (IDs):</span>
                                                    <span className="last_name">
                                                        <input
                                                            type="text"
                                                            name="activities"
                                                            value={formData.activities[0]}
                                                            onChange={(e) =>
                                                                setFormData({ ...formData, activities: [e.target.value] })
                                                            }
                                                        />
                                                    </span>
                                                </li>
                                                <li>
                                                    <span className="name_first">Language:</span>
                                                    <span className="last_name">
                                                        <input
                                                            type="text"
                                                            name="language"
                                                            value={formData.language}
                                                            onChange={handleChange}
                                                        />
                                                    </span>
                                                </li>
                                                <li>
                                                    <span className="name_first">Price:</span>
                                                    <span className="last_name">
                                                        <input
                                                            type="number"
                                                            name="price"
                                                            value={formData.price}
                                                            onChange={handleChange}
                                                        />
                                                    </span>
                                                </li>
                                                <li>
                                                    <span className="name_first">Available Dates:</span>
                                                    <span className="last_name">
                                                        {formData.availableDates.map((date, index) => (
                                                            <input
                                                                key={index}
                                                                type="date"
                                                                value={date}
                                                                onChange={(e) => handleDateChange(index, e.target.value)}
                                                            />
                                                        ))}
                                                    </span>
                                                </li>
                                                <li>
                                                    <span className="name_first">Pick-Up Location:</span>
                                                    <span className="last_name">
                                                        <input
                                                            type="text"
                                                            name="pickUpLocation"
                                                            value={formData.pickUpLocation}
                                                            onChange={handleChange}
                                                        />
                                                    </span>
                                                </li>
                                                <li>
                                                    <span className="name_first">Drop-Off Location:</span>
                                                    <span className="last_name">
                                                        <input
                                                            type="text"
                                                            name="dropOffLocation"
                                                            value={formData.dropOffLocation}
                                                            onChange={handleChange}
                                                        />
                                                    </span>
                                                </li>
                                                <li>
                                                    <span className="name_first">Accessibility:</span>
                                                    <span className="last_name">
                                                        <input
                                                            type="checkbox"
                                                            name="accessibility"
                                                            checked={formData.accessibility}
                                                            onChange={handleChange}
                                                        />
                                                    </span>
                                                </li>
                                            </ul>
                                            <button type="submit" className="btn btn-primary">
                                                Submit Itinerary
                                            </button>
                                            {error && <p className="error-message">Error: {error}</p>}
                                        </div>
                                    </div>
                                </div>
                            </form>
                        </div>
                    )}
                </div>
            </div>
        </section>
    );
};

export default TourGuideCreateItinerary;
