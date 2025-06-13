import fngologo1 from './fngologo1.png';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import SignIn from './SignIn';
import SignUp from './SignUp'; 
import PickUp from './PickUp'; 
import Home from './Home';
import Contact from './Contact'; 
import Payment from './Payment';
import Confirmation from './Confirmation';  
import React, { useEffect } from 'react';

function App() {
  // For testing, you can use a state to simulate authentication
  // const [isAuthenticated, setIsAuthenticated] = useState(false);

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

  return (
    <Router>
      <div className="App">
        <header style={{ minHeight: '56px', padding: '0' }}>
          <nav className="navbar navbar-expand-lg navbar-light bg-light" style={{ minHeight: '56px', padding: '0' }}>
            <div className="container-fluid" style={{ minHeight: '56px', paddingTop: 0, paddingBottom: 0 }}>
              <a className="navbar-brand d-flex align-items-center" href="/home" style={{ paddingTop: 0, paddingBottom: 0 }}>
                <img
                  src={fngologo1}
                  alt="Logo"
                  style={{
                    height: '90px', // Bigger logo
                    width: 'auto',
                    objectFit: 'contain',
                    marginTop: '-18px', // Pull up to reduce header height
                    marginBottom: '-18px'
                  }}
                  className="d-inline-block align-top me-2"
                />
              </a>
              {/* Hamburger for mobile */}
              <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav"
                aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
              </button>
              {/* Links on the right */}
              <div className="collapse navbar-collapse justify-content-end" id="navbarNav">
                <ul className="navbar-nav">
                  <li className="nav-item">
                    <Link className="nav-link" to="/home">Home</Link>
                  </li>
                 
                  <li className="nav-item">
                    <Link className="nav-link" to="/pickup">Pick Up</Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" to="/signin">Sign in</Link>
                  </li>
                  {/* TEMP: Sign Up link for testing */}
                  <li className="nav-item">
                    <Link className="nav-link" to="/signup">Sign Up</Link>
                  </li>
                   <li className="nav-item">
                    <Link className="nav-link" to="/payments">Payments</Link>
                  </li>
                   <li className="nav-item">
                    <Link className="nav-link" to="/confirmation">Confirmation</Link>
                  </li>
                   <li className="nav-item">
                    <Link className="nav-link" to="/contact">Contact Us</Link>
                  </li>
                </ul>
              </div>
            </div>
          </nav>
        </header>
        <main>
          <Routes>
            {/* Example Home route, you can replace with your actual Home component */}
            <Route path="/home" element={<Home />} />
            <Route path="/contact" element={<Contact />} /> {/* This connects the Contact page */}
            <Route path="/pickup" element={<PickUp />} />
            <Route path="/signin" element={<SignIn />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/payments" element={<Payment />} />
            <Route path="/confirmation" element={<Confirmation />} />
            {/* Default route */}
            <Route path="/" element={<div>Welcome to LaundryApp!</div>} />
          </Routes>
        </main>
        <footer className="bg-dark text-white mt-auto py-5">
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
                    <button type="button" className="text-white-50 text-decoration-none btn btn-link p-0" style={{ textAlign: 'left' }}>
                      Wash &amp; Fold
                    </button>
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
                    <button type="button" className="text-white-50 text-decoration-none btn btn-link p-0" style={{ textAlign: 'left' }}>
                      Careers
                    </button>
                  </li>
                  <li>
                    <button type="button" className="text-white-50 text-decoration-none btn btn-link p-0" style={{ textAlign: 'left' }}>
                      Blog
                    </button>
                  </li>
                  <li>
                    <button type="button" className="text-white-50 text-decoration-none btn btn-link p-0" style={{ textAlign: 'left' }}>
                      Contact
                    </button>
                  </li>
                </ul>
              </div>
              {/* Legal & Help */}
              <div className="col-md-3 mb-4 mb-md-0">
                <h6 className="text-uppercase fw-bold mb-3">Legal &amp; Help</h6>
                <ul className="list-unstyled">
                  <li>
                    <a href="/privacy-policy" className="text-white-50 text-decoration-none">Privacy Policy</a>
                  </li>
                  <li>
                    <a href="/terms-of-service" className="text-white-50 text-decoration-none">Terms of Service</a>
                  </li>
                  <li>
                    <a href="/faq" className="text-white-50 text-decoration-none">FAQs</a>
                  </li>
                  <li>
                    <a href="/support" className="text-white-50 text-decoration-none">Support</a>
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
              &copy; {new Date().getFullYear()} LaundryApp. All rights reserved. &nbsp;|&nbsp;
              <a href="/privacy-policy" className="text-white-50 text-decoration-none">Privacy Policy</a> &nbsp;|&nbsp;
              <a href="/terms-of-service" className="text-white-50 text-decoration-none">Terms of Service</a>
            </div>
          </div>
        </footer>
      </div>
    </Router>
  );
}

export default App;
