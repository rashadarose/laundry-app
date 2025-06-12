import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css'; // Assuming you have a CSS file for styling

const HOUSTON_COORDS = {
    lat: 29.7604,
    lng: -95.3698,
};

function Home() {
    return (
        <div className="home-root">
            <div className="jumbotron text-center">
                <img
                    src="https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80"
                    alt="Laundry"
                    className="img-fluid mb-4 jumbotron-image"
                    style={{ maxWidth: '100%', height: 'auto' }}
                />
                <h1>Welcome to the Laundry App</h1>
                <nav>
                    <ul className="home-nav">
                        <li><Link to="/services">Services</Link></li>
                        <li><Link to="/pricing">Pricing</Link></li>
                        <li><Link to="/contact">Contact</Link></li>
                    </ul>
                </nav>
                <h2 className="mt-4">Our Location: Houston, TX</h2>
                <div className="map-container">
                    <iframe
                        title="Houston Map"
                        width="100%"
                        height="300"
                        frameBorder="0"
                        src={`https://www.openstreetmap.org/export/embed.html?bbox=${HOUSTON_COORDS.lng-0.1}%2C${HOUSTON_COORDS.lat-0.1}%2C${HOUSTON_COORDS.lng+0.1}%2C${HOUSTON_COORDS.lat+0.1}&layer=mapnik&marker=${HOUSTON_COORDS.lat}%2C${HOUSTON_COORDS.lng}`}
                        allowFullScreen
                    ></iframe>
                </div>
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