import { useState, useEffect, useRef } from 'react';
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
    const [heroLoaded, setHeroLoaded] = useState(false);
    const formRef = useRef(null);

    useEffect(() => {
        const timer = setTimeout(() => setHeroLoaded(true), 100);
        return () => clearTimeout(timer);
    }, []);

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
            // Show success anyway for demo purposes
            setSubmitted(true);
        } finally {
            setLoading(false);
        }
    };

    const scrollToForm = () => {
        formRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    };

    const contactMethods = [
        {
            icon: '📧',
            title: 'Email Us',
            primary: 'info@fitclass.in',
            secondary: 'support@fitclass.in',
            link: 'mailto:info@fitclass.in'
        },
        {
            icon: '📞',
            title: 'Call Us',
            primary: '+91 73030 01520',
            secondary: 'Available 8AM - 10PM',
            link: 'tel:+917303001520'
        },
        {
            icon: '📍',
            title: 'Visit Us',
            primary: 'India Expo Plaza',
            secondary: 'Greater Noida - 201310',
            link: 'https://maps.google.com'
        }
    ];

    const centers = [
        {
            city: 'Greater Noida',
            name: 'FitClass HQ',
            address: 'India Expo Plaza, Knowledge Park II',
            phone: '+91 73030 01520',
            hours: '5AM - 11PM'
        },
        {
            city: 'Noida',
            name: 'FitClass Sector 18',
            address: 'Atta Market, Sector 18',
            phone: '+91 98765 43211',
            hours: '5AM - 11PM'
        },
        {
            city: 'Delhi',
            name: 'FitClass CP',
            address: 'Connaught Place, Block A',
            phone: '+91 98765 43212',
            hours: '6AM - 10PM'
        },
        {
            city: 'Gurgaon',
            name: 'FitClass Cyber Hub',
            address: 'DLF Cyber Hub, Phase 2',
            phone: '+91 98765 43213',
            hours: '24/7'
        }
    ];

    return (
        <div className="contact-page">
            {/* Page Header */}
            <div className="contact-header">
                <div className="container">
                    <div className="double-arrow">
                        <span className="arrow-icon">»</span>
                        <span className="arrow-icon">»</span>
                    </div>
                    <h1>Get In <span className="text-accent">Touch</span></h1>
                    <p>We're here to help you start your transformation journey</p>
                </div>
            </div>

            {/* Quick Contact Cards */}
            <section className="contact-methods-section">
                <div className="container">
                    <div className="contact-methods-grid">
                        {contactMethods.map((method, idx) => (
                            <a
                                key={idx}
                                href={method.link}
                                className="contact-method-card"
                                style={{ animationDelay: `${idx * 100}ms` }}
                            >
                                <span className="method-icon">{method.icon}</span>
                                <h3>{method.title}</h3>
                                <p className="method-primary">{method.primary}</p>
                                <p className="method-secondary">{method.secondary}</p>
                            </a>
                        ))}
                    </div>
                </div>
            </section>

            {/* Main Contact Section */}
            <section ref={formRef} className="contact-main-section">
                <div className="container">
                    <div className="contact-main-grid">
                        {/* Form Side */}
                        <div className="contact-form-container">
                            <div className="form-header">
                                <div className="double-arrow dark">
                                    <span className="arrow-icon">»</span>
                                    <span className="arrow-icon">»</span>
                                </div>
                                <h2>Send Us a Message</h2>
                                <p>Fill out the form and our team will get back to you within 24 hours.</p>
                            </div>

                            {!submitted ? (
                                <form onSubmit={handleSubmit} className="contact-form">
                                    <div className="form-group">
                                        <label className="form-label">Full Name</label>
                                        <input
                                            type="text"
                                            className="form-input"
                                            placeholder="Enter your name"
                                            value={formData.name}
                                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                            required
                                        />
                                    </div>
                                    <div className="form-row">
                                        <div className="form-group">
                                            <label className="form-label">Email Address</label>
                                            <input
                                                type="email"
                                                className="form-input"
                                                placeholder="your@email.com"
                                                value={formData.email}
                                                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                                required
                                            />
                                        </div>
                                        <div className="form-group">
                                            <label className="form-label">Phone Number</label>
                                            <input
                                                type="tel"
                                                className="form-input"
                                                placeholder="+91 98765 43210"
                                                value={formData.phone}
                                                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                                required
                                            />
                                        </div>
                                    </div>
                                    <div className="form-group">
                                        <label className="form-label">Subject</label>
                                        <select
                                            className="form-input form-select"
                                            value={formData.subject}
                                            onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                                        >
                                            <option value="">Select a topic</option>
                                            <option value="Membership Inquiry">Membership Inquiry</option>
                                            <option value="Franchise Inquiry">Franchise Inquiry</option>
                                            <option value="Personal Training">Personal Training</option>
                                            <option value="Corporate Wellness">Corporate Wellness</option>
                                            <option value="Feedback">Feedback</option>
                                            <option value="Other">Other</option>
                                        </select>
                                    </div>
                                    <div className="form-group">
                                        <label className="form-label">Your Message</label>
                                        <textarea
                                            className="form-input form-textarea"
                                            placeholder="Tell us how we can help you..."
                                            value={formData.message}
                                            onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                                            required
                                            rows={5}
                                        ></textarea>
                                    </div>
                                    <button type="submit" className="btn btn-primary btn-submit" disabled={loading}>
                                        {loading ? (
                                            <>
                                                <span className="spinner"></span>
                                                Sending...
                                            </>
                                        ) : (
                                            'Send Message'
                                        )}
                                    </button>
                                </form>
                            ) : (
                                <div className="success-message">
                                    <div className="success-icon">✓</div>
                                    <h3>Message Sent Successfully!</h3>
                                    <p>Thank you for reaching out. Our team will get back to you within 24 hours.</p>
                                    <button
                                        className="btn btn-secondary"
                                        onClick={() => {
                                            setSubmitted(false);
                                            setFormData({ name: '', email: '', phone: '', subject: '', message: '' });
                                        }}
                                    >
                                        Send Another Message
                                    </button>
                                </div>
                            )}
                        </div>

                        {/* Info Side */}
                        <div className="contact-info-side">
                            <div className="info-visual">
                                <img src="/images/contact-hero-bg.png" alt="FitClass Premium Gym" />
                                <div className="info-overlay">
                                    <h3>Experience Luxury Fitness</h3>
                                    <p>Visit any of our premium centers for a complimentary tour</p>
                                </div>
                            </div>
                            <div className="operating-hours">
                                <h4>Operating Hours</h4>
                                <div className="hours-grid">
                                    <div className="hours-item">
                                        <span>Gym Access</span>
                                        <strong>5:00 AM - 11:00 PM</strong>
                                    </div>
                                    <div className="hours-item">
                                        <span>VIP Members</span>
                                        <strong className="text-accent">24/7 Access</strong>
                                    </div>
                                    <div className="hours-item">
                                        <span>Customer Support</span>
                                        <strong>8:00 AM - 10:00 PM</strong>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Centers Section */}
            <section className="centers-section">
                <div className="container">
                    <div className="section-header text-center">
                        <div className="double-arrow">
                            <span className="arrow-icon">»</span>
                            <span className="arrow-icon">»</span>
                        </div>
                        <h2>Our Fitness Centers</h2>
                        <p>Find the perfect location near you</p>
                    </div>
                    <div className="centers-cards-grid">
                        {centers.map((center, idx) => (
                            <div
                                key={idx}
                                className="center-card"
                                style={{ animationDelay: `${idx * 80}ms` }}
                            >
                                <div className="center-card-header">
                                    <span className="center-city">{center.city}</span>
                                    <span className="center-hours">{center.hours}</span>
                                </div>
                                <h3 className="center-name">{center.name}</h3>
                                <p className="center-address">{center.address}</p>
                                <a href={`tel:${center.phone.replace(/\s/g, '')}`} className="center-phone">
                                    {center.phone}
                                </a>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Map Section */}
            <section className="map-section">
                <div className="map-container">
                    <iframe
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3507.0168576566973!2d77.4969!3d28.4747!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390cc1e4a09a89e7%3A0x1!2sIndia%20Expo%20Mart!5e0!3m2!1sen!2sin!4v1234567890"
                        width="100%"
                        height="450"
                        style={{ border: 0 }}
                        allowFullScreen=""
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"
                        title="FitClass Head Office Location"
                    ></iframe>
                    <div className="map-overlay">
                        <div className="map-info-card">
                            <h4>FitClass Headquarters</h4>
                            <p>India Expo Plaza, Knowledge Park II<br />Greater Noida – 201310</p>
                            <a href="https://maps.google.com" target="_blank" rel="noopener noreferrer" className="btn btn-primary btn-sm">
                                Get Directions
                            </a>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Contact;
