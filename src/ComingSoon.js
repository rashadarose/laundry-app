import React from 'react';

const ComingSoon = () => (
    <div style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh',
        background: '#f5f5f5'
    }}>
        <h1 style={{ fontSize: '3rem', color: '#333' }}>Coming Soon</h1>
        <p style={{ fontSize: '1.2rem', color: '#666' }}>
            We're working hard to bring you something awesome. Stay tuned!
        </p>
    </div>
);

export default ComingSoon;