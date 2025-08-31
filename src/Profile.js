import React, { useState, useEffect } from 'react';
import { FaUser, FaHistory, FaDollarSign, FaClock, FaEdit, FaEye, FaPhone, FaEnvelope, FaMapMarkerAlt } from 'react-icons/fa';

function Profile() {
  const [user, setUser] = useState(null);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('overview');
  const [editMode, setEditMode] = useState(false);
  const [editForm, setEditForm] = useState({});
  const [stats, setStats] = useState({
    totalOrders: 0,
    totalSpent: 0,
    totalSavings: 0
  });

  useEffect(() => {
    fetchUserData();
    fetchOrderHistory();
  }, []);

  const fetchUserData = async () => {
    try {
      const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:3002';
      const response = await fetch(`${API_URL}/api/auth/session`, {
        method: 'GET',
        credentials: 'include'
      });
      
      if (response.ok) {
        const data = await response.json();
        if (data.success && data.user) {
          setUser(data.user);
          setEditForm(data.user);
        }
      }
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  };

  const fetchOrderHistory = async () => {
    try {
      const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:3002';
      const response = await fetch(`${API_URL}/api/user/orders`, {
        method: 'GET',
        credentials: 'include'
      });
      
      if (response.ok) {
        const data = await response.json();
        setOrders(data.orders || []);
        
        // Calculate stats
        const totalOrders = data.orders.length;
        const totalSpent = data.orders.reduce((sum, order) => sum + parseFloat(order.price || 0), 0);
        const totalSavings = totalOrders * 5; // Estimate $5 saved per order vs doing it yourself
        
        setStats({
          totalOrders,
          totalSpent,
          totalSavings
        });
      }
    } catch (error) {
      console.error('Error fetching order history:', error);
    } finally {
      setLoading(false);
    }
  };

  const updateProfile = async (e) => {
    e.preventDefault();
    try {
      const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:3002';
      const response = await fetch(`${API_URL}/api/user/profile`, {
        method: 'PUT',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(editForm)
      });
      
      if (response.ok) {
        const data = await response.json();
        setUser(data.user);
        setEditMode(false);
        alert('Profile updated successfully!');
      }
    } catch (error) {
      console.error('Error updating profile:', error);
      alert('Failed to update profile. Please try again.');
    }
  };

  const getStatusColor = (status) => {
    const colors = {
      'received': '#6b7280',
      'washing': '#3b82f6',
      'washed': '#10b981',
      'folding': '#f59e0b',
      'folded': '#8b5cf6',
      'ready_for_delivery': '#06b6d4',
      'delivered': '#10b981'
    };
    return colors[status] || '#6b7280';
  };

  const formatStatus = (status) => {
    return status.split('_').map(word => 
      word.charAt(0).toUpperCase() + word.slice(1)
    ).join(' ');
  };

  if (loading) {
    return (
      <div className="min-vh-100 d-flex align-items-center justify-content-center">
        <div className="text-center">
          <div className="spinner-border text-primary mb-3" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
          <p>Loading your profile...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-vh-100 d-flex align-items-center justify-content-center">
        <div className="text-center">
          <h3>Please sign in to view your profile</h3>
          <a href="/signin" className="btn btn-primary">Sign In</a>
        </div>
      </div>
    );
  }

  return (
    <div className="min-vh-100" style={{ background: 'linear-gradient(135deg, #f8faff 0%, #e3f2fd 100%)' }}>
      {/* Header */}
      <div className="container-fluid py-4" style={{
        background: 'linear-gradient(135deg, #1e3a8a 0%, #3b82f6 50%, #06b6d4 100%)'
      }}>
        <div className="container">
          <div className="row align-items-center text-white">
            <div className="col-auto">
              <div className="bg-white rounded-circle p-3" style={{ width: '80px', height: '80px' }}>
                <FaUser size={44} className="text-primary" style={{ marginTop: '6px', marginLeft: '4px' }} />
              </div>
            </div>
            <div className="col">
              <h1 className="h3 mb-1">Welcome back, {user.name}!</h1>
              <p className="mb-0 opacity-75">{user.email}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="container py-4">
        {/* Stats Cards */}
        <div className="row mb-4">
          <div className="col-md-4 mb-3">
            <div className="card border-0 shadow-sm text-center p-4" style={{
              background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
              color: 'white'
            }}>
              <FaHistory size={32} className="mb-2" />
              <h3 className="mb-1">{stats.totalOrders}</h3>
              <p className="mb-0">Total Orders</p>
            </div>
          </div>
          <div className="col-md-4 mb-3">
            <div className="card border-0 shadow-sm text-center p-4" style={{
              background: 'linear-gradient(135deg, #3b82f6 0%, #1e40af 100%)',
              color: 'white'
            }}>
              <FaDollarSign size={32} className="mb-2" />
              <h3 className="mb-1">${stats.totalSpent.toFixed(2)}</h3>
              <p className="mb-0">Total Spent</p>
            </div>
          </div>
          <div className="col-md-4 mb-3">
            <div className="card border-0 shadow-sm text-center p-4" style={{
              background: 'linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%)',
              color: 'white'
            }}>
              <FaClock size={32} className="mb-2" />
              <h3 className="mb-1">{Math.round(stats.totalOrders * 2.5)}hrs</h3>
              <p className="mb-0">Time Saved</p>
            </div>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="card border-0 shadow-sm">
          <div className="card-header bg-white">
            <ul className="nav nav-tabs card-header-tabs">
              <li className="nav-item">
                <button 
                  className={`nav-link ${activeTab === 'overview' ? 'active' : ''}`}
                  onClick={() => setActiveTab('overview')}
                >
                  Overview
                </button>
              </li>
              <li className="nav-item">
                <button 
                  className={`nav-link ${activeTab === 'orders' ? 'active' : ''}`}
                  onClick={() => setActiveTab('orders')}
                >
                  Order History
                </button>
              </li>
              <li className="nav-item">
                <button 
                  className={`nav-link ${activeTab === 'profile' ? 'active' : ''}`}
                  onClick={() => setActiveTab('profile')}
                >
                  Profile Settings
                </button>
              </li>
            </ul>
          </div>
          
          <div className="card-body">
            {/* Overview Tab */}
            {activeTab === 'overview' && (
              <div>
                <h5 className="mb-4">Account Overview</h5>
                
                {/* Quick Stats */}
                <div className="row mb-4">
                  <div className="col-md-6">
                    <div className="border rounded p-3">
                      <h6 className="text-muted mb-3">Recent Activity</h6>
                      {orders.length > 0 ? (
                        <div>
                          <p className="mb-1">Last Order: <strong>#{orders[0].confirm_number}</strong></p>
                          <p className="mb-1">Status: <span 
                            className="badge"
                            style={{ backgroundColor: getStatusColor(orders[0].status), color: 'white' }}
                          >
                            {formatStatus(orders[0].status)}
                          </span></p>
                          <p className="mb-0 text-muted">
                            {new Date(orders[0].created_at).toLocaleDateString()}
                          </p>
                        </div>
                      ) : (
                        <p className="text-muted">No orders yet. <a href="/pickup">Schedule your first pickup!</a></p>
                      )}
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="border rounded p-3">
                      <h6 className="text-muted mb-3">Account Details</h6>
                      <p className="mb-1"><FaUser className="me-2 text-muted" />{user.name}</p>
                      <p className="mb-1"><FaEnvelope className="me-2 text-muted" />{user.email}</p>
                      <p className="mb-0"><FaPhone className="me-2 text-muted" />{user.phone}</p>
                    </div>
                  </div>
                </div>

                {/* Quick Actions */}
                <div className="row">
                  <div className="col-md-6 mb-3">
                    <a href="/pickup" className="btn btn-primary w-100 py-3">
                      Schedule New Pickup
                    </a>
                  </div>
                  <div className="col-md-6 mb-3">
                    <button 
                      className="btn btn-outline-primary w-100 py-3"
                      onClick={() => setActiveTab('orders')}
                    >
                      View Order History
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Orders Tab */}
            {activeTab === 'orders' && (
              <div>
                <div className="d-flex justify-content-between align-items-center mb-4">
                  <h5 className="mb-0">Order History</h5>
                  <span className="text-muted">{orders.length} total orders</span>
                </div>
                
                {orders.length > 0 ? (
                  <div className="table-responsive">
                    <table className="table table-hover">
                      <thead className="table-light">
                        <tr>
                          <th>Order #</th>
                          <th>Date</th>
                          <th>Service</th>
                          <th>Status</th>
                          <th>Amount</th>
                          <th>Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {orders.map(order => (
                          <tr key={order.id}>
                            <td><strong>#{order.confirm_number}</strong></td>
                            <td>{new Date(order.created_at).toLocaleDateString()}</td>
                            <td>
                              <span className="text-capitalize">
                                {order.pricing_tier.replace('_', ' ')}
                              </span>
                              <br />
                              <small className="text-muted">{order.weight_lbs} lbs</small>
                            </td>
                            <td>
                              <span 
                                className="badge"
                                style={{ backgroundColor: getStatusColor(order.status), color: 'white' }}
                              >
                                {formatStatus(order.status)}
                              </span>
                            </td>
                            <td><strong>${parseFloat(order.price).toFixed(2)}</strong></td>
                            <td>
                              <button 
                                className="btn btn-sm btn-outline-primary"
                                onClick={() => alert(`Order Details for #${order.confirm_number}`)}
                              >
                                <FaEye size={12} />
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                ) : (
                  <div className="text-center py-5">
                    <FaHistory size={48} className="text-muted mb-3" />
                    <h6>No orders yet</h6>
                    <p className="text-muted mb-3">Ready to experience hassle-free laundry?</p>
                    <a href="/pickup" className="btn btn-primary">Schedule Your First Pickup</a>
                  </div>
                )}
              </div>
            )}

            {/* Profile Settings Tab */}
            {activeTab === 'profile' && (
              <div>
                <div className="d-flex justify-content-between align-items-center mb-4">
                  <h5 className="mb-0">Profile Settings</h5>
                  {!editMode && (
                    <button 
                      className="btn btn-outline-primary"
                      onClick={() => setEditMode(true)}
                    >
                      <FaEdit className="me-1" /> Edit Profile
                    </button>
                  )}
                </div>

                {editMode ? (
                  <form onSubmit={updateProfile}>
                    <div className="row">
                      <div className="col-md-6 mb-3">
                        <label className="form-label">Name *</label>
                        <input
                          type="text"
                          className="form-control"
                          value={editForm.name || ''}
                          onChange={e => setEditForm({...editForm, name: e.target.value})}
                          required
                        />
                      </div>
                      <div className="col-md-6 mb-3">
                        <label className="form-label">Email *</label>
                        <input
                          type="email"
                          className="form-control"
                          value={editForm.email || ''}
                          onChange={e => setEditForm({...editForm, email: e.target.value})}
                          required
                        />
                      </div>
                      <div className="col-md-6 mb-3">
                        <label className="form-label">Phone</label>
                        <input
                          type="tel"
                          className="form-control"
                          value={editForm.phone || ''}
                          onChange={e => setEditForm({...editForm, phone: e.target.value})}
                        />
                      </div>
                    </div>
                    
                    <div className="d-flex gap-2">
                      <button type="submit" className="btn btn-primary">
                        Save Changes
                      </button>
                      <button 
                        type="button" 
                        className="btn btn-secondary"
                        onClick={() => {
                          setEditMode(false);
                          setEditForm(user);
                        }}
                      >
                        Cancel
                      </button>
                    </div>
                  </form>
                ) : (
                  <div className="row">
                    <div className="col-md-8">
                      <div className="border rounded p-4">
                        <div className="row">
                          <div className="col-sm-3 text-muted">Name:</div>
                          <div className="col-sm-9"><strong>{user.name}</strong></div>
                        </div>
                        <hr />
                        <div className="row">
                          <div className="col-sm-3 text-muted">Email:</div>
                          <div className="col-sm-9">{user.email}</div>
                        </div>
                        <hr />
                        <div className="row">
                          <div className="col-sm-3 text-muted">Phone:</div>
                          <div className="col-sm-9">{user.phone || 'Not provided'}</div>
                        </div>
                        <hr />
                        <div className="row">
                          <div className="col-sm-3 text-muted">Member Since:</div>
                          <div className="col-sm-9">
                            {user.created_at ? new Date(user.created_at).toLocaleDateString() : 'N/A'}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;