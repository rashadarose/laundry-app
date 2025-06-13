import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css';
import bg1 from './images/bg1.jpg'; 
import fng4 from './images/fng4.png';
import frontimg1 from './frontimg1.jpg';


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
           
                        <div style={{ position: 'relative', width: '100%', marginBottom: 40 }}>
                            <img
                                src={frontimg1}
                                alt="Laundry App"
                                style={{
                                    width: '98vw',
                                    maxWidth: '1800px',
                                    height: '48vw',
                                    maxHeight: '520px',
                                    objectFit: 'cover',
                                    display: 'block',
                                    margin: '0 auto',
                                    opacity: 0.55,
                                    borderRadius: 5,
                                }}
                            />
                            <div
                                style={{
                                    position: 'absolute',
                                    top: '50%',
                                    left: 60,
                                    transform: 'translateY(-50%)',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    alignItems: 'flex-start',
                                }}
                            >
                                <img
                                    src={fng4}
                                    alt="Fold N Go Logo"
                                    style={{
                                        width: 150,
                                        height: 150,
                                        objectFit: 'contain',
                                        marginBottom: 16,
                                        background: 'rgba(255,255,255,0.85)',
                                        borderRadius: 12,
                                        boxShadow: '0 2px 8px rgba(0,0,0,0.10)'
                                    }}
                                />
                                <h1
                                    style={{
                            // color: '#fff',
                            // background: 'rgba(0,0,0,0.85)',
                            // padding: '16px 32px',
                            // borderRadius: 8,
                            color: '#222',
                            fontSize: '2.8rem',
                            fontWeight: 700,
                            letterSpacing: 1,
                            margin: 0,
                        }}
                    >
                        Fold N Go Laundry Service
                    </h1>
                    <Link
                        to="/pickup"
                        style={{
                            display: 'inline-block',
                            color: '#fff',
                            background: 'rgba(0,0,0,0.85)',
                            padding: '10px 28px',
                            borderRadius: 8,
                            fontSize: '1.6rem',
                            fontWeight: 400,
                            letterSpacing: 0.5,
                            margin: '16px 0 0 0',
                            textDecoration: 'none',
                            transition: 'background 0.2s',
                        }}
                    >
                        Fast Laundry Pick Up and Delivery
                    </Link>
                            </div>
                        </div>
            <section className="services-section mt-5">
                <h2 className="text-center mb-4">Our Services</h2>
                <div className="row justify-content-center">
                    <div className="col-md-4 mb-4">
                        <div className="card h-100 shadow-sm">
                            <div className="card-body">
                                <h5 className="card-title">Professional Cleaning</h5>
                                <p className="card-text">
                                    We use top-quality detergents and advanced machines to ensure your clothes are thoroughly cleaned and cared for.
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-4 mb-4">
                        <div className="card h-100 shadow-sm">
                            <div className="card-body">
                                <h5 className="card-title">Expert Drying</h5>
                                <p className="card-text">
                                    Our gentle drying process protects your fabrics and keeps your clothes soft, fresh, and ready to wear.
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-4 mb-4">
                        <div className="card h-100 shadow-sm">
                            <div className="card-body">
                                <h5 className="card-title">Perfect Folding</h5>
                                <p className="card-text">
                                    Every item is neatly folded by our team, so your laundry is organized and easy to put away.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="row justify-content-center">
                    <div className="col-md-4 mb-4">
                        <div className="card h-100 shadow-sm">
                            <div className="card-body">
                                <h5 className="card-title">Freshness Guaranteed</h5>
                                <p className="card-text">
                                    We guarantee your laundry will come back smelling fresh and feeling great, every single time.
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-4 mb-4">
                        <div className="card h-100 shadow-sm">
                            <div className="card-body">
                                <h5 className="card-title">Speed &amp; Convenience</h5>
                                <p className="card-text">
                                    Fast turnaround with flexible scheduling. Drop off or schedule a pickup—whatever works best for you!
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-4 mb-4">
                        <div className="card h-100 shadow-sm">
                            <div className="card-body">
                                <h5 className="card-title">Same-Day Service</h5>
                                <p className="card-text">
                                    In a hurry? Take advantage of our same-day laundry service for those times you need clean clothes fast.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            {/* Customer Reviews Section */}
            <section className="reviews-section mt-5">
                <h2 className="text-center mb-4">Customer Reviews</h2>
                <div className="row justify-content-center">
                    <div className="col-md-4 mb-4">
                        <div className="card h-100 shadow-sm">
                            <div className="card-body text-center">
                                <h5 className="card-title mb-2">Sarah J.</h5>
                                <div className="mb-2" style={{ color: '#FFD700' }}>
                                    <i className="fas fa-star"></i>
                                    <i className="fas fa-star"></i>
                                    <i className="fas fa-star"></i>
                                    <i className="fas fa-star"></i>
                                    <i className="fas fa-star-half-alt"></i>
                                </div>
                                <p className="card-text">
                                    "Fold N Go made laundry day so easy! Fast pickup, friendly staff, and my clothes came back perfectly folded and fresh."
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-4 mb-4">
                        <div className="card h-100 shadow-sm">
                            <div className="card-body text-center">
                                <h5 className="card-title mb-2">Michael T.</h5>
                                <div className="mb-2" style={{ color: '#FFD700' }}>
                                    <i className="fas fa-star"></i>
                                    <i className="fas fa-star"></i>
                                    <i className="fas fa-star"></i>
                                    <i className="fas fa-star"></i>
                                    <i className="far fa-star"></i>
                                </div>
                                <p className="card-text">
                                    "Great service and super convenient. I love the same-day option when I’m in a rush. Highly recommend!"
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-4 mb-4">
                        <div className="card h-100 shadow-sm">
                            <div className="card-body text-center">
                                <h5 className="card-title mb-2">Linda W.</h5>
                                <div className="mb-2" style={{ color: '#FFD700' }}>
                                    <i className="fas fa-star"></i>
                                    <i className="fas fa-star"></i>
                                    <i className="fas fa-star"></i>
                                    <i className="fas fa-star"></i>
                                    <i className="fas fa-star"></i>
                                </div>
                                <p className="card-text">
                                    "The best laundry service in Houston! My clothes always come back clean, soft, and smelling amazing."
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}

export default Home;