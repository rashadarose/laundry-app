import React, { useState } from 'react';
import { FaChevronDown, FaChevronUp, FaQuestionCircle } from 'react-icons/fa';
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
    },
    {
        question: "Do you provide pickup and delivery?",
        answer: "Yes! We offer convenient pickup and delivery services. Simply schedule a time that works for you, and we'll handle the rest."
    },
    {
        question: "What areas do you service?",
        answer: "We currently service the greater metropolitan area. Enter your zip code during booking to confirm availability in your location."
    },
    {
        question: "How do you handle special care items?",
        answer: "We have specialized processes for delicate fabrics, designer clothing, and items requiring special attention. Just let us know when scheduling."
    }
];

function FAQ() {
    const [openItems, setOpenItems] = useState({});

    const toggleItem = (index) => {
        setOpenItems(prev => ({
            ...prev,
            [index]: !prev[index]
        }));
    };

    return (
        <div className="min-vh-100" style={{ background: 'linear-gradient(135deg, #f8faff 0%, #e3f2fd 100%)' }}>
            {/* Header */}
            <div className="container-fluid py-5" style={{
                background: 'linear-gradient(135deg, #1e3a8a 0%, #3b82f6 50%, #06b6d4 100%)'
            }}>
                <div className="container">
                    <div className="row justify-content-center text-center text-white">
                        <div className="col-lg-8">
                            <div className="d-flex align-items-center justify-content-center mb-3">
                                <FaQuestionCircle className="me-3" size={40} />
                                <h1 className="h2 mb-0">Frequently Asked Questions</h1>
                            </div>
                            <p className="lead opacity-90">
                                Find answers to common questions about our laundry services
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* FAQ Content */}
            <div className="container py-5">
                <div className="row justify-content-center">
                    <div className="col-lg-8">
                        <div className="accordion" id="faqAccordion">
                            {faqs.map((faq, index) => (
                                <div key={index} className="card border-0 shadow-sm mb-3">
                                    <div className="card-header bg-white border-0 p-0">
                                        <button
                                            className="btn btn-link w-100 text-start p-4 text-decoration-none"
                                            type="button"
                                            onClick={() => toggleItem(index)}
                                            style={{
                                                color: '#1e40af',
                                                fontSize: '1.1rem',
                                                fontWeight: '600'
                                            }}
                                        >
                                            <div className="d-flex justify-content-between align-items-center">
                                                <span>{faq.question}</span>
                                                {openItems[index] ? (
                                                    <FaChevronUp className="text-primary" />
                                                ) : (
                                                    <FaChevronDown className="text-primary" />
                                                )}
                                            </div>
                                        </button>
                                    </div>
                                    <div className={`collapse ${openItems[index] ? 'show' : ''}`}>
                                        <div className="card-body pt-0 pb-4 px-4">
                                            <p className="text-muted mb-0" style={{ fontSize: '1rem', lineHeight: '1.6' }}>
                                                {faq.answer}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Contact Support Card */}
                        <div className="card border-0 shadow-sm mt-5" style={{
                            background: 'linear-gradient(135deg, #f8faff 0%, #e3f2fd 100%)'
                        }}>
                            <div className="card-body text-center py-5">
                                <div className="mb-3">
                                    <i className="fas fa-headset text-primary" style={{ fontSize: '3rem' }}></i>
                                </div>
                                <h4 className="mb-3">Still have questions?</h4>
                                <p className="text-muted mb-4">
                                    Can't find what you're looking for? Our support team is here to help!
                                </p>
                                <div className="row justify-content-center">
                                    <div className="col-md-4 mb-3">
                                        <div className="d-flex align-items-center justify-content-center">
                                            <i className="fas fa-phone text-primary me-2"></i>
                                            <div>
                                                <small className="text-muted d-block">Call us</small>
                                                <strong>(555) 123-4567</strong>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-md-4 mb-3">
                                        <div className="d-flex align-items-center justify-content-center">
                                            <i className="fas fa-envelope text-primary me-2"></i>
                                            <div>
                                                <small className="text-muted d-block">Email us</small>
                                                <strong>support@foldngo.com</strong>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-md-4 mb-3">
                                        <div className="d-flex align-items-center justify-content-center">
                                            <i className="fas fa-clock text-primary me-2"></i>
                                            <div>
                                                <small className="text-muted d-block">Support hours</small>
                                                <strong>Mon-Fri 8AM-6PM</strong>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default FAQ;