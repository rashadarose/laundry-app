import React from 'react';
import bg1 from './images/bg1.jpg';
import fng4 from './images/fng4.png';

const services = [
    { name: 'Wash & Fold', description: 'Professional washing and folding of your clothes.' },
    { name: 'Dry Cleaning', description: 'Gentle dry cleaning for delicate fabrics.' },
    { name: 'Ironing', description: 'Crisp ironing for a polished look.' },
    { name: 'Pickup & Delivery', description: 'Convenient pickup and delivery at your doorstep.' },
];

function ServicesPage() {
    return (
        <div className="services-page">
            <h1>Our Laundry Services</h1>
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
                    <img
          src={fng4}
          alt="Fold N Go Logo"
          style={{
            width: 100,
            height: 100,
            objectFit: 'contain',
            marginBottom: 12,
            // background: 'rgba(255,255,255,0.85)',
            // borderRadius: 12,
            // boxShadow: '0 2px 8px rgba(0,0,0,0.10)'
          }}
        />
            <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                {services.map((service, idx) => (
                    <li key={idx} className="service-item">
                        <h2>{service.name}</h2>
                        <p>{service.description}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default ServicesPage;