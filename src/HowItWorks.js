import React from 'react';
import './Home.css'; // Reuse some styles from Home
import fng4 from './images/fng4.png';
import wash1 from './images/wash1.jpg';
import wash2 from './images/wash2.jpg';
import wash3 from './images/wash3.jpg';

function HowItWorks() {
    return (
        <div className="how-it-works-root">
            {/* Blue Hero Banner */}
            <div className="jumbotron text-center py-5" style={{
                background: 'linear-gradient(135deg, #1e3a8a 0%, #3b82f6 50%, #06b6d4 100%)',
                color: 'white',
                minHeight: '40vh',
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
                    <div className="row">
                        <div className="col-12">
                            <img
                                src={fng4}
                                alt="Fold N Go Logo"
                                style={{
                                    width: '100px',
                                    height: '100px',
                                    objectFit: 'contain',
                                    marginBottom: '20px',
                                    filter: 'drop-shadow(0 4px 8px rgba(0,0,0,0.2))'
                                }}
                            />
                            <h1 style={{
                                fontSize: '3rem',
                                fontWeight: '700',
                                marginBottom: '1rem'
                            }}>
                                How It Works
                            </h1>
                            <p className="lead" style={{ fontSize: '1.2rem', opacity: 0.9 }}>
                                See how easy it is to get professional laundry service delivered to your door
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Content Section */}
            <div style={{ 
                background: 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)',
                minHeight: '100vh'
            }}>
                {/* Video Section */}
                <div className="container py-5">
                    <div className="row justify-content-center mb-5">
                        <div className="col-lg-10 col-xl-8">
                        <div style={{
                            background: 'white',
                            borderRadius: '20px',
                            padding: '2rem',
                            boxShadow: '0 20px 40px rgba(0,0,0,0.1)',
                            border: '1px solid #e2e8f0'
                        }}>
                            {/* Video Player */}
                            <div style={{
                                position: 'relative',
                                paddingBottom: '56.25%', // 16:9 aspect ratio
                                height: 0,
                                overflow: 'hidden',
                                borderRadius: '15px',
                                background: 'linear-gradient(135deg, #1e3a8a 0%, #3b82f6 50%, #06b6d4 100%)'
                            }}>
                                <video 
                                    controls 
                                    style={{
                                        position: 'absolute',
                                        top: 0,
                                        left: 0,
                                        width: '100%',
                                        height: '100%',
                                        objectFit: 'contain',
                                        borderRadius: '15px'
                                    }}
                                >
                                    <source src="/FoldnGo.mp4" type="video/mp4" />
                                    Your browser does not support the video tag.
                                </video>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Step-by-Step Process */}
                <div className="row mb-5">
                    <div className="col-12 text-center mb-4">
                        <h2 style={{
                            fontSize: '2.5rem',
                            fontWeight: '600',
                            color: '#1e3a8a',
                            marginBottom: '1rem'
                        }}>
                            Simple 4-Step Process
                        </h2>
                        <p className="text-muted">From pickup to delivery, we make laundry effortless</p>
                    </div>
                </div>

                <div className="row g-4">
                    {/* Step 1 */}
                    <div className="col-lg-3 col-md-6">
                        <div style={{
                            background: 'white',
                            borderRadius: '15px',
                            padding: '2rem',
                            textAlign: 'center',
                            height: '100%',
                            boxShadow: '0 10px 30px rgba(0,0,0,0.08)',
                            border: '1px solid #e2e8f0',
                            transition: 'transform 0.3s ease, box-shadow 0.3s ease'
                        }}>
                            <div style={{
                                width: '80px',
                                height: '80px',
                                borderRadius: '50%',
                                background: 'linear-gradient(135deg, #1e3a8a 0%, #3b82f6 100%)',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                margin: '0 auto 1.5rem',
                                color: 'white',
                                fontSize: '2rem'
                            }}>
                                <i className="fas fa-calendar-plus"></i>
                            </div>
                            <h4 style={{ color: '#1e3a8a', marginBottom: '1rem' }}>1. Schedule Pickup</h4>
                            <p className="text-muted">
                                Book a convenient pickup time through our app or website. Choose your preferred date and time slot.
                            </p>
                        </div>
                    </div>

                    {/* Step 2 */}
                    <div className="col-lg-3 col-md-6">
                        <div style={{
                            background: 'white',
                            borderRadius: '15px',
                            padding: '2rem',
                            textAlign: 'center',
                            height: '100%',
                            boxShadow: '0 10px 30px rgba(0,0,0,0.08)',
                            border: '1px solid #e2e8f0'
                        }}>
                            <div style={{
                                width: '80px',
                                height: '80px',
                                borderRadius: '50%',
                                background: 'linear-gradient(135deg, #3b82f6 0%, #06b6d4 100%)',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                margin: '0 auto 1.5rem',
                                color: 'white',
                                fontSize: '2rem'
                            }}>
                                <i className="fas fa-truck"></i>
                            </div>
                            <h4 style={{ color: '#1e3a8a', marginBottom: '1rem' }}>2. We Pickup</h4>
                            <p className="text-muted">
                                Our professional team arrives at your location to collect your laundry. No need to be home - we're flexible!
                            </p>
                        </div>
                    </div>

                    {/* Step 3 */}
                    <div className="col-lg-3 col-md-6">
                        <div style={{
                            background: 'white',
                            borderRadius: '15px',
                            padding: '2rem',
                            textAlign: 'center',
                            height: '100%',
                            boxShadow: '0 10px 30px rgba(0,0,0,0.08)',
                            border: '1px solid #e2e8f0'
                        }}>
                            <div style={{
                                width: '80px',
                                height: '80px',
                                borderRadius: '50%',
                                background: 'linear-gradient(135deg, #06b6d4 0%, #0891b2 100%)',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                margin: '0 auto 1.5rem',
                                color: 'white',
                                fontSize: '2rem'
                            }}>
                                <i className="fas fa-tint"></i>
                            </div>
                            <h4 style={{ color: '#1e3a8a', marginBottom: '1rem' }}>3. Professional Cleaning</h4>
                            <p className="text-muted">
                                Your clothes are professionally washed, dried, and folded using premium detergents and equipment.
                            </p>
                        </div>
                    </div>

                    {/* Step 4 */}
                    <div className="col-lg-3 col-md-6">
                        <div style={{
                            background: 'white',
                            borderRadius: '15px',
                            padding: '2rem',
                            textAlign: 'center',
                            height: '100%',
                            boxShadow: '0 10px 30px rgba(0,0,0,0.08)',
                            border: '1px solid #e2e8f0'
                        }}>
                            <div style={{
                                width: '80px',
                                height: '80px',
                                borderRadius: '50%',
                                background: 'linear-gradient(135deg, #0891b2 0%, #0e7490 100%)',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                margin: '0 auto 1.5rem',
                                color: 'white',
                                fontSize: '2rem'
                            }}>
                                <i className="fas fa-home"></i>
                            </div>
                            <h4 style={{ color: '#1e3a8a', marginBottom: '1rem' }}>4. Fresh Delivery</h4>
                            <p className="text-muted">
                                Your clean, fresh laundry is delivered back to your doorstep, perfectly folded and ready to wear.
                            </p>
                        </div>
                    </div>
                </div>

                {/* Features Section */}
                <div className="row mt-5">
                    <div className="col-12 text-center">
                        <div style={{
                            background: 'white',
                            borderRadius: '20px',
                            padding: '3rem 2rem',
                            boxShadow: '0 20px 40px rgba(0,0,0,0.1)',
                            border: '1px solid #e2e8f0'
                        }}>
                            <h3 style={{
                                color: '#1e3a8a',
                                marginBottom: '2rem'
                            }}>
                                Why Choose Our Service?
                            </h3>
                            
                            <div className="row g-4">
                                <div className="col-md-4">
                                    <div className="d-flex flex-column align-items-center">
                                        <i className="fas fa-clock" style={{
                                            fontSize: '2.5rem',
                                            color: '#3b82f6',
                                            marginBottom: '1rem'
                                        }}></i>
                                        <h5 style={{ color: '#1e3a8a' }}>24-Hour Turnaround</h5>
                                        <p className="text-muted text-center">
                                            Fast and reliable service with quick turnaround times
                                        </p>
                                    </div>
                                </div>
                                
                                <div className="col-md-4">
                                    <div className="d-flex flex-column align-items-center">
                                        <i className="fas fa-leaf" style={{
                                            fontSize: '2.5rem',
                                            color: '#10b981',
                                            marginBottom: '1rem'
                                        }}></i>
                                        <h5 style={{ color: '#1e3a8a' }}>Eco-Friendly</h5>
                                        <p className="text-muted text-center">
                                            Environmentally conscious cleaning products and processes
                                        </p>
                                    </div>
                                </div>
                                
                                <div className="col-md-4">
                                    <div className="d-flex flex-column align-items-center">
                                        <i className="fas fa-shield-alt" style={{
                                            fontSize: '2.5rem',
                                            color: '#8b5cf6',
                                            marginBottom: '1rem'
                                        }}></i>
                                        <h5 style={{ color: '#1e3a8a' }}>100% Guarantee</h5>
                                        <p className="text-muted text-center">
                                            Satisfaction guaranteed or we'll make it right
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* CTA Section */}
                <div className="row mt-5">
                    <div className="col-12 text-center">
                        <div style={{
                            background: 'linear-gradient(135deg, #1e3a8a 0%, #3b82f6 50%, #06b6d4 100%)',
                            borderRadius: '20px',
                            padding: '3rem 2rem',
                            color: 'white'
                        }}>
                            <h3 style={{ marginBottom: '1rem' }}>Ready to Try Our Service?</h3>
                            <p style={{ fontSize: '1.1rem', marginBottom: '2rem', opacity: 0.9 }}>
                                Join thousands of satisfied customers and experience the convenience of professional laundry service
                            </p>
                            
                            <div className="d-flex flex-column flex-sm-row gap-3 justify-content-center">
                                <button 
                                    className="btn btn-light btn-lg px-4 py-2"
                                    style={{
                                        color: '#1e3a8a',
                                        fontWeight: '600',
                                        borderRadius: '50px',
                                        transition: 'all 0.3s ease'
                                    }}
                                    onClick={() => window.location.href = '/pickup'}
                                >
                                    <i className="fas fa-calendar-plus me-2"></i>
                                    Schedule Pickup
                                </button>
                                
                                <button 
                                    className="btn btn-outline-light btn-lg px-4 py-2"
                                    style={{
                                        fontWeight: '600',
                                        borderRadius: '50px',
                                        transition: 'all 0.3s ease'
                                    }}
                                    onClick={() => window.location.href = '/pricing'}
                                >
                                    <i className="fas fa-tags me-2"></i>
                                    View Pricing
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
                </div>
            </div>
        </div>
    );
}

export default HowItWorks;