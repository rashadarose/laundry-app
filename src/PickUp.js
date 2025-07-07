import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import TimePicker from 'react-time-picker';
import 'react-time-picker/dist/TimePicker.css';
import bg1 from './images/bg1.jpg';
import fng4 from './images/fng4.png';

const TIME_BLOCKS = [
  { label: '7:00 AM - 11:00 AM', value: '07:00-11:00' },
  { label: '11:00 AM - 3:00 PM', value: '11:00-15:00' },
  { label: '3:00 PM - 7:00 PM', value: '15:00-19:00' },
];

function PickUp() {
  const [form, setForm] = useState({
    name: '',
    address: '',
    city: '',
    zip: '',
    pickupDate: null, // Date object
    pickupTime: '',   // "07:00-11:00" etc.
    loadAmount: 1,
    dropoffTime: '',  // "07:00-11:00" etc.
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

  // Only allow dropoff blocks after pickup block
  const getDropoffBlocks = () => {
    if (!form.pickupTime) return [];
    const pickupIndex = TIME_BLOCKS.findIndex(b => b.value === form.pickupTime);
    return TIME_BLOCKS.slice(pickupIndex + 1);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    // Reset dropoffTime if pickupTime changes
    if (name === 'pickupTime') {
      setForm({ ...form, pickupTime: value, dropoffTime: '' });
    } else {
      setForm({ ...form, [name]: value });
    }
  };

  const handleDateChange = (date) => {
    setForm({ ...form, pickupDate: date });
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
        user_id = Number(token);
      }

      // Concatenate address, city, and zip for the address field
      const fullAddress = `${form.address}, ${form.city}, ${form.zip}`;

      // Convert pickupDate to YYYY-MM-DD string
      const pickupDateStr = form.pickupDate
        ? form.pickupDate.toISOString().slice(0, 10)
        : '';

      const API_URL = process.env.REACT_APP_API_URL;
      const response = await fetch(`${API_URL}/api/pickups`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          ...form,
          pickupDate: pickupDateStr,
          address: fullAddress,
          price,
          user_id
        })
      });
      const data = await response.json();
      if (response.ok && data.success) {
        alert(data.message || 'Pickup order created successfully!');
        // Redirect to payment page with price as state
        navigate('/payments', {
          state: {
            amount: price,
            pickupInfo: { ...form, pickupDate: pickupDateStr, address: fullAddress, user_id }
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
          <label htmlFor="pickupDate" className="form-label" style={{  marginRight: 8 }}>Pick Up Date</label>
          <DatePicker
            selected={form.pickupDate}
            onChange={handleDateChange}
            className="form-control"
            id="pickupDate"
            name="pickupDate"
            required
            dateFormat="yyyy-MM-dd"
            minDate={new Date()}
            placeholderText="Select a date"
            style={{
              background: '#cfe2ff',
              color: '#222',
              border: '1px solid #86b7fe',
            }}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="pickupTime" className="form-label">Pick Up Time Block</label>
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
            <option value="">Select time block</option>
            {TIME_BLOCKS.map(block => (
              <option key={block.value} value={block.value}>{block.label}</option>
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
          <label htmlFor="dropoffTime" className="form-label">Drop Off Time Block (after pickup)</label>
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
            <option value="">Select time block</option>
            {form.pickupTime &&
              getDropoffBlocks().map(block => (
                <option key={block.value} value={block.value}>{block.label}</option>
              ))
            }
          </select>
          {form.pickupTime && (
            <div className="form-text">
              Must be after pickup block.
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