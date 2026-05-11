import React from 'react';
import { FaCheckCircle } from 'react-icons/fa';

const sectionStyle = {
    background: '#ffffff',
    borderRadius: 14,
    padding: '1.25rem 1.25rem 1rem',
    boxShadow: '0 4px 16px rgba(15, 23, 42, 0.06)',
    border: '1px solid #e2e8f0'
};

const itemStyle = {
    display: 'flex',
    alignItems: 'flex-start',
    gap: '0.6rem',
    marginBottom: '0.6rem',
    color: '#475569'
};

const Item = ({ children }) => (
    <div style={itemStyle}>
        <FaCheckCircle style={{ color: '#10b981', marginTop: 3, flexShrink: 0 }} />
        <span>{children}</span>
    </div>
);

const Policy = () => (
    <div className="min-vh-100" style={{ background: 'linear-gradient(135deg, #f8faff 0%, #e3f2fd 100%)' }}>
        <div className="container py-5" style={{ maxWidth: 960 }}>
            <div className="text-center text-white rounded-4 p-4 mb-4" style={{
                background: 'linear-gradient(135deg, #1e3a8a 0%, #3b82f6 50%, #06b6d4 100%)'
            }}>
                <h1 className="mb-2">Privacy Policy</h1>
                <p className="mb-0 opacity-75">How Fold N Go collects, uses, and protects your information</p>
            </div>

            <div className="d-grid gap-3">
                <section style={sectionStyle}>
                    <h5>1. Information We Collect</h5>
                    <Item>Account details like name, email address, phone number, and service address.</Item>
                    <Item>Order details such as service type, bag count, pickup/dropoff dates, and notes.</Item>
                    <Item>Payment information processed securely through Stripe (we do not store full card numbers).</Item>
                    <Item>Basic usage and device data used to improve reliability and customer experience.</Item>
                </section>

                <section style={sectionStyle}>
                    <h5>2. How We Use Your Information</h5>
                    <Item>To schedule, process, and complete your laundry orders.</Item>
                    <Item>To send order confirmations, updates, receipts, and service notifications.</Item>
                    <Item>To provide customer support and resolve service issues.</Item>
                    <Item>To improve pricing, operations, and site performance.</Item>
                    <Item>To comply with legal, tax, accounting, and fraud-prevention obligations.</Item>
                </section>

                <section style={sectionStyle}>
                    <h5>3. Information Sharing</h5>
                    <p className="mb-2">We do not sell personal information. We may disclose limited information to:</p>
                    <Item>Payment processors and technology vendors providing core business functions.</Item>
                    <Item>Delivery/operations providers who support order fulfillment.</Item>
                    <Item>Government or legal authorities when required by applicable law.</Item>
                </section>

                <section style={sectionStyle}>
                    <h5>4. Data Security & Retention</h5>
                    <Item>We use reasonable administrative, technical, and physical safeguards.</Item>
                    <Item>Access to operational data is restricted to authorized personnel.</Item>
                    <Item>Data is retained only as needed for business operations and legal obligations.</Item>
                </section>

                <section style={sectionStyle}>
                    <h5>5. Texas-Specific & U.S. Privacy Notice</h5>
                    <Item>This service is operated in the United States and intended for users located in the U.S.</Item>
                    <Item>If you are a Texas resident, you may request access, correction, or deletion of eligible personal data, subject to legal exceptions.</Item>
                    <Item>We do not knowingly collect personal information from children under 13.</Item>
                </section>

                <section style={sectionStyle}>
                    <h5>6. Contact</h5>
                    <p className="mb-1">Questions about privacy or data requests?</p>
                    <p className="mb-0">
                        Email: <a href="mailto:support@laundryapp.com">support@laundryapp.com</a>
                    </p>
                </section>
            </div>

            <p className="text-center text-muted small mt-4 mb-0">
                Last updated: May 2026
            </p>
        </div>
    </div>
);

export default Policy;