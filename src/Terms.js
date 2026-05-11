import React from 'react';

const terms = [
    {
        title: 'Service Scope',
        text: 'Fold N Go provides pickup, wash & fold, and delivery services in supported service areas.'
    },
    {
        title: 'Order Accuracy',
        text: 'Customers are responsible for submitting correct pickup details (address, date, time window, and access notes).'
    },
    {
        title: 'Bag-Based Pricing',
        text: 'Orders are priced by selected bag count and service tier at checkout. Final pricing includes applicable fees and taxes.'
    },
    {
        title: 'Restricted/High-Risk Items',
        text: 'Do not include hazardous items, cash, fragile valuables, or items requiring specialty cleaning unless approved in advance.'
    },
    {
        title: 'Garment Care',
        text: 'Customers should identify delicate garments and special instructions clearly. We are not liable for issues caused by missing care instructions.'
    },
    {
        title: 'Damage and Claims',
        text: 'Claims must be reported within 24 hours of delivery with photo evidence when available. Resolutions are based on service records and applicable law.'
    },
    {
        title: 'Limitation of Liability (Draft for Legal Review)',
        text: 'To the maximum extent allowed by law, Fold N Go\'s total liability for any claim arising from a single order is limited to the amount paid for that order. Consequential, incidental, and special damages are excluded where permitted by law.'
    },
    {
        title: 'Cancellations and Changes',
        text: 'Orders may be changed or canceled before processing begins. Once processing starts, fees may apply.'
    },
    {
        title: 'Unclaimed Orders',
        text: 'Orders not claimed after 30 days may be donated or disposed of in accordance with local law.'
    },
    {
        title: 'Account and Conduct',
        text: 'We may suspend or refuse service for fraud, abuse, unsafe access conditions, or repeated policy violations.'
    },
    {
        title: 'Governing Law and Venue (Texas)',
        text: 'These Terms are governed by the laws of the State of Texas. Unless otherwise required by law, disputes will be resolved in courts located in Harris County, Texas.'
    }
];

const Terms = () => (
    <div className="min-vh-100" style={{ background: 'linear-gradient(135deg, #f8faff 0%, #e3f2fd 100%)' }}>
        <div className="container py-5" style={{ maxWidth: 960 }}>
            <div className="text-center text-white rounded-4 p-4 mb-4" style={{
                background: 'linear-gradient(135deg, #1e3a8a 0%, #3b82f6 50%, #06b6d4 100%)'
            }}>
                <h1 className="mb-2">Terms of Service</h1>
                <p className="mb-0 opacity-75">Please review these terms before placing an order</p>
            </div>

            <div className="card border-0 shadow-sm" style={{ borderRadius: 14 }}>
                <div className="card-body p-4 p-md-5">
                    <p className="text-muted mb-4">
                        By using Fold N Go services, you agree to the terms below.
                    </p>

                    <div className="d-grid gap-3">
                        {terms.map((term, idx) => (
                            <div key={idx} className="p-3 rounded-3" style={{ background: '#f8fbff', border: '1px solid #e2e8f0' }}>
                                <h6 className="mb-1">{idx + 1}. {term.title}</h6>
                                <p className="mb-0 text-muted">{term.text}</p>
                            </div>
                        ))}
                    </div>

                    <div className="mt-4 p-3 rounded-3" style={{ background: '#eff6ff', border: '1px solid #bfdbfe' }}>
                        <strong>Questions?</strong>
                        <div>
                            Contact support at <a href="mailto:support@laundryapp.com">support@laundryapp.com</a>
                        </div>
                    </div>
                </div>
            </div>

            <p className="text-center text-muted small mt-4 mb-0">
                Last updated: May 2026
            </p>
        </div>
    </div>
);

export default Terms;