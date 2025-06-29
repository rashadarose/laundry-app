import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const STATUS_OPTIONS = [  
  'received',
  'washing',
  'washed',
  'folding',
  'folded',
  'ready_for_delivery',
  'delivered',
];

const API_URL = process.env.REACT_APP_API_URL || 'https://localhost:3002';
//const secret = process.env.REACT_APP_ADMIN_SECRET;
function Dashboard() {
  const [secret, setSecret] = useState('');
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState({});
  const [message, setMessage] = useState('');
  const [checkingAuth, setCheckingAuth] = useState(true);
  const navigate = useNavigate();
  
  // Only allow access if admin_secret is present in sessionStorage
  useEffect(() => {
    const storedSecret = sessionStorage.getItem('admin_secret');
    if (!storedSecret) {
      navigate('/home', { replace: true });
    } else {
      setSecret(storedSecret);
      setCheckingAuth(false);
      fetchOrders(storedSecret);
    }
    // eslint-disable-next-line
  }, []);

  // Always use the secret from sessionStorage for API calls
  const fetchOrders = async (adminSecret) => {
    setLoading(true);
    setMessage('');
    try {
      const secretToUse = adminSecret || sessionStorage.getItem('admin_secret');
      const res = await fetch(`${API_URL}/admin?admin_secret=${secretToUse}`);
      const text = await res.text();
      console.log('ADMIN RESPONSE:', text);
      try {
        const data = JSON.parse(text);
        setOrders(data);
        setSecret(secretToUse);
      } catch {
        setMessage('Server error or invalid admin secret.');
      }
    } catch (err) {
      setMessage('Network error');
    }
    setLoading(false);
  };

  const handleStatusChange = (orderId, status) => {
    setSelectedStatus(prev => ({ ...prev, [orderId]: status }));
  };

  const updateStatus = async (orderId) => {
    const status = selectedStatus[orderId];
    if (!status) return;
    setMessage('');
    try {
      const secretToUse = sessionStorage.getItem('admin_secret');
      const res = await fetch(`${API_URL}/api/orders/${orderId}/status`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status }),
      });
      const text = await res.text();
      try {
        const data = JSON.parse(text);
        if (data.success) {
          setMessage('Status updated!');
          //fetchOrders(secretToUse);
        } else {
          setMessage(data.error || 'Failed to update status');
        }
      } catch {
        setMessage('Server error.');
      }
    } catch (err) {
      setMessage('Error updating status');
    }
  };

  if (checkingAuth) return null;

  return (
    <div className="container mt-5" style={{ maxWidth: 900 }}>
      <h2>Admin Dashboard</h2>
      <div className="mb-3">
        <label>Admin Secret:</label>
        <input
          type="password"
          className="form-control"
          value={secret}
          onChange={e => setSecret(e.target.value)}
          placeholder="Enter admin secret"
          autoFocus    
          style={{ maxWidth: 300, display: 'inline-block', marginRight: 10 }}
        />
        <button className="btn btn-primary" onClick={() => fetchOrders()} disabled={loading}>
          {loading ? 'Loading...' : 'Fetch Orders'}
        </button>
      </div>
      {message && <div className="alert alert-info">{message}</div>}
      <table className="table table-bordered mt-4">
        <thead>
          <tr>
            <th>Order ID</th>
            <th>User</th>
            <th>Address</th>
            <th>Pickup Date</th>
            <th>Status</th>
            <th>Update Status</th>
          </tr>
        </thead>
        <tbody>
          {orders.map(order => (
            <tr key={order.id}>
              <td>{order.id}</td>
              <td>{order.user_id}</td>
              <td>{order.address}</td>
              <td>{order.pickupDate || order.pickup_date}</td>
              <td>{order.status}</td>
              <td>
                <select
                  value={selectedStatus[order.id] || order.status}
                  onChange={e => handleStatusChange(order.id, e.target.value)}
                  className="form-select"
                  style={{ width: 160, display: 'inline-block', marginRight: 8 }}
                >
                  {STATUS_OPTIONS.map(opt => (
                    <option key={opt} value={opt}>{opt}</option>
                  ))}
                </select>
                <button
                  className="btn btn-sm btn-success"
                  onClick={() => updateStatus(order.id)}
                  disabled={selectedStatus[order.id] === order.status}
                >
                  Update
                </button>
              </td>
            </tr>
          ))}
          {orders.length === 0 && (
            <tr>
              <td colSpan="6" className="text-center">
                No orders found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default Dashboard;