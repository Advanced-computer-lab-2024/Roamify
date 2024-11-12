import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Icon from '../../assets/img/icon/right.png';

const TourGuideCreateItinerary = () => {
    const [formData, setFormData] = useState({
        name: '',
        activities: [''], // Initialize as an array for multiple activity selections
        language: '',
        price: 0,
        availableDates: [''],
        pickUpLocation: '',
        dropOffLocation: '',
        accessibility: false,
    });
    const [activityOptions, setActivityOptions] = useState([]); // Store the list of available activities
    const [submitted, setSubmitted] = useState(false);
    const [error, setError] = useState(null);

    // Fetch all activities on component mount
    useEffect(() => {
        const fetchActivities = async () => {
            try {
                const response = await axios.get('http://localhost:3000/api/activity/');
                setActivityOptions(response.data.activities); // Assume response.data.activities contains the list of activities
            } catch (error) {
                console.error('Error fetching activities:', error);
                setError('Failed to load activities.');
            }
        };
        fetchActivities();
    }, []);

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

    const addDateField = () => {
        setFormData((prevFormData) => ({
            ...prevFormData,
            availableDates: [...prevFormData.availableDates, ''],
        }));
    };

    const handleActivityChange = (index, value) => {
        const updatedActivities = [...formData.activities];
        updatedActivities[index] = value;
        setFormData({
            ...formData,
            activities: updatedActivities,
        });
    };

    const addActivityField = () => {
        setFormData((prevFormData) => ({
            ...prevFormData,
            activities: [...prevFormData.activities, ''],
        }));
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
                                                    <span className="name_first">Activities:</span>
                                                    <span className="last_name">
                                                        {formData.activities.map((activity, index) => (
                                                            <div key={index} style={{ display: 'flex', alignItems: 'center', marginBottom: '5px' }}>
                                                                <select
                                                                    name="activity"
                                                                    value={activity}
                                                                    onChange={(e) => handleActivityChange(index, e.target.value)}
                                                                >
                                                                    <option value="">Select an activity</option>
                                                                    {activityOptions.map((activityOption) => (
                                                                        <option key={activityOption._id} value={activityOption._id}>
                                                                            {activityOption.name}
                                                                        </option>
                                                                    ))}
                                                                </select>
                                                                {index === formData.activities.length - 1 && (
                                                                    <button type="button" onClick={addActivityField} style={{ marginLeft: '5px' }}>
                                                                        +
                                                                    </button>
                                                                )}
                                                            </div>
                                                        ))}
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
                                                            <div key={index} style={{ display: 'flex', alignItems: 'center', marginBottom: '5px' }}>
                                                                <input
                                                                    type="date"
                                                                    value={date}
                                                                    onChange={(e) => handleDateChange(index, e.target.value)}
                                                                />
                                                                {index === formData.availableDates.length - 1 && (
                                                                    <button type="button" onClick={addDateField} style={{ marginLeft: '5px' }}>
                                                                        +
                                                                    </button>
                                                                )}
                                                            </div>
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
