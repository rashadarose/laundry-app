import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const Confirmation = () => {
  const location = useLocation();

  // Try to get details from navigation state first
  let pickupInfo = location.state?.pickupInfo;
  let amount = location.state?.amount;

  // Fallback to localStorage if page was reloaded
  if (!pickupInfo) {
    const stored = localStorage.getItem('confirmation_pickupInfo');
    if (stored) pickupInfo = JSON.parse(stored);
  }
  if (!amount) {
    amount = localStorage.getItem('confirmation_amount');
  }

  return (
    <div className="container mt-5 text-center" style={{ maxWidth: 500 }}>
      <div className="alert alert-success" style={{ fontSize: '1.3rem', fontWeight: 500 }}>
        <i className="fas fa-check-circle" style={{ color: '#28a745', fontSize: '2.5rem' }}></i>
        <div className="mt-3">
          <h2>Payment Successful!</h2>
          <p>Your payment has been processed. Thank you for your order!</p>
          {/* Payment/Order Details */}
          {pickupInfo && (
            <div className="card mt-4 mb-3 text-start">
              <div className="card-body">
                <h5 className="card-title mb-3">Order Details</h5>
                <p><strong>Name:</strong> {pickupInfo.name}</p>
                <p><strong>Address:</strong> {pickupInfo.address}</p>
                <p><strong>Pickup Date:</strong> {pickupInfo.pickupDate}</p>
                <p><strong>Pickup Time:</strong> {pickupInfo.pickupTime}</p>
                <p><strong>Dropoff Time:</strong> {pickupInfo.dropoffTime}</p>
                <p><strong>Load Amount:</strong> {pickupInfo.loadAmount}</p>
                {pickupInfo.phone && <p><strong>Phone:</strong> {pickupInfo.phone}</p>}
                <p><strong>Price:</strong> ${amount ? amount.toFixed(2) : (pickupInfo.loadAmount * 20).toFixed(2)}</p>
              </div>
            </div>
          )}
          <Link to="/home" className="btn btn-primary mt-3">Back to Home</Link>
        </div>
      </div>
    </div>
  );
};

export default Confirmation;