import React, { useState } from 'react';
import { FaPhone, FaEnvelope, FaClock, FaQuestionCircle, FaHeadset, FaWhatsapp, FaComments } from 'react-icons/fa';

function Support() {
  const [selectedCategory, setSelectedCategory] = useState('general');
  const [contactForm, setContactForm] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
    priority: 'medium'
  });
  const [submitStatus, setSubmitStatus] = useState('');

  const supportCategories = {
    general: 'General Questions',
    order: 'Order Issues',
    billing: 'Billing & Payment',
    pickup: 'Pickup & Delivery',
    quality: 'Service Quality',
    account: 'Account Help'
  };

  const commonQuestions = {
    general: [
      { q: "What areas do you serve?", a: "We currently serve the greater Houston metro area. Enter your zip code to check if we deliver to your location." },
      { q: "What are your operating hours?", a: "We're open Monday-Saturday 7AM-9PM, Sunday 9AM-6PM. Pickup and delivery windows vary by location." },
      { q: "How do I schedule a pickup?", a: "Simply go to our 'Pick Up' page, enter your details, select your preferred time slot, and we'll handle the rest!" }
    ],
    order: [
      { q: "How can I track my order?", a: "You'll receive SMS updates at each stage. You can also call us with your order confirmation number for real-time status." },
      { q: "Can I modify my pickup time?", a: "Yes! Call us at least 2 hours before your scheduled pickup time to make changes." },
      { q: "What if I miss my pickup window?", a: "No worries! Call us immediately and we'll reschedule at no extra charge." }
    ],
    billing: [
      { q: "What payment methods do you accept?", a: "We accept all major credit cards, debit cards, and digital payments through our secure Stripe integration." },
      { q: "When am I charged?", a: "Payment is processed after we confirm your order weight and services at pickup." },
      { q: "Do you offer refunds?", a: "Yes! We offer full refunds for service issues. Contact us within 24 hours of delivery." }
    ],
    pickup: [
      { q: "Do I need to be home for pickup?", a: "Not necessarily! You can leave your laundry in a secure location and provide special instructions." },
      { q: "What should I put my laundry in?", a: "Any bag or basket works! We'll return your clean laundry in the same container." },
      { q: "Can you handle delicate items?", a: "Absolutely! Select our 'Premium Care' service for special handling of delicate fabrics." }
    ],
    quality: [
      { q: "What if I'm not satisfied with the cleaning?", a: "We guarantee our work! Contact us within 24 hours and we'll re-clean your items at no charge." },
      { q: "Do you handle stain removal?", a: "Yes! We treat common stains as part of our service. Tough stains may require our premium service." },
      { q: "Can I request specific detergents?", a: "Yes! Let us know about allergies or preferences in the special instructions when booking." }
    ],
    account: [
      { q: "How do I reset my password?", a: "Click 'Forgot Password' on the sign-in page. We'll send you a reset link via email." },
      { q: "Can I save multiple addresses?", a: "Currently you can update your address for each order. Account preferences are coming soon!" },
      { q: "How do I delete my account?", a: "Email us at support@foldngo.us with your account details and we'll process your request within 24 hours." }
    ]
  };

  const handleContactSubmit = async (e) => {
    e.preventDefault();
    setSubmitStatus('sending');
    
    try {
      const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:3002';
      const response = await fetch(`${API_URL}/api/support`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(contactForm)
      });
      
      if (response.ok) {
        setSubmitStatus('success');
        setContactForm({
          name: '', email: '', phone: '', subject: '', message: '', priority: 'medium'
        });
        setTimeout(() => setSubmitStatus(''), 5000);
      } else {
        setSubmitStatus('error');
      }
    } catch (error) {
      console.error('Support form error:', error);
      setSubmitStatus('error');
    }
  };

  const handleInputChange = (e) => {
    setContactForm({
      ...contactForm,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="min-vh-100" style={{ background: 'linear-gradient(135deg, #f8faff 0%, #e3f2fd 100%)' }}>
      {/* Header */}
      <div className="container-fluid py-5" style={{
        background: 'linear-gradient(135deg, #1e3a8a 0%, #3b82f6 50%, #06b6d4 100%)'
      }}>
        <div className="container text-center text-white">
          <h1 className="display-4 fw-bold mb-3">
            <FaHeadset className="me-3" />
            Support Center
          </h1>
          <p className="lead">We're here to help! Get answers fast or reach out directly.</p>
        </div>
      </div>

      <div className="container py-5">
        {/* Quick Contact Cards */}
        <div className="row mb-5">
          <div className="col-md-4 mb-3">
            <div className="card border-0 shadow-sm h-100 text-center p-4" style={{ 
              background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
              color: 'white'
            }}>
              <FaPhone size={40} className="mb-3" />
              <h5>Call Us Now</h5>
              <p className="mb-2">(713) 555-WASH</p>
              <small>Mon-Sat 7AM-9PM<br/>Sun 9AM-6PM</small>
            </div>
          </div>
          <div className="col-md-4 mb-3">
            <div className="card border-0 shadow-sm h-100 text-center p-4" style={{ 
              background: 'linear-gradient(135deg, #3b82f6 0%, #1e40af 100%)',
              color: 'white'
            }}>
              <FaWhatsapp size={40} className="mb-3" />
              <h5>WhatsApp</h5>
              <p className="mb-2">(713) 555-WASH</p>
              <small>Quick responses<br/>7 days a week</small>
            </div>
          </div>
          <div className="col-md-4 mb-3">
            <div className="card border-0 shadow-sm h-100 text-center p-4" style={{ 
              background: 'linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%)',
              color: 'white'
            }}>
              <FaEnvelope size={40} className="mb-3" />
              <h5>Email Support</h5>
              <p className="mb-2">support@foldngo.us</p>
              <small>Response within<br/>2-4 hours</small>
            </div>
          </div>
        </div>

        <div className="row">
          {/* FAQ Section */}
          <div className="col-lg-8 mb-5">
            <div className="card border-0 shadow-sm">
              <div className="card-header bg-white py-4">
                <h3 className="mb-0">
                  <FaQuestionCircle className="me-2 text-primary" />
                  Frequently Asked Questions
                </h3>
              </div>
              <div className="card-body">
                {/* Category Tabs */}
                <div className="mb-4">
                  <div className="btn-group flex-wrap" role="group">
                    {Object.entries(supportCategories).map(([key, label]) => (
                      <button
                        key={key}
                        type="button"
                        className={`btn ${selectedCategory === key ? 'btn-primary' : 'btn-outline-primary'} btn-sm`}
                        onClick={() => setSelectedCategory(key)}
                      >
                        {label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* FAQ Content */}
                <div className="accordion" id="faqAccordion">
                  {commonQuestions[selectedCategory]?.map((faq, index) => (
                    <div key={index} className="accordion-item border-0 mb-2">
                      <h2 className="accordion-header">
                        <button
                          className="accordion-button collapsed bg-light"
                          type="button"
                          data-bs-toggle="collapse"
                          data-bs-target={`#faq${selectedCategory}${index}`}
                          style={{ borderRadius: '8px' }}
                        >
                          <strong>{faq.q}</strong>
                        </button>
                      </h2>
                      <div
                        id={`faq${selectedCategory}${index}`}
                        className="accordion-collapse collapse"
                        data-bs-parent="#faqAccordion"
                      >
                        <div className="accordion-body bg-light" style={{ borderRadius: '0 0 8px 8px' }}>
                          {faq.a}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="col-lg-4">
            <div className="card border-0 shadow-sm">
              <div className="card-header bg-white py-4">
                <h4 className="mb-0">
                  <FaComments className="me-2 text-primary" />
                  Contact Us
                </h4>
                <small className="text-muted">Can't find what you're looking for?</small>
              </div>
              <div className="card-body">
                <form onSubmit={handleContactSubmit}>
                  <div className="mb-3">
                    <label className="form-label">Name *</label>
                    <input
                      type="text"
                      className="form-control"
                      name="name"
                      value={contactForm.name}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  
                  <div className="mb-3">
                    <label className="form-label">Email *</label>
                    <input
                      type="email"
                      className="form-control"
                      name="email"
                      value={contactForm.email}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  
                  <div className="mb-3">
                    <label className="form-label">Phone</label>
                    <input
                      type="tel"
                      className="form-control"
                      name="phone"
                      value={contactForm.phone}
                      onChange={handleInputChange}
                    />
                  </div>

                  <div className="mb-3">
                    <label className="form-label">Priority</label>
                    <select
                      className="form-select"
                      name="priority"
                      value={contactForm.priority}
                      onChange={handleInputChange}
                    >
                      <option value="low">Low - General inquiry</option>
                      <option value="medium">Medium - Order question</option>
                      <option value="high">High - Service issue</option>
                      <option value="urgent">Urgent - Problem with current order</option>
                    </select>
                  </div>
                  
                  <div className="mb-3">
                    <label className="form-label">Subject *</label>
                    <input
                      type="text"
                      className="form-control"
                      name="subject"
                      value={contactForm.subject}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  
                  <div className="mb-3">
                    <label className="form-label">Message *</label>
                    <textarea
                      className="form-control"
                      rows="4"
                      name="message"
                      value={contactForm.message}
                      onChange={handleInputChange}
                      required
                    ></textarea>
                  </div>

                  <button
                    type="submit"
                    className="btn btn-primary w-100"
                    disabled={submitStatus === 'sending'}
                  >
                    {submitStatus === 'sending' ? 'Sending...' : 'Send Message'}
                  </button>

                  {submitStatus === 'success' && (
                    <div className="alert alert-success mt-3 mb-0">
                      <small>✅ Message sent! We'll respond within 2-4 hours.</small>
                    </div>
                  )}
                  
                  {submitStatus === 'error' && (
                    <div className="alert alert-danger mt-3 mb-0">
                      <small>❌ Failed to send. Please try calling us instead.</small>
                    </div>
                  )}
                </form>
              </div>
            </div>

            {/* Emergency Contact */}
            <div className="card border-0 shadow-sm mt-4" style={{ 
              background: 'linear-gradient(135deg, #fef3c7 0%, #fde68a 100%)',
              border: '2px solid #f59e0b'
            }}>
              <div className="card-body text-center">
                <h6 className="text-warning mb-2">
                  <FaClock className="me-2" />
                  Need Urgent Help?
                </h6>
                <p className="small mb-2">For same-day issues or emergencies:</p>
                <a href="tel:+17135559274" className="btn btn-warning btn-sm">
                  <FaPhone className="me-1" />
                  Call Emergency Line
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Service Hours */}
        <div className="row mt-5">
          <div className="col-12">
            <div className="card border-0 shadow-sm">
              <div className="card-body text-center py-4">
                <h5 className="mb-3">
                  <FaClock className="me-2 text-primary" />
                  Support Hours
                </h5>
                <div className="row">
                  <div className="col-md-3">
                    <strong>Phone Support</strong><br/>
                    <small>Mon-Sat: 7AM-9PM<br/>Sun: 9AM-6PM</small>
                  </div>
                  <div className="col-md-3">
                    <strong>WhatsApp</strong><br/>
                    <small>Daily: 7AM-10PM<br/>Quick responses</small>
                  </div>
                  <div className="col-md-3">
                    <strong>Email</strong><br/>
                    <small>24/7 submissions<br/>2-4 hour response</small>
                  </div>
                  <div className="col-md-3">
                    <strong>Emergency</strong><br/>
                    <small>Same-day issues<br/>Available during service hours</small>
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

export default Support;