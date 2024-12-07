import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMoneyBillWave, faWallet, faTimes } from '@fortawesome/free-solid-svg-icons';
import { faStripeS } from '@fortawesome/free-brands-svg-icons';
import './Billing.css';

const Billing = () => {
    const [paymentMethod, setPaymentMethod] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const [promoCode, setPromoCode] = useState(''); // State for the promo code

    const handleSubmit = async (event) => {
        event.preventDefault();
        setErrorMessage('');
        setSuccessMessage('');
    
        const orderId = localStorage.getItem('orderId');
        const url = `http://localhost:3000/api/order/${orderId}/payment`;
    
        try {
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ paymentMethod, promoCode }), // Send promo code along with payment method
                credentials: 'include'
            });
    
            const data = await response.json();
            if (!response.ok) {
                throw new Error(data.message || "An unknown error occurred");
            }
            console.log('Payment Successful:', data);
            setSuccessMessage('Payment Successful!');
            setTimeout(() => {
                setSuccessMessage('');
            }, 3000);
        } catch (error) {
            console.error('Payment Error:', error);
            setErrorMessage(error.message);
            setTimeout(() => {
                setErrorMessage('');
            }, 2000);
        }
    };

    const handleClearPromo = () => {
        setPromoCode(''); // Clear the promo code field
    };

    return (
        <div className="billing-container">
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
                    {promoCode && <button type="button" onClick={handleClearPromo} className="clear-promo-btn">
                        <FontAwesomeIcon icon={faTimes} />
                    </button>}
                </div>

                <button type="submit" className="billing-button">Confirm Payment</button>
                {errorMessage && <p className="error-message">{errorMessage}</p>}
                {successMessage && <p className="success-message">{successMessage}</p>}
            </form>
           
        </div>
    );
};

export default Billing;
