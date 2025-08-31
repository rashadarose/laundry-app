import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { FaUser, FaLock, FaEye, FaEyeSlash, FaSignInAlt } from 'react-icons/fa';

function SignIn() {
  const [form, setForm] = useState({ identifier: '', password: '' });
  const [showFirstVisitModal, setShowFirstVisitModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
    if (error) setError(''); // Clear error when user starts typing
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:3002';
      const response = await fetch(`${API_URL}/api/signin`, {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          identifier: form.identifier,
          password: form.password
        })
      });

      const data = await response.json();

      if (data.success) {
        localStorage.removeItem('laundry_token');
        window.location.href = '/home';
      } else {
        setError(data.error || 'Login failed');
      }
    } catch (error) {
      console.error('💥 Login error:', error);
      setError('Network error. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div 
      className="min-vh-100 d-flex align-items-center position-relative" 
      style={{ 
        background: 'linear-gradient(135deg, #f8faff 0%, #e3f2fd 100%)'
      }}
    >
      {/* Background Logo Overlay - Using public folder path */}
      <div 
        className="position-absolute w-100 h-100"
        style={{
          backgroundImage: 'url(/fngologo1.png)', // Direct public folder reference
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'center center',
          backgroundSize: '600px 600px',
          opacity: 0.08, // Subtle watermark effect
          zIndex: 0,
          pointerEvents: 'none'
        }}
      />

      <div className="container position-relative" style={{ zIndex: 1 }}>
        <div className="row justify-content-center">
          <div className="col-md-6 col-lg-5 col-xl-4">
            <div className="card border-0 shadow-lg" style={{ borderRadius: '15px' }}>
              <div className="card-header text-center py-4" style={{
                background: 'linear-gradient(135deg, #1e3a8a 0%, #3b82f6 50%, #06b6d4 100%)',
                borderRadius: '15px 15px 0 0',
                border: 'none'
              }}>
                <div className="mb-3">
                  <div className="bg-white rounded-circle d-inline-flex align-items-center justify-content-center" 
                       style={{ width: '60px', height: '60px' }}>
                    <FaSignInAlt className="text-primary" size={24} />
                  </div>
                </div>
                <h2 className="text-white mb-2">Welcome Back</h2>
                <p className="text-white-50 mb-0">Sign in to your account</p>
              </div>

              <div className="card-body p-4">
                {error && (
                  <div className="alert alert-danger alert-dismissible fade show" role="alert">
                    <i className="fas fa-exclamation-triangle me-2"></i>
                    {error}
                    <button type="button" className="btn-close" onClick={() => setError('')}></button>
                  </div>
                )}

                <form onSubmit={handleSubmit}>
                  {/* Email/Username Field */}
                  <div className="mb-3">
                    <label htmlFor="identifier" className="form-label">
                      <FaUser className="me-2 text-primary" />
                      Email or Username
                    </label>
                    <div className="input-group">
                      <span className="input-group-text bg-light border-end-0">
                        <FaUser className="text-muted" />
                      </span>
                      <input
                        type="text"
                        name="identifier"
                        className="form-control border-start-0"
                        id="identifier"
                        value={form.identifier}
                        onChange={handleChange}
                        placeholder="Enter your email or username"
                        required
                        autoFocus
                        style={{
                          paddingLeft: '0.5rem',
                          boxShadow: 'none'
                        }}
                      />
                    </div>
                  </div>

                  {/* Password Field */}
                  <div className="mb-4">
                    <label htmlFor="password" className="form-label">
                      <FaLock className="me-2 text-primary" />
                      Password
                    </label>
                    <div className="input-group">
                      <span className="input-group-text bg-light border-end-0">
                        <FaLock className="text-muted" />
                      </span>
                      <input
                        type={showPassword ? "text" : "password"}
                        name="password"
                        className="form-control border-start-0 border-end-0"
                        id="password"
                        value={form.password}
                        onChange={handleChange}
                        placeholder="Enter your password"
                        required
                        style={{
                          paddingLeft: '0.5rem',
                          paddingRight: '0.5rem',
                          boxShadow: 'none'
                        }}
                      />
                      <button
                        type="button"
                        className="btn btn-outline-secondary border-start-0"
                        onClick={() => setShowPassword(!showPassword)}
                        style={{ backgroundColor: '#f8f9fa' }}
                      >
                        {showPassword ? <FaEyeSlash /> : <FaEye />}
                      </button>
                    </div>
                  </div>

                  {/* Submit Button */}
                  <button 
                    type="submit" 
                    className="btn btn-primary w-100 btn-lg mb-3"
                    disabled={loading}
                    style={{
                      background: 'linear-gradient(135deg, #1e3a8a 0%, #3b82f6 100%)',
                      border: 'none',
                      borderRadius: '8px'
                    }}
                  >
                    {loading ? (
                      <>
                        <span className="spinner-border spinner-border-sm me-2"></span>
                        Signing In...
                      </>
                    ) : (
                      <>
                        <FaSignInAlt className="me-2" />
                        Sign In
                      </>
                    )}
                  </button>

                  {/* Forgot Password Link */}
                  <div className="text-center mb-3">
                    <Link to="/forgot-password" className="text-decoration-none">
                      Forgot your password?
                    </Link>
                  </div>

                  {/* Divider */}
                  <div className="text-center mb-3">
                    <hr className="my-3" />
                    <span className="text-muted bg-white px-3" style={{ fontSize: '0.9rem' }}>
                      Don't have an account?
                    </span>
                  </div>

                  {/* Sign Up Button */}
                  <Link 
                    to="/signup" 
                    className="btn btn-outline-success w-100"
                    style={{ borderRadius: '8px' }}
                  >
                    <i className="fas fa-user-plus me-2"></i>
                    Create New Account
                  </Link>
                </form>
              </div>

              {/* Footer */}
              <div className="card-footer bg-light text-center py-3" style={{
                borderRadius: '0 0 15px 15px',
                border: 'none'
              }}>
                <small className="text-muted">
                  <i className="fas fa-shield-alt me-1"></i>
                  Your information is secure and protected
                </small>
              </div>
            </div>

            {/* Additional Info */}
            <div className="text-center mt-4">
              <div className="row">
                <div className="col-4">
                  <div className="text-primary">
                    <i className="fas fa-clock fs-4 mb-2"></i>
                    <p className="small text-muted mb-0">24/7 Service</p>
                  </div>
                </div>
                <div className="col-4">
                  <div className="text-primary">
                    <i className="fas fa-shield-check fs-4 mb-2"></i>
                    <p className="small text-muted mb-0">Secure Login</p>
                  </div>
                </div>
                <div className="col-4">
                  <div className="text-primary">
                    <i className="fas fa-headset fs-4 mb-2"></i>
                    <p className="small text-muted mb-0">Support Ready</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* First Visit Modal */}
      {showFirstVisitModal && (
        <div className="position-fixed top-0 start-0 w-100 h-100 d-flex align-items-center justify-content-center" 
             style={{ backgroundColor: 'rgba(0,0,0,0.5)', zIndex: 9999 }}>
          <div className="card border-0 shadow-lg" style={{ maxWidth: '400px', width: '90%' }}>
            <div className="card-body text-center p-4">
              <h4 className="mb-3">Welcome!</h4>
              <p className="text-muted mb-4">This is your first visit. Please enter your zip code.</p>
              <button 
                className="btn btn-primary" 
                onClick={() => setShowFirstVisitModal(false)}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default SignIn;