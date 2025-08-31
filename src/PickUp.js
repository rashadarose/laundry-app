import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { FaCalendarAlt, FaClock, FaWeight, FaMapMarkerAlt, FaUser, FaStickyNote } from 'react-icons/fa';

const TIME_BLOCKS = [
  { label: '7:00 AM - 11:00 AM', value: '07:00-11:00' },
  { label: '11:00 AM - 3:00 PM', value: '11:00-15:00' },
  { label: '3:00 PM - 7:00 PM', value: '15:00-19:00' },
];

// Pricing tiers data
const PRICING_TIERS = [
  {
    id: 'self_wash',
    name: 'Self-Wash',
    price: 18.00,
    description: 'We wash, dry, and fold your laundry ourselves',
    turnaround: '48 hours'
  },
  {
    id: 'next_day',
    name: 'Next-Day',
    price: 25.00,
    description: 'Next-day turnaround service',
    turnaround: '24 hours',
    popular: true
  },
  {
    id: 'same_day',
    name: 'Same-Day',
    price: 30.00,
    description: 'For when you need it fast',
    turnaround: 'Same day'
  },
  {
    id: 'recurring',
    name: 'Recurring Service',
    price: 34.00,
    description: 'Weekly recurring service',
    turnaround: '24 hours'
  }
];

function PickUp() {
  const location = useLocation();
  const [form, setForm] = useState({
    name: '',
    address: '',
    city: '',
    zip: '',
    pickup_time: '',
    dropoff_time: '',
    pickup_date: null,
    weight_lbs: 10,
    pricing_tier: 'next_day',
    notes: '',
  });
  const [loading, setLoading] = useState(false);
  const [showAuthAlert, setShowAuthAlert] = useState(false);
  const navigate = useNavigate();

  // Set pricing tier from navigation state if available
  useEffect(() => {
    if (location.state?.selectedPricing) {
      setForm(prev => ({ ...prev, pricing_tier: location.state.selectedPricing }));
    }
  }, [location.state]);

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

  // Get selected pricing tier details
  const getSelectedTier = () => {
    return PRICING_TIERS.find(tier => tier.id === form.pricing_tier) || PRICING_TIERS[1];
  };

  // Calculate price based on weight and selected tier
  const calculatePrice = () => {
    const tier = getSelectedTier();
    const bags = Math.ceil(form.weight_lbs / 10); // Round up to nearest 10lb bag
    return (tier.price * bags).toFixed(2);
  };

  // Only allow dropoff blocks after pickup block
  const getDropoffBlocks = () => {
    if (!form.pickup_time) return [];
    const pickupIndex = TIME_BLOCKS.findIndex(b => b.value === form.pickup_time);
    // Only show blocks AFTER the selected pickup block
    return pickupIndex >= 0 ? TIME_BLOCKS.slice(pickupIndex + 1) : [];
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    // Reset dropoff_time if pickup_time changes
    if (name === 'pickup_time') {
      setForm({ ...form, pickup_time: value, dropoff_time: '' });
    } else if (name === 'dropoff_time') {
      setForm({ ...form, dropoff_time: value });
    } else {
      setForm({ ...form, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const price = parseFloat(calculatePrice());

      // Use user_id from token if signed in, otherwise use guest id = 2
      let user_id = 2; // default to guest
      const token = localStorage.getItem('laundry_token');
      if (token) {
        user_id = Number(token);
      }

      // Concatenate address, city, and zip for the address field
      const fullAddress = `${form.address}, ${form.city}, ${form.zip}`;

      // Convert pickup_date to YYYY-MM-DD string
      const pickupDateStr = form.pickup_date
        ? form.pickup_date.toISOString().slice(0, 10)
        : '';

      const API_URL = process.env.REACT_APP_API_URL;
      const response = await fetch(`${API_URL}/api/pickups`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          ...form,
          pickup_date: pickupDateStr,
          address: fullAddress,
          price,
          user_id,
          load_amount: Math.ceil(form.weight_lbs / 10), // Keep for compatibility
          notes: form.notes
        })
      });
      const data = await response.json();
      if (response.ok && data.success) {
        alert(data.message || 'Pickup order created successfully!');
        // Redirect to payment page with price as state, include confirm_number from API response
        navigate('/payments', {
          state: {
            amount: price,
            pickupInfo: {
              ...form,
              pickup_date: pickupDateStr,
              address: fullAddress,
              user_id,
              confirm_number: data.confirm_number || '',
              notes: form.notes,
              pricing_tier_name: getSelectedTier().name
            }
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
    <div className="min-vh-100" style={{ background: 'linear-gradient(135deg, #f8faff 0%, #e3f2fd 100%)' }}>
      {/* Auth Alert Modal */}
      {showAuthAlert && (
        <div className="position-fixed top-0 start-0 w-100 h-100 d-flex align-items-center justify-content-center" style={{
          backgroundColor: 'rgba(0,0,0,0.5)',
          zIndex: 9999
        }}>
          <div className="card border-0 shadow-lg" style={{ maxWidth: '400px', width: '90%' }}>
            <div className="card-body text-center p-4">
              <h4 className="mb-3">Welcome!</h4>
              <p className="text-muted mb-4">Would you like to sign in or continue as a guest?</p>
              <button className="btn btn-primary w-100 mb-2" onClick={handleSignIn}>
                Sign In
              </button>
              <button className="btn btn-outline-secondary w-100" onClick={handleContinueGuest}>
                Continue as Guest
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Header */}
      <div className="container-fluid py-4" style={{
        background: 'linear-gradient(135deg, #1e3a8a 0%, #3b82f6 50%, #06b6d4 100%)'
      }}>
        <div className="container">
          <div className="text-center text-white">
            <h1 className="h3 mb-2">Schedule Your Pickup</h1>
            <p className="mb-0 opacity-75">Quick and easy laundry service booking</p>
          </div>
        </div>
      </div>

      <div className="container py-4" style={{ maxWidth: '800px' }}>
        {/* Order Progress Tracker */}
        <OrderProgress currentStep={1} />

        <div className="row">
          {/* Main Form */}
          <div className="col-lg-8">
            <div className="card border-0 shadow-sm">
              <div className="card-header bg-white py-3">
                <h5 className="mb-0">Order Details</h5>
              </div>
              <div className="card-body">
                <form onSubmit={handleSubmit}>
                  {/* Service Selection - Compact Cards */}
                  <div className="mb-4">
                    <label className="form-label fw-bold mb-3">Choose Your Service</label>
                    <div className="row g-2">
                      {PRICING_TIERS.map((tier) => (
                        <div key={tier.id} className="col-6">
                          <div 
                            className={`card h-100 ${form.pricing_tier === tier.id ? 'border-primary bg-light' : ''}`}
                            style={{ cursor: 'pointer', transition: 'all 0.2s' }}
                            onClick={() => setForm({ ...form, pricing_tier: tier.id })}
                          >
                            {tier.popular && (
                              <div className="position-absolute top-0 start-50 translate-middle">
                                <span className="badge bg-warning text-dark px-2" style={{ fontSize: '0.6rem' }}>
                                  POPULAR
                                </span>
                              </div>
                            )}
                            <div className="card-body text-center p-2">
                              <input
                                type="radio"
                                name="pricing_tier"
                                value={tier.id}
                                checked={form.pricing_tier === tier.id}
                                onChange={handleChange}
                                className="form-check-input me-2"
                              />
                              <h6 className="card-title mb-1 small">{tier.name}</h6>
                              <div className="text-primary fw-bold small">${tier.price}/bag</div>
                              <small className="text-success">{tier.turnaround}</small>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Customer Info - Two Columns */}
                  <div className="row mb-3">
                    <div className="col-md-6">
                      <label className="form-label">
                        <FaUser className="me-1 text-primary" />
                        Full Name
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        name="name"
                        value={form.name}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    <div className="col-md-6">
                      <label className="form-label">
                        <FaWeight className="me-1 text-primary" />
                        Weight (lbs)
                      </label>
                      <input
                        type="number"
                        className="form-control"
                        name="weight_lbs"
                        min="1"
                        max="100"
                        value={form.weight_lbs}
                        onChange={handleChange}
                        required
                      />
                      <small className="text-muted">Priced per 10 lb bag</small>
                    </div>
                  </div>

                  {/* Address - Compact Layout */}
                  <div className="mb-3">
                    <label className="form-label">
                      <FaMapMarkerAlt className="me-1 text-primary" />
                      Address
                    </label>
                    <input
                      type="text"
                      className="form-control mb-2"
                      name="address"
                      value={form.address}
                      onChange={handleChange}
                      placeholder="Street Address"
                      required
                    />
                    <div className="row g-2">
                      <div className="col-8">
                        <input
                          type="text"
                          className="form-control"
                          name="city"
                          value={form.city}
                          onChange={handleChange}
                          placeholder="City"
                          required
                        />
                      </div>
                      <div className="col-4">
                        <input
                          type="text"
                          className="form-control"
                          name="zip"
                          value={form.zip}
                          onChange={handleChange}
                          placeholder="Zip"
                          required
                          maxLength={10}
                        />
                      </div>
                    </div>
                  </div>

                  {/* Date and Time - Two Columns */}
                  <div className="row mb-3">
                    <div className="col-md-6">
                      <label className="form-label">
                        <FaCalendarAlt className="me-1 text-primary" />
                        Pickup Date
                      </label>
                      <DatePicker
                        selected={form.pickup_date}
                        onChange={date => setForm({ ...form, pickup_date: date })}
                        className="form-control"
                        required
                        dateFormat="yyyy-MM-dd"
                        minDate={new Date()}
                        placeholderText="Select date"
                      />
                    </div>
                    <div className="col-md-6">
                      <label className="form-label">
                        <FaClock className="me-1 text-primary" />
                        Pickup Time
                      </label>
                      <select
                        className="form-select"
                        name="pickup_time"
                        value={form.pickup_time}
                        onChange={handleChange}
                        required
                      >
                        <option value="">Select time</option>
                        {TIME_BLOCKS.map(block => (
                          <option key={block.value} value={block.value}>{block.label}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  {/* Dropoff Time */}
                  <div className="mb-3">
                    <label className="form-label">
                      <FaClock className="me-1 text-primary" />
                      Dropoff Time (after pickup)
                    </label>
                    <select
                      className="form-select"
                      name="dropoff_time"
                      value={form.dropoff_time}
                      onChange={handleChange}
                      required
                      disabled={!form.pickup_time || getDropoffBlocks().length === 0}
                    >
                      <option value="">Select dropoff time</option>
                      {getDropoffBlocks().map(block => (
                        <option key={block.value} value={block.value}>{block.label}</option>
                      ))}
                    </select>
                  </div>

                  {/* Notes - Compact */}
                  <div className="mb-4">
                    <label className="form-label">
                      <FaStickyNote className="me-1 text-primary" />
                      Special Instructions (optional)
                    </label>
                    <textarea
                      className="form-control"
                      name="notes"
                      value={form.notes}
                      onChange={handleChange}
                      placeholder="Any special instructions..."
                      rows={2}
                    />
                  </div>

                  <button
                    type="submit"
                    className="btn btn-primary w-100 btn-lg"
                    disabled={loading}
                  >
                    {loading ? 'Processing...' : `Continue to Payment - $${calculatePrice()}`}
                  </button>
                </form>
              </div>
            </div>
          </div>

          {/* Order Summary Sidebar */}
          <div className="col-lg-4">
            <div className="card border-0 shadow-sm position-sticky" style={{ top: '20px' }}>
              <div className="card-header bg-primary text-white py-3">
                <h6 className="mb-0">Order Summary</h6>
              </div>
              <div className="card-body">
                <div className="d-flex justify-content-between mb-2">
                  <span>Service:</span>
                  <span className="fw-bold">{getSelectedTier().name}</span>
                </div>
                <div className="d-flex justify-content-between mb-2">
                  <span>Weight:</span>
                  <span>{form.weight_lbs} lbs</span>
                </div>
                <div className="d-flex justify-content-between mb-2">
                  <span>Bags:</span>
                  <span>{Math.ceil(form.weight_lbs / 10)} × 10 lb</span>
                </div>
                <div className="d-flex justify-content-between mb-2">
                  <span>Rate:</span>
                  <span>${getSelectedTier().price}/bag</span>
                </div>
                <hr />
                <div className="d-flex justify-content-between">
                  <span className="fw-bold">Total:</span>
                  <span className="fw-bold text-primary h5">${calculatePrice()}</span>
                </div>
                
                {/* Service Details */}
                <div className="mt-3 p-3" style={{ backgroundColor: '#f8faff', borderRadius: '8px' }}>
                  <h6 className="text-primary mb-2">{getSelectedTier().name}</h6>
                  <p className="small text-muted mb-1">{getSelectedTier().description}</p>
                  <p className="small text-success mb-0">
                    <i className="fas fa-clock me-1"></i>
                    {getSelectedTier().turnaround}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Order Progress Component
const OrderProgress = ({ currentStep = 1 }) => {
  const steps = [
    { icon: 'calendar-plus', label: 'Schedule' },
    { icon: 'credit-card', label: 'Payment' },
    { icon: 'truck', label: 'Pickup' },
    { icon: 'check-circle', label: 'Complete' }
  ];

  return (
    <div className="mb-4">
      <div className="d-flex justify-content-between align-items-center">
        {steps.map((step, index) => (
          <div key={index} className="text-center flex-fill">
            <div className={`mx-auto mb-2 d-flex align-items-center justify-content-center ${
              index + 1 <= currentStep ? 'bg-success text-white' : 'bg-light text-muted'
            }`} style={{ width: '40px', height: '40px', borderRadius: '50%' }}>
              <i className={`fas fa-${step.icon} fa-sm`}></i>
            </div>
            <small className={index + 1 <= currentStep ? 'text-success fw-bold' : 'text-muted'}>
              {step.label}
            </small>
            {index < steps.length - 1 && (
              <div className="position-absolute" style={{
                width: '100%',
                height: '2px',
                backgroundColor: index + 1 < currentStep ? '#10b981' : '#e5e7eb',
                top: '20px',
                left: '50%',
                zIndex: -1
              }} />
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default PickUp;