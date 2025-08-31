import React, { useState } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { useNavigate, useLocation } from 'react-router-dom';
import { FaCreditCard, FaShieldAlt, FaLock, FaArrowLeft } from 'react-icons/fa';

// Replace with your Stripe publishable key
const stripePromise = loadStripe('pk_test_51RZQ4BDsSHsghj1lHq3hRKZ1W6J1t1ZtQHhBVbmjY3d9tFSrAeu6cOX8Evm5MBbrLXmz7i4hTqYg5I3I5gHqZIMT00chpM9blL');

function PaymentForm() {
    const location = useLocation();
    const navigate = useNavigate();
    const pickupInfo = location.state?.pickupInfo;
    const passedAmount = location.state?.amount;
    
    // Calculate pricing with proper fallbacks
    const getServicePrice = () => {
        if (pickupInfo?.pricing_tier_name) {
            const tierPrices = {
                'Self-Wash': 18.00,
                'Next-Day': 25.00,
                'Same-Day': 30.00,
                'Recurring Service': 34.00
            };
            return tierPrices[pickupInfo.pricing_tier_name] || 25.00;
        }
        return 25.00; // default
    };

    const bags = pickupInfo?.weight_lbs ? Math.ceil(pickupInfo.weight_lbs / 10) : 1;
    const baseAmount = bags * getServicePrice();
    const processingFee = 4.50;
    const taxRate = 0.0825; // 8.25% tax
    const taxes = +(baseAmount * taxRate).toFixed(2);
    const totalAmount = +(baseAmount + processingFee + taxes).toFixed(2);

    const [phone, setPhone] = useState(pickupInfo?.user_phone || '');
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState('');
    const [messageType, setMessageType] = useState('danger');
    const stripe = useStripe();
    const elements = useElements();

    const handlePhoneChange = (e) => {
        // Format phone number as user types
        let value = e.target.value.replace(/\D/g, '');
        if (value.length >= 6) {
            value = `(${value.slice(0, 3)}) ${value.slice(3, 6)}-${value.slice(6, 10)}`;
        } else if (value.length >= 3) {
            value = `(${value.slice(0, 3)}) ${value.slice(3)}`;
        }
        setPhone(value);
    };

    const handleCancel = () => {
        navigate('/pickup');
    };

    const handlePayment = async (e) => {
        e.preventDefault();
        setLoading(true);
        setMessage('');

        if (!stripe || !elements) {
            setMessage('Payment system is loading. Please wait...');
            setMessageType('warning');
            setLoading(false);
            return;
        }

        const cardElement = elements.getElement(CardElement);
        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: 'card',
            card: cardElement,
        });

        if (error) {
            setMessage(error.message);
            setMessageType('danger');
            setLoading(false);
            return;
        }

        try {
            const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:3002';
            const res = await fetch(`${API_URL}/api/checkout`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    amount: Math.round(totalAmount * 100), // convert to cents
                    paymentMethodId: paymentMethod.id,
                    phone: phone.replace(/\D/g, '') // clean phone number
                }),
            });
            
            const data = await res.json();
            
            if (data.success) {
                cardElement.clear();
                // Store confirmation data
                localStorage.setItem('confirmation_pickupInfo', JSON.stringify(pickupInfo));
                localStorage.setItem('confirmation_amount', totalAmount.toString());
                
                setMessage('Payment successful! Redirecting...');
                setMessageType('success');
                
                setTimeout(() => {
                    navigate('/confirmation', { 
                        state: { 
                            pickupInfo, 
                            amount: totalAmount,
                            paymentMethod: 'card'
                        } 
                    });
                }, 1500);
            } else {
                setMessage(data.error || 'Payment failed. Please try again.');
                setMessageType('danger');
            }
        } catch (err) {
            console.error('Payment error:', err);
            setMessage('Network error. Please check your connection and try again.');
            setMessageType('danger');
        }
        
        setLoading(false);
    };

    if (!pickupInfo) {
        return (
            <div className="text-center py-5">
                <h4>No order information found</h4>
                <p className="text-muted mb-4">Please start by scheduling a pickup.</p>
                <button className="btn btn-primary" onClick={() => navigate('/pickup')}>
                    Schedule Pickup
                </button>
            </div>
        );
    }

    return (
        <div className="row">
            {/* Order Summary */}
            <div className="col-lg-5 mb-4">
                <div className="card border-0 shadow-sm">
                    <div className="card-header bg-primary text-white py-3">
                        <h5 className="mb-0">Order Summary</h5>
                    </div>
                    <div className="card-body">
                        <div className="mb-3">
                            <h6 className="text-muted">Service Details</h6>
                            <div className="d-flex justify-content-between mb-1">
                                <span>Service Type:</span>
                                <span className="fw-bold">{pickupInfo.pricing_tier_name || 'Next-Day'}</span>
                            </div>
                            <div className="d-flex justify-content-between mb-1">
                                <span>Weight:</span>
                                <span>{pickupInfo.weight_lbs || 10} lbs</span>
                            </div>
                            <div className="d-flex justify-content-between mb-3">
                                <span>Bags:</span>
                                <span>{bags} × 10 lb bags</span>
                            </div>
                        </div>

                        <div className="mb-3">
                            <h6 className="text-muted">Pickup Information</h6>
                            <p className="small mb-1"><strong>{pickupInfo.name}</strong></p>
                            <p className="small mb-1">{pickupInfo.address}</p>
                            <p className="small mb-1">📅 {pickupInfo.pickup_date}</p>
                            <p className="small mb-0">🕐 {pickupInfo.pickup_time}</p>
                        </div>

                        <hr />
                        
                        <div className="mb-2">
                            <div className="d-flex justify-content-between">
                                <span>Service ({bags} bags × ${getServicePrice()}):</span>
                                <span>${baseAmount.toFixed(2)}</span>
                            </div>
                            <div className="d-flex justify-content-between">
                                <span>Processing Fee:</span>
                                <span>${processingFee.toFixed(2)}</span>
                            </div>
                            <div className="d-flex justify-content-between">
                                <span>Tax (8.25%):</span>
                                <span>${taxes.toFixed(2)}</span>
                            </div>
                        </div>
                        
                        <hr />
                        
                        <div className="d-flex justify-content-between">
                            <span className="fw-bold h5">Total:</span>
                            <span className="fw-bold h5 text-primary">${totalAmount.toFixed(2)}</span>
                        </div>
                        
                        <button
                            type="button"
                            className="btn btn-outline-secondary w-100 mt-3"
                            onClick={handleCancel}
                        >
                            <FaArrowLeft className="me-2" />
                            Edit Order Details
                        </button>
                    </div>
                </div>
            </div>

            {/* Payment Form */}
            <div className="col-lg-7">
                <div className="card border-0 shadow-sm">
                    <div className="card-header bg-white py-3">
                        <h5 className="mb-0">
                            <FaCreditCard className="me-2 text-primary" />
                            Payment Information
                        </h5>
                    </div>
                    <div className="card-body">
                        {message && (
                            <div className={`alert alert-${messageType} alert-dismissible fade show`}>
                                {messageType === 'success' && <i className="fas fa-check-circle me-2"></i>}
                                {messageType === 'danger' && <i className="fas fa-exclamation-triangle me-2"></i>}
                                {messageType === 'warning' && <i className="fas fa-info-circle me-2"></i>}
                                {message}
                                <button type="button" className="btn-close" onClick={() => setMessage('')}></button>
                            </div>
                        )}

                        <form onSubmit={handlePayment}>
                            {/* Amount Display */}
                            <div className="mb-4">
                                <label className="form-label">Total Amount</label>
                                <div className="input-group">
                                    <span className="input-group-text bg-light">$</span>
                                    <input
                                        type="text"
                                        className="form-control bg-light"
                                        value={totalAmount.toLocaleString('en-US', { 
                                            minimumFractionDigits: 2, 
                                            maximumFractionDigits: 2 
                                        })}
                                        readOnly
                                        style={{ fontWeight: '600', fontSize: '1.1rem' }}
                                    />
                                </div>
                            </div>

                            {/* Card Details */}
                            <div className="mb-4">
                                <label className="form-label">
                                    <FaCreditCard className="me-2 text-primary" />
                                    Card Information
                                </label>
                                <div className="card-input-wrapper" style={{
                                    border: '1px solid #ced4da',
                                    borderRadius: '6px',
                                    padding: '12px',
                                    backgroundColor: '#f8f9fa'
                                }}>
                                    <CardElement
                                        options={{
                                            style: {
                                                base: {
                                                    fontSize: '16px',
                                                    color: '#495057',
                                                    fontFamily: 'system-ui, -apple-system, sans-serif',
                                                    '::placeholder': { color: '#6c757d' },
                                                    iconColor: '#495057'
                                                },
                                                invalid: { 
                                                    color: '#dc3545',
                                                    iconColor: '#dc3545'
                                                },
                                            },
                                        }}
                                    />
                                </div>
                                <small className="text-muted">
                                    <FaLock className="me-1" />
                                    Your payment information is encrypted and secure
                                </small>
                            </div>

                            {/* Phone Number */}
                            <div className="mb-4">
                                <label htmlFor="phone" className="form-label">Phone Number</label>
                                <input
                                    type="tel"
                                    className="form-control"
                                    id="phone"
                                    value={phone}
                                    onChange={handlePhoneChange}
                                    placeholder="(555) 123-4567"
                                    maxLength={14}
                                    required
                                />
                                <small className="text-muted">
                                    We'll send pickup confirmation and updates to this number
                                </small>
                            </div>

                            {/* Submit Button */}
                            <button 
                                type="submit" 
                                className="btn btn-primary btn-lg w-100"
                                disabled={loading || !stripe}
                            >
                                {loading ? (
                                    <>
                                        <span className="spinner-border spinner-border-sm me-2"></span>
                                        Processing Payment...
                                    </>
                                ) : (
                                    <>
                                        <FaShieldAlt className="me-2" />
                                        Pay ${totalAmount.toFixed(2)} Securely
                                    </>
                                )}
                            </button>

                            {/* Security Notice */}
                            <div className="text-center mt-3">
                                <small className="text-muted">
                                    <FaLock className="me-1" />
                                    Powered by Stripe • 256-bit SSL encryption
                                </small>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}

const Payment = () => {
    return (
        <div className="min-vh-100" style={{ background: 'linear-gradient(135deg, #f8faff 0%, #e3f2fd 100%)' }}>
            {/* Header */}
            <div className="container-fluid py-4" style={{
                background: 'linear-gradient(135deg, #1e3a8a 0%, #3b82f6 50%, #06b6d4 100%)'
            }}>
                <div className="container">
                    <div className="text-center text-white">
                        <h1 className="h3 mb-2">Secure Payment</h1>
                        <p className="mb-0 opacity-75">Complete your laundry service order</p>
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <div className="container py-4" style={{ maxWidth: '1000px' }}>
                <Elements stripe={stripePromise}>
                    <PaymentForm />
                </Elements>
            </div>
        </div>
    );
};

export default Payment;