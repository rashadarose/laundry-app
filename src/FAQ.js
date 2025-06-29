import React from 'react';
import bg1 from './images/bg1.jpg';
const faqs = [
    {
        question: "What services do you offer?",
        answer: "We offer washing, drying, folding, ironing, and dry cleaning services for clothes, linens, and more."
    },
    {
        question: "How do I schedule a laundry pickup?",
        answer: "You can schedule a pickup through our app or website by selecting your preferred date and time."
    },
    {
        question: "What is the turnaround time?",
        answer: "Our standard turnaround time is 24-48 hours. Express service is available for an additional fee."
    },
    {
        question: "Do you use hypoallergenic detergents?",
        answer: "Yes, we offer hypoallergenic and fragrance-free detergent options upon request."
    },
    {
        question: "How do I pay for the service?",
        answer: "We accept payments via credit/debit cards, mobile wallets, and cash on delivery."
    },
    {
        question: "What if my clothes are damaged or lost?",
        answer: "We take great care with your items. In the rare event of damage or loss, please contact us within 24 hours for assistance."
    }
];

function FAQ() {
    return (
        <div style={{ maxWidth: 700, margin: '0 auto', padding: 24 }}>
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
            <h1>Frequently Asked Questions</h1>
            <ul style={{ listStyle: 'none', padding: 0 }}>
                {faqs.map((faq, idx) => (
                    <li key={idx} style={{ marginBottom: 24 }}>
                        <strong>{faq.question}</strong>
                        <p>{faq.answer}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default FAQ;