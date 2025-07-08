import React, { useState } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { useNavigate, useLocation } from 'react-router-dom';
import bg1 from './images/bg1.jpg';

// Replace with your Stripe publishable key
const stripePromise = loadStripe('pk_test_51RZQ4BDsSHsghj1lHq3hRKZ1W6J1t1ZtQHhBVbmjY3d9tFSrAeu6cOX8Evm5MBbrLXmz7i4hTqYg5I3I5gHqZIMT00chpM9blL');

function PaymentForm() {
    const location = useLocation();
    const pickupInfo = location.state?.pickupInfo;
    const baseAmount = pickupInfo ? pickupInfo.loadAmount * 20 : 0;
    const processingFee = 4.50;
    const taxRate = 0.0825; // 8.25% tax, adjust as needed
    const taxes = +(baseAmount * taxRate).toFixed(2);
    const totalAmount = +(baseAmount + processingFee + taxes).toFixed(2);

    const [amount, setAmount] = useState(totalAmount);
    const [phone, setPhone] = useState(pickupInfo?.phone || '');
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState('');
    const stripe = useStripe();
    const elements = useElements();
    const navigate = useNavigate();

    const handlePhoneChange = (e) => {
        setPhone(e.target.value);
    };

    const handleCancel = () => {
        navigate('/pickup');
    };

    const handlePayment = async (e) => {
        e.preventDefault();
        setLoading(true);
        setMessage('');

        if (!stripe || !elements) {
            setMessage('Stripe is not loaded');
            setLoading(false);
            return;
        }

        // Create PaymentMethod using Stripe Elements
        const cardElement = elements.getElement(CardElement);
        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: 'card',
            card: cardElement,
        });

        if (error) {
            setMessage(error.message);
            setLoading(false);
            return;
        }

        // Call your backend to create a PaymentIntent and confirm payment
        try {
            const API_URL = process.env.REACT_APP_API_URL;
            const res = await fetch(`${API_URL}/api/checkout`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    amount: Math.round(Number(totalAmount) * 100), // convert dollars to cents
                    paymentMethodId: paymentMethod.id,
                    phone: phone // Send phone with req.body
                }),
            });
            const data = await res.json();
            if (data.success) {
                const card = elements.getElement(CardElement);
                if (card) card.clear();
                setAmount('');
                // Store confirmation data in localStorage
                localStorage.setItem('confirmation_pickupInfo', JSON.stringify(pickupInfo));
                localStorage.setItem('confirmation_amount', totalAmount);
                navigate('/confirmation', { state: { pickupInfo, amount: totalAmount } });
            } else {
                setMessage(data.error || 'Payment failed.');
            }
        } catch (err) {
            setMessage('Payment error: ' + err.message);
        }
        setLoading(false);
    };

    return (
        <div>
            {/* Show pickup info if available */}
            {pickupInfo && (
                <div className="card mb-4">
                    <div className="card-body">
                        <h5 className="card-title">Pickup Details</h5>
                        <p><strong>Name:</strong> {pickupInfo.name}</p>
                        <p><strong>Address:</strong> {pickupInfo.address}</p>
                        <p><strong>Pickup Date:</strong> {pickupInfo.pickup_date}</p>
                        <p><strong>Pickup Time:</strong> {pickupInfo.pickup_time}</p>
                        <p><strong>Dropoff Time:</strong> {pickupInfo.dropoff_time}</p>
                        <p><strong>Load Amount:</strong> {pickupInfo.loadAmount}</p>
                        <p><strong>Base Price:</strong> ${baseAmount.toFixed(2)}</p>
                        <p><strong>Processing Fee:</strong> ${processingFee.toFixed(2)}</p>
                        <p><strong>Taxes:</strong> ${taxes.toFixed(2)}</p>
                        <p style={{ fontWeight: 600, fontSize: '1.1rem' }}>
                            Total: <span style={{ color: '#007bff' }}>${totalAmount.toFixed(2)}</span>
                        </p>
                        <button
                            type="button"
                            className="btn btn-outline-danger mt-2"
                            onClick={handleCancel}
                        >
                            Cancel &amp; Edit Pickup Info
                        </button>
                    </div>
                </div>
            )}
            <form onSubmit={handlePayment} style={{ position: 'relative', zIndex: 1 }}>
                <div className="mb-3">
                    <label htmlFor="amount" className="form-label">Amount (USD)</label>
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                        <span style={{
                            background: '#e9ecef',
                            border: '1px solid #86b7fe',
                            borderRight: 'none',
                            color: '#222',
                            padding: '0.375rem 0.75rem',
                            borderRadius: '4px 0 0 4px',
                            fontWeight: 500,
                            fontSize: '1rem'
                        }}>$</span>
                        <input
                            type="text"
                            id="amount"
                            name="amount"
                            value={totalAmount.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                            readOnly
                            disabled
                            required
                            className="form-control"
                            style={{
                                background: '#e9ecef',
                                color: '#222',
                                border: '1px solid #86b7fe',
                                borderLeft: 'none',
                                borderRadius: '0 4px 4px 0',
                                fontWeight: 500,
                                fontSize: '1rem'
                            }}
                        />
                    </div>
                </div>
                <div className="mb-3">
                    <label className="form-label">Card Details</label>
                    <div
                        style={{
                            background: '#cfe2ff',
                            border: '1px solid #86b7fe',
                            borderRadius: 4,
                            padding: '10px 12px'
                        }}
                    >
                        <CardElement
                            options={{
                                style: {
                                    base: {
                                        fontSize: '16px',
                                        color: '#222',
                                        '::placeholder': { color: '#888' },
                                        fontFamily: 'Lato, Arial, sans-serif',
                                    },
                                    invalid: { color: '#e5424d' },
                                },
                            }}
                        />
                    </div>
                </div>
                <div className="mb-3">
                    <label htmlFor="phone" className="form-label">Phone Number</label>
                    <input
                        type="tel"
                        className="form-control"
                        id="phone"
                        name="phone"
                        value={phone}
                        onChange={handlePhoneChange}
                        required
                        pattern="[0-9]{10,15}"
                        placeholder="Enter phone number"
                        style={{
                            background: '#cfe2ff',
                            color: '#222',
                            border: '1px solid #86b7fe'
                        }}
                    />
                </div>
                <button type="submit" className="btn btn-primary w-100" disabled={loading || !stripe}>
                    {loading ? 'Processing...' : 'Pay Now'}
                </button>
            </form>
            {message && (
                <div className="alert alert-danger mt-3">{message}</div>
            )}
        </div>
    );
}

const Payment = () => {
    return (
        <div className="container mt-5" style={{ maxWidth: '500px', position: 'relative', zIndex: 1 }}>
            {/* Transparent background image */}
            <div
                style={{
                    backgroundImage: `url(${bg1})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    opacity: 0.12,
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    width: '100vw',
                    height: '100vh',
                    zIndex: 0,
                    pointerEvents: 'none',
                }}
            />
            <h2 className="mb-4 text-center" style={{ position: 'relative', zIndex: 1 }}>Payment</h2>
            <Elements stripe={stripePromise}>
                <PaymentForm />
            </Elements>
        </div>
    );
};

export default Payment;