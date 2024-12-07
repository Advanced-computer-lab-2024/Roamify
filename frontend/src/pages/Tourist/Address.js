import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Address.css';
import { useNavigate } from 'react-router-dom';

const AddressComponent = () => {
    const navigate = useNavigate(); 
    const [addresses, setAddresses] = useState([]);
    const [selectedAddress, setSelectedAddress] = useState('');
    const [showAddAddressForm, setShowAddAddressForm] = useState(false);
    const [newAddress, setNewAddress] = useState({
        name: '',
        street: '',
        city: '',
        state: '',
        postalCode: '',
        country: ''
    });

    const fetchAddresses = async () => {
        try {
            const response = await axios.get('http://localhost:3000/api/address', { withCredentials: true });
            if (response.data && response.data.addresses) {
                setAddresses(response.data.addresses);
                if (response.data.addresses.length > 0) {
                    setSelectedAddress(response.data.addresses[0]._id);
                }
            } else {
                console.error('No address data found');
            }
        } catch (error) {
            console.error('Error fetching addresses:', error);
        }
    };

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setNewAddress(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const submitNewAddress = async (event) => {
        event.preventDefault();
        try {
            const response = await axios.post('http://localhost:3000/api/address', newAddress, { withCredentials: true });
            console.log(response.data.message);
            fetchAddresses();
            setShowAddAddressForm(false);
            setNewAddress({ name: '', street: '', city: '', state: '', postalCode: '', country: '' });
        } catch (error) {
            console.error('Error adding address:', error);
        }
    };

    useEffect(() => {
        fetchAddresses();
    }, []);

    return (
        <div className="address-container">
            <div className="address-header">
                <h2>My Addresses</h2>
            </div>
            {addresses.map(address => (
                <div key={address._id} className="address-details">
                    <input
                        type="radio"
                        name="address"
                        value={address._id}
                        checked={selectedAddress === address._id}
                        onChange={() => setSelectedAddress(address._id)}
                    />
                    {address.name}: {address.street}, {address.city}, {address.state}, {address.postalCode}, {address.country}
                </div>
            ))}
            {showAddAddressForm && (
                <form onSubmit={submitNewAddress} className="add-address-form">
                    <input type="text" name="name" placeholder="Address Name" value={newAddress.name} onChange={handleInputChange} required />
                    <input type="text" name="street" placeholder="Street" value={newAddress.street} onChange={handleInputChange} required />
                    <input type="text" name="city" placeholder="City" value={newAddress.city} onChange={handleInputChange} required />
                    <input type="text" name="state" placeholder="State" value={newAddress.state} onChange={handleInputChange} required />
                    <input type="text" name="postalCode" placeholder="Postal Code" value={newAddress.postalCode} onChange={handleInputChange} required />
                    <input type="text" name="country" placeholder="Country" value={newAddress.country} onChange={handleInputChange} required />
                    <button type="submit">Add Address</button>
                </form>
            )}
            <div className="button-container">
                <button onClick={() => setShowAddAddressForm(!showAddAddressForm)} className="add-address-button">Add a New Address</button>
                <button onClick={() => navigate('/tourist/billing')} className="pay-now-button">Pay Now</button>
            </div>
        </div>
    );
};

export default AddressComponent;
