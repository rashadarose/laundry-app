import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css';
import bg1 from './bg1.jpg'; // Import your background image

function Home() {
    return (
        <div className="home-root" style={{ position: 'relative', zIndex: 1 }}>
            {/* Transparent background image */}
            <div
                style={{
                    backgroundImage: `url(${bg1})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    opacity: 0.12,
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    width: '100vw',
                    height: '100vh',
                    zIndex: 0,
                    pointerEvents: 'none',
                }}
            />
            <div className="jumbotron text-center" style={{ position: 'relative', zIndex: 1 }}>
                <h1>Welcome to the Laundry App</h1>
                <nav>
                    <ul className="home-nav">
                        <li><Link to="/services">Services</Link></li>
                        <li><Link to="/pricing">Pricing</Link></li>
                        <li><Link to="/contact">Contact</Link></li>
                    </ul>
                </nav>
                <h2 className="mt-4">Our Location: Houston, TX</h2>
            </div>

            {/* Services Section */}
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
        </div>
    );
}

export default Home;