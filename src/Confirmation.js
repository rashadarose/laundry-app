import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { FaCheckCircle, FaCalendarAlt, FaClock, FaMapMarkerAlt, FaPhone, FaPrint, FaEnvelope, FaHome, FaPlus } from 'react-icons/fa';

const Confirmation = () => {
  const location = useLocation();
  const navigate = useNavigate();

  // Try to get details from navigation state first
  let pickupInfo = location.state?.pickupInfo;
  let amount = location.state?.amount;

  // Fallback to localStorage if page was reloaded
  if (!pickupInfo) {
    const stored = localStorage.getItem('confirmation_pickupInfo');
    if (stored) pickupInfo = JSON.parse(stored);
  }
  if (!amount) {
    const storedAmount = localStorage.getItem('confirmation_amount');
    if (storedAmount) amount = parseFloat(storedAmount);
  }

  // Generate a confirmation number if not available
  const confirmationNumber = pickupInfo?.confirm_number || `FNG${Date.now().toString().slice(-6)}`;

  const handlePrint = () => {
    window.print();
  };

  const handleEmail = () => {
    const subject = `Fold N Go - Order Confirmation #${confirmationNumber}`;
    const body = `Thank you for your order!\n\nConfirmation #: ${confirmationNumber}\nAmount: $${amount?.toFixed(2) || '0.00'}\n\nWe'll see you soon!`;
    window.location.href = `mailto:?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'Not specified';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div className="min-vh-100" style={{ background: 'linear-gradient(135deg, #f8faff 0%, #e3f2fd 100%)' }}>
      {/* Header */}
      <div className="container-fluid py-4" style={{
        background: 'linear-gradient(135deg, #10b981 0%, #059669 50%, #047857 100%)'
      }}>
        <div className="container">
          <div className="text-center text-white">
            <FaCheckCircle size={48} className="mb-3" />
            <h1 className="h3 mb-2">Order Confirmed!</h1>
            <p className="mb-0 opacity-75">Your laundry pickup has been successfully scheduled</p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container py-5" style={{ maxWidth: '800px' }}>
        <div className="row justify-content-center">
          <div className="col-lg-10">
            {/* Success Message */}
            <div className="card border-0 shadow-sm mb-4" style={{
              background: 'linear-gradient(135deg, #ecfdf5 0%, #f0fdf4 100%)'
            }}>
              <div className="card-body text-center py-5">
                <div className="mb-3">
                  <FaCheckCircle className="text-success" size={64} />
                </div>
                <h2 className="text-success mb-3">Payment Successful!</h2>
                <p className="lead text-muted mb-4">
                  Thank you for choosing Fold N Go! Your payment has been processed and your pickup is confirmed.
                </p>
                <div className="row">
                  <div className="col-md-6">
                    <div className="bg-white p-3 rounded shadow-sm">
                      <h6 className="text-muted mb-1">Confirmation Number</h6>
                      <h4 className="text-primary mb-0">{confirmationNumber}</h4>
                    </div>
                  </div>
                  <div className="col-md-6 mt-3 mt-md-0">
                    <div className="bg-white p-3 rounded shadow-sm">
                      <h6 className="text-muted mb-1">Total Paid</h6>
                      <h4 className="text-success mb-0">${amount?.toFixed(2) || '0.00'}</h4>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Order Details */}
            {pickupInfo && (
              <div className="card border-0 shadow-sm mb-4">
                <div className="card-header bg-white py-3">
                  <h5 className="mb-0">Order Details</h5>
                </div>
                <div className="card-body">
                  <div className="row">
                    <div className="col-md-6 mb-4">
                      <h6 className="text-muted mb-3">Service Information</h6>
                      <div className="mb-2">
                        <FaCalendarAlt className="me-2 text-primary" />
                        <strong>Service:</strong> {pickupInfo.pricing_tier_name || 'Next-Day Service'}
                      </div>
                      <div className="mb-2">
                        <strong>Weight:</strong> {pickupInfo.weight_lbs || 10} lbs
                      </div>
                      <div className="mb-2">
                        <strong>Bags:</strong> {pickupInfo.load_amount || Math.ceil((pickupInfo.weight_lbs || 10) / 10)} × 10 lb bags
                      </div>
                      {pickupInfo.notes && (
                        <div className="mb-2">
                          <strong>Special Instructions:</strong> {pickupInfo.notes}
                        </div>
                      )}
                    </div>

                    <div className="col-md-6 mb-4">
                      <h6 className="text-muted mb-3">Pickup Details</h6>
                      <div className="mb-2">
                        <FaMapMarkerAlt className="me-2 text-primary" />
                        <strong>Name:</strong> {pickupInfo.name}
                      </div>
                      <div className="mb-2">
                        <FaMapMarkerAlt className="me-2 text-primary" />
                        <strong>Address:</strong> {pickupInfo.address}
                      </div>
                      <div className="mb-2">
                        <FaCalendarAlt className="me-2 text-primary" />
                        <strong>Date:</strong> {formatDate(pickupInfo.pickup_date)}
                      </div>
                      <div className="mb-2">
                        <FaClock className="me-2 text-primary" />
                        <strong>Pickup:</strong> {pickupInfo.pickup_time}
                      </div>
                      <div className="mb-2">
                        <FaClock className="me-2 text-primary" />
                        <strong>Dropoff:</strong> {pickupInfo.dropoff_time}
                      </div>
                      {pickupInfo.phone && (
                        <div className="mb-2">
                          <FaPhone className="me-2 text-primary" />
                          <strong>Phone:</strong> {pickupInfo.phone}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Next Steps */}
            <div className="card border-0 shadow-sm mb-4">
              <div className="card-header bg-primary text-white py-3">
                <h5 className="mb-0">What's Next?</h5>
              </div>
              <div className="card-body">
                <div className="row">
                  <div className="col-md-4 mb-3">
                    <div className="text-center">
                      <div className="bg-light rounded-circle d-inline-flex align-items-center justify-content-center mb-2" 
                           style={{ width: '50px', height: '50px' }}>
                        <span className="fw-bold text-primary">1</span>
                      </div>
                      <h6>Prepare Your Laundry</h6>
                      <p className="small text-muted">
                        Have your laundry ready for pickup at the scheduled time.
                      </p>
                    </div>
                  </div>
                  <div className="col-md-4 mb-3">
                    <div className="text-center">
                      <div className="bg-light rounded-circle d-inline-flex align-items-center justify-content-center mb-2" 
                           style={{ width: '50px', height: '50px' }}>
                        <span className="fw-bold text-primary">2</span>
                      </div>
                      <h6>We'll Text You</h6>
                      <p className="small text-muted">
                        Get updates about your pickup and delivery via SMS.
                      </p>
                    </div>
                  </div>
                  <div className="col-md-4 mb-3">
                    <div className="text-center">
                      <div className="bg-light rounded-circle d-inline-flex align-items-center justify-content-center mb-2" 
                           style={{ width: '50px', height: '50px' }}>
                        <span className="fw-bold text-primary">3</span>
                      </div>
                      <h6>Fresh & Folded</h6>
                      <p className="small text-muted">
                        Receive your clean, fresh, and neatly folded laundry.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="row g-3">
              <div className="col-md-6">
                <div className="card border-0 shadow-sm h-100">
                  <div className="card-body text-center">
                    <h6 className="mb-3">Share This Confirmation</h6>
                    <div className="d-flex gap-2 justify-content-center">
                      <button 
                        className="btn btn-outline-primary flex-fill"
                        onClick={handlePrint}
                      >
                        <FaPrint className="me-2" />
                        Print
                      </button>
                      <button 
                        className="btn btn-outline-primary flex-fill"
                        onClick={handleEmail}
                      >
                        <FaEnvelope className="me-2" />
                        Email
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              <div className="col-md-6">
                <div className="card border-0 shadow-sm h-100">
                  <div className="card-body text-center">
                    <h6 className="mb-3">What Would You Like To Do?</h6>
                    <div className="d-flex gap-2 justify-content-center">
                      <Link 
                        to="/pickup" 
                        className="btn btn-outline-success flex-fill"
                      >
                        <FaPlus className="me-2" />
                        New Order
                      </Link>
                      <Link 
                        to="/home" 
                        className="btn btn-primary flex-fill"
                      >
                        <FaHome className="me-2" />
                        Home
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Information */}
            <div className="card border-0 shadow-sm mt-4" style={{
              background: 'linear-gradient(135deg, #f8faff 0%, #e3f2fd 100%)'
            }}>
              <div className="card-body text-center py-4">
                <h6 className="mb-3">Need Help?</h6>
                <p className="text-muted mb-3">
                  Questions about your order? Our support team is here to help!
                </p>
                <div className="row">
                  <div className="col-md-6 mb-2">
                    <a href="tel:(973)752-8237" className="btn btn-link text-decoration-none">
                      <FaPhone className="me-2" />
                      (973) 752-8237
                    </a>
                  </div>
                  <div className="col-md-6 mb-2">
                    <a href="mailto:support@foldngo.com" className="btn btn-link text-decoration-none">
                      <FaEnvelope className="me-2" />
                      support@foldngo.com
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Confirmation;