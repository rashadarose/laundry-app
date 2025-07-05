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

function Dashboard() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState({});
  const [message, setMessage] = useState('');
  const [checkingAuth, setCheckingAuth] = useState(true);
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
        sessionStorage.removeItem('admin_jwt');
        navigate('/home', { replace: true });
        return;
      }
      const data = await res.json();
      setOrders(data);
    } catch (err) {
      setMessage('Network error');
    }
    setLoading(false);
  };

  const handleStatusChange = (orderId, status) => {
    setSelectedStatus(prev => ({ ...prev, [orderId]: status }));
  };

  // Update order status (add JWT to header)
  const updateStatus = async (orderId) => {
    const status = selectedStatus[orderId];
    if (!status) return;
    setMessage('');
    const jwt = sessionStorage.getItem('admin_jwt');
    try {
      const res = await fetch(`${API_URL}/api/orders/${orderId}/status`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${jwt}`,
        },
        body: JSON.stringify({ status }),
      });
      const data = await res.json();
      if (data.success) {
        setMessage('Status updated!');
        fetchOrders(jwt);
      } else {
        setMessage(data.error || 'Failed to update status');
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
        <button className="btn btn-primary" onClick={() => fetchOrders(sessionStorage.getItem('admin_jwt'))} disabled={loading}>
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