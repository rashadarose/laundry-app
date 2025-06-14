import React from 'react';
import bg1 from './images/bg1.jpg'; // Import your background image
import fng4 from './images/fng4.png'; // Import the logo

const HOUSTON_COORDS = {
    lat: 29.7604,
    lng: -95.3698,
};

const Contact = () => {
    return (
        <div style={{ maxWidth: 600, margin: '2rem auto', padding: '1rem', position: 'relative', zIndex: 1 }}>
            {/* Transparent background image with even less opacity */}
            <div
                style={{
                    backgroundImage: `url(${bg1})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    opacity: 0.07, // Even less opacity for this page
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    width: '100vw',
                    height: '100vh',
                    zIndex: 0,
                    pointerEvents: 'none',
                }}
            />
            {/* Logo above the title */}
            <div className="text-center" style={{ position: 'relative', zIndex: 1 }}>
                <img
                    src={fng4}
                    alt="Fold N Go Logo"
                    style={{
                        width: 100,
                        height: 100,
                        objectFit: 'contain',
                        marginBottom: 12,
                        background: 'rgba(255,255,255,0.85)',
                        borderRadius: 12,
                        boxShadow: '0 2px 8px rgba(0,0,0,0.10)',
                    }}
                />
            </div>
            <h2 className="mb-4 text-center" style={{ position: 'relative', zIndex: 1 }}>
                Contact Us
            </h2>
            <h2>Houston Location</h2>
            <p>
                <strong>Address:</strong> 1234 Main St, Houston, TX 77001
            </p>
            <p>
                <strong>Phone:</strong> (555) 123-4567
            </p>
            <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, urna eu tincidunt consectetur, nisi nisl aliquam nunc, eget aliquam massa nisl quis neque.
            </p>
            <p>
                Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae.
            </p>
            <p>
                For more information, please reach out to our team. We are happy to assist you with any questions or concerns.
            </p>
            {/* Houston Map */}
            <h2 className="mt-4">Our Location: Houston, TX</h2>
            <div className="map-container" style={{ marginTop: '2rem' }}>
                <iframe
                    title="Houston Map"
                    width="100%"
                    height="300"
                    frameBorder="0"
                    src={`https://www.openstreetmap.org/export/embed.html?bbox=${HOUSTON_COORDS.lng - 0.1}%2C${HOUSTON_COORDS.lat - 0.1}%2C${HOUSTON_COORDS.lng + 0.1}%2C${HOUSTON_COORDS.lat + 0.1}&layer=mapnik&marker=${HOUSTON_COORDS.lat}%2C${HOUSTON_COORDS.lng}`}
                    allowFullScreen
                ></iframe>
            </div>
        </div>
    );
};

export default Contact;