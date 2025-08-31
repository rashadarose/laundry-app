import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaPhone, FaUser, FaDollarSign, FaCalendar, FaTag, FaEnvelope } from 'react-icons/fa';

const STATUS_OPTIONS = [
  'received',
  'washing',
  'completed',
  'delivered',
];

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:3002';

function Dashboard() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState({});
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState('info');
  const [checkingAuth, setCheckingAuth] = useState(true);
  const [updatingOrder, setUpdatingOrder] = useState(null);
  const navigate = useNavigate();

  // Check for JWT and fetch orders on mount
  useEffect(() => {
    const jwt = sessionStorage.getItem('admin_jwt');
    if (!jwt) {
      navigate('/home', { replace: true });
      return;
    }
    fetchOrders(jwt);
    setCheckingAuth(false);
    // eslint-disable-next-line
  }, []);

  // Fetch orders with JWT
  const fetchOrders = async (jwt) => {
    setLoading(true);
    setMessage('');
    try {
      const res = await fetch(`${API_URL}/api/admin/orders`, {
        headers: {
          'Authorization': `Bearer ${jwt}`,
        },
      });
      if (res.status === 401 || res.status === 403) {
        setMessage('Unauthorized. Please sign in as admin.');
        setMessageType('danger');
        sessionStorage.removeItem('admin_jwt');
        navigate('/home', { replace: true });
        return;
      }
      const data = await res.json();
      console.log('📋 Orders fetched:', data);
      setOrders(data);
      setMessageType('success');
      setMessage(`${data.length} orders loaded successfully`);
      setTimeout(() => setMessage(''), 3000);
    } catch (err) {
      console.error('❌ Fetch error:', err);
      setMessage('Network error - Unable to fetch orders');
      setMessageType('danger');
    }
    setLoading(false);
  };

  // Update order status (add JWT to header)
  const updateStatus = async (orderId) => {
    const status = selectedStatus[orderId];
    if (!status) return;
    
    setUpdatingOrder(orderId);
    setMessage('');
    const jwt = sessionStorage.getItem('admin_jwt');
    
    try {
      console.log(`📧 Updating order ${orderId} to ${status}`);
      const res = await fetch(`${API_URL}/api/orders/${orderId}/status`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${jwt}`,
        },
        body: JSON.stringify({ status }),
      });
      
      const data = await res.json();
      console.log('✅ Update response:', data);
      
      if (data.success) {
        setMessage(`✅ Status updated to "${status.toUpperCase()}" - Email notification sent!`);
        setMessageType('success');
        fetchOrders(jwt);
        // Clear the selected status for this order
        setSelectedStatus(prev => {
          const newState = { ...prev };
          delete newState[orderId];
          return newState;
        });
      } else {
        setMessage(`❌ ${data.error || 'Failed to update status'}`);
        setMessageType('danger');
      }
    } catch (err) {
      console.error('❌ Update error:', err);
      setMessage('❌ Error updating status - Check network connection');
      setMessageType('danger');
    } finally {
      setUpdatingOrder(null);
      setTimeout(() => setMessage(''), 5000);
    }
  };

  const handleStatusChange = (orderId, status) => {
    setSelectedStatus(prev => ({ ...prev, [orderId]: status }));
  };

  const getStatusColor = (status) => {
    const colors = {
      'received': 'secondary',
      'washing': 'warning',
      'completed': 'info',
      'delivered': 'success'
    };
    return colors[status] || 'secondary';
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  if (checkingAuth) {
    return (
      <div className="min-vh-100 d-flex align-items-center justify-content-center">
        <div className="text-center">
          <div className="spinner-border text-primary mb-3" role="status">
            <span className="visually-hidden">Checking authorization...</span>
          </div>
          <p>Checking admin access...</p>
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
            <div className="col">
              <h1 className="h3 mb-1">Admin Dashboard</h1>
              <p className="mb-0 opacity-75">Manage orders and email notifications</p>
            </div>
            <div className="col-auto">
              <button 
                className="btn btn-light"
                onClick={() => fetchOrders(sessionStorage.getItem('admin_jwt'))} 
                disabled={loading}
              >
                {loading ? (
                  <>
                    <span className="spinner-border spinner-border-sm me-2" role="status"></span>
                    Loading...
                  </>
                ) : (
                  <>
                    <i className="fas fa-sync-alt me-2"></i>
                    Refresh Orders
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="container py-4">
        {/* Alert Messages */}
        {message && (
          <div className={`alert alert-${messageType} alert-dismissible fade show`} role="alert">
            <i className={`fas ${messageType === 'success' ? 'fa-check-circle' : messageType === 'danger' ? 'fa-exclamation-triangle' : 'fa-info-circle'} me-2`}></i>
            {message}
            <button type="button" className="btn-close" onClick={() => setMessage('')}></button>
          </div>
        )}

        {/* Orders Summary Cards */}
        <div className="row mb-4">
          <div className="col-md-3 mb-3">
            <div className="card border-0 shadow-sm text-center p-3" style={{
              background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
              color: 'white'
            }}>
              <h4 className="mb-1">{orders.length}</h4>
              <p className="mb-0 small">Total Orders</p>
            </div>
          </div>
          <div className="col-md-3 mb-3">
            <div className="card border-0 shadow-sm text-center p-3" style={{
              background: 'linear-gradient(135deg, #3b82f6 0%, #1e40af 100%)',
              color: 'white'
            }}>
              <h4 className="mb-1">{orders.filter(o => o.status === 'washing' || o.status === 'received').length}</h4>
              <p className="mb-0 small">In Progress</p>
            </div>
          </div>
          <div className="col-md-3 mb-3">
            <div className="card border-0 shadow-sm text-center p-3" style={{
              background: 'linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%)',
              color: 'white'
            }}>
              <h4 className="mb-1">{orders.filter(o => o.status === 'completed').length}</h4>
              <p className="mb-0 small">Ready for Pickup</p>
            </div>
          </div>
          <div className="col-md-3 mb-3">
            <div className="card border-0 shadow-sm text-center p-3" style={{
              background: 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)',
              color: 'white'
            }}>
              <h4 className="mb-1">
                ${orders.reduce((sum, order) => sum + parseFloat(order.price || 0), 0).toFixed(2)}
              </h4>
              <p className="mb-0 small">Total Revenue</p>
            </div>
          </div>
        </div>

        {/* Orders Table */}
        <div className="card border-0 shadow-sm">
          <div className="card-header bg-white py-3">
            <h5 className="mb-0">
              <i className="fas fa-list-ul me-2 text-primary"></i>
              Order Management
            </h5>
          </div>
          <div className="card-body p-0">
            <div className="table-responsive">
              <table className="table table-hover mb-0">
                <thead className="table-light">
                  <tr>
                    <th className="px-4">ID</th>
                    <th><FaUser className="me-1" />Customer</th>
                    <th><FaPhone className="me-1" />Phone</th>
                    <th><i className="fas fa-map-marker-alt me-1"></i>Address</th>
                    <th><FaCalendar className="me-1" />Date</th>
                    <th><FaTag className="me-1" />Service</th>
                    <th><FaDollarSign className="me-1" />Price</th>
                    <th>Status</th>
                    <th><FaEnvelope className="me-1" />Update & Email</th>
                  </tr>
                </thead>
                <tbody>
                  {orders.map(order => (
                    <tr key={order.id}>
                      <td className="px-4">
                        <strong>#{order.id}</strong>
                      </td>
                      <td>
                        <div>
                          <strong>{order.user_name || order.name}</strong>
                          <br />
                          <small className="text-muted">{order.user_email}</small>
                        </div>
                      </td>
                      <td>
                        <a href={`tel:${order.user_phone}`} className="text-decoration-none">
                          {order.user_phone || 'N/A'}
                        </a>
                      </td>
                      <td>
                        <small>{order.address}</small>
                      </td>
                      <td>
                        <small>{formatDate(order.pickup_date)}</small>
                      </td>
                      <td>
                        <div>
                          <span className="fw-bold">{order.pricing_display_name}</span>
                          <br />
                          <small className="text-muted">{order.weight_lbs} lbs</small>
                        </div>
                      </td>
                      <td>
                        <strong className="text-success">${parseFloat(order.price || 0).toFixed(2)}</strong>
                      </td>
                      <td>
                        <span className={`badge bg-${getStatusColor(order.status)}`}>
                          {order.status.toUpperCase()}
                        </span>
                      </td>
                      <td>
                        <div className="d-flex gap-2 align-items-center">
                          <select
                            value={selectedStatus[order.id] || order.status}
                            onChange={e => handleStatusChange(order.id, e.target.value)}
                            className="form-select form-select-sm"
                            style={{ width: 140 }}
                            disabled={updatingOrder === order.id}
                          >
                            {STATUS_OPTIONS.map(opt => (
                              <option key={opt} value={opt}>
                                {opt.toUpperCase()}
                              </option>
                            ))}
                          </select>
                          <button
                            className="btn btn-sm btn-success"
                            onClick={() => updateStatus(order.id)}
                            disabled={
                              !selectedStatus[order.id] || 
                              selectedStatus[order.id] === order.status ||
                              updatingOrder === order.id
                            }
                          >
                            {updatingOrder === order.id ? (
                              <>
                                <span className="spinner-border spinner-border-sm me-1"></span>
                                Updating...
                              </>
                            ) : (
                              <>
                                Update & Notify
                              </>
                            )}
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                  {orders.length === 0 && !loading && (
                    <tr>
                      <td colSpan="9" className="text-center py-5">
                        <div className="text-muted">
                          <i className="fas fa-inbox fa-2x mb-3"></i>
                          <p className="mb-0">No orders found.</p>
                          <small>Orders will appear here when customers place them.</small>
                        </div>
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Footer Info */}
        <div className="card border-0 shadow-sm mt-4" style={{ background: '#f8faff' }}>
          <div className="card-body text-center py-3">
            <small className="text-muted">
              <i className="fas fa-info-circle me-1"></i>
              Status updates automatically send email notifications to customers. 
              Phone numbers are shown for manual contact if needed.
            </small>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;