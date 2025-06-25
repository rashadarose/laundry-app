import React, { useState } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { useNavigate, useLocation } from 'react-router-dom';
import bg1 from './images/bg1.jpg';

// Replace with your Stripe publishable key
const stripePromise = loadStripe('pk_test_51RZRSFE6vCQwJMVz7Nj5vmfMntJ6gHMp0jmd4xQtyUk6QTcFTAvTihv84lRXcJGpuxRb9WxclGRL2g1BhGe0Xcs500EpIznWvt');

function PaymentForm() {
    const location = useLocation();
    const pickupInfo = location.state?.pickupInfo;
    const initialAmount = location.state?.amount || '';
    const [amount, setAmount] = useState(initialAmount);
    const [phone, setPhone] = useState(pickupInfo?.phone || '');
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState('');
    const stripe = useStripe();
    const elements = useElements();
    const navigate = useNavigate();

    const handleAmountChange = (e) => {
        setAmount(e.target.value);
    };

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
                    amount: Math.round(Number(amount) * 100), // convert dollars to cents
                    paymentMethodId: paymentMethod.id,
                    phone: phone // Send phone with req.body
                }),
            });
            const data = await res.json();
            if (data.success) {
                const card = elements.getElement(CardElement);
                if (card) card.clear();
                setAmount('');
                navigate('/confirmation');
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
                        <p><strong>Pickup Date:</strong> {pickupInfo.pickupDate}</p>
                        <p><strong>Pickup Time:</strong> {pickupInfo.pickupTime}</p>
                        <p><strong>Dropoff Time:</strong> {pickupInfo.dropoffTime}</p>
                        <p><strong>Load Amount:</strong> {pickupInfo.loadAmount}</p>
                        <p><strong>Price:</strong> ${pickupInfo.loadAmount * 20}</p>
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
                    <input
                        type="number"
                        id="amount"
                        name="amount"
                        value={amount}
                        onChange={handleAmountChange}
                        required
                        min="1"
                        step="0.01"
                        className="form-control"
                        style={{
                            background: '#cfe2ff',
                            color: '#222',
                            border: '1px solid #86b7fe'
                        }}
                    />
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