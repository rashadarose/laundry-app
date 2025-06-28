import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import bg1 from './images/bg1.jpg';
import fng4 from './images/fng4.png';

function PickUp() {
  const [form, setForm] = useState({
    name: '',
    address: '',
    city: '',
    zip: '',
    pickupDate: '',
    pickupTime: '',
    loadAmount: 1,
    dropoffTime: '',
  });
  const [loading, setLoading] = useState(false);
  const [showAuthAlert, setShowAuthAlert] = useState(false);
  const navigate = useNavigate();

  // Fetch user info if signed in
  useEffect(() => {
    const token = localStorage.getItem('laundry_token');
    if (!token) {
      setShowAuthAlert(true);
    } else {
      // Fetch user info from API
      const API_URL = process.env.REACT_APP_API_URL;
      fetch(`${API_URL}/api/users/${token}`)
        .then(res => res.json())
        .then(user => {
          setForm(prev => ({
            ...prev,
            name: user.name || '',
            address: user.address ? user.address.split(',')[0] : '',
            city: user.address ? user.address.split(',')[1]?.trim() || '' : '',
            zip: user.address ? user.address.split(',')[2]?.trim() || '' : '',
          }));
        })
        .catch(() => {});
    }
  }, []);

  const handleSignIn = () => {
    setShowAuthAlert(false);
    navigate('/signin');
  };

  const handleContinueGuest = () => {
    setShowAuthAlert(false);
  };

  // Generate time options in 30-minute intervals
  const generateTimeOptions = () => {
    const options = [];
    for (let h = 0; h < 24; h++) {
      for (let m = 0; m < 60; m += 30) {
        const hour = h.toString().padStart(2, '0');
        const min = m.toString().padStart(2, '0');
        options.push(`${hour}:${min}`);
      }
    }
    return options;
  };

  // Calculate minimum dropoff time (4 hours after pickup)
  const getMinDropoffTime = () => {
    if (!form.pickupTime) return '';
    const [hours, minutes] = form.pickupTime.split(':').map(Number);
    const date = new Date();
    date.setHours(hours + 4, minutes, 0, 0);
    return date.toTimeString().slice(0, 5);
  };

  // Only show dropoff options that are at least 4 hours after pickup
  const getDropoffOptions = () => {
    if (!form.pickupTime) return [];
    const minDropoff = getMinDropoffTime();
    return generateTimeOptions().filter(time => time >= minDropoff);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const price = form.loadAmount * 20; // Calculate price

      // Use user_id from token if signed in, otherwise use guest id = 2
      let user_id = 2; // default to guest
      const token = localStorage.getItem('laundry_token');
      if (token) {
        // If you store user_id in the token, parse it here.
        // For example, if token is just the user_id:
        user_id = Number(token);

        // If your token is a JWT or JSON, parse accordingly:
        // const user = JSON.parse(atob(token.split('.')[1]));
        // user_id = user.id;
      }

      // Concatenate address, city, and zip for the address field
      const fullAddress = `${form.address}, ${form.city}, ${form.zip}`;

      const API_URL = process.env.REACT_APP_API_URL;
      const response = await fetch(`${API_URL}/api/pickups`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ ...form, address: fullAddress, price, user_id })
      });
      const data = await response.json();
      if (response.ok && data.success) {
        alert(data.message || 'Pickup order created successfully!');
        // Redirect to payment page with price as state
        navigate('/payments', {
          state: {
            amount: price,
            pickupInfo: { ...form, address: fullAddress, user_id }
          }
        });
      } else {
        alert(data.error || 'Failed to create pickup order.');
      }
    } catch (err) {
      alert('Error: ' + err.message);
    }
    setLoading(false);
  };

  return (
    <div className="container mt-5" style={{ maxWidth: '500px', position: 'relative', zIndex: 1 }}>
      {/* Auth Alert Modal */}
      {showAuthAlert && (
        <div
          style={{
            position: 'fixed',
            top: 0, left: 0, width: '100vw', height: '100vh',
            background: 'rgba(0,0,0,0.45)',
            zIndex: 9999,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}
        >
          <div
            style={{
              background: '#fff',
              borderRadius: 12,
              padding: '32px 24px',
              maxWidth: 350,
              width: '90%',
              boxShadow: '0 4px 24px rgba(0,0,0,0.18)',
              textAlign: 'center'
            }}
          >
            <h4 className="mb-3">Welcome!</h4>
            <p>Would you like to sign in or continue as a guest?</p>
            <button className="btn btn-primary w-100 mb-2" onClick={handleSignIn}>
              Sign In
            </button>
            <button className="btn btn-outline-secondary w-100" onClick={handleContinueGuest}>
              Continue as Guest
            </button>
          </div>
        </div>
      )}

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
      {/* Logo above the title */}
      <div className="text-center" style={{ position: 'relative', zIndex: 1 }}>
        <img
          src={fng4}
          alt="Fold N Go Logo"
          style={{
            width: 100,
            height: 100,
            objectFit: 'contain',
            marginBottom: 12,
            // background: 'rgba(255,255,255,0.85)',
            // borderRadius: 12,
            // boxShadow: '0 2px 8px rgba(0,0,0,0.10)'
          }}
        />
      </div>
      <h2 className="mb-4 text-center" style={{ position: 'relative', zIndex: 1 }}>Pick Up Order</h2>
      <form onSubmit={handleSubmit} style={{ position: 'relative', zIndex: 1 }}>
        <div className="mb-3">
          <label htmlFor="name" className="form-label">Name</label>
          <input
            type="text"
            className="form-control"
            id="name"
            name="name"
            value={form.name}
            onChange={handleChange}
            required
            autoFocus
            style={{
              background: '#cfe2ff',
              color: '#222',
              border: '1px solid #86b7fe'
            }}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="address" className="form-label">Address</label>
          <input
            type="text"
            className="form-control"
            id="address"
            name="address"
            value={form.address}
            onChange={handleChange}
            required
            placeholder="Street Address"
            style={{
              background: '#cfe2ff',
              color: '#222',
              border: '1px solid #86b7fe'
            }}
          />
          {/* City and Zip Code fields inline */}
          <div style={{ display: 'flex', gap: '8px', marginTop: 8 }}>
            <input
              type="text"
              className="form-control"
              id="city"
              name="city"
              value={form.city || ''}
              onChange={handleChange}
              required
              placeholder="City"
              style={{
                background: '#e9ecef',
                color: '#222',
                border: '1px solid #86b7fe',
                fontSize: '0.95rem',
                width: '60%'
              }}
            />
            <input
              type="text"
              className="form-control"
              id="zip"
              name="zip"
              value={form.zip || ''}
              onChange={handleChange}
              required
              placeholder="Zip"
              style={{
                background: '#e9ecef',
                color: '#222',
                border: '1px solid #86b7fe',
                fontSize: '0.95rem',
                width: '40%'
              }}
              maxLength={10}
            />
          </div>
        </div>
        <div className="mb-3">
          <label htmlFor="pickupDate" className="form-label">Pick Up Date</label>
          <input
            type="date"
            className="form-control"
            id="pickupDate"
            name="pickupDate"
            value={form.pickupDate}
            onChange={handleChange}
            required
            style={{
              background: '#cfe2ff',
              color: '#222',
              border: '1px solid #86b7fe'
            }}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="pickupTime" className="form-label">Pick Up Time</label>
          <select
            className="form-select"
            id="pickupTime"
            name="pickupTime"
            value={form.pickupTime}
            onChange={handleChange}
            required
            style={{
              background: '#cfe2ff',
              color: '#222',
              border: '1px solid #86b7fe'
            }}
          >
            <option value="">Select time</option>
            {generateTimeOptions().map(time => (
              <option key={time} value={time}>{time}</option>
            ))}
          </select>
        </div>
        <div className="mb-3">
          <label htmlFor="loadAmount" className="form-label">Load Amount (1-20)</label>
          <input
            type="number"
            className="form-control"
            id="loadAmount"
            name="loadAmount"
            min="1"
            max="20"
            value={form.loadAmount}
            onChange={handleChange}
            required
            style={{
              background: '#cfe2ff',
              color: '#222',
              border: '1px solid #86b7fe'
            }}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="dropoffTime" className="form-label">Drop Off Time (at least 4 hours after pick up)</label>
          <select
            className="form-select"
            id="dropoffTime"
            name="dropoffTime"
            value={form.dropoffTime}
            onChange={handleChange}
            required
            disabled={!form.pickupTime}
            style={{
              background: '#cfe2ff',
              color: '#222',
              border: '1px solid #86b7fe'
            }}
          >
            <option value="">Select time</option>
            {form.pickupTime &&
              getDropoffOptions().map(time => (
                <option key={time} value={time}>{time}</option>
              ))
            }
          </select>
          {form.pickupTime && (
            <div className="form-text">
              Earliest drop off: {getMinDropoffTime()}
            </div>
          )}
        </div>
        {/* Price element */}
        <div className="mb-3">
          <label className="form-label">Estimated Price</label>
          <input
            type="text"
            className="form-control"
            value={`$${(form.loadAmount * 20).toFixed(2)}`}
            readOnly
            style={{
              background: '#e9ecef',
              color: '#222',
              border: '1px solid #86b7fe'
            }}
          />
        </div>
        <button
          type="submit"
          className="btn btn-primary w-100"
          style={{ position: 'relative', zIndex: 1 }}
          disabled={loading}
        >
          {loading ? 'Submitting...' : 'Submit Order'}
        </button>
      </form>
    </div>
  );
}

export default PickUp;