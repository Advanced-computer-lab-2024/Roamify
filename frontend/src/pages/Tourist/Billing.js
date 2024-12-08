import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMoneyBillWave, faWallet } from '@fortawesome/free-solid-svg-icons';
import { faStripeS } from '@fortawesome/free-brands-svg-icons';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './Billing.css';

const Billing = () => {
    const [orderId, setOrderId] = useState('');
    const [paymentMethod, setPaymentMethod] = useState('');
    const [promoCode, setPromoCode] = useState('');
    const [checkoutSummary, setCheckoutSummary] = useState(null);

    useEffect(() => {
        const fetchedOrderId = localStorage.getItem('orderId');
        if (fetchedOrderId) {
            setOrderId(fetchedOrderId);
            fetchCheckoutSummary(fetchedOrderId);
        }
    }, []);

    const fetchCheckoutSummary = async (id) => {
        const url = `http://localhost:3000/api/order/${id}`;
        try {
            const response = await fetch(url, {
                method: 'GET',
                credentials: 'include',
            });
            const data = await response.json();
            if (response.ok) {
                setCheckoutSummary(data.checkoutSummary);
                toast.success('Checkout summary retrieved successfully!');
            } else {
                throw new Error(data.message || 'Failed to fetch checkout summary.');
            }
        } catch (error) {
            toast.error(error.message || 'Error fetching checkout summary.');
        }
    };

    const applyPromoCode = async () => {
        if (!promoCode) {
            toast.error('Please enter a promo code.');
            return;
        }

        const orderId = localStorage.getItem('orderId');
        if (!orderId) {
            toast.error('Order ID not found. Please ensure an order is selected.');
            return;
        }

        const url = `http://localhost:3000/api/order/${orderId}/promo-code/${promoCode}`;
        try {
            const response = await fetch(url, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include',
            });

            const data = await response.json();
            if (response.ok) {
                setCheckoutSummary((prevSummary) => ({
                    ...prevSummary,
                    discountApplied: data.discountApplied || 0,
                    finalAmount: data.finalAmount || prevSummary.totalProductCost,
                }));
                toast.success(data.message || 'Promo code applied successfully!');
                await fetchCheckoutSummary(orderId);
            } else {
                throw new Error(data.message || 'Failed to apply promo code.');
            }
        } catch (error) {
            console.error('Error applying promo code:', error);
            toast.error(error.message || 'An error occurred. Please try again.');
        }
    };

    const handlePayment = async () => {
        if (!orderId || !paymentMethod) {
            toast.error('Please complete all required fields.');
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

    return (
        <div className="billing-container">
            <ToastContainer />
            <div className="billing-flex">
                {/* Order Summary Card */}
                <div className="billing-card summary-card">
                    {checkoutSummary ? (
                        <>
                            <h3>Order Summary</h3>
                            <div className="summary-content">
                                <p><strong>Created At:</strong> {new Date(checkoutSummary.createdAt).toLocaleString()}</p>
                                <ul>
                                    {checkoutSummary.products.map((product) => (
                                        <li key={product.productId}>
                                            <div className="product-details">
                                                <p><strong>Product Name:</strong> {product.name}</p>
                                                <p>
                                                    Quantity: {product.quantity} 
                                                    ({product.quantity} x ${product.priceAtPurchase} = ${product.subtotal})
                                                </p>
                                            </div>
                                        </li>
                                    ))}
                                </ul>
                                <p><strong>Total Items:</strong> {checkoutSummary.products.reduce((total, product) => total + product.quantity, 0)}</p>
                                <p><strong>Delivery Address:</strong> {`${checkoutSummary.deliveryAddress.street}, ${checkoutSummary.deliveryAddress.city}, ${checkoutSummary.deliveryAddress.postalCode}`}</p>
                                <p><strong>Total Cost:</strong> ${checkoutSummary.totalProductCost.toFixed(2)}</p>
                                <p><strong>Discount:</strong> ${checkoutSummary.discountApplied.toFixed(2)}</p>
                                <p><strong>Final Amount:</strong> ${checkoutSummary.finalAmount.toFixed(2)}</p>
                            </div>
                        </>
                    ) : (
                        <p>Loading Summary...</p>
                    )}
                </div>

                {/* Payment Method Card */}
                <div className="billing-card payment-card">
    <h3>Select Payment Method</h3>
    <form onSubmit={(e) => e.preventDefault()}>
        <label>
            <input
                type="radio"
                name="paymentMethod"
                value="COD"
                checked={paymentMethod === 'COD'}
                onChange={(e) => setPaymentMethod(e.target.value)}
            />
            <span>Cash On Delivery</span>
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
            <span>Stripe</span>
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
            <span>Wallet</span>
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
            <button
                type="button"
                className="billing-button apply-button"
                onClick={applyPromoCode}
            >
                Apply
            </button>
        </div>
        <button
            type="button"
            className="billing-button"
            onClick={handlePayment}
        >
            Confirm Payment
        </button>
    </form>
</div>

            </div>
        </div>
    );
};

export default Billing;
