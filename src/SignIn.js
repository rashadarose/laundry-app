import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import bg1 from './bg1.jpg'; // Import your background image

function SignIn() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch('http://localhost:3002/api/signin', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        identifier: email,
        password_hash: password
      })
    })
      .then(res => res.json())
      .then(data => {
        if (data.success) {
          alert('Sign in successful!');
          navigate('/home'); // Redirect to home page
        } else {
          alert('Sign in failed: ' + (data.message || 'Invalid credentials'));
        }
      })
      .catch(err => {
        alert('Error: ' + err.message);
      });
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
          <label htmlFor="email" className="form-label">Email address</label>
          <input
            type="email"
            className="form-control"
            id="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
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
          <label htmlFor="password" className="form-label">Password</label>
          <input
            type="password"
            className="form-control"
            id="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
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
    </div>
  );
}

export default SignIn;