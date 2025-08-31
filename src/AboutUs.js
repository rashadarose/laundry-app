import React from 'react';
import { Link } from 'react-router-dom';
import { FaHeart, FaUsers, FaAward, FaStar, FaMapMarkerAlt, FaCalendarAlt, FaHandshake, FaShieldAlt, FaClock, FaLeaf } from 'react-icons/fa';

const AboutUs = () => {
  return (
    <div style={{ background: 'linear-gradient(135deg, #f8faff 0%, #e3f2fd 100%)', position: 'relative' }}>
      {/* Background Logo Overlay */}
      <div 
        className="position-fixed w-100 h-100"
        style={{
          backgroundImage: 'url(/fngologo1.png)',
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'center center',
          backgroundSize: '800px 800px',
          opacity: 0.03,
          zIndex: 0,
          pointerEvents: 'none',
          top: 0,
          left: 0
        }}
      />

      {/* Header */}
      <div className="container-fluid py-5 position-relative" style={{
        background: 'linear-gradient(135deg, #1e3a8a 0%, #3b82f6 50%, #06b6d4 100%)',
        zIndex: 1
      }}>
        <div className="container">
          <div className="text-center text-white">
            <h1 className="mb-3">About Fold N Go</h1>
            <p className="lead mb-0 opacity-75">Your trusted laundry service partner in Houston, Texas</p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container py-5 position-relative" style={{ zIndex: 1 }}>
        {/* Our Story */}
        <div className="row mb-5">
          <div className="col-lg-8 mx-auto">
            <div className="card border-0 shadow-sm">
              <div className="card-body p-5">
                <div className="text-center mb-4">
                  <FaHeart className="text-primary mb-3" size={48} />
                  <h2 className="mb-3">Our Story</h2>
                </div>
                <p className="lead text-muted mb-4">
                  Founded in 2025, Fold N Go is a proud subsidiary of <strong>Vibi Media LLC</strong>, 
                  a Houston-based parent company established in 2022. We recognized the need for 
                  reliable, convenient laundry services in our community and set out to transform 
                  the way people think about laundry care.
                </p>
                <p className="mb-4">
                  Located in the heart of Houston, Texas, we've built our reputation on three core 
                  principles: <strong>quality</strong>, <strong>convenience</strong>, and 
                  <strong>customer satisfaction</strong>. From our humble beginnings, we've grown 
                  into a trusted name that Houston families and professionals rely on for their 
                  laundry needs.
                </p>
                <p className="mb-0">
                  Every garment that comes through our doors is treated with the same care we'd 
                  give our own clothes. We're not just a laundry service – we're your neighbors, 
                  dedicated to making your life a little easier, one load at a time.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Company Info Cards */}
        <div className="row mb-5 g-4">
          <div className="col-md-4">
            <div className="card border-0 shadow-sm h-100">
              <div className="card-body text-center p-4">
                <FaMapMarkerAlt className="text-primary mb-3" size={36} />
                <h5 className="mb-2">Based in Houston</h5>
                <p className="text-muted mb-0">
                  Proudly serving the greater Houston, Texas area with local expertise and care.
                </p>
              </div>
            </div>
          </div>
          <div className="col-md-4">
            <div className="card border-0 shadow-sm h-100">
              <div className="card-body text-center p-4">
                <FaCalendarAlt className="text-primary mb-3" size={36} />
                <h5 className="mb-2">Established 2025</h5>
                <p className="text-muted mb-0">
                  A fresh approach to laundry service, built on years of industry experience.
                </p>
              </div>
            </div>
          </div>
          <div className="col-md-4">
            <div className="card border-0 shadow-sm h-100">
              <div className="card-body text-center p-4">
                <FaHandshake className="text-primary mb-3" size={36} />
                <h5 className="mb-2">Vibi Media LLC</h5>
                <p className="text-muted mb-0">
                  Part of the Vibi Media family, established in 2022 with a commitment to excellence.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Our Mission & Values */}
        <div className="row mb-5">
          <div className="col-lg-10 mx-auto">
            <div className="card border-0 shadow-sm">
              <div className="card-header bg-primary text-white py-4">
                <h3 className="mb-0 text-center">Our Mission & Values</h3>
              </div>
              <div className="card-body p-5">
                <div className="row g-4">
                  <div className="col-md-6">
                    <div className="d-flex align-items-start">
                      <FaShieldAlt className="text-primary me-3 mt-1" size={24} />
                      <div>
                        <h5 className="mb-2">Quality First</h5>
                        <p className="text-muted mb-0">
                          We use premium detergents, state-of-the-art equipment, and meticulous 
                          attention to detail to ensure your clothes look and feel their best.
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="d-flex align-items-start">
                      <FaClock className="text-primary me-3 mt-1" size={24} />
                      <div>
                        <h5 className="mb-2">Convenience</h5>
                        <p className="text-muted mb-0">
                          Your time is valuable. Our pickup and delivery service brings professional 
                          laundry care right to your doorstep.
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="d-flex align-items-start">
                      <FaUsers className="text-primary me-3 mt-1" size={24} />
                      <div>
                        <h5 className="mb-2">Customer Focus</h5>
                        <p className="text-muted mb-0">
                          Every interaction is an opportunity to exceed expectations. We listen, 
                          adapt, and continuously improve our service.
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="d-flex align-items-start">
                      <FaLeaf className="text-primary me-3 mt-1" size={24} />
                      <div>
                        <h5 className="mb-2">Eco-Friendly</h5>
                        <p className="text-muted mb-0">
                          We're committed to using environmentally responsible practices and 
                          eco-friendly products whenever possible.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Why Choose Us */}
        <div className="row mb-5">
          <div className="col-lg-8 mx-auto">
            <div className="card border-0 shadow-sm" style={{
              background: 'linear-gradient(135deg, #f0fdf4 0%, #ecfdf5 100%)'
            }}>
              <div className="card-body p-5">
                <div className="text-center mb-4">
                  <FaAward className="text-success mb-3" size={48} />
                  <h2 className="mb-3">Why Choose Fold N Go?</h2>
                </div>
                <div className="row">
                  <div className="col-md-6 mb-3">
                    <div className="d-flex align-items-center">
                      <FaStar className="text-warning me-2" />
                      <span>Professional-grade cleaning</span>
                    </div>
                  </div>
                  <div className="col-md-6 mb-3">
                    <div className="d-flex align-items-center">
                      <FaStar className="text-warning me-2" />
                      <span>Flexible pickup & delivery</span>
                    </div>
                  </div>
                  <div className="col-md-6 mb-3">
                    <div className="d-flex align-items-center">
                      <FaStar className="text-warning me-2" />
                      <span>Same-day & next-day options</span>
                    </div>
                  </div>
                  <div className="col-md-6 mb-3">
                    <div className="d-flex align-items-center">
                      <FaStar className="text-warning me-2" />
                      <span>Competitive pricing</span>
                    </div>
                  </div>
                  <div className="col-md-6 mb-3">
                    <div className="d-flex align-items-center">
                      <FaStar className="text-warning me-2" />
                      <span>Local Houston expertise</span>
                    </div>
                  </div>
                  <div className="col-md-6 mb-3">
                    <div className="d-flex align-items-center">
                      <FaStar className="text-warning me-2" />
                      <span>100% satisfaction guarantee</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Team Section */}
        <div className="row mb-5">
          <div className="col-lg-10 mx-auto">
            <div className="card border-0 shadow-sm">
              <div className="card-body p-5">
                <div className="text-center mb-4">
                  <FaUsers className="text-primary mb-3" size={48} />
                  <h2 className="mb-3">Our Team</h2>
                  <p className="lead text-muted">
                    Behind every perfectly cleaned garment is a team of dedicated professionals 
                    who take pride in their work.
                  </p>
                </div>
                <p className="text-center mb-0">
                  Our experienced staff undergoes continuous training to stay current with the 
                  latest cleaning techniques and fabric care methods. From our pickup drivers 
                  to our cleaning specialists, every team member is committed to delivering 
                  exceptional service that keeps our customers coming back.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="row">
          <div className="col-lg-8 mx-auto">
            <div className="card border-0 shadow-lg" style={{
              background: 'linear-gradient(135deg, #1e3a8a 0%, #3b82f6 50%, #06b6d4 100%)'
            }}>
              <div className="card-body text-center py-5">
                <h2 className="text-white mb-3">Ready to Experience the Difference?</h2>
                <p className="text-white-50 mb-4 lead">
                  Join hundreds of satisfied customers who trust Fold N Go with their laundry needs.
                </p>
                <div className="d-flex gap-3 justify-content-center flex-wrap">
                  <Link to="/pickup" className="btn btn-light btn-lg px-4">
                    Schedule Pickup
                  </Link>
                  <Link to="/contact" className="btn btn-outline-light btn-lg px-4">
                    Contact Us
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;