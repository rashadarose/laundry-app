import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import bg1 from './images/bg1.jpg'; // Import your background image

function PickUp() {
  const [form, setForm] = useState({
    name: '',
    address: '',
    pickupDate: '',
    pickupTime: '',
    loadAmount: 1,
    dropoffTime: '',
    user_id: '', // Add user_id field
  });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate(); // Initialize navigate

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
      const response = await fetch('http://localhost:3002/api/pickups', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ ...form, price }) // Include price in the POST body
      });
      const data = await response.json();
      if (response.ok && data.success) {
       
        alert(data.message || 'Pickup order created successfully!');
        // Redirect to payment page with price as state
        navigate('/payments', {
          state: {
            amount: price,
            pickupInfo: form
          }
        });
        // Optionally reset form here if you want
        // setForm({ ... });
      } else {
         console.log(form)
        alert(data.error || 'Failed to create pickup order.');
      }
    } catch (err) {
       console.log(form)
      alert('Error: ' + err.message);
    }
    setLoading(false);
  };

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
            style={{
              background: '#cfe2ff',
              color: '#222',
              border: '1px solid #86b7fe'
            }}
          />
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
        <div className="mb-3">
          <label htmlFor="user_id" className="form-label">User ID</label>
          <input
            type="text"
            className="form-control"
            id="user_id"
            name="user_id"
            value={form.user_id}
            onChange={handleChange}
            required
            style={{
              background: '#cfe2ff',
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