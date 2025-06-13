import React from 'react';
import { Link } from 'react-router-dom';

const Confirmation = () => (
  <div className="container mt-5 text-center" style={{ maxWidth: 500 }}>
    <div className="alert alert-success" style={{ fontSize: '1.3rem', fontWeight: 500 }}>
      <i className="fas fa-check-circle" style={{ color: '#28a745', fontSize: '2.5rem' }}></i>
      <div className="mt-3">
        <h2>Payment Successful!</h2>
        <p>Your payment has been processed. Thank you for your order!</p>
        <Link to="/home" className="btn btn-primary mt-3">Back to Home</Link>
      </div>
    </div>
  </div>
);

export default Confirmation;