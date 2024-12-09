import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Address.css';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const AddressComponent = () => {
    const navigate = useNavigate();
    const [addresses, setAddresses] = useState([]);
    const [selectedAddress, setSelectedAddress] = useState(''); // Ensure it's initially empty
    const [showAddAddressForm, setShowAddAddressForm] = useState(false);
    const [newAddress, setNewAddress] = useState({
        name: '',
        street: '',
        city: '',
        state: '',
        postalCode: '',
        country: ''
    });

    useEffect(() => {
        fetchAddresses();
    }, []);

    const getToken = () => {
        return localStorage.getItem('token'); // Or wherever your token is stored
    };

    const fetchAddresses = async () => {
        const token = getToken();
        try {
            const response = await axios.get('http://localhost:3000/api/address', {
                withCredentials: true,
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            if (response.data && response.data.addresses) {
                setAddresses(response.data.addresses);
            } else {
                toast.error('No address data found');
            }
        } catch (error) {
            console.error('Error fetching addresses:', error);
            toast.error('Failed to fetch addresses. Please try again.');
        }
    };

    const handleAddressChange = (addressId) => {
        setSelectedAddress(addressId);
        fetchOrderAddress(addressId);
    };

    const fetchOrderAddress = async (addressId) => {
        const token = getToken();
        const orderId = localStorage.getItem('orderId');
        try {
            const url = `http://localhost:3000/api/order/${orderId}/address/${addressId}`;
            const response = await axios.patch(url, {}, {
                withCredentials: true,
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            toast.success('Order address updated successfully');
            console.log('Order Address Data:', response.data);
        } catch (error) {
            console.error('Error updating order address:', error);
            if (error.response) {
                toast.error(`Failed to update order address: ${error.response.data.message}`);
            } else {
                toast.error('An error occurred while updating the address.');
            }
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
        const token = getToken();
        try {
            const response = await axios.post('http://localhost:3000/api/address', newAddress, {
                withCredentials: true,
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            toast.success('New address added successfully!');
            fetchAddresses();
            setShowAddAddressForm(false);
            setNewAddress({ name: '', street: '', city: '', state: '', postalCode: '', country: '' });
        } catch (error) {
            console.error('Error adding address:', error);
            toast.error('Failed to add a new address. Please try again.');
        }
    };

    const handleProceedToBuy = () => {
        if (!selectedAddress) {
            toast.warn('Please select an address before proceeding.');
        } else {
            navigate('/tourist/billing');
        }
    };

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
                        onChange={() => handleAddressChange(address._id)}
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
                <button onClick={handleProceedToBuy} className="pay-now-button">Proceed to Buy</button>
            </div>
            <ToastContainer position="bottom-center" />
        </div>
    );
};

export default AddressComponent;
