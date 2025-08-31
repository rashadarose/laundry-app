import React from 'react';
import { Link } from 'react-router-dom';
import fng4 from './images/fng4.png';

function Weight() {
    const clothingWeights = [
        { item: 'T-shirts', weight: '~0.5 lb each', icon: 'tshirt' },
        { item: 'Jeans/Pants', weight: '~1.5 lb each', icon: 'user' },
        { item: 'Bath towel', weight: '~1.5 lb each', icon: 'bath' },
        { item: 'Sweatshirt/Hoodie', weight: '~1 lb each', icon: 'user-tie' },
        { item: 'Bed sheets (set)', weight: '~3-4 lbs', icon: 'bed' },
        { item: 'Underwear/Socks', weight: '~0.2 lb each', icon: 'socks' }
    ];

    const containerWeights = [
        { container: 'Full laundry basket', weight: '8-10 lbs', color: '#1e3a8a' },
        { container: '13-gallon trash bag (stuffed)', weight: '10-12 lbs', color: '#059669' },
        { container: 'Standard kitchen garbage bag', weight: '8-10 lbs', color: '#dc2626' },
        { container: 'Large duffel bag', weight: '12-15 lbs', color: '#7c3aed' }
    ];

    return (
        <div className="weight-guide">
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
                    <h1 className="display-4 fw-bold mb-4">Laundry Weight Guide</h1>
                    <p className="lead mb-4" style={{ fontSize: '1.3rem', opacity: 0.9 }}>
                        Not sure how much your laundry weighs? Use our handy guide to estimate!
                    </p>
                </div>
            </div>

            <div className="container mt-5 mb-5">
                {/* Individual Item Weights */}
                <div className="row justify-content-center mb-5">
                    <div className="col-lg-10">
                        <h2 className="text-center mb-4" style={{ color: '#1e3a8a' }}>
                            Individual Item Weights <small className="text-muted">(Dry Clothes)</small>
                        </h2>
                        <div className="row">
                            {clothingWeights.map((item, index) => (
                                <div key={index} className="col-md-6 col-lg-4 mb-4">
                                    <div className="card h-100 border-0 shadow-sm" style={{ transition: 'all 0.3s ease' }}>
                                        <div className="card-body text-center p-4">
                                            <div className="mb-3" style={{
                                                width: '60px',
                                                height: '60px',
                                                background: 'linear-gradient(135deg, #1e3a8a, #3b82f6)',
                                                borderRadius: '50%',
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                                margin: '0 auto',
                                                boxShadow: '0 4px 15px rgba(30, 58, 138, 0.3)'
                                            }}>
                                                <i className={`fas fa-${item.icon} text-white`} style={{ fontSize: '1.5rem' }}></i>
                                            </div>
                                            <h5 className="card-title mb-2" style={{ color: '#1e3a8a' }}>{item.item}</h5>
                                            <p className="card-text fw-bold text-success">{item.weight}</p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Container Weights */}
                <div className="row justify-content-center mb-5">
                    <div className="col-lg-10">
                        <h2 className="text-center mb-4" style={{ color: '#1e3a8a' }}>Common Container Weights</h2>
                        <div className="row">
                            {containerWeights.map((container, index) => (
                                <div key={index} className="col-md-6 mb-4">
                                    <div className="card border-0 shadow-sm h-100" style={{ 
                                        borderLeft: `4px solid ${container.color}`,
                                        transition: 'all 0.3s ease'
                                    }}>
                                        <div className="card-body p-4">
                                            <div className="d-flex align-items-center">
                                                <div className="me-3" style={{
                                                    width: '50px',
                                                    height: '50px',
                                                    background: container.color,
                                                    borderRadius: '50%',
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    justifyContent: 'center'
                                                }}>
                                                    <i className="fas fa-weight-hanging text-white"></i>
                                                </div>
                                                <div>
                                                    <h5 className="mb-1" style={{ color: '#1e3a8a' }}>
                                                        {container.container}
                                                    </h5>
                                                    <p className="mb-0 fw-bold" style={{ color: container.color }}>
                                                        {container.weight}
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Pricing Examples */}
                <div className="row justify-content-center mb-5">
                    <div className="col-lg-8">
                        <div className="card border-0 shadow-lg" style={{
                            background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
                            color: 'white'
                        }}>
                            <div className="card-body p-5 text-center">
                                <h3 className="mb-4">How We Calculate Your Price</h3>
                                <p className="mb-4" style={{ opacity: 0.9, fontSize: '1.1rem' }}>
                                    We price by 10 lb bags, rounded up to protect our margins and ensure fair pricing
                                </p>
                                <div className="row">
                                    <div className="col-md-4 mb-3">
                                        <div className="p-3" style={{ background: 'rgba(255,255,255,0.1)', borderRadius: '10px' }}>
                                            <h5>8 lbs</h5>
                                            <p className="mb-0">Charged as 1 bag (10 lbs)</p>
                                        </div>
                                    </div>
                                    <div className="col-md-4 mb-3">
                                        <div className="p-3" style={{ background: 'rgba(255,255,255,0.1)', borderRadius: '10px' }}>
                                            <h5>13 lbs</h5>
                                            <p className="mb-0">Charged as 2 bags (20 lbs)</p>
                                        </div>
                                    </div>
                                    <div className="col-md-4 mb-3">
                                        <div className="p-3" style={{ background: 'rgba(255,255,255,0.1)', borderRadius: '10px' }}>
                                            <h5>25 lbs</h5>
                                            <p className="mb-0">Charged as 3 bags (30 lbs)</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Quick Calculator */}
                <div className="row justify-content-center mb-5">
                    <div className="col-lg-8">
                        <div className="card border-primary">
                            <div className="card-header bg-primary text-white text-center">
                                <h4 className="mb-0">Quick Estimate Calculator</h4>
                            </div>
                            <div className="card-body p-4">
                                <div className="row text-center">
                                    <div className="col-md-3 mb-3">
                                        <div className="p-3 border rounded">
                                            <h6>5 T-shirts</h6>
                                            <p className="text-muted mb-0">~2.5 lbs</p>
                                        </div>
                                    </div>
                                    <div className="col-md-3 mb-3">
                                        <div className="p-3 border rounded">
                                            <h6>3 Pairs of Jeans</h6>
                                            <p className="text-muted mb-0">~4.5 lbs</p>
                                        </div>
                                    </div>
                                    <div className="col-md-3 mb-3">
                                        <div className="p-3 border rounded">
                                            <h6>2 Bath Towels</h6>
                                            <p className="text-muted mb-0">~3 lbs</p>
                                        </div>
                                    </div>
                                    <div className="col-md-3 mb-3">
                                        <div className="p-3 border rounded bg-success text-white">
                                            <h6>Total</h6>
                                            <p className="mb-0 fw-bold">~10 lbs = 1 bag</p>
                                        </div>
                                    </div>
                                </div>
                                <hr />
                                <div className="text-center">
                                    <h5 style={{ color: '#1e3a8a' }}>Estimated Cost: $18 - $34</h5>
                                    <p className="text-muted">Depending on your chosen service tier</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Business Information */}
                <div className="row justify-content-center mb-5">
                    <div className="col-lg-10">
                        <div className="card border-0 shadow-sm">
                            <div className="card-body p-4">
                                <h3 className="text-center mb-4" style={{ color: '#1e3a8a' }}>How We Ensure Accuracy</h3>
                                <div className="row">
                                    <div className="col-md-6 mb-3">
                                        <div className="d-flex align-items-start">
                                            <div className="me-3" style={{
                                                width: '40px',
                                                height: '40px',
                                                background: '#fbbf24',
                                                borderRadius: '50%',
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                                flexShrink: 0
                                            }}>
                                                <i className="fas fa-balance-scale text-white"></i>
                                            </div>
                                            <div>
                                                <h6 style={{ color: '#1e3a8a' }}>Professional Weighing</h6>
                                                <p className="text-muted mb-0">
                                                    We use portable luggage scales at pickup to confirm actual weight
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-md-6 mb-3">
                                        <div className="d-flex align-items-start">
                                            <div className="me-3" style={{
                                                width: '40px',
                                                height: '40px',
                                                background: '#10b981',
                                                borderRadius: '50%',
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                                flexShrink: 0
                                            }}>
                                                <i className="fas fa-calculator text-white"></i>
                                            </div>
                                            <div>
                                                <h6 style={{ color: '#1e3a8a' }}>Fair Rounding</h6>
                                                <p className="text-muted mb-0">
                                                    Minimum 10 lbs, then rounded up to nearest 10 lb increment
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* CTA Section */}
                <div className="text-center mb-5">
                    <div className="p-4">
                        <h3 className="mb-3" style={{ color: '#1e3a8a' }}>Ready to Schedule Your Pickup?</h3>
                        <p className="mb-4 text-muted">Use our weight guide to estimate your laundry and get started!</p>
                        <div className="d-flex flex-column flex-sm-row gap-3 justify-content-center">
                            <Link 
                                to="/pickup" 
                                className="btn btn-primary btn-lg px-4 py-3"
                                style={{
                                    background: 'linear-gradient(135deg, #1e3a8a, #3b82f6)',
                                    border: 'none',
                                    borderRadius: '12px',
                                    fontWeight: '600'
                                }}
                            >
                                <i className="fas fa-calendar-plus me-2"></i>
                                Schedule Pickup
                            </Link>
                            <Link 
                                to="/pricing" 
                                className="btn btn-outline-primary btn-lg px-4 py-3"
                                style={{
                                    borderRadius: '12px',
                                    fontWeight: '600'
                                }}
                            >
                                <i className="fas fa-dollar-sign me-2"></i>
                                View Pricing
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Weight;