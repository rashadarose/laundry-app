import React from 'react';

const terms = [
    "Customers are responsible for labeling and separating their laundry items.",
    "The laundry service is not liable for items left unclaimed after 30 days.",
    "We are not responsible for damage caused by items left in pockets or for color bleeding.",
    "Payment is due upon delivery or pickup of laundry.",
    "Any complaints or claims must be reported within 24 hours of receiving your laundry.",
    "Delicate or special care items must be clearly identified by the customer.",
    "The laundry service reserves the right to refuse service to anyone."
];

const Terms = () => (
    <div style={{ maxWidth: 600, margin: '40px auto', padding: 24 }}>
        <h1>Terms & Conditions</h1>
        <p>
            Please read the following terms and conditions carefully before using our laundry services:
        </p>
        <ul style={{ listStyle: 'none', padding: 0 }}>
            {terms.map((term, idx) => (
                <li key={idx} style={{ marginBottom: 16 }}>
                    {term}
                </li>
            ))}
        </ul>
        <p>
            By using our services, you agree to abide by these terms and conditions.
        </p>
    </div>
);

export default Terms;