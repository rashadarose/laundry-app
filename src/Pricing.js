import React from 'react';
import { Link } from 'react-router-dom';
import fng4 from './images/fng4.png'; // Adjust the path as needed to where your logo image is located

function Pricing() {
    return (
        <div className="pricing-page">
            {/* Hero Section */}
            <div className="jumbotron text-center py-5" style={{
                background: 'linear-gradient(135deg, #1e3a8a 0%, #3b82f6 50%, #06b6d4 100%)',
                color: 'white',
                minHeight: '40vh',
                display: 'flex',
                alignItems: 'center',
                position: 'relative'
            }}>
                <div className="container" style={{ position: 'relative', zIndex: 1 }}>
                 <img
                        src={fng4}
                        alt="Fold N Go Logo"
                        style={{
                            width: 80,
                            height: 80,
                            objectFit: 'contain',
                            marginBottom: 20
                        }}
                    />
                    <h1 className="display-4 fw-bold mb-4">Simple, Transparent Pricing</h1>
                    <p className="lead mb-4" style={{ fontSize: '1.3rem', opacity: 0.9 }}>
                        Choose the plan that works best for your laundry needs
                    </p>
                </div>
            </div>

            {/* Main Pricing Section */}
            <div className="container mt-5 mb-5">
                <div className="pricing-section">
                    <h2 className="text-center mb-5" style={{ fontSize: '2.4rem', color: '#1e3a8a' }}>Choose Your Plan</h2>
                    <div className="row justify-content-center">
                        {/* Self-Wash Tier */}
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
                                    <h4 className="mb-3" style={{ color: '#1e3a8a' }}>Self-Wash</h4>
                                    <div className="mb-3">
                                        <span className="h1 fw-bold" style={{ color: '#1e3a8a' }}>$18</span>
                                        <span className="h6">/10 lb bag</span>
                                    </div>
                                    <p className="mb-4" style={{ color: '#64748b' }}>We wash, dry, and fold your laundry ourselves</p>
                                    <ul className="list-unstyled mb-4" style={{ fontSize: '0.95rem', color: '#64748b' }}>
                                        <li className="mb-2">✓ Wash & Fold</li>
                                        <li className="mb-2">✓ Standard Detergents</li>
                                        <li className="mb-2">✓ 48-Hour Turnaround</li>
                                        <li className="mb-2">✓ Pickup & Delivery</li>
                                        <li className="mb-2">✓ Professional Folding</li>
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

                        {/* Next-Day Tier */}
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
                                    <h4 className="mb-3">Next-Day</h4>
                                    <div className="mb-3">
                                        <span className="h1 fw-bold">$25</span>
                                        <span className="h6">/10 lb bag</span>
                                    </div>
                                    <p className="mb-4" style={{ opacity: 0.9 }}>Next-day turnaround service</p>
                                    <ul className="list-unstyled mb-4" style={{ fontSize: '0.95rem', opacity: 0.9 }}>
                                        <li className="mb-2">✓ Everything in Self-Wash</li>
                                        <li className="mb-2">✓ Premium Detergents</li>
                                        <li className="mb-2">✓ Next-Day Service</li>
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

                        {/* Same-Day Tier */}
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
                                    <h4 className="mb-3" style={{ color: '#1e3a8a' }}>Same-Day</h4>
                                    <div className="mb-3">
                                        <span className="h1 fw-bold" style={{ color: '#1e3a8a' }}>$30</span>
                                        <span className="h6">/10 lb bag</span>
                                    </div>
                                    <p className="mb-4" style={{ color: '#64748b' }}>For when you need it fast</p>
                                    <ul className="list-unstyled mb-4" style={{ fontSize: '0.95rem', color: '#64748b' }}>
                                        <li className="mb-2">✓ Everything in Next-Day</li>
                                        <li className="mb-2">✓ Same-Day Service</li>
                                        <li className="mb-2">✓ Priority Processing</li>
                                        <li className="mb-2">✓ Express Delivery</li>
                                        <li className="mb-2">✓ Rush Order Support</li>
                                    </ul>
                                    <Link to="/pickup" className="btn w-100" style={{
                                        background: '#10b981',
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
                    </div>

                    {/* Recurring Service Section */}
                    <div className="row justify-content-center mt-5">
                        <div className="col-lg-8">
                            <div className="card border-0 shadow-lg" style={{
                                background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
                                color: 'white'
                            }}>
                                <div className="card-body text-center p-5">
                                    <h3 className="mb-4">Recurring Service</h3>
                                    <div className="mb-4">
                                        <span className="h1 fw-bold">$34</span>
                                        <span className="h5">/10 lb bag</span>
                                    </div>
                                    <p className="mb-4" style={{ opacity: 0.9, fontSize: '1.1rem' }}>
                                        Discounted weekly recurring service - perfect for busy families and professionals
                                    </p>
                                    <div className="row text-start mt-4" style={{ fontSize: '1rem', opacity: 0.9 }}>
                                        <div className="col-md-6">
                                            <p className="mb-3">✓ Weekly Pickup & Delivery</p>
                                            <p className="mb-3">✓ Consistent Schedule</p>
                                            <p className="mb-3">✓ Priority Support</p>
                                        </div>
                                        <div className="col-md-6">
                                            <p className="mb-3">✓ Volume Discount</p>
                                            <p className="mb-3">✓ Dedicated Account Manager</p>
                                            <p className="mb-3">✓ Flexible Schedule Changes</p>
                                        </div>
                                    </div>
                                    <Link to="/pickup" className="btn btn-light btn-lg px-5 py-3 mt-3" style={{
                                        color: '#10b981',
                                        fontWeight: '600',
                                        borderRadius: '8px'
                                    }}>
                                        Start Recurring Service
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* FAQ Section */}
                <div className="row justify-content-center mt-5">
                    <div className="col-lg-8">
                        <h3 className="text-center mb-4" style={{ color: '#1e3a8a' }}>Pricing FAQs</h3>
                        <div className="accordion" id="pricingAccordion">
                            <div className="accordion-item border-0 shadow-sm mb-3">
                                <h2 className="accordion-header">
                                    <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne">
                                        How do you calculate the weight?
                                    </button>
                                </h2>
                                <div id="collapseOne" className="accordion-collapse collapse" data-bs-parent="#pricingAccordion">
                                    <div className="accordion-body">
                                        We weigh your laundry when we pick it up and round to the nearest 10lb bag. A typical load of laundry is about 10-15 lbs.
                                    </div>
                                </div>
                            </div>
                            <div className="accordion-item border-0 shadow-sm mb-3">
                                <h2 className="accordion-header">
                                    <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseTwo">
                                        What's included in the service?
                                    </button>
                                </h2>
                                <div id="collapseTwo" className="accordion-collapse collapse" data-bs-parent="#pricingAccordion">
                                    <div className="accordion-body">
                                        All services include pickup, washing, drying, folding, and delivery. Higher tiers include premium detergents and faster turnaround.
                                    </div>
                                </div>
                            </div>
                            <div className="accordion-item border-0 shadow-sm mb-3">
                                <h2 className="accordion-header">
                                    <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseThree">
                                        Are there any additional fees?
                                    </button>
                                </h2>
                                <div id="collapseThree" className="accordion-collapse collapse" data-bs-parent="#pricingAccordion">
                                    <div className="accordion-body">
                                        No hidden fees! The price you see is what you pay. Special requests like stain treatment may have additional costs, which we'll discuss beforehand.
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Pricing;