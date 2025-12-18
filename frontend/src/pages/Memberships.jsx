import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../utils/api';
import './Memberships.css';

const Memberships = () => {
    const [plans, setPlans] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    // Static fallback plans matching Home page
    const staticPlans = [
        {
            id: 1,
            name: 'Premium',
            price: 320,
            durationDays: 30,
            description: 'Perfect for serious fitness enthusiasts',
            isPopular: true,
            features: ['Professional Trainers', '24/7 Access', 'Personal Diet Guidance', 'Free Parking', 'Locker Access']
        },
        {
            id: 2,
            name: 'Advanced',
            price: 1200,
            durationDays: 90,
            description: 'Best value for long-term commitment',
            isPopular: false,
            features: ['All Premium Features', 'Quarterly Health Checkup', 'Priority Booking', 'Guest Passes (2/month)']
        },
        {
            id: 3,
            name: 'Basic',
            price: 99,
            durationDays: 30,
            description: 'Great for getting started',
            isPopular: false,
            features: ['Gym Access', 'Basic Equipment', 'Group Classes', 'Locker Access']
        },
        {
            id: 4,
            name: 'Family',
            price: 2500,
            durationDays: 90,
            description: 'Perfect for families up to 4 members',
            isPopular: false,
            features: ['4 Member Access', 'All Premium Features', 'Kids Zone Access', 'Family Events']
        }
    ];

    useEffect(() => {
        fetchPlans();
    }, []);

    const fetchPlans = async () => {
        try {
            const response = await api.get('/memberships/plans');
            if (response.data?.plans?.length > 0) {
                setPlans(response.data.plans);
            } else {
                setPlans(staticPlans);
            }
        } catch (error) {
            console.error('Error fetching plans:', error);
            setPlans(staticPlans);
        } finally {
            setLoading(false);
        }
    };

    const handlePurchase = (planId) => {
        navigate('/register');
    };

    return (
        <div className="memberships-page">
            {/* Page Header */}
            <div className="memberships-header">
                <div className="container">
                    <div className="double-arrow">
                        <span className="arrow-icon">»</span>
                        <span className="arrow-icon">»</span>
                    </div>
                    <h1>Membership <span className="text-accent">Plans</span></h1>
                    <p>Choose the perfect plan for your fitness journey</p>
                </div>
            </div>

            {/* Plans Section */}
            <section className="plans-section">
                <div className="container">
                    {loading ? (
                        <div className="loading-container">
                            <div className="spinner"></div>
                        </div>
                    ) : (
                        <div className="plans-grid">
                            {plans.map((plan, idx) => (
                                <div
                                    key={plan.id}
                                    className={`plan-card ${plan.isPopular ? 'featured' : ''}`}
                                    style={{ animationDelay: `${idx * 100}ms` }}
                                >
                                    {plan.isPopular && (
                                        <span className="plan-badge">Popular</span>
                                    )}
                                    <div className="plan-header">
                                        <h3>{plan.name}</h3>
                                        <p className="plan-description">{plan.description}</p>
                                    </div>
                                    <div className="plan-price">
                                        <span className="currency">₹</span>
                                        <span className="amount">{plan.price.toLocaleString()}</span>
                                        <span className="period">/{plan.durationDays} days</span>
                                    </div>
                                    <ul className="plan-features">
                                        {plan.features && Array.isArray(plan.features) && plan.features.map((feature, fidx) => (
                                            <li key={fidx}>
                                                <span className="feature-check">✓</span>
                                                {feature}
                                            </li>
                                        ))}
                                    </ul>
                                    <button
                                        className={`btn ${plan.isPopular ? 'btn-dark' : 'btn-primary'}`}
                                        onClick={() => handlePurchase(plan.id)}
                                    >
                                        Get Started
                                    </button>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </section>

            {/* Benefits Section */}
            <section className="benefits-section">
                <div className="container">
                    <div className="section-header text-center">
                        <div className="double-arrow">
                            <span className="arrow-icon">»</span>
                            <span className="arrow-icon">»</span>
                        </div>
                        <h2>Why Choose FitClass?</h2>
                        <p>Experience luxury fitness at its finest</p>
                    </div>
                    <div className="benefits-grid">
                        <div className="benefit-card">
                            <span className="benefit-icon">🏋️</span>
                            <h4>Premium Equipment</h4>
                            <p>State-of-the-art machines and free weights</p>
                        </div>
                        <div className="benefit-card">
                            <span className="benefit-icon">👨‍🏫</span>
                            <h4>Expert Trainers</h4>
                            <p>Certified professionals to guide your journey</p>
                        </div>
                        <div className="benefit-card">
                            <span className="benefit-icon">🧘</span>
                            <h4>Group Classes</h4>
                            <p>Yoga, HIIT, Zumba and more included</p>
                        </div>
                        <div className="benefit-card">
                            <span className="benefit-icon">🚿</span>
                            <h4>Luxury Amenities</h4>
                            <p>Spa, sauna, lockers, and showers</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* FAQ Section */}
            <section className="faq-section">
                <div className="container">
                    <div className="section-header text-center">
                        <h2>Frequently Asked Questions</h2>
                    </div>
                    <div className="faq-grid">
                        <div className="faq-item">
                            <h4>Can I freeze my membership?</h4>
                            <p>Yes, you can freeze your membership for up to 30 days per year at no extra cost.</p>
                        </div>
                        <div className="faq-item">
                            <h4>Is there a joining fee?</h4>
                            <p>No joining fees! The price you see is the price you pay.</p>
                        </div>
                        <div className="faq-item">
                            <h4>Can I upgrade my plan?</h4>
                            <p>Yes, you can upgrade anytime and we'll prorate the difference.</p>
                        </div>
                        <div className="faq-item">
                            <h4>What's the cancellation policy?</h4>
                            <p>You can cancel with 30 days notice. No hidden fees or penalties.</p>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Memberships;
