import React from 'react';
import { FaPhone, FaMapMarkerAlt, FaEnvelope, FaClock, FaComments } from 'react-icons/fa';
import bg1 from './images/bg1.jpg';
import fng4 from './images/fng4.png';

const Contact = () => {
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
                                <FaComments className="me-3" size={40} />
                                <h1 className="h2 mb-0">Contact Us</h1>
                            </div>
                            <p className="lead opacity-90">
                                Get in touch with our friendly team - we're here to help!
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <div className="container py-5">
                <div className="row justify-content-center">
                    <div className="col-lg-10">
                        {/* Contact Cards */}
                        <div className="row mb-5">
                            <div className="col-md-6 mb-4">
                                <div className="card border-0 shadow-sm h-100">
                                    <div className="card-body text-center p-4">
                                        <div className="mb-3">
                                            <FaPhone className="text-primary" size={32} />
                                        </div>
                                        <h5 className="card-title">Call Us</h5>
                                        <p className="text-muted mb-3">
                                            Ready to help with your laundry needs
                                        </p>
                                        <a href="tel:(973)752-8237" className="btn btn-outline-primary">
                                            (973) 752-8237
                                        </a>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-6 mb-4">
                                <div className="card border-0 shadow-sm h-100">
                                    <div className="card-body text-center p-4">
                                        <div className="mb-3">
                                            <FaEnvelope className="text-primary" size={32} />
                                        </div>
                                        <h5 className="card-title">Email Us</h5>
                                        <p className="text-muted mb-3">
                                            Send us a message anytime
                                        </p>
                                        <a href="mailto:support@foldngo.com" className="btn btn-outline-primary">
                                            support@foldngo.com
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Location Section */}
                        <div className="card border-0 shadow-sm mb-5">
                            <div className="card-header bg-white py-4">
                                <h4 className="mb-0">
                                    <FaMapMarkerAlt className="text-primary me-2" />
                                    Houston Location
                                </h4>
                            </div>
                            <div className="card-body p-4">
                                <div className="row">
                                    <div className="col-md-6">
                                        <div className="mb-4">
                                            <h6 className="text-muted mb-2">Address</h6>
                                            <p className="mb-3">
                                                <strong>1818 Fannin Speedway</strong><br />
                                                Houston, TX 77045
                                            </p>
                                        </div>
                                        
                                        <div className="mb-4">
                                            <h6 className="text-muted mb-2">
                                                <FaClock className="me-1" />
                                                Business Hours
                                            </h6>
                                            <div className="small">
                                                <div className="d-flex justify-content-between">
                                                    <span>Monday - Friday:</span>
                                                    <span>8:00 AM - 6:00 PM</span>
                                                </div>
                                                <div className="d-flex justify-content-between">
                                                    <span>Saturday:</span>
                                                    <span>9:00 AM - 5:00 PM</span>
                                                </div>
                                                <div className="d-flex justify-content-between">
                                                    <span>Sunday:</span>
                                                    <span>10:00 AM - 4:00 PM</span>
                                                </div>
                                            </div>
                                        </div>

                                        <a 
                                            href="https://maps.google.com/?q=1818+Fannin+Speedway,+Houston,+TX+77045" 
                                            target="_blank" 
                                            rel="noopener noreferrer" 
                                            className="btn btn-primary"
                                        >
                                            <FaMapMarkerAlt className="me-2" />
                                            Get Directions
                                        </a>
                                    </div>
                                    
                                    <div className="col-md-6">
                                        {/* Google Map */}
                                        <div className="ratio ratio-16x9">
                                            <iframe
                                                title="Google Map - Fold N Go Houston"
                                                className="rounded"
                                                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3464.8!2d-95.36!3d29.71!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjnCsDQyJzM2LjAiTiA5NcKwMjEnMzYuMCJX!5e0!3m2!1sen!2sus!4v1234567890123"
                                                style={{ border: 0 }}
                                                allowFullScreen=""
                                                loading="lazy"
                                                referrerPolicy="no-referrer-when-downgrade"
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* About Section */}
                        <div className="card border-0 shadow-sm" style={{
                            background: 'linear-gradient(135deg, #f8faff 0%, #e3f2fd 100%)'
                        }}>
                            <div className="card-body p-5">
                                <h4 className="mb-4 text-center">Why Choose Fold N Go?</h4>
                                <div className="row">
                                    <div className="col-md-6 mb-3">
                                        <div className="d-flex align-items-start">
                                            <div className="flex-shrink-0">
                                                <div className="bg-primary text-white rounded-circle d-flex align-items-center justify-content-center" style={{width: 40, height: 40}}>
                                                    <i className="fas fa-clock"></i>
                                                </div>
                                            </div>
                                            <div className="ms-3">
                                                <h6 className="mb-1">Fast & Reliable</h6>
                                                <p className="text-muted mb-0 small">
                                                    Quick turnaround times with dependable service you can trust.
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-md-6 mb-3">
                                        <div className="d-flex align-items-start">
                                            <div className="flex-shrink-0">
                                                <div className="bg-primary text-white rounded-circle d-flex align-items-center justify-content-center" style={{width: 40, height: 40}}>
                                                    <i className="fas fa-heart"></i>
                                                </div>
                                            </div>
                                            <div className="ms-3">
                                                <h6 className="mb-1">Care & Quality</h6>
                                                <p className="text-muted mb-0 small">
                                                    We treat your clothes with the same care you would.
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-md-6 mb-3">
                                        <div className="d-flex align-items-start">
                                            <div className="flex-shrink-0">
                                                <div className="bg-primary text-white rounded-circle d-flex align-items-center justify-content-center" style={{width: 40, height: 40}}>
                                                    <i className="fas fa-truck"></i>
                                                </div>
                                            </div>
                                            <div className="ms-3">
                                                <h6 className="mb-1">Pickup & Delivery</h6>
                                                <p className="text-muted mb-0 small">
                                                    Convenient pickup and delivery right to your door.
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-md-6 mb-3">
                                        <div className="d-flex align-items-start">
                                            <div className="flex-shrink-0">
                                                <div className="bg-primary text-white rounded-circle d-flex align-items-center justify-content-center" style={{width: 40, height: 40}}>
                                                    <i className="fas fa-star"></i>
                                                </div>
                                            </div>
                                            <div className="ms-3">
                                                <h6 className="mb-1">Customer First</h6>
                                                <p className="text-muted mb-0 small">
                                                    Your satisfaction is our top priority, always.
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                
                                <div className="text-center mt-4">
                                    <p className="text-muted mb-3">
                                        Ready to experience the best laundry service in Houston?
                                    </p>
                                    <a href="tel:(973)752-8237" className="btn btn-primary btn-lg">
                                        <FaPhone className="me-2" />
                                        Call Now: (973) 752-8237
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Contact;