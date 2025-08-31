import fngologo1 from './fngologo1.png';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import SignIn from './pages/SignIn'; // Keep this one - it's in the pages folder
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
import Pricing from './Pricing';
import Weight from './Weight';
import Support from './Support';
import Profile from './Profile';
import AboutUs from './AboutUs'; // Add AboutUs import

const HOUSTON_ZIPCODES = [
  '77002','77003','77004','77005','77006','77007','77008','77009','77010','77011','77012','77013','77014','77015','77016','77017','77018','77019','77020','77021','77022','77023','77024','77025','77026','77027','77028','77029','77030','77031','77032','77033','77034','77035','77036','77037','77038','77039','77040','77041','77042','77043','77044','77045','77046','77047','77048','77049','77050','77051','77053','77054','77055','77056','77057','77058','77059','77060','77061','77062','77063','77064','77065','77066','77067','77068','77069','77070','77071','77072','77073','77074','77075','77076','77077','77078','77079','77080','77081','77082','77083','77084','77085','77086','77087','77088','77089','77090','77091','77092','77093','77094','77095','77096','77098','77099','77204'
];

function App() {
  // Updated state for session-based auth
  const [userName, setUserName] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userEmail, setUserEmail] = useState('');
  const [isAdmin, setIsAdmin] = useState(false);
  
  // ...existing state (zip modal, admin modal, etc.)...
  const [showZipModal, setShowZipModal] = useState(false);
  const [zipInput, setZipInput] = useState('');
  const [zipError, setZipError] = useState('');
  const [showAdminModal, setShowAdminModal] = useState(false);
  const [adminUsername, setAdminUsername] = useState('');
  const [adminPassword, setAdminPassword] = useState('');
  const [adminError, setAdminError] = useState('');
  const [navigateToDashboard, setNavigateToDashboard] = useState(false);

  // Check session status on mount and periodically
  useEffect(() => {
    checkSession();
    // Check session every 30 seconds to keep it fresh
    const interval = setInterval(checkSession, 30000);
    return () => clearInterval(interval);
  }, []);

  const checkSession = async () => {
    console.log('🔍 Checking session...');
    try {
      const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:3002';
      const response = await fetch(`${API_URL}/api/auth/session`, {
        method: 'GET',
        credentials: 'include', // Important: include cookies for sessions
        headers: {
          'Content-Type': 'application/json'
        }
      });
      
      console.log('📡 Session response status:', response.status);
      
      if (response.ok) {
        const data = await response.json();
        console.log('✅ Session data received:', data);
        
        if (data.success && data.user) {
          console.log('🎉 Setting user state:', data.user.name);
          setUserName(data.user.name || 'User');
          setUserEmail(data.user.email || '');
          setIsLoggedIn(true);
          
          // Clear any old localStorage tokens
          localStorage.removeItem('laundry_token');
        } else {
          console.log('❌ No valid session data');
          // No active session
          setUserName('');
          setUserEmail('');
          setIsLoggedIn(false);
        }
      } else {
        console.log('❌ Session check failed with status:', response.status);
        // No active session
        setUserName('');
        setUserEmail('');
        setIsLoggedIn(false);
      }
    } catch (error) {
      console.error('💥 Session check error:', error);
      setUserName('');
      setUserEmail('');
      setIsLoggedIn(false);
    }
  };

  const handleLogout = async () => {
    try {
      const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:3002';
      await fetch(`${API_URL}/api/auth/logout`, {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json'
        }
      });
      
      // Clear local state
      setUserName('');
      setUserEmail('');
      setIsLoggedIn(false);
      
      // Clear any old localStorage
      localStorage.removeItem('laundry_token');
      
      // Redirect to home
      window.location.href = '/home';
    } catch (error) {
      console.error('Logout failed:', error);
      // Force clear anyway
      setUserName('');
      setUserEmail('');
      setIsLoggedIn(false);
      localStorage.removeItem('laundry_token');
      window.location.href = '/home';
    }
  };

  // ...existing useEffect for scroll, zip modal, admin JWT, etc...
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
    const storedZip = localStorage.getItem('houston_zip');
    if (!storedZip) setShowZipModal(true);
  }, []);

  // Remove the old localStorage user check effect - we're using sessions now

  // ...existing functions for zip modal, admin modal, etc...
  const handleZipSubmit = (e) => {
    e.preventDefault();
    const HOUSTON_ZIPCODES = [
      '77002','77003','77004','77005','77006','77007','77008','77009','77010','77011','77012','77013','77014','77015','77016','77017','77018','77019','77020','77021','77022','77023','77024','77025','77026','77027','77028','77029','77030','77031','77032','77033','77034','77035','77036','77037','77038','77039','77040','77041','77042','77043','77044','77045','77046','77047','77048','77049','77050','77051','77053','77054','77055','77056','77057','77058','77059','77060','77061','77062','77063','77064','77065','77066','77067','77068','77069','77070','77071','77072','77073','77074','77075','77076','77077','77078','77079','77080','77081','77082','77083','77084','77085','77086','77087','77088','77089','77090','77091','77092','77093','77094','77095','77096','77098','77099','77204'
    ];
    
    if (HOUSTON_ZIPCODES.includes(zipInput.trim())) {
      localStorage.setItem('houston_zip', zipInput.trim());
      setShowZipModal(false);
      setZipError('');
    } else {
      setZipError('Sorry, we only serve the Houston metro area.');
    }
  };

  const handleDashboardClick = (e) => {
    e.preventDefault();
    setShowAdminModal(true);
    setAdminUsername('');
    setAdminPassword('');
    setAdminError('');
  };

  const handleAdminSubmit = async (e) => {
    e.preventDefault();
    if (!adminUsername || !adminPassword) {
      setAdminError('Please enter both username and password.');
      return;
    }
    try {
      const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:3002';
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
      sessionStorage.setItem('admin_jwt', data.token);
      setShowAdminModal(false);
      setIsAdmin(true);
      setNavigateToDashboard(true);
    } catch {
      setAdminError('Network error. Try again.');
    }
  };

  useEffect(() => {
    const jwt = sessionStorage.getItem('admin_jwt');
    setIsAdmin(!!jwt);
  }, []);

  useEffect(() => {
    if (navigateToDashboard) {
      setNavigateToDashboard(false);
      window.location.href = '/dashboard';
    }
  }, [navigateToDashboard]);

  function closeNavbar() {
    const navbarToggler = document.querySelector('.navbar-toggler');
    const navbarCollapse = document.getElementById('navbarNav');
    if (navbarToggler && navbarCollapse && navbarCollapse.classList.contains('show')) {
      navbarToggler.click();
    }
  }

  return (
    <Router>
      <div className="App">
        <header style={{ 
          minHeight: '56px', 
          padding: '0',
          background: 'linear-gradient(135deg, #1e3a8a 0%, #3b82f6 50%, #06b6d4 100%)',
          position: 'sticky',
          top: 0,
          zIndex: 1020,
          transition: 'all 0.3s ease'
        }}>
          <nav className="navbar navbar-expand-lg navbar-dark" style={{ 
            minHeight: '56px', 
            padding: '0',
            background: 'transparent'
          }}>
            <div className="container-fluid" style={{ 
              minHeight: '56px', 
              paddingTop: 0, 
              paddingBottom: 0, 
              paddingLeft: '20px',
              paddingRight: '20px',
              justifyContent: 'space-between'
            }}>
              <a className="navbar-brand d-flex align-items-center" href="/home" style={{ 
                paddingTop: 0, 
                paddingBottom: 0,
                marginRight: 'auto'
              }}>
                <img
                  src={fngologo1}
                  alt="Logo"
                  style={{
                    height: '90px',
                    width: 'auto',
                    objectFit: 'contain',
                    marginTop: '-18px',
                    marginBottom: '-18px',
                    filter: 'brightness(1.2) drop-shadow(0 2px 4px rgba(0,0,0,0.2))'
                  }}
                  className="d-inline-block align-top me-2"
                />
              </a>
              <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav"
                aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation"
                style={{ borderColor: 'rgba(255,255,255,0.3)' }}>
                <span className="navbar-toggler-icon"></span>
              </button>
              <div className="collapse navbar-collapse" id="navbarNav" style={{ justifyContent: 'flex-end' }}>
                <ul className="navbar-nav">
                  <li className="nav-item">
                    <Link className="nav-link text-white" to="/home" onClick={closeNavbar} style={{ fontWeight: '500' }}>Home</Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link text-white" to="/pickup" onClick={closeNavbar} style={{ fontWeight: '500' }}>Pick Up</Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link text-white" to="/pricing" onClick={closeNavbar} style={{ fontWeight: '500' }}>Pricing</Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link text-white" to="/weight" onClick={closeNavbar} style={{ fontWeight: '500' }}>Guide</Link>
                  </li>
                  <li>
                    <Link to="/faq" className="nav-link text-white" onClick={closeNavbar} style={{ fontWeight: '500' }}>FAQs</Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link text-white" to="/contact" onClick={closeNavbar} style={{ fontWeight: '500' }}>Contact Us</Link>
                  </li>
                  {/* Updated User Icon and Name/Sign In */}
                  <li className="nav-item d-flex align-items-center ms-2 position-relative">
                    <FaUserCircle size={22} style={{ marginRight: 6, color: isLoggedIn ? '#ffffffff' : '#3b82f6' }} />
                    {isLoggedIn && userName ? (
                      <div className="dropdown">
                        <span
                          className="dropdown-toggle text-white"
                          id="userDropdown"
                          data-bs-toggle="dropdown"
                          aria-expanded="false"
                          style={{ fontWeight: 500, cursor: 'pointer' }}
                        >
                          Hello, {userName}
                        </span>
                        <ul className="dropdown-menu dropdown-menu-end" aria-labelledby="userDropdown">
                          <li>
                            <div className="dropdown-item-text small">
                              <strong>{userName}</strong><br />
                              <span className="text-muted">{userEmail}</span>
                            </div>
                          </li>
                          <li><hr className="dropdown-divider" /></li>
                          <li>
                            <Link to="/profile" className="dropdown-item" onClick={closeNavbar}>
                              <i className="fas fa-user me-2"></i>
                              My Profile
                            </Link>
                          </li>
                          <li>
                            <button
                              className="dropdown-item"
                              onClick={handleLogout}
                            >
                              <i className="fas fa-sign-out-alt me-2"></i>
                              Log Out
                            </button>
                          </li>
                        </ul>
                      </div>
                    ) : (
                      <Link className="nav-link p-0 text-white" to="/signin" onClick={closeNavbar} style={{ fontWeight: '500' }}>
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
            <Route path="/pricing" element={<Pricing />} />
            <Route path="/weight" element={<Weight />} />
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
            <Route path="/support" element={<Support />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/about" element={<AboutUs />} /> {/* Add AboutUs route */}
            <Route path="/" element={<Home />} />
          </Routes>
        </main>
        
        <footer className="text-white mt-auto py-5" style={{
          background: 'linear-gradient(135deg, #1e3a8a 0%, #3b82f6 50%, #06b6d4 100%)'
        }}>
          <div className="container">
            <div className="row text-center text-md-start">
              {/* Logo and About */}
              <div className="col-md-3 mb-4 mb-md-0 d-flex flex-column align-items-center align-items-md-start">
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
             
              <div className="col-md-3 mb-4 mb-md-0">
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
              <div className="col-md-3">
                <h6 className="fw-bold mb-3">COMPANY</h6>
                <ul className="list-unstyled">
                  <li><Link to="/weight" className="text-white-50 text-decoration-none" onClick={closeNavbar}>Weight Guide</Link></li>
                  <li><Link to="/about" className="text-white-50 text-decoration-none" onClick={closeNavbar}>About Us</Link></li> {/* Updated About Us link */}
                  <li><Link to="/comingsoon" className="text-white-50 text-decoration-none" onClick={closeNavbar}>Careers</Link></li>
                  <li><Link to="/comingsoon" className="text-white-50 text-decoration-none" onClick={closeNavbar}>Press</Link></li>
                </ul>
              </div>
              
              {/* Legal & Help */}
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
                    <Link to="/support" className="text-white-50 text-decoration-none" onClick={closeNavbar}>
                      Support
                    </Link>
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
            </div>
            
            {/* Social Media - separate row */}
            <div className="row mt-4">
              <div className="col-12">
                <h6 className="text-uppercase fw-bold mb-3 text-center">Follow Us</h6>
                <div className="d-flex gap-3 justify-content-center">
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
