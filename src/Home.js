import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css';
import bg1 from './images/bg1.jpg'; 
import fng4 from './images/fng4.png';
import fng3 from './images/fng3.png';
import frontimg1 from './frontimg1.jpg';
import wash1 from './images/wash1.jpg';
import wash2 from './images/wash2.jpg';
import wash3 from './images/wash3.jpg'; 
import wash4 from './images/wash4.jpg';


function Home() {
    return (
        <div className="home-root" style={{ position: 'relative', zIndex: 1 }}>
            {/* Background overlay */}
            <div
                style={{
                    backgroundImage: `url(${bg1})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    opacity: 0.02,
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    width: '100vw',
                    height: '100vh',
                    zIndex: 0,
                    pointerEvents: 'none',
                }}
            />

            <div className="jumbotron text-center py-5" style={{
  background: 'linear-gradient(135deg, #1e3a8a 0%, #3b82f6 50%, #06b6d4 100%)', // Blue gradient from your logo
  color: 'white',
  minHeight: '60vh',
  display: 'flex',
  alignItems: 'center',
  position: 'relative'
}}>
  {/* Add subtle pattern overlay */}
  <div style={{
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: 'url("data:image/svg+xml,%3Csvg width="20" height="20" xmlns="http://www.w3.org/2000/svg"%3E%3Cdefs%3E%3Cpattern id="grid" width="20" height="20" patternUnits="userSpaceOnUse"%3E%3Cpath d="M 20 0 L 0 0 0 20" fill="none" stroke="rgba(255,255,255,0.03)" stroke-width="1"/%3E%3C/pattern%3E%3C/defs%3E%3Crect width="100%25" height="100%25" fill="url(%23grid)" /%3E%3C/svg%3E")',
    opacity: 0.1
  }}></div>
  
  <div className="container" style={{ position: 'relative', zIndex: 1 }}>
    <div className="row align-items-center">
      <div className="col-lg-6">
        {/* Your existing logo */}
        <img
          src={fng4}
          alt="Fold N Go Logo"
          style={{
            width: '120px',
            height: '120px',
            objectFit: 'contain',
            marginBottom: '20px',
            filter: 'drop-shadow(0 4px 8px rgba(0,0,0,0.2))'
          }}
        />
        {/* Enhanced your existing text */}
        <h1 className="display-4 fw-bold mb-4">
          Professional Laundry <br/>
          <span style={{ color: '#fbbf24' }}>Pick Up & Delivery</span> {/* Gold accent from your logo */}
        </h1>
        <p className="lead mb-4" style={{ fontSize: '1.3rem', opacity: 0.9 }}>
          Fresh, clean laundry delivered to your door in Houston, TX
        </p>
        
        {/* Enhanced CTA buttons */}
        <div className="d-flex flex-column flex-sm-row gap-3 justify-content-center justify-content-lg-start">
          <Link 
            to="/pickup" 
            className="btn btn-lg px-4 py-3"
            style={{
              background: '#fbbf24', // Gold from logo
              border: 'none',
              color: '#1e3a8a', // Dark blue
              fontWeight: '600',
              borderRadius: '12px',
              boxShadow: '0 4px 15px rgba(251, 191, 36, 0.3)',
              transition: 'all 0.3s ease'
            }}
            onMouseEnter={e => {
              e.target.style.transform = 'translateY(-2px)';
              e.target.style.boxShadow = '0 6px 20px rgba(251, 191, 36, 0.4)';
            }}
            onMouseLeave={e => {
              e.target.style.transform = 'translateY(0)';
              e.target.style.boxShadow = '0 4px 15px rgba(251, 191, 36, 0.3)';
            }}
          >
            <i className="fas fa-calendar-plus me-2"></i>
            Schedule Pickup
          </Link>
          
          <button 
            className="btn btn-outline-light btn-lg px-4 py-3"
            style={{
              borderWidth: '2px',
              borderRadius: '12px',
              fontWeight: '600',
              transition: 'all 0.3s ease'
            }}
            onMouseEnter={e => {
              e.target.style.background = 'rgba(255,255,255,0.1)';
              e.target.style.transform = 'translateY(-2px)';
            }}
            onMouseLeave={e => {
              e.target.style.background = 'transparent';
              e.target.style.transform = 'translateY(0)';
            }}
          >
            <i className="fas fa-play me-2"></i>
            How It Works
          </button>
        </div>
      </div>
      
      <div className="col-lg-6 mt-4 mt-lg-0">
        {/* Hero Image */}
        <div style={{ position: 'relative', marginBottom: '30px' }}>
          <img 
              src={wash4} // or your best laundry image
              alt="Professional Laundry Service"
              style={{
                  width: '100%',
                  height: '300px',
                  objectFit: 'cover',
                  borderRadius: '20px',
                  boxShadow: '0 10px 30px rgba(0,0,0,0.2)',
                  filter: 'brightness(1.1)'
              }}
          />
          {/* Overlay badge */}
          <div style={{
              position: 'absolute',
              bottom: '20px',
              left: '20px',
              background: 'rgba(251, 191, 36, 0.95)',
              color: '#1e3a8a',
              padding: '10px 20px',
              borderRadius: '25px',
              fontWeight: '600',
              fontSize: '0.9rem'
          }}>
              ⭐ 5-Star Service
          </div>
        </div>
        
        {/* Features box (keep your existing "Why Choose" section) */}
        <div style={{
            background: 'rgba(255,255,255,0.1)',
            borderRadius: '20px',
            padding: '40px',
            backdropFilter: 'blur(10px)',
            border: '1px solid rgba(255,255,255,0.2)'
        }}>
          <h3 className="mb-3">Why Choose Fold N Go?</h3>
          <div className="text-start">
            <div className="d-flex align-items-center mb-3">
              <div style={{
                width: '40px',
                height: '40px',
                background: '#fbbf24',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginRight: '15px'
              }}>
                <i className="fas fa-clock text-white"></i>
              </div>
              <span>Same-day pickup available</span>
            </div>
            <div className="d-flex align-items-center mb-3">
              <div style={{
                width: '40px',
                height: '40px',
                background: '#fbbf24',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginRight: '15px'
              }}>
                <i className="fas fa-leaf text-white"></i>
              </div>
              <span>Eco-friendly detergents</span>
            </div>
            <div className="d-flex align-items-center">
              <div style={{
                width: '40px',
                height: '40px',
                background: '#fbbf24',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginRight: '15px'
              }}>
                <i className="fas fa-shield-alt text-white"></i>
              </div>
              <span>100% satisfaction guaranteed</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
            <section className="services-section mt-5">
                <h2 className="text-center mb-4" style={{ fontSize: '2.4rem' }}>Our Services</h2>
                {/* 2x2 grid for services */}
                <div
                    style={{
                        display: 'flex',
                        flexWrap: 'wrap',
                        gap: '36px',
                        justifyContent: 'center',
                        alignItems: 'stretch',
                        maxWidth: 1100,
                        margin: '0 auto 32px auto',
                    }}
                    className="services-grid"
                >
                    <div
                        className="card h-100 border-0 shadow-sm"
                        style={{
                            width: '500px',
                            height: '400px', // Increased fixed height
                            flex: '0 0 500px',
                            transition: 'all 0.3s ease',
                            cursor: 'pointer'
                        }}
                        onMouseEnter={e => {
                            e.currentTarget.style.transform = 'translateY(-8px)';
                            e.currentTarget.style.boxShadow = '0 12px 35px rgba(0,0,0,0.15)';
                        }}
                        onMouseLeave={e => {
                            e.currentTarget.style.transform = 'translateY(0)';
                            e.currentTarget.style.boxShadow = '0 2px 10px rgba(0,0,0,0.1)';
                        }}
                    >
                        <div className="card-body text-center p-4 d-flex flex-column" style={{ height: '100%' }}>
                            <div className="mb-3" style={{
                                width: '80px',
                                height: '80px',
                                background: 'linear-gradient(135deg, #1e3a8a, #3b82f6)',
                                borderRadius: '50%',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                margin: '0 auto',
                                boxShadow: '0 4px 15px rgba(30, 58, 138, 0.3)',
                                flexShrink: 0
                            }}>
                                <i className="fas fa-soap text-white" style={{ fontSize: '2rem' }}></i>
                            </div>
                            <div className="flex-grow-1 d-flex flex-column justify-content-center">
                                <h5 className="card-title mb-3" style={{ fontSize: '1.4rem', color: '#1e3a8a' }}>Professional Cleaning</h5>
                                <p className="card-text" style={{ fontSize: '1.1rem', color: '#64748b', lineHeight: '1.5' }}>
                                    We use top-quality detergents and advanced machines to ensure your clothes are thoroughly cleaned and cared for.
                                </p>
                            </div>
                        </div>
                    </div>
                    
                    <div
                        className="card h-100 border-0 shadow-sm"
                        style={{
                            width: '500px',
                            height: '400px', // Increased fixed height
                            flex: '0 0 500px',
                            transition: 'all 0.3s ease',
                            cursor: 'pointer'
                        }}
                        onMouseEnter={e => {
                            e.currentTarget.style.transform = 'translateY(-8px)';
                            e.currentTarget.style.boxShadow = '0 12px 35px rgba(0,0,0,0.15)';
                        }}
                        onMouseLeave={e => {
                            e.currentTarget.style.transform = 'translateY(0)';
                            e.currentTarget.style.boxShadow = '0 2px 10px rgba(0,0,0,0.1)';
                        }}
                    >
                        <div className="card-body text-center p-4 d-flex flex-column" style={{ height: '100%' }}>
                            <div className="mb-3" style={{
                                width: '80px',
                                height: '80px',
                                background: 'linear-gradient(135deg, #fbbf24, #f59e0b)',
                                borderRadius: '50%',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                margin: '0 auto',
                                boxShadow: '0 4px 15px rgba(251, 191, 36, 0.3)',
                                flexShrink: 0
                            }}>
                                <i className="fas fa-layer-group text-white" style={{ fontSize: '2rem' }}></i>
                            </div>
                            <div className="flex-grow-1 d-flex flex-column justify-content-center">
                                <h5 className="card-title mb-3" style={{ fontSize: '1.4rem', color: '#1e3a8a' }}>Perfect Folding</h5>
                                <p className="card-text" style={{ fontSize: '1.1rem', color: '#64748b', lineHeight: '1.5' }}>
                                    Every item is neatly folded by our team, so your laundry is organized and easy to put away.
                                </p>
                            </div>
                        </div>
                    </div>
                    
                    <div
                        className="card h-100 border-0 shadow-sm"
                        style={{
                            width: '500px',
                            height: '400px', // Increased fixed height
                            flex: '0 0 500px',
                            transition: 'all 0.3s ease',
                            cursor: 'pointer'
                        }}
                        onMouseEnter={e => {
                            e.currentTarget.style.transform = 'translateY(-8px)';
                            e.currentTarget.style.boxShadow = '0 12px 35px rgba(0,0,0,0.15)';
                        }}
                        onMouseLeave={e => {
                            e.currentTarget.style.transform = 'translateY(0)';
                            e.currentTarget.style.boxShadow = '0 2px 10px rgba(0,0,0,0.1)';
                        }}
                    >
                        <div className="card-body text-center p-4 d-flex flex-column" style={{ height: '100%' }}>
                            <div className="mb-3" style={{
                                width: '80px',
                                height: '80px',
                                background: 'linear-gradient(135deg, #06b6d4, #0891b2)',
                                borderRadius: '50%',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                margin: '0 auto',
                                boxShadow: '0 4px 15px rgba(6, 182, 212, 0.3)',
                                flexShrink: 0
                            }}>
                                <i className="fas fa-wind text-white" style={{ fontSize: '2rem' }}></i>
                            </div>
                            <div className="flex-grow-1 d-flex flex-column justify-content-center">
                                <h5 className="card-title mb-3" style={{ fontSize: '1.4rem', color: '#1e3a8a' }}>Expert Drying</h5>
                                <p className="card-text" style={{ fontSize: '1.1rem', color: '#64748b', lineHeight: '1.5' }}>
                                    Our gentle drying process protects your fabrics and keeps your clothes soft, fresh, and ready to wear.
                                </p>
                            </div>
                        </div>
                    </div>
                
                    <div
                        className="card h-100 border-0 shadow-sm"
                        style={{
                            width: '500px',
                            height: '400px', // Increased fixed height
                            flex: '0 0 500px',
                            transition: 'all 0.3s ease',
                            cursor: 'pointer'
                        }}
                        onMouseEnter={e => {
                            e.currentTarget.style.transform = 'translateY(-8px)';
                            e.currentTarget.style.boxShadow = '0 12px 35px rgba(0,0,0,0.15)';
                        }}
                        onMouseLeave={e => {
                            e.currentTarget.style.transform = 'translateY(0)';
                            e.currentTarget.style.boxShadow = '0 2px 10px rgba(0,0,0,0.1)';
                        }}
                    >
                        <div className="card-body text-center p-4 d-flex flex-column" style={{ height: '100%' }}>
                            <div className="mb-3" style={{
                                width: '80px',
                                height: '80px',
                                background: 'linear-gradient(135deg, #10b981, #059669)',
                                borderRadius: '50%',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                margin: '0 auto',
                                boxShadow: '0 4px 15px rgba(16, 185, 129, 0.3)',
                                flexShrink: 0
                            }}>
                                <i className="fas fa-leaf text-white" style={{ fontSize: '2rem' }}></i>
                            </div>
                            <div className="flex-grow-1 d-flex flex-column justify-content-center">
                                <h5 className="card-title mb-3" style={{ fontSize: '1.4rem', color: '#1e3a8a' }}>Eco-Friendly Options</h5>
                                <p className="card-text" style={{ fontSize: '1.1rem', color: '#64748b', lineHeight: '1.5' }}>
                                    Choose our green cleaning for an environmentally friendly wash that's gentle on your clothes and the planet.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Simple Pricing Section - moved above Same Day Delivery */}
                <div className="pricing-section mt-5 mb-5">
                    <h3 className="text-center mb-5" style={{ fontSize: '2.4rem', color: '#1e3a8a' }}>Choose Your Plan</h3>
                    <div className="row justify-content-center">
                        {/* Basic Tier */}
                        <div className="col-lg-4 col-md-6 mb-4">
                            <div className="card h-100 border-0 shadow-sm" style={{ 
                                transition: 'all 0.3s ease',
                                cursor: 'pointer'
                            }}
                            onMouseEnter={e => {
                                e.currentTarget.style.transform = 'translateY(-5px)';
                                e.currentTarget.style.boxShadow = '0 10px 30px rgba(0,0,0,0.15)';
                            }}
                            onMouseLeave={e => {
                                e.currentTarget.style.transform = 'translateY(0)';
                                e.currentTarget.style.boxShadow = '0 2px 10px rgba(0,0,0,0.1)';
                            }}>
                                <div className="card-body text-center p-4">
                                    <h4 className="mb-3" style={{ color: '#1e3a8a' }}>Basic</h4>
                                    <div className="mb-3">
                                        <span className="h1 fw-bold" style={{ color: '#1e3a8a' }}>$20</span>
                                        <span className="h6">/load</span>
                                    </div>
                                    <p className="mb-4" style={{ color: '#64748b' }}>Perfect for individuals & small households</p>
                                    <ul className="list-unstyled mb-4" style={{ fontSize: '0.95rem', color: '#64748b' }}>
                                        <li className="mb-2">✓ Wash & Fold</li>
                                        <li className="mb-2">✓ Standard Detergents</li>
                                        <li className="mb-2">✓ 48-Hour Turnaround</li>
                                        <li className="mb-2">✓ Pickup & Delivery</li>
                                    </ul>
                                    <Link to="/pickup" className="btn w-100" style={{
                                        background: '#1e3a8a',
                                        border: 'none',
                                        color: 'white',
                                        fontWeight: '600',
                                        padding: '12px',
                                        borderRadius: '8px'
                                    }}>
                                        Get Started
                                    </Link>
                                </div>
                            </div>
                        </div>

                        {/* Premium Tier */}
                        <div className="col-lg-4 col-md-6 mb-4">
                            <div className="card h-100 border-0 shadow-lg position-relative" style={{ 
                                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                                color: 'white',
                                transition: 'all 0.3s ease',
                                cursor: 'pointer'
                            }}
                            onMouseEnter={e => {
                                e.currentTarget.style.transform = 'translateY(-8px)';
                                e.currentTarget.style.boxShadow = '0 15px 40px rgba(0,0,0,0.2)';
                            }}
                            onMouseLeave={e => {
                                e.currentTarget.style.transform = 'translateY(0)';
                                e.currentTarget.style.boxShadow = '0 10px 30px rgba(0,0,0,0.15)';
                            }}>
                                <div className="position-absolute top-0 start-50 translate-middle">
                                    <span className="badge px-3 py-2" style={{ 
                                        background: '#fbbf24', 
                                        color: '#1e3a8a',
                                        fontWeight: '600',
                                        fontSize: '0.8rem'
                                    }}>
                                        MOST POPULAR
                                    </span>
                                </div>
                                <div className="card-body text-center p-4 pt-5">
                                    <h4 className="mb-3">Premium</h4>
                                    <div className="mb-3">
                                        <span className="h1 fw-bold">$35</span>
                                        <span className="h6">/load</span>
                                    </div>
                                    <p className="mb-4" style={{ opacity: 0.9 }}>Ideal for busy professionals & families</p>
                                    <ul className="list-unstyled mb-4" style={{ fontSize: '0.95rem', opacity: 0.9 }}>
                                        <li className="mb-2">✓ Everything in Basic</li>
                                        <li className="mb-2">✓ Premium Detergents</li>
                                        <li className="mb-2">✓ Same-Day Service</li>
                                        <li className="mb-2">✓ Fabric Softener Included</li>
                                        <li className="mb-2">✓ Stain Treatment</li>
                                    </ul>
                                    <Link to="/pickup" className="btn btn-light btn-lg w-100" style={{
                                        color: '#667eea',
                                        fontWeight: '600',
                                        borderRadius: '8px'
                                    }}>
                                        Get Started
                                    </Link>
                                </div>
                            </div>
                        </div>

                        {/* Business Tier */}
                        <div className="col-lg-4 col-md-6 mb-4">
                            <div className="card h-100 border-0 shadow-sm" style={{ 
                                transition: 'all 0.3s ease',
                                cursor: 'pointer'
                            }}
                            onMouseEnter={e => {
                                e.currentTarget.style.transform = 'translateY(-5px)';
                                e.currentTarget.style.boxShadow = '0 10px 30px rgba(0,0,0,0.15)';
                            }}
                            onMouseLeave={e => {
                                e.currentTarget.style.transform = 'translateY(0)';
                                e.currentTarget.style.boxShadow = '0 2px 10px rgba(0,0,0,0.1)';
                            }}>
                                <div className="card-body text-center p-4">
                                    <h4 className="mb-3" style={{ color: '#1e3a8a' }}>Business</h4>
                                    <div className="mb-3">
                                        <span className="h1 fw-bold" style={{ color: '#1e3a8a' }}>$50</span>
                                        <span className="h6">/load</span>
                                    </div>
                                    <p className="mb-4" style={{ color: '#64748b' }}>For businesses & large volume needs</p>
                                    <ul className="list-unstyled mb-4" style={{ fontSize: '0.95rem', color: '#64748b' }}>
                                        <li className="mb-2">✓ Everything in Premium</li>
                                        <li className="mb-2">✓ Bulk Pricing Available</li>
                                        <li className="mb-2">✓ Priority Service</li>
                                        <li className="mb-2">✓ Account Management</li>
                                        <li className="mb-2">✓ Custom Scheduling</li>
                                    </ul>
                                    <Link to="/pickup" className="btn w-100" style={{
                                        background: '#10b981',
                                        border: 'none',
                                        color: 'white',
                                        fontWeight: '600',
                                        padding: '12px',
                                        borderRadius: '8px'
                                    }}>
                                        Contact Us
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

             <img src={fng3}  style={{
                            width: 180,
                            height: 180,
                            objectFit: 'contain',
                            marginBottom: 20,
                            background: 'rgba(255,255,255,0.85)',
                            borderRadius: 16,
                            boxShadow: '0 2px 12px rgba(0,0,0,0.12)'
                        }} alt="Fold N Go Logo" className="logo-image" />

            <section className="reviews-section mt-5" style={{ width: '90%', margin: '0 auto' }}>
                <h4 className="text-center mb-4" style={{ fontSize: '2rem' }}>Customer Reviews</h4>
                <div className="row justify-content-center">
                    <div className="col-md-4 mb-4">
                        <div className="card h-100 shadow-sm" style={{ minHeight: 220 }}>
                            <div className="card-body text-center">
                                <h5 className="card-title mb-2" style={{ fontSize: '1.2rem' }}>Sarah J.</h5>
                                <div className="mb-2" style={{ color: '#FFD700', fontSize: '1.3rem' }}>
                                    <i className="fas fa-star"></i>
                                    <i className="fas fa-star"></i>
                                    <i className="fas fa-star"></i>
                                    <i className="fas fa-star"></i>
                                    <i className="fas fa-star-half-alt"></i>
                                </div>
                                <p className="card-text" style={{ fontSize: '1.05rem' }}>
                                    "Fold N Go made laundry day so easy! Fast pickup, friendly staff, and my clothes came back perfectly folded and fresh."
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-4 mb-4">
                        <div className="card h-100 shadow-sm" style={{ minHeight: 220 }}>
                            <div className="card-body text-center">
                                <h5 className="card-title mb-2" style={{ fontSize: '1.2rem' }}>Michael T.</h5>
                                <div className="mb-2" style={{ color: '#FFD700', fontSize: '1.3rem' }}>
                                    <i className="fas fa-star"></i>
                                    <i className="fas fa-star"></i>
                                    <i className="fas fa-star"></i>
                                    <i className="fas fa-star"></i>
                                    <i className="far fa-star"></i>
                                </div>
                                <p className="card-text" style={{ fontSize: '1.05rem' }}>
                                    "Great service and super convenient. I love the same-day option when I’m in a rush. Highly recommend!"
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-4 mb-4">
                        <div className="card h-100 shadow-sm" style={{ minHeight: 220 }}>
                            <div className="card-body text-center">
                                <h5 className="card-title mb-2" style={{ fontSize: '1.2rem' }}>Linda W.</h5>
                                <div className="mb-2" style={{ color: '#FFD700', fontSize: '1.3rem' }}>
                                    <i className="fas fa-star"></i>
                                    <i className="fas fa-star"></i>
                                    <i className="fas fa-star"></i>
                                    <i className="fas fa-star"></i>
                                    <i className="fas fa-star"></i>
                                </div>
                                <p className="card-text" style={{ fontSize: '1.05rem' }}>
                                    "The best laundry service in Houston! My clothes always come back clean, soft, and smelling amazing."
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Remove the pricing card from its old location at the bottom */}

        </div>
    );
}

export default Home;