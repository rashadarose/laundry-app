import React from 'react';
import bg1 from './images/bg1.jpg';
import fng4 from './images/fng4.png';

const Contact = () => {
    return (
        <div style={{ maxWidth: 600, margin: '2rem auto', padding: '1rem', position: 'relative', zIndex: 1 }}>
            {/* Transparent background image with even less opacity */}
            <div
                style={{
                    backgroundImage: `url(${bg1})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    opacity: 0.07,
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
                    }}
                />
            </div>
            <h2 className="mb-4 text-center" style={{ position: 'relative', zIndex: 1 }}>
                Contact Us
            </h2>
            <h2>Houston Location</h2>
            <p>
                <strong>Address:</strong> 1818 Fannin Speedway, Houston, TX 77045
            </p>
            <p>
                <strong>Phone:</strong> (973) 752-8237
            </p>
            <p>
                Welcome to Fold N Go! We’re your trusted laundry partner in Houston, dedicated to making laundry day easy, fast, and worry-free. Whether you have questions about our services, need help with an order, or just want to say hello, our friendly team is here for you.
            </p>
            <p>
                Visit us at our convenient Houston location or give us a call. We pride ourselves on excellent customer service and quick responses. Your satisfaction is our top priority!
            </p>
            <p>
                Need help now? Call us at <strong>(973) 752-8237</strong> or stop by our store. We look forward to serving you!
            </p>
            {/* Google Map */}
            <h2 className="mt-4">Our Location: Houston, TX</h2>
            <div className="map-container" style={{ marginTop: '2rem' }}>
                <iframe
                    title="Google Map - Fold N Go Houston"
                    width="100%"
                    height="300"
                    frameBorder="0"
                    style={{ border: 0 }}
                    src="https://www.google.com/maps?q=1818+Fannin+Speedway,+Houston,+TX+77045&output=embed"
                    allowFullScreen
                ></iframe>
            </div>
        </div>
    );
};

export default Contact;