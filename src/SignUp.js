import React, { useState, useEffect } from 'react';
import './SignUp.css';

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
    fetch('http://localhost:3002/api/users')
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

    fetch("http://localhost:3002/api/users", {
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
        <div
          style={{
            backgroundImage:
          'url(https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80)', // Replace with Houston photo below
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            opacity: 0.2,
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100vw',
            height: '100vh',
            zIndex: 0,
            pointerEvents: 'none',
          }}
        />
        <h2 className="mb-4 text-center">Sign Up</h2>
        <form onSubmit={handleSubmit}>
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
            />
          </div>
          <button
            type="submit"
            className="btn btn-primary w-100"
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