import React from 'react';
import bg1 from './images/bg1.jpg';
const ComingSoon = () => (
    <div style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh',
        background: '#f5f5f5'
    }}>
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
        <h1 style={{ fontSize: '3rem', color: '#333' }}>Coming Soon</h1>
        <p style={{ fontSize: '1.2rem', color: '#666' }}>
            We're working hard to bring you something awesome. Stay tuned!
        </p>
    </div>
);

export default ComingSoon;