import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../utils/api';

const Memberships = () => {
    const [plans, setPlans] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        fetchPlans();
    }, []);

    const fetchPlans = async () => {
        try {
            const response = await api.get('/memberships/plans');
            setPlans(response.data.plans);
        } catch (error) {
            console.error('Error fetching plans:', error);
        } finally {
            setLoading(false);
        }
    };

    const handlePurchase = (planId) => {
        navigate('/register');
    };

    if (loading) return <div className="container section"><div className="spinner"></div></div>;

    return (
        <div className="container section">
            <div className="text-center" style={{ marginBottom: 'var(--spacing-3xl)' }}>
                <h1>Membership Plans</h1>
                <p style={{ fontSize: 'var(--font-size-lg)', color: 'var(--color-gray-600)' }}>
                    Choose the perfect plan for your fitness journey
                </p>
            </div>

            <div className="grid grid-3">
                {plans.map(plan => (
                    <div key={plan.id} className={`card ${plan.isPopular ? 'card-gradient' : ''}`} style={{ position: 'relative' }}>
                        {plan.isPopular && (
                            <div style={{ position: 'absolute', top: '-10px', right: '20px', background: 'var(--color-warning)', color: 'white', padding: '4px 12px', borderRadius: 'var(--radius-full)', fontSize: 'var(--font-size-sm)', fontWeight: '700' }}>
                                POPULAR
                            </div>
                        )}
                        <h2 style={{ color: plan.isPopular ? 'white' : 'inherit' }}>{plan.name}</h2>
                        <div style={{ fontSize: 'var(--font-size-4xl)', fontWeight: '800', margin: 'var(--spacing-lg) 0', color: plan.isPopular ? 'white' : 'var(--color-primary)' }}>
                            ₹{plan.price.toLocaleString()}
                            <span style={{ fontSize: 'var(--font-size-sm)', fontWeight: '400', color: plan.isPopular ? 'rgba(255,255,255,0.8)' : 'var(--color-gray-500)' }}>
                                /{plan.durationDays} days
                            </span>
                        </div>
                        <p style={{ marginBottom: 'var(--spacing-xl)', color: plan.isPopular ? 'rgba(255,255,255,0.9)' : 'inherit' }}>
                            {plan.description}
                        </p>
                        <ul style={{ listStyle: 'none', marginBottom: 'var(--spacing-xl)' }}>
                            {plan.features && Array.isArray(plan.features) && plan.features.map((feature, idx) => (
                                <li key={idx} style={{ padding: 'var(--spacing-sm) 0', color: plan.isPopular ? 'rgba(255,255,255,0.95)' : 'var(--color-gray-700)' }}>
                                    ✓ {feature}
                                </li>
                            ))}
                        </ul>
                        <button
                            className={`btn ${plan.isPopular ? 'btn-secondary' : 'btn-primary'}`}
                            style={{ width: '100%' }}
                            onClick={() => handlePurchase(plan.id)}
                        >
                            Get Started
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Memberships;
