import { useState } from 'react';
import api from '../utils/api';
import './Contact.css';

const Contact = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: ''
    });
    const [submitted, setSubmitted] = useState(false);
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            await api.post('/franchise/inquire', {
                fullName: formData.name,
                email: formData.email,
                phone: formData.phone,
                message: `Subject: ${formData.subject}\n\n${formData.message}`
            });
            setSubmitted(true);
        } catch (error) {
            console.error('Error submitting contact form:', error);
            alert('Failed to submit. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    const centers = [
        { city: 'Mumbai', address: '123 Bandra West, Mumbai 400050', phone: '+91 98765 43210' },
        { city: 'Delhi', address: '456 Connaught Place, New Delhi 110001', phone: '+91 98765 43211' },
        { city: 'Bangalore', address: '789 Indiranagar, Bangalore 560038', phone: '+91 98765 43212' },
        { city: 'Hyderabad', address: '101 Jubilee Hills, Hyderabad 500033', phone: '+91 98765 43213' }
    ];

    return (
        <div className="contact-page">
            {/* Hero Section */}
            <section className="contact-hero">
                <div className="container">
                    <h1>CONTACT US</h1>
                    <p>We'd love to hear from you. Get in touch with our team.</p>
                </div>
            </section>

            <section className="section">
                <div className="container">
                    <div className="contact-grid">
                        {/* Contact Form */}
                        <div className="contact-form-wrapper card">
                            {!submitted ? (
                                <>
                                    <h2>Send us a Message</h2>
                                    <form onSubmit={handleSubmit}>
                                        <div className="form-group">
                                            <label className="form-label">Name *</label>
                                            <input
                                                type="text"
                                                className="input"
                                                value={formData.name}
                                                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                                required
                                            />
                                        </div>
                                        <div className="form-row">
                                            <div className="form-group">
                                                <label className="form-label">Email *</label>
                                                <input
                                                    type="email"
                                                    className="input"
                                                    value={formData.email}
                                                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                                    required
                                                />
                                            </div>
                                            <div className="form-group">
                                                <label className="form-label">Phone *</label>
                                                <input
                                                    type="tel"
                                                    className="input"
                                                    value={formData.phone}
                                                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                                    required
                                                />
                                            </div>
                                        </div>
                                        <div className="form-group">
                                            <label className="form-label">Subject</label>
                                            <select
                                                className="select"
                                                value={formData.subject}
                                                onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                                            >
                                                <option value="">Select a topic</option>
                                                <option value="Membership Inquiry">Membership Inquiry</option>
                                                <option value="Franchise Inquiry">Franchise Inquiry</option>
                                                <option value="Feedback">Feedback</option>
                                                <option value="Support">Support</option>
                                                <option value="Other">Other</option>
                                            </select>
                                        </div>
                                        <div className="form-group">
                                            <label className="form-label">Message *</label>
                                            <textarea
                                                className="textarea"
                                                value={formData.message}
                                                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                                                required
                                            ></textarea>
                                        </div>
                                        <button type="submit" className="btn btn-primary" disabled={loading}>
                                            {loading ? 'Sending...' : 'Send Message'}
                                        </button>
                                    </form>
                                </>
                            ) : (
                                <div className="success-message">
                                    <span className="success-icon">✅</span>
                                    <h2>Message Sent!</h2>
                                    <p>Thank you for contacting us. We'll get back to you within 24 hours.</p>
                                </div>
                            )}
                        </div>

                        {/* Contact Info */}
                        <div className="contact-info">
                            <div className="info-card card">
                                <h3>📧 Email Us</h3>
                                <p>hello@fitclass.in</p>
                                <p>support@fitclass.in</p>
                            </div>
                            <div className="info-card card">
                                <h3>📞 Call Us</h3>
                                <p>+91 98765 43210</p>
                                <p>Mon-Sun: 5AM - 11PM</p>
                            </div>
                            <div className="info-card card">
                                <h3>🏢 Head Office</h3>
                                <p>FitnessHub Pvt. Ltd.</p>
                                <p>Tower A, Business Park</p>
                                <p>Bandra Kurla Complex</p>
                                <p>Mumbai 400051</p>
                            </div>
                            <div className="info-card card">
                                <h3>⏰ Operating Hours</h3>
                                <p><strong>Gym Hours:</strong> 5:00 AM - 11:00 PM</p>
                                <p><strong>VIP Access:</strong> 24/7</p>
                                <p><strong>Customer Support:</strong> 8:00 AM - 10:00 PM</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Map Section */}
            <section className="map-section">
                <div className="container">
                    <h2 className="text-center section-title">FIND US</h2>
                    <div className="map-container">
                        <iframe
                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3771.0085842377584!2d72.85654931488226!3d19.057855387098826!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7c8e123456789%3A0x1234567890abcdef!2sBandra%20Kurla%20Complex%2C%20Mumbai!5e0!3m2!1sen!2sin!4v1234567890123"
                            width="100%"
                            height="400"
                            style={{ border: 0, borderRadius: 'var(--radius-xl)' }}
                            allowFullScreen=""
                            loading="lazy"
                            referrerPolicy="no-referrer-when-downgrade"
                            title="FitClass Head Office Location"
                        ></iframe>
                    </div>
                </div>
            </section>

            {/* Centers List */}
            <section className="section" style={{ background: 'var(--color-gray-50)' }}>
                <div className="container">
                    <h2 className="text-center section-title">OUR CENTERS</h2>
                    <div className="centers-grid grid grid-4">
                        {centers.map((center, idx) => (
                            <div key={idx} className="center-info-card card">
                                <h4>📍 {center.city}</h4>
                                <p>{center.address}</p>
                                <p className="center-phone">{center.phone}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Contact;
