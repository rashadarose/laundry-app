import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import bg1 from './images/bg1.jpg'; // Import your background image

function SignIn() {
  const [form, setForm] = useState({ identifier: '', password_hash: '' });
  const [showFirstVisitModal, setShowFirstVisitModal] = useState(false);
  const navigate = useNavigate();

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:3002'; // Fallback to localhost if not set
      // Make sure to replace with your actual API URL
      const res = await axios.post(`${API_URL}/api/signin`, form);
      if (res.data.user.isFirstVisit) {
        setShowFirstVisitModal(true);
      } else {
        alert('Sign in successful!');
        navigate('/home'); // Redirect to home page
      }
    } catch (err) {
      alert(err.response?.data?.error || 'Sign in failed');
    }
  };

  return (
    <div className="container mt-5" style={{ maxWidth: '400px', position: 'relative', zIndex: 1 }}>
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
      <h2 className="mb-4 text-center" style={{ position: 'relative', zIndex: 1 }}>Sign In</h2>
      <form onSubmit={handleSubmit} style={{ position: 'relative', zIndex: 1 }}>
        <div className="mb-3">
          <label htmlFor="identifier" className="form-label">Email or Name</label>
          <input
            type="text"
            name="identifier"
            className="form-control"
            id="identifier"
            value={form.identifier}
            onChange={handleChange}
            placeholder="Email or Name"
            required
            autoFocus
            style={{
              background: '#cfe2ff', // Lighter version of #86b7fe
              color: '#222',
              border: '1px solid #86b7fe'
            }}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="password_hash" className="form-label">Password</label>
          <input
            type="password"
            name="password_hash"
            className="form-control"
            id="password_hash"
            value={form.password_hash}
            onChange={handleChange}
            placeholder="Password"
            required
            style={{
              background: '#cfe2ff',
              color: '#222',
              border: '1px solid #86b7fe'
            }}
          />
        </div>
        <button type="submit" className="btn btn-primary w-100" style={{ position: 'relative', zIndex: 1 }}>Sign In</button>
      </form>

      {/* First Visit Modal */}
      {showFirstVisitModal && (
        <div className="modal-backdrop">
          <div className="modal-content">
            <h2>Welcome!</h2>
            <p>This is your first visit. Please enter your zip code.</p>
            {/* ...your zipcode input and logic here... */}
            <button onClick={() => setShowFirstVisitModal(false)}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default SignIn;