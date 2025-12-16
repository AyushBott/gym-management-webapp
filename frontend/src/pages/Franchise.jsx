import { useState } from 'react';
import api from '../utils/api';

const Franchise = () => {
    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        phone: '',
        city: '',
        investmentCapacity: '',
        message: ''
    });
    const [submitted, setSubmitted] = useState(false);
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            await api.post('/franchise/inquire', formData);
            setSubmitted(true);
        } catch (error) {
            alert('Submission failed. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    if (submitted) {
        return (
            <div className="container section text-center">
                <h1>Thank You!</h1>
                <p style={{ fontSize: 'var(--font-size-lg)', margin: 'var(--spacing-2xl) 0' }}>
                    We've received your franchise inquiry. Our team will contact you within 24-48 hours.
                </p>
            </div>
        );
    }

    return (
        <div>
            <section style={{
                background: "linear-gradient(rgba(15, 52, 96, 0.9), rgba(15, 52, 96, 0.8)), url('/images/franchise-hero.png') center/cover no-repeat",
                padding: 'var(--spacing-3xl) 0',
                color: 'white',
                textAlign: 'center',
                minHeight: '400px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
            }}>
                <div className="container">
                    <h1>Franchise Opportunities</h1>
                    <p style={{ fontSize: 'var(--font-size-xl)', maxWidth: '700px', margin: '0 auto', color: 'rgba(255,255,255,0.9)' }}>
                        Partner with India's fastest-growing fitness platform and build a thriving business
                    </p>
                </div>
            </section>

            <div className="container section">
                <div className="grid grid-2" style={{ marginBottom: 'var(--spacing-3xl)' }}>
                    <div className="card">
                        <h3>💼 Business Benefits</h3>
                        <ul>
                            <li>Established brand recognition</li>
                            <li>Proven business model</li>
                            <li>Comprehensive training</li>
                            <li>Marketing support</li>
                        </ul>
                    </div>
                    <div className="card">
                        <h3>📈 Growth Potential</h3>
                        <ul>
                            <li>Booming fitness industry</li>
                            <li>Recurring revenue model</li>
                            <li>Technology-driven operations</li>
                            <li>Strong community engagement</li>
                        </ul>
                    </div>
                </div>

                <div className="card" style={{ maxWidth: '600px', margin: '0 auto' }}>
                    <h2>Apply for Franchise</h2>
                    <form onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label className="form-label">Full Name</label>
                            <input
                                type="text"
                                className="input"
                                value={formData.fullName}
                                onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label className="form-label">Email</label>
                            <input
                                type="email"
                                className="input"
                                value={formData.email}
                                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label className="form-label">Phone</label>
                            <input
                                type="tel"
                                className="input"
                                value={formData.phone}
                                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label className="form-label">City</label>
                            <input
                                type="text"
                                className="input"
                                value={formData.city}
                                onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                            />
                        </div>

                        <div className="form-group">
                            <label className="form-label">Investment Capacity</label>
                            <select
                                className="select"
                                value={formData.investmentCapacity}
                                onChange={(e) => setFormData({ ...formData, investmentCapacity: e.target.value })}
                            >
                                <option value="">Select Range</option>
                                <option value="50L-1Cr">₹50L - ₹1 Cr</option>
                                <option value="1Cr-2Cr">₹1 Cr - ₹2 Cr</option>
                                <option value="2Cr+">₹2 Cr+</option>
                            </select>
                        </div>

                        <div className="form-group">
                            <label className="form-label">Message (Optional)</label>
                            <textarea
                                className="textarea"
                                value={formData.message}
                                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                            ></textarea>
                        </div>

                        <button type="submit" className="btn btn-primary" style={{ width: '100%' }} disabled={loading}>
                            {loading ? 'Submitting...' : 'Submit Inquiry'}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Franchise;
