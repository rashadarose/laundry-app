import fngologo1 from './fngologo1.png';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import SignIn from './pages/SignIn';
import SignUp from './SignUp'; 
import PickUp from './PickUp'; 
import Home from './Home';
import Contact from './Contact'; 
import Payment from './Payment';
import Confirmation from './Confirmation';  
import PickUpConfirmation from './PickUpConfirmation';
import ComingSoon from './ComingSoon'; 
import Services from './ServicesPage'; 
import FAQ from './FAQ';
import Policy from './Policy';
import Dashboard from './Dashboard'; 
import Terms from './Terms';
import React, { useEffect, useState } from 'react';
import { FaUserCircle } from 'react-icons/fa';

const HOUSTON_ZIPCODES = [
  '77002','77003','77004','77005','77006','77007','77008','77009','77010','77011','77012','77013','77014','77015','77016','77017','77018','77019','77020','77021','77022','77023','77024','77025','77026','77027','77028','77029','77030','77031','77032','77033','77034','77035','77036','77037','77038','77039','77040','77041','77042','77043','77044','77045','77046','77047','77048','77049','77050','77051','77053','77054','77055','77056','77057','77058','77059','77060','77061','77062','77063','77064','77065','77066','77067','77068','77069','77070','77071','77072','77073','77074','77075','77076','77077','77078','77079','77080','77081','77082','77083','77084','77085','77086','77087','77088','77089','77090','77091','77092','77093','77094','77095','77096','77098','77099','77204'
];

function App() {
  const [showZipModal, setShowZipModal] = useState(false);
  const [zipInput, setZipInput] = useState('');
  const [zipError, setZipError] = useState('');

  // Admin modal state
  const [showAdminModal, setShowAdminModal] = useState(false);
  const [adminUsername, setAdminUsername] = useState('');
  const [adminPassword, setAdminPassword] = useState('');
  const [adminError, setAdminError] = useState('');
  const [navigateToDashboard, setNavigateToDashboard] = useState(false);
  const [userName, setUserName] = useState('');
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const header = document.querySelector('header');
      if (window.scrollY > 10) {
        header.classList.add('sticky-scrolled');
      } else {
        header.classList.remove('sticky-scrolled');
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    // Only show modal if zip code not already stored
    const storedZip = localStorage.getItem('houston_zip');
    if (!storedZip) setShowZipModal(true);
  }, []);

  const handleZipSubmit = (e) => {
    e.preventDefault();
    if (HOUSTON_ZIPCODES.includes(zipInput.trim())) {
      localStorage.setItem('houston_zip', zipInput.trim());
      setShowZipModal(false);
      setZipError('');
    } else {
      setZipError('Sorry, we only serve the Houston metro area.');
    }
  };

  // Handle dashboard link click
  const handleDashboardClick = (e) => {
    e.preventDefault();
    setShowAdminModal(true);
    setAdminUsername('');
    setAdminPassword('');
    setAdminError('');
  };

  // Handle admin JWT login
  const handleAdminSubmit = async (e) => {
    e.preventDefault();
    if (!adminUsername || !adminPassword) {
      setAdminError('Please enter both username and password.');
      return;
    }
    try {
      const API_URL = process.env.REACT_APP_API_URL || 'https://localhost:3002';
      const res = await fetch(`${API_URL}/api/admin/signin`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username: adminUsername, password: adminPassword }),
      });
      const data = await res.json();
      if (!res.ok || !data.success) {
        setAdminError(data.error || 'Incorrect admin credentials.');
        return;
      }
      // Store JWT token in sessionStorage
      sessionStorage.setItem('admin_jwt', data.token);
      setShowAdminModal(false);
      setIsAdmin(true); // Set admin state
      setNavigateToDashboard(true);
    } catch {
      setAdminError('Network error. Try again.');
    }
  };

  // Check admin JWT on mount (persist admin session)
  useEffect(() => {
    const jwt = sessionStorage.getItem('admin_jwt');
    setIsAdmin(!!jwt);
  }, []);

  // Navigate to dashboard after modal closes and token is set
  useEffect(() => {
    if (navigateToDashboard) {
      setNavigateToDashboard(false);
      window.location.href = '/dashboard';
    }
  }, [navigateToDashboard]);

  // Check if user is signed in and get their name
  useEffect(() => {
    const userId = localStorage.getItem('laundry_token');
    if (userId) {
      const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:3002';
      fetch(`${API_URL}/api/users/${userId}`)
        .then(res => res.json())
        .then(user => {
          setUserName(user.name || '');
        })
        .catch(() => setUserName(''));
    } else {
      setUserName('');
    }
  }, []);

  function closeNavbar() {
    const navbarToggler = document.querySelector('.navbar-toggler');
    const navbarCollapse = document.getElementById('navbarNav');
    if (navbarToggler && navbarCollapse && navbarCollapse.classList.contains('show')) {
      navbarToggler.click();
    }
  }

  // Add loading spinner component
  const LoadingSpinner = () => (
    <div className="d-flex justify-content-center align-items-center" style={{ minHeight: '200px' }}>
      <div className="spinner-border text-primary" role="status">
        <span className="visually-hidden">Loading...</span>
      </div>
    </div>
  );

  return (
    <Router>
      <div className="App">
        <header style={{ minHeight: '56px', padding: '0' }}>
          <nav className="navbar navbar-expand-lg navbar-light bg-light" style={{ minHeight: '56px', padding: '0' }}>
            <div className="container-fluid" style={{ 
              minHeight: '56px', 
              paddingTop: 0, 
              paddingBottom: 0, 
              paddingLeft: '20px', // Add left padding for logo
              paddingRight: '20px', // Add right padding for balance
              justifyContent: 'space-between' // Change from 'end' to 'space-between'
            }}>
              <a className="navbar-brand d-flex align-items-center" href="/home" style={{ 
                paddingTop: 0, 
                paddingBottom: 0,
                marginRight: 'auto' // Push logo to the left
              }}>
                <img
                  src={fngologo1}
                  alt="Logo"
                  style={{
                    height: '90px',
                    width: 'auto',
                    objectFit: 'contain',
                    marginTop: '-18px',
                    marginBottom: '-18px'
                  }}
                  className="d-inline-block align-top me-2"
                />
              </a>
              <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav"
                aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
              </button>
              <div className="collapse navbar-collapse" id="navbarNav" style={{ justifyContent: 'flex-end' }}>
                <ul className="navbar-nav">
                  <li className="nav-item">
                    <Link className="nav-link" to="/home" onClick={closeNavbar}>Home</Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" to="/pickup" onClick={closeNavbar}>Pick Up</Link>
                  </li>
                   <li>
                    <Link to="/faq" className="nav-link"  onClick={closeNavbar}>FAQs</Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" to="/contact" onClick={closeNavbar}>Contact Us</Link>
                  </li>
                  {/* User Icon and Name/Sign In */}
                  <li className="nav-item d-flex align-items-center ms-2 position-relative">
                    <FaUserCircle size={22} style={{ marginRight: 6, color: '#0E3052' }} />
                    {userName ? (
                      <div className="dropdown">
                        <span
                          className="dropdown-toggle"
                          id="userDropdown"
                          data-bs-toggle="dropdown"
                          aria-expanded="false"
                          style={{ fontWeight: 500, cursor: 'pointer' }}
                        >
                          {userName}
                        </span>
                        <ul className="dropdown-menu dropdown-menu-end" aria-labelledby="userDropdown">
                          <li>
                            <button
                              className="dropdown-item"
                              onClick={() => {
                                localStorage.removeItem('laundry_token');
                                setUserName('');
                                window.location.href = '/signin';
                              }}
                            >
                              Log Out
                            </button>
                          </li>
                        </ul>
                      </div>
                    ) : (
                      <Link className="nav-link p-0" to="/signin" onClick={closeNavbar} style={{ color: '' }}>
                        Sign In
                      </Link>
                    )}
                  </li>
                </ul>
              </div>
            </div>
          </nav>
        </header>
        <main>
          <Routes>
            <Route path="/home" element={<Home />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/pickup" element={<PickUp />} />
            <Route path="/services" element={<Services />} />
            <Route path="/signin" element={<SignIn />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/payments" element={<Payment />} />
            <Route path="/confirmation" element={<Confirmation />} />
            <Route path="/comingsoon" element={<ComingSoon />} />
            <Route path="/faq" element={<FAQ />} />
            <Route path="/policy" element={<Policy />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/terms-of-service" element={<Terms />} />
            <Route path="/" element={<Home />} />
          </Routes>
        </main>
        <footer className="text-white mt-auto py-5" style={{
          background: 'linear-gradient(135deg, #1e3a8a 0%, #3b82f6 50%, #06b6d4 100%)'
        }}>
          <div className="container">
            <div className="row text-center text-md-start">
              {/* Logo and About */}
              <div className="col-md-2 mb-4 mb-md-0 d-flex flex-column align-items-center align-items-md-start">
                <img
                  src={fngologo1}
                  alt="Logo"
                  style={{
                    width: '80px',
                    height: '80px',
                    objectFit: 'contain',
                    marginBottom: '0.5rem'
                  }}
                  className="mb-2"
                />
                <h5>LaundryApp</h5>
                <p className="small">Your trusted laundry partner in Houston, TX. Fast, friendly, and always fresh!</p>
              </div>
             
              <div className="col-md-2 mb-4 mb-md-0">
                <h6 className="text-uppercase fw-bold mb-3">Services</h6>
                <ul className="list-unstyled">
                  <li>
                   <Link to = "/services" onClick={closeNavbar} >
                    <button type="button" className="text-white-50 text-decoration-none btn btn-link p-0" style={{ textAlign: 'left' }}>
                      Wash &amp; Fold
                    </button>
                    </Link>
                  </li>
                  <li>
                    <button type="button" className="text-white-50 text-decoration-none btn btn-link p-0" style={{ textAlign: 'left' }}>
                      Dry Cleaning
                    </button>
                  </li>
                  <li>
                    <button type="button" className="text-white-50 text-decoration-none btn btn-link p-0" style={{ textAlign: 'left' }}>
                      Pick Up &amp; Delivery
                    </button>
                  </li>
                  <li>
                    <button type="button" className="text-white-50 text-decoration-none btn btn-link p-0" style={{ textAlign: 'left' }}>
                      Commercial Laundry
                    </button>
                  </li>
                </ul>
              </div>
              {/* Company */}
              <div className="col-md-2 mb-4 mb-md-0">
                <h6 className="text-uppercase fw-bold mb-3">Company</h6>
                <ul className="list-unstyled">
                  <li>
                    <button type="button" className="text-white-50 text-decoration-none btn btn-link p-0" style={{ textAlign: 'left' }}>
                      About Us
                    </button>
                  </li>
                  <li>
                  <Link to = "/comingsoon" onClick={closeNavbar} >
                    <button type="button" className="text-white-50 text-decoration-none btn btn-link p-0" style={{ textAlign: 'left' }}>
                      Careers
                    </button>
                    </Link>
                  </li>
                
                  
                  <li>
                   <Link to = "/contact" onClick={closeNavbar} >
                    <button type="button" className="text-white-50 text-decoration-none btn btn-link p-0" style={{ textAlign: 'left' }}>
                      Contact
                    </button>
                    </Link>
                  </li>
                    <li>
                  <Link to = "/comingsoon" onClick={closeNavbar} >
                    <button type="button" className="text-white-50 text-decoration-none btn btn-link p-0" style={{ textAlign: 'left' }}>
                      Blog
                    </button>
                    </Link>
                  </li>
                </ul>
              </div>
             { /* Legal & Help */}
              <div className="col-md-3 mb-4 mb-md-0">
                <h6 className="text-uppercase fw-bold mb-3">Legal &amp; Help</h6>
                <ul className="list-unstyled">
                  <li>
                    <Link to="/policy" className="text-white-50 text-decoration-none" onClick={closeNavbar}>
                      Privacy Policy
                    </Link>
                  </li>
                  <li>
                    <Link to="/terms-of-service" className="text-white-50 text-decoration-none" onClick={closeNavbar}>Terms of Service</Link>
                  </li>
                  <li>
                    <Link to="/faq" className="text-white-50 text-decoration-none"  onClick={closeNavbar}>FAQs</Link>
                  </li>
                  <li>
                    <a href="/support" className="text-white-50 text-decoration-none">Support</a>
                  </li>
                  <li>
                    <Link
                      to="/dashboard"
                      className="text-white-50 text-decoration-none"
                      onClick={e => {
                        closeNavbar();
                        handleDashboardClick(e);
                      }}
                    >
                      Admin
                    </Link>
                  </li>
                </ul>
              </div>
              {/* Social Media */}
              <div className="col-md-3">
                <h6 className="text-uppercase fw-bold mb-3">Follow Us</h6>
                <div className="d-flex gap-3 justify-content-center justify-content-md-start">
                  <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="text-white fs-4">
                    <i className="fab fa-facebook-f"></i>
                  </a>
                  <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-white fs-4">
                    <i className="fab fa-instagram"></i>
                  </a>
                  <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-white fs-4">
                    <i className="fab fa-twitter"></i>
                  </a>
                  <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="text-white fs-4">
                    <i className="fab fa-linkedin-in"></i>
                  </a>
                </div>
              </div>
            </div>
            <hr className="my-4 border-secondary" />
            <div className="text-center small">
              &copy; {new Date().getFullYear()} Vibi Media LLC. All rights reserved. &nbsp;|&nbsp;
              <a href="/privacy-policy" className="text-white-50 text-decoration-none">Privacy Policy</a> &nbsp;|&nbsp;
              <a href="/terms-of-service" className="text-white-50 text-decoration-none">Terms of Service</a>
            </div>
          </div>
        </footer>

        {/* Zip Code Modal */}
        {showZipModal && (
          <div
            style={{
              position: 'fixed',
              top: 0, left: 0, width: '100vw', height: '100vh',
              background: 'rgba(0,0,0,0.45)',
              zIndex: 9999,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            <div
              style={{
                background: '#fff',
                borderRadius: 12,
                padding: '32px 24px',
                maxWidth: 350,
                width: '90%',
                boxShadow: '0 4px 24px rgba(0,0,0,0.18)',
                textAlign: 'center'
              }}
            >
              <h4 className="mb-3">Enter Your Zip Code</h4>
              <form onSubmit={handleZipSubmit}>
                <input
                  type="text"
                  maxLength={5}
                  className="form-control mb-2"
                  placeholder="Houston Zip Code"
                  value={zipInput}
                  onChange={e => setZipInput(e.target.value.replace(/\D/,''))}
                  style={{ textAlign: 'center', fontSize: '1.2rem' }}
                  autoFocus
                  required
                />
                {zipError && <div className="text-danger mb-2">{zipError}</div>}
                <button type="submit" className="btn btn-primary w-100">Continue</button>
              </form>
            </div>
          </div>
        )}

        {/* Admin JWT Login Modal */}
        {showAdminModal && (
          <div
            style={{
              position: 'fixed',
              top: 0, left: 0, width: '100vw', height: '100vh',
              background: 'rgba(0,0,0,0.45)',
              zIndex: 9999,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            <div
              style={{
                background: '#fff',
                borderRadius: 12,
                padding: '32px 24px',
                maxWidth: 350,
                width: '90%',
                boxShadow: '0 4px 24px rgba(0,0,0,0.18)',
                textAlign: 'center'
              }}
            >
              <h4 className="mb-3">Admin Login</h4>
              <form onSubmit={handleAdminSubmit}>
                <input
                  type="text"
                  className="form-control mb-2"
                  placeholder="Admin username"
                  value={adminUsername}
                  onChange={e => setAdminUsername(e.target.value)}
                  style={{ textAlign: 'center', fontSize: '1.1rem' }}
                  autoFocus
                  required
                />
                <input
                  type="password"
                  className="form-control mb-2"
                  placeholder="Admin password"
                  value={adminPassword}
                  onChange={e => setAdminPassword(e.target.value)}
                  style={{ textAlign: 'center', fontSize: '1.1rem' }}
                  required
                />
                {adminError && <div className="text-danger mb-2">{adminError}</div>}
                <button type="submit" className="btn btn-primary w-100">Sign In</button>
                <button
                  type="button"
                  className="btn btn-link w-100 text-decoration-none"
                  onClick={() => setShowAdminModal(false)}
                  style={{ color: '#007bff' }}
                >
                  Cancel
                </button>
              </form>
            </div>
          </div>
        )}
      </div>
    </Router>
  );
}

export default App;
