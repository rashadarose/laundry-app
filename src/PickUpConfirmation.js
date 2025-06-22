import React from 'react';

const PickUpConfirmation = ({ formData, onConfirm, onEdit }) => {
    if (!formData) {
        return <div>No order data available.</div>;
    }

    const { name, address, email, price, phone, pickupDate, notes } = formData;

    return (
        <div style={{ maxWidth: 500, margin: '2rem auto', padding: 24, border: '1px solid #ccc', borderRadius: 8 }}>
            <h2>Pick Up Confirmation</h2>
            <ul style={{ listStyle: 'none', padding: 0 }}>
                <li><strong>Name:</strong> {name}</li>
                <li><strong>Address:</strong> {address}</li>
                <li><strong>Email:</strong> {email}</li>
                <li><strong>Phone:</strong> {phone}</li>
                <li><strong>Pickup Date:</strong> {pickupDate}</li>
                <li><strong>Notes:</strong> {notes}</li>
                <li><strong>Price:</strong> ${price}</li>
            </ul>
            <div style={{ marginTop: 24 }}>
                <button onClick={onEdit} style={{ marginRight: 16 }}>Edit</button>
                <button onClick={onConfirm}>Confirm & Proceed to Payment</button>
            </div>
        </div>
    );
};

export default PickUpConfirmation;