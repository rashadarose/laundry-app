import React from 'react';
import bg1 from './images/bg1.jpg';
import fng4 from './images/fng4.png';
import wash1 from './images/wash1.jpg';
import wash2 from './images/wash2.jpg';
import wash3 from './images/wash3.jpg';
import wash4 from './images/wash4.jpg';

const services = [
    { 
        name: 'Wash & Fold', 
        description: 'Professional washing and folding of your clothes with premium detergents and care.',
        image: wash4,
        icon: 'fas fa-soap',
        color: 'linear-gradient(135deg, #1e3a8a, #3b82f6)'
    },
    { 
        name: 'Dry Cleaning', 
        description: 'Gentle dry cleaning for delicate fabrics, suits, and special garments.',
        image: wash1,
        icon: 'fas fa-tshirt',
        color: 'linear-gradient(135deg, #fbbf24, #f59e0b)'
    },
    { 
        name: 'Expert Drying', 
        description: 'Professional drying process that protects fabrics and maintains softness.',
        image: wash2,
        icon: 'fas fa-wind',
        color: 'linear-gradient(135deg, #06b6d4, #0891b2)'
    },
    { 
        name: 'Pickup & Delivery', 
        description: 'Convenient pickup and delivery service right to your doorstep.',
        image: wash3,
        icon: 'fas fa-truck',
        color: 'linear-gradient(135deg, #10b981, #059669)'
    },
];

function ServicesPage() {
    return (
        <div className="services-page" style={{ position: 'relative', minHeight: '100vh', padding: '2rem 0' }}>
            <div
                style={{
                    backgroundImage: `url(${bg1})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    opacity: 0.05,
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    width: '100vw',
                    height: '100vh',
                    zIndex: 0,
                    pointerEvents: 'none',
                }}
            />
            
            <div className="container" style={{ position: 'relative', zIndex: 1 }}>
                {/* Header Section */}
                <div className="text-center mb-5">
                    <img
                        src={fng4}
                        alt="Fold N Go Logo"
                        style={{
                            width: 120,
                            height: 120,
                            objectFit: 'contain',
                            marginBottom: 20,
                            filter: 'drop-shadow(0 4px 8px rgba(0,0,0,0.1))'
                        }}
                    />
                    <h1 className="display-4 fw-bold mb-3" style={{ color: '#1e3a8a' }}>
                        Our Laundry Services
                    </h1>
                    <p className="lead" style={{ color: '#64748b', maxWidth: '600px', margin: '0 auto' }}>
                        Professional laundry services designed to make your life easier with quality care and convenience.
                    </p>
                </div>

                {/* Services Grid */}
                <div className="row g-4">
                    {services.map((service, idx) => (
                        <div key={idx} className="col-md-6 col-lg-3">
                            <div 
                                className="card h-100 border-0 shadow-sm"
                                style={{
                                    transition: 'all 0.3s ease',
                                    cursor: 'pointer',
                                    overflow: 'hidden'
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
                                {/* Service Image */}
                                <div style={{ position: 'relative', overflow: 'hidden' }}>
                                    <img
                                        src={service.image}
                                        alt={service.name}
                                        style={{
                                            width: '100%',
                                            height: '200px',
                                            objectFit: 'cover',
                                            transition: 'transform 0.3s ease'
                                        }}
                                        onMouseEnter={e => {
                                            e.target.style.transform = 'scale(1.05)';
                                        }}
                                        onMouseLeave={e => {
                                            e.target.style.transform = 'scale(1)';
                                        }}
                                    />
                                    {/* Overlay with Icon */}
                                    <div style={{
                                        position: 'absolute',
                                        top: '15px',
                                        right: '15px',
                                        width: '50px',
                                        height: '50px',
                                        background: service.color,
                                        borderRadius: '50%',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        boxShadow: '0 4px 15px rgba(0,0,0,0.2)'
                                    }}>
                                        <i className={service.icon} style={{ color: 'white', fontSize: '1.2rem' }}></i>
                                    </div>
                                </div>
                                
                                {/* Card Body */}
                                <div className="card-body p-4">
                                    <h5 className="card-title mb-3" style={{ 
                                        color: '#1e3a8a', 
                                        fontSize: '1.3rem',
                                        fontWeight: '600'
                                    }}>
                                        {service.name}
                                    </h5>
                                    <p className="card-text" style={{ 
                                        color: '#64748b',
                                        fontSize: '1rem',
                                        lineHeight: '1.6'
                                    }}>
                                        {service.description}
                                    </p>
                                    
                                    {/* CTA Button */}
                                    <div className="mt-auto">
                                        <button 
                                            className="btn w-100"
                                            style={{
                                                background: '#fbbf24',
                                                border: 'none',
                                                color: '#1e3a8a',
                                                fontWeight: '600',
                                                padding: '10px 20px',
                                                borderRadius: '8px',
                                                transition: 'all 0.3s ease'
                                            }}
                                            onMouseEnter={e => {
                                                e.target.style.background = '#f59e0b';
                                                e.target.style.transform = 'translateY(-1px)';
                                            }}
                                            onMouseLeave={e => {
                                                e.target.style.background = '#fbbf24';
                                                e.target.style.transform = 'translateY(0)';
                                            }}
                                        >
                                            Learn More
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Call to Action Section */}
                <div className="text-center mt-5 p-5" style={{
                    background: 'linear-gradient(135deg, #1e3a8a 0%, #3b82f6 50%, #06b6d4 100%)',
                    borderRadius: '20px',
                    color: 'white'
                }}>
                    <h3 className="mb-3">Ready to Experience Our Services?</h3>
                    <p className="mb-4" style={{ fontSize: '1.1rem', opacity: 0.9 }}>
                        Schedule a pickup today and let us take care of your laundry needs!
                    </p>
                    <button 
                        className="btn btn-lg px-5 py-3"
                        style={{
                            background: '#fbbf24',
                            border: 'none',
                            color: '#1e3a8a',
                            fontWeight: '600',
                            borderRadius: '12px',
                            boxShadow: '0 4px 15px rgba(251, 191, 36, 0.3)'
                        }}
                        onClick={() => window.location.href = '/pickup'}
                    >
                        <i className="fas fa-calendar-plus me-2"></i>
                        Schedule Pickup
                    </button>
                </div>
            </div>
        </div>
    );
}

export default ServicesPage;