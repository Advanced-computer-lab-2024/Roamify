import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMoneyBillWave, faWallet, faTimes } from '@fortawesome/free-solid-svg-icons';
import { faStripeS } from '@fortawesome/free-brands-svg-icons';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './Billing.css';

const Billing = ({ selectedAddress }) => {
    const [orderId, setOrderId] = useState('');
    const [paymentMethod, setPaymentMethod] = useState('');
    const [promoCode, setPromoCode] = useState('');

    useEffect(() => {
        // Fetch orderId from local storage upon component mount
        const fetchedOrderId = localStorage.getItem('orderId');
        if (fetchedOrderId) {
            setOrderId(fetchedOrderId);
        }
    }, []);

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!orderId) {
            toast.error('Order ID is missing.');
            return;
        }

        if (!paymentMethod) {
            toast.error('Please select a payment method.');
            return;
        }

        const url = `http://localhost:3000/api/order/${orderId}/payment`;

        try {
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ paymentMethod }),
                credentials: 'include',
            });

            const data = await response.json();
            if (response.ok) {
                toast.success(data.message || 'Payment successful!');
            } else {
                throw new Error(data.message || 'Payment failed. Please try again.');
            }
        } catch (error) {
            toast.error(error.message || 'An error occurred. Please try again.');
        }
    };

    const handleApplyPromo = async () => {
        const url = `http://localhost:3000/api/order/${orderId}/promo-code/${promoCode}`;

        try {
            const response = await fetch(url, {
                method: 'PATCH',
                credentials: 'include',
            });

            const data = await response.json();
            if (response.ok) {
                toast.success('Promo code applied successfully!');
            } else {
                throw new Error(data.message || 'Failed to apply promo code.');
            }
        } catch (error) {
            toast.error(error.message || 'Promo code application failed.');
        }
    };

    const handleClearPromo = async () => {
        const url = `http://localhost:3000/api/order/${orderId}/promo-code/none`;

        try {
            const response = await fetch(url, {
                method: 'PATCH',
                credentials: 'include',
            });

            const data = await response.json();
            if (response.ok) {
                setPromoCode('');
                toast.success('Promo code cleared successfully!');
            } else {
                throw new Error(data.message || 'Failed to clear promo code.');
            }
        } catch (error) {
            toast.error(error.message || 'Failed to clear promo code.');
        }
    };

    return (
        <div className="billing-container">
            <ToastContainer />
            <div className="billing-header">
                <h2>Select Payment Method</h2>
            </div>
            <form className="billing-form" onSubmit={handleSubmit}>
                <label>
                    <input 
                        type="radio"
                        name="paymentMethod"
                        value="COD"
                        checked={paymentMethod === 'COD'}
                        onChange={(e) => setPaymentMethod(e.target.value)}
                    />
                    Cash On Delivery
                    <FontAwesomeIcon icon={faMoneyBillWave} className="icon" />
                </label>
                <label>
                    <input 
                        type="radio"
                        name="paymentMethod"
                        value="Stripe"
                        checked={paymentMethod === 'Stripe'}
                        onChange={(e) => setPaymentMethod(e.target.value)}
                    />
                    Stripe
                    <FontAwesomeIcon icon={faStripeS} className="icon" />
                </label>
                <label>
                    <input 
                        type="radio"
                        name="paymentMethod"
                        value="Wallet"
                        checked={paymentMethod === 'Wallet'}
                        onChange={(e) => setPaymentMethod(e.target.value)}
                    />
                    Wallet
                    <FontAwesomeIcon icon={faWallet} className="icon" />
                </label>
                <div className="promo-code-container">
                    <input 
                        type="text" 
                        placeholder="Apply a promo code" 
                        value={promoCode} 
                        onChange={(e) => setPromoCode(e.target.value)}
                        className="promo-code-input"
                    />
                    <button type="button" onClick={handleApplyPromo} disabled={!promoCode}>
                        Apply 
                    </button>
                    {promoCode && <button type="button" onClick={handleClearPromo} className="clear-promo-btn">
                        <FontAwesomeIcon icon={faTimes} />
                    </button>}
                </div>
                <button type="submit" className="billing-button">Confirm Payment</button>
            </form>
        </div>
    );
};

export default Billing;
