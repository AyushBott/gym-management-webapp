import { Link } from 'react-router-dom';
import { useState, useEffect, useRef } from 'react';
import './Home.css';

// Simple version of useScrollReveal for production
const useScrollReveal = () => {
    const ref = useRef(null);
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => setIsVisible(true), 100);
        return () => clearTimeout(timer);
    }, []);

    return [ref, isVisible];
};

const Home = () => {
    const [featuredCenters, setFeaturedCenters] = useState([]);
    const [heroLoaded, setHeroLoaded] = useState(false);
    const [email, setEmail] = useState('');
    const [activeFacility, setActiveFacility] = useState(0);

    // Simplified scroll reveal refs - always visible
    const trainingRef = useRef(null);
    const trainingVisible = true;
    const plansRef = useRef(null);
    const plansVisible = true;
    const successRef = useRef(null);
    const successVisible = true;
    const facilitiesRef = useRef(null);
    const facilitiesVisible = true;
    const testimonialsRef = useRef(null);
    const testimonialsVisible = true;
    const newsletterRef = useRef(null);
    const newsletterVisible = true;
    const centersRef = useRef(null);
    const centersVisible = true;

    // Stats - static values
    const memberCount = 6154;
    const trainerCount = 350;
    const retentionRate = 90;
    const growthRate = 20;

    useEffect(() => {
        setHeroLoaded(true);
        // Skip API calls in production if no backend
    }, []);

    const plans = [
        {
            name: 'Premium',
            price: '320',
            featured: true,
            features: ['Professional Trainers', '24/7 Access', 'Personal Diet Guidance', 'Free Parking']
        },
        {
            name: 'Advanced',
            price: '1200',
            features: ['Access to all equipment', 'HIIT/Strength plus classes', '2 personal training sessions']
        },
        {
            name: 'Basic',
            price: '700',
            features: ['Full gym access', '5 group classes/month', 'Locker room access']
        },
        {
            name: 'Family',
            price: '550',
            features: ['Access for up to 4 members', 'Kids club access', 'Family yoga sessions']
        }
    ];

    const testimonials = [
        {
            quote: "FitClass completely transformed my workout routine. The trainers are exceptional and the facilities are world-class. I've never felt better!",
            name: "Arya Smith",
            duration: "6-Month Member",
            avatar: "/images/trainer-1.png"
        },
        {
            quote: "The variety of classes keeps me motivated every single day. From HIIT to yoga, there's always something new to try.",
            name: "James Wilson",
            duration: "1-Year Member",
            avatar: "/images/trainer-2.png"
        },
        {
            quote: "As someone who was intimidated by gyms, FitClass made me feel welcome from day one. The supportive community is incredible.",
            name: "Maya Johansson",
            duration: "8-Month Member",
            avatar: "/images/trainer-3.png"
        },
        {
            quote: "After an injury, I needed a place that could guide me back to my best shape. FitClass provided expert guidance and a safe environment.",
            name: "Samsulek",
            duration: "1-Year Member",
            avatar: "/images/trainer-4.png"
        },
        {
            quote: "I never thought I'd be this enthusiastic about working out. The community at FitClass is so welcoming and inclusive!",
            name: "Ari Irham",
            duration: "3-Month Member",
            avatar: "/images/trainer-1.png"
        },
        {
            quote: "The facilities are incredibly comprehensive, from free weights to cardio areas, all modern and well-maintained.",
            name: "Iqbal Ramadhan",
            duration: "10-Month Member",
            avatar: "/images/trainer-2.png"
        },
        {
            quote: "Best decision I ever made was joining FitClass. Lost 15kg in 6 months with the help of my personal trainer!",
            name: "Priya S.",
            duration: "7-Month Member",
            avatar: "/images/trainer-3.png"
        },
        {
            quote: "The group fitness classes are incredible! High energy, great music, and instructors who really push you.",
            name: "Ananya R.",
            duration: "4-Month Member",
            avatar: "/images/trainer-4.png"
        },
        {
            quote: "Clean, modern facilities with top-of-the-line equipment. The staff is always helpful and the atmosphere is motivating.",
            name: "Karthik N.",
            duration: "6-Month Member",
            avatar: "/images/trainer-1.png"
        },
        {
            quote: "FitClass has become my second home. The 24/7 access means I can work out whenever it suits my schedule.",
            name: "Deepa V.",
            duration: "11-Month Member",
            avatar: "/images/trainer-2.png"
        }
    ];

    const facilities = [
        {
            name: 'Functional Training Area',
            image: '/images/facility-functional.png',
            description: 'Our functional training area features kettlebells, battle ropes, TRX systems, and plyometric boxes.'
        },
        {
            name: 'Locker Rooms & Showers',
            image: '/images/facility-locker.png',
            description: 'Luxury locker rooms with premium amenities, spacious showers, and complimentary toiletries.'
        },
        {
            name: 'Cardio Zone',
            image: '/images/facility-cardio.png',
            description: 'State-of-the-art cardio equipment including treadmills, ellipticals, and rowing machines.'
        },
        {
            name: 'Free Weight Area',
            image: '/images/facility-weights.png',
            description: 'Spacious free weight area equipped with dumbbells, barbells, squat racks, and benches.'
        },
        {
            name: 'Group Class Studio',
            image: '/images/facility-group.png',
            description: 'Dedicated studio space for yoga, pilates, HIIT, spinning, and dance classes.'
        },
        {
            name: 'Recovery Zone',
            image: '/images/facility-recovery.png',
            description: 'Complete recovery suite with foam rollers, stretching areas, and massage chairs.'
        },
        {
            name: 'Nutrition Bar',
            image: '/images/facility-nutrition.png',
            description: 'Freshly made smoothies, protein shakes, and healthy snacks to fuel your body.'
        }
    ];

    const handleNewsletterSubmit = (e) => {
        e.preventDefault();
        alert('Thanks for subscribing!');
        setEmail('');
    };

    return (
        <div className="home">
            {/* Hero Section */}
            <section className={`hero ${heroLoaded ? 'hero-loaded' : ''}`}>
                <div className="hero-bg"></div>
                <div className="hero-geometric">
                    <div className="geometric-left"></div>
                    <div className="geometric-right"></div>
                    <div className="geometric-bottom"></div>
                </div>
                <div className="hero-content">
                    <div className="hero-tagline">GET IN SHAPE WITH 20% OFF</div>
                    <h1 className="hero-headline">
                        Join <span className="text-accent">Us</span>
                    </h1>
                    <Link to="/register" className="btn btn-primary hero-cta">
                        Start Your Journey
                    </Link>
                </div>
            </section>

            {/* Training Section */}
            <section ref={trainingRef} className="section training-section">
                <div className="container">
                    <div className={`training-content ${trainingVisible ? 'reveal' : ''}`}>
                        <div className="double-arrow">
                            <span className="arrow-icon">»</span>
                            <span className="arrow-icon">»</span>
                        </div>
                        <div className="training-text">
                            <h2>Training with Experts</h2>
                            <p>Our certified trainers bring years of experience and passion to every session.</p>
                        </div>
                    </div>
                    <div className="training-images reveal">
                        <div className="training-image">
                            <img src="/images/personal-training-1.png" alt="Personal Training" />
                        </div>
                        <div className="training-image">
                            <img src="/images/personal-training-2.png" alt="Personal Training Session" />
                        </div>
                    </div>
                </div>
            </section>

            {/* Plans Section */}
            <section ref={plansRef} className="section plans-section">
                <div className="container">
                    <div className={`section-header text-center ${plansVisible ? 'reveal' : ''}`}>
                        <div className="double-arrow dark">
                            <span className="arrow-icon">»</span>
                            <span className="arrow-icon">»</span>
                        </div>
                        <h2>Flexible Membership Plans<br />To Suit Your Lifestyle</h2>
                    </div>
                    <div className="plans-grid">
                        {plans.map((plan, idx) => (
                            <div
                                key={idx}
                                className={`plan-card ${plan.featured ? 'featured' : ''} ${plansVisible ? 'reveal' : ''}`}
                                style={{ animationDelay: `${idx * 100}ms` }}
                            >
                                {plan.featured && <span className="plan-badge">Popular</span>}
                                <h3>{plan.name}</h3>
                                <div className="plan-price">
                                    <span className="price-amount">${plan.price}</span>
                                    <span className="price-period">/mo</span>
                                </div>
                                <ul className="plan-features">
                                    {(plan.features || []).map((feature, i) => (
                                        <li key={i}>
                                            <span className="check-icon">✓</span>
                                            {feature}
                                        </li>
                                    ))}
                                </ul>
                                <Link to="/memberships" className={`btn ${plan.featured ? 'btn-primary' : 'btn-secondary'}`}>
                                    Select Plan
                                </Link>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Success Stats Section */}
            <section ref={successRef} className="section success-section">
                <div className="container">
                    <div className={`success-grid ${successVisible ? 'reveal' : ''}`}>
                        <div className="success-content">
                            <div className="double-arrow">
                                <span className="arrow-icon">»</span>
                                <span className="arrow-icon">»</span>
                            </div>
                            <h2>Success Stories</h2>
                            <p>Join thousands who have transformed their lives</p>
                        </div>
                        <div className="success-stats">
                            <div className="stat-item">
                                <span className="stat-number">{memberCount.toLocaleString()}</span>
                                <span className="stat-label">Active Members</span>
                            </div>
                            <div className="stat-item">
                                <span className="stat-number">{trainerCount}+</span>
                                <span className="stat-label">Expert Trainers</span>
                            </div>
                            <div className="stat-item">
                                <span className="stat-number">{retentionRate}%</span>
                                <span className="stat-label">Member Retention</span>
                            </div>
                            <div className="stat-item">
                                <span className="stat-number">{growthRate}%</span>
                                <span className="stat-label">Year-over-Year Growth</span>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Facilities Section */}
            <section ref={facilitiesRef} className="section facilities-section">
                <div className="container">
                    <div className={`facilities-content ${facilitiesVisible ? 'reveal' : ''}`}>
                        <div className="facilities-left">
                            <div className="section-header">
                                <div className="double-arrow">
                                    <span className="arrow-icon">»</span>
                                    <span className="arrow-icon">»</span>
                                </div>
                                <h2>World-Class Facilities</h2>
                            </div>
                            <div className="facilities-list">
                                {facilities.map((facility, idx) => (
                                    <div
                                        key={idx}
                                        className={`facility-item ${activeFacility === idx ? 'active' : ''}`}
                                        onClick={() => setActiveFacility(idx)}
                                    >
                                        {facility.name}
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className="facilities-right">
                            {facilities.map((facility, idx) => (
                                <img
                                    key={idx}
                                    src={facility.image}
                                    alt={facility.name}
                                    className={`facility-image ${activeFacility === idx ? 'active' : ''}`}
                                />
                            ))}
                            <p className="facility-description">{facilities[activeFacility]?.description || ''}</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Testimonials Section */}
            <section ref={testimonialsRef} className="section testimonials-section">
                <div className="container">
                    <div className={`section-header text-center ${testimonialsVisible ? 'reveal' : ''}`}>
                        <div className="double-arrow dark">
                            <span className="arrow-icon">»</span>
                            <span className="arrow-icon">»</span>
                        </div>
                        <h2>What Our Members Say</h2>
                    </div>
                    <div className="testimonials-rows">
                        <div className="testimonials-row">
                            {testimonials.slice(0, 5).map((testimonial, idx) => (
                                <div
                                    key={idx}
                                    className={`testimonial-card ${testimonialsVisible ? 'reveal' : ''}`}
                                    style={{ animationDelay: `${idx * 80}ms` }}
                                >
                                    <div className="quote-icon">
                                        <span>❝</span>
                                    </div>
                                    <p className="testimonial-quote">{testimonial.quote}</p>
                                    <div className="testimonial-author">
                                        <img src={testimonial.avatar} alt={testimonial.name} />
                                        <div>
                                            <strong>{testimonial.name}</strong>
                                            <span>{testimonial.duration}</span>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div className="testimonials-row testimonials-row-offset">
                            {testimonials.slice(5, 10).map((testimonial, idx) => (
                                <div
                                    key={idx + 5}
                                    className={`testimonial-card ${testimonialsVisible ? 'reveal' : ''}`}
                                    style={{ animationDelay: `${(idx + 5) * 80}ms` }}
                                >
                                    <div className="quote-icon">
                                        <span>❝</span>
                                    </div>
                                    <p className="testimonial-quote">{testimonial.quote}</p>
                                    <div className="testimonial-author">
                                        <img src={testimonial.avatar} alt={testimonial.name} />
                                        <div>
                                            <strong>{testimonial.name}</strong>
                                            <span>{testimonial.duration}</span>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* Newsletter Section */}
            <section ref={newsletterRef} className="section newsletter-section">
                <div className="container">
                    <div className={`newsletter-grid ${newsletterVisible ? 'reveal' : ''}`}>
                        <div className="newsletter-content">
                            <h2>Stay Updated with FitClass</h2>
                            <p>Subscribe to our newsletter for tips, updates, and exclusive offers.</p>
                        </div>
                        <form className="newsletter-form" onSubmit={handleNewsletterSubmit}>
                            <input
                                type="email"
                                placeholder="Enter your email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                            <button type="submit" className="btn btn-primary">Subscribe</button>
                        </form>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Home;
