import React, { useState, useEffect } from 'react';
import './SignUp.css';
import bg1 from './images/bg1.jpg';

function SignUp() {
  const [form, setForm] = useState({
    name: '',
    phone: '',
    email: '',
    password: ''
  });
  const [users, setUsers] = useState([]);

  // Fetch users from the endpoint
  const fetchUsers = () => {
    fetch('http://18.119.73.76:3002/api/users')
      .then(res => res.json())
      .then(data => setUsers(data))
      .catch(err => console.error('Error fetching users:', err));
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    fetch("http://18.119.73.76:3002/api/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        name: form.name,
        phone: form.phone,
        email: form.email,
        password_hash: form.password // send as password_hash
      })
    })
      .then(res => {
        if (!res.ok) throw new Error('Failed to register user');
        return res.json();
      })
      .then(data => {
        alert(data.message || 'User registered successfully!');
        setForm({ name: '', phone: '', email: '', password: '' });
        fetchUsers(); // Refresh user list
      })
      .catch(error => {
        console.error('Error registering user:', error);
      });
  };

  return (
    <div
      className="container mt-5"
      style={{
        maxWidth: '400px',
        position: 'relative',
        zIndex: 1,
      }}
    >
      {/* Transparent background image */}
        {/* Import the image at the top of the file */}
        {/* Place bg1.jpg in src or public folder as appropriate */}
        <div
          style={{
            backgroundImage: `url(${bg1})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            opacity: 0.12, // Less opacity for the background image
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100vw',
            height: '100vh',
            zIndex: 0,
            pointerEvents: 'none',
          }}
        />
        <h2 className="mb-4 text-center" style={{ position: 'relative', zIndex: 1 }}>Sign Up</h2>
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
                background: '#cfe2ff', // Lighter version of #86b7fe
                color: '#222',
                border: '1px solid #86b7fe'
              }}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="phone" className="form-label">Phone Number</label>
            <input
              type="tel"
              className="form-control"
              id="phone"
              name="phone"
              value={form.phone}
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
            <label htmlFor="email" className="form-label">Email Address</label>
            <input
              type="email"
              className="form-control"
              id="email"
              name="email"
              value={form.email}
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
            <label htmlFor="password" className="form-label">Password</label>
            <input
              type="password"
              className="form-control"
              id="password"
              name="password"
              value={form.password}
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
          >
            Sign Up
          </button>
        </form>

        {/* List users below the form */}
      <div className="mt-5">
        <h4 className="mb-3">Registered Users</h4>
        <ul className="list-group">
          {users.length === 0 && <li className="list-group-item">No users found.</li>}
          {users.map(user => (
            <li className="list-group-item" key={user.id || user.email}>
              {user.name} ({user.email})
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default SignUp;