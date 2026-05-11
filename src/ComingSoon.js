import React from 'react';
import { Link } from 'react-router-dom';
import { FaArrowLeft, FaRocket, FaClock, FaBell } from 'react-icons/fa';
import bg1 from './images/bg1.jpg';

const ComingSoon = ({ pageName = 'This page' }) => (
    <div
        className="min-vh-100 d-flex align-items-center"
        style={{
            background: 'linear-gradient(135deg, #eef4ff 0%, #dff2ff 45%, #f1f9ff 100%)',
            position: 'relative',
            overflow: 'hidden'
        }}
    >
        <div
            style={{
                backgroundImage: `url(${bg1})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                opacity: 0.06,
                position: 'absolute',
                inset: 0,
                pointerEvents: 'none'
            }}
        />

        <div
            style={{
                position: 'absolute',
                width: 360,
                height: 360,
                borderRadius: '50%',
                background: 'radial-gradient(circle, rgba(59,130,246,0.22) 0%, rgba(59,130,246,0) 70%)',
                top: -100,
                right: -60,
                pointerEvents: 'none'
            }}
        />

        <div className="container" style={{ position: 'relative', zIndex: 2 }}>
            <div className="row justify-content-center">
                <div className="col-lg-8 col-xl-7">
                    <div
                        className="card border-0 shadow-lg"
                        style={{
                            borderRadius: '22px',
                            background: 'rgba(255,255,255,0.78)',
                            backdropFilter: 'blur(10px)'
                        }}
                    >
                        <div className="card-body p-4 p-md-5 text-center">
                            <div
                                className="mx-auto mb-4 d-flex align-items-center justify-content-center"
                                style={{
                                    width: 78,
                                    height: 78,
                                    borderRadius: '20px',
                                    background: 'linear-gradient(135deg, #2563eb 0%, #06b6d4 100%)',
                                    color: '#fff'
                                }}
                            >
                                <FaRocket size={30} />
                            </div>

                            <h1 className="fw-bold mb-2" style={{ color: '#0f172a' }}>
                                {pageName} is Coming Soon
                            </h1>
                            <p className="mb-4" style={{ color: '#475569', fontSize: '1.08rem' }}>
                                We are polishing this experience to make it fast, clean, and worth the wait.
                            </p>

                            <div className="row g-3 text-start mb-4">
                                <div className="col-md-6">
                                    <div className="p-3 h-100 rounded-3" style={{ background: '#f8fbff' }}>
                                        <div className="d-flex align-items-center gap-2 mb-2" style={{ color: '#1d4ed8' }}>
                                            <FaClock />
                                            <strong>In Progress</strong>
                                        </div>
                                        <small className="text-muted">Design and functionality are actively being finalized.</small>
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="p-3 h-100 rounded-3" style={{ background: '#f8fbff' }}>
                                        <div className="d-flex align-items-center gap-2 mb-2" style={{ color: '#0891b2' }}>
                                            <FaBell />
                                            <strong>Stay Updated</strong>
                                        </div>
                                        <small className="text-muted">Check back soon or contact support for launch updates.</small>
                                    </div>
                                </div>
                            </div>

                            <div className="d-flex flex-column flex-sm-row gap-2 justify-content-center">
                                <Link to="/home" className="btn btn-primary px-4">
                                    <FaArrowLeft className="me-2" />
                                    Back to Home
                                </Link>
                                <Link to="/support" className="btn btn-outline-primary px-4">
                                    Contact Support
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
);

export default ComingSoon;