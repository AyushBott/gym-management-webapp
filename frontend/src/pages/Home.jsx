import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import api from '../utils/api';
import { useScrollReveal, useStagger } from '../hooks/useMotion';
import './Home.css';

const Home = () => {
    const [featuredCenters, setFeaturedCenters] = useState([]);
    const [heroLoaded, setHeroLoaded] = useState(false);
    const [email, setEmail] = useState('');
    const [activeFacility, setActiveFacility] = useState(0);

    // Scroll reveal refs
    const [trainingRef, trainingVisible] = useScrollReveal();
    const [plansRef, plansVisible] = useScrollReveal();
    const [successRef, successVisible] = useScrollReveal();
    const [facilitiesRef, facilitiesVisible] = useScrollReveal();
    const [testimonialsRef, testimonialsVisible] = useScrollReveal();
    const [newsletterRef, newsletterVisible] = useScrollReveal();
    const [centersRef, centersVisible] = useScrollReveal();

    // Stats count-up
    const [memberCount, setMemberCount] = useState(0);
    const [trainerCount, setTrainerCount] = useState(0);
    const [retentionRate, setRetentionRate] = useState(0);
    const [growthRate, setGrowthRate] = useState(0);

    useEffect(() => {
        fetchFeaturedContent();
        const timer = setTimeout(() => setHeroLoaded(true), 100);

        return () => {
            clearTimeout(timer);
        };
    }, []);

    useEffect(() => {
        if (successVisible) {
            animateCount(setMemberCount, 6154, 1000);
            animateCount(setTrainerCount, 350, 800);
            animateCount(setRetentionRate, 90, 800);
            animateCount(setGrowthRate, 20, 600);
        }
    }, [successVisible]);

    // Auto-scroll testimonials to center when visible
    useEffect(() => {
        if (testimonialsVisible) {
            const scrollContainer = document.querySelector('.testimonials-rows');
            if (scrollContainer) {
                // Scroll to center after a short delay for animation
                setTimeout(() => {
                    const scrollWidth = scrollContainer.scrollWidth;
                    const clientWidth = scrollContainer.clientWidth;
                    const centerPosition = (scrollWidth - clientWidth) / 2;
                    scrollContainer.scrollTo({
                        left: centerPosition,
                        behavior: 'smooth'
                    });
                }, 300);
            }
        }
    }, [testimonialsVisible]);

    const animateCount = (setter, target, duration) => {
        const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        if (prefersReducedMotion) {
            setter(target);
            return;
        }
        let start = null;
        const animate = (timestamp) => {
            if (!start) start = timestamp;
            const progress = Math.min((timestamp - start) / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            setter(Math.floor(eased * target));
            if (progress < 1) requestAnimationFrame(animate);
        };
        requestAnimationFrame(animate);
    };

    const fetchFeaturedContent = async () => {
        try {
            const centersRes = await api.get('/centers?limit=3');
            // Safely set centers, defaulting to empty array if data is undefined
            setFeaturedCenters(centersRes?.data?.centers || []);
        } catch (error) {
            console.error('Error fetching featured content:', error);
            // Ensure we always have an array even on error
            setFeaturedCenters([]);
        }
    };

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
            features: ['Up to 4 members', 'Shared benefits', 'Family workout sessions']
        }
    ];

    const testimonials = [
        // Row 1 testimonials
        {
            quote: "This gym is open 24 hours and is strategically located, which perfectly fits my busy schedule.",
            name: "Cristiano A.",
            duration: "4-Month Member",
            avatar: "/images/trainer-1.png"
        },
        {
            quote: "Just 3 months at FitClass, and I've already felt a massive change! The trainers are incredibly supportive, and the facilities are top-notch.",
            name: "Andi P.",
            duration: "6-Month Member",
            avatar: "/images/trainer-2.png"
        },
        {
            quote: "I was a bit skeptical at first, but the training program at FitClass exceeded all my expectations.",
            name: "Budi S.",
            duration: "8-Month Member",
            avatar: "/images/trainer-3.png"
        },
        {
            quote: "The classes are always fun and I've become so much more motivated. I look forward to my workouts because of the amazing trainers and motivating friends.",
            name: "Maya K.",
            duration: "5-Month Member",
            avatar: "/images/trainer-4.png"
        },
        {
            quote: "Amazing transformation in just 2 months! The personalized nutrition plans combined with expert training made all the difference.",
            name: "Rahul M.",
            duration: "2-Month Member",
            avatar: "/images/trainer-1.png"
        },
        {
            quote: "The yoga classes here are exceptional. Perfect blend of traditional techniques with modern wellness approaches.",
            name: "Sneha T.",
            duration: "9-Month Member",
            avatar: "/images/trainer-2.png"
        },
        {
            quote: "From beginner to fitness enthusiast - FitClass made my transformation possible with their step-by-step guidance.",
            name: "Vikram P.",
            duration: "1-Year Member",
            avatar: "/images/trainer-3.png"
        },
        // Row 2 testimonials
        {
            quote: "After an injury, I needed a place that could guide me back to my best shape. FitClass provided expert guidance and a safe environment.",
            name: "Samsulek",
            duration: "1-Year Member",
            avatar: "/images/trainer-4.png"
        },
        {
            quote: "I never thought I'd be this enthusiastic about working out. The community at FitClass is so welcoming and inclusive. I've made so many new friends!",
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
            quote: "The group fitness classes are incredible! High energy, great music, and instructors who really push you to achieve more.",
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
            description: 'Our functional training area features kettlebells, battle ropes, TRX systems, and plyometric boxes. Perfect for dynamic, full-body workouts that improve strength, flexibility, and coordination.'
        },
        {
            name: 'Locker Rooms & Showers',
            image: '/images/facility-locker.png',
            description: 'Luxury locker rooms with premium amenities, spacious showers, complimentary toiletries, and secure storage. Experience spa-like comfort before and after your workout.'
        },
        {
            name: 'Cardio Zone',
            image: '/images/facility-cardio.png',
            description: 'State-of-the-art cardio equipment including treadmills, ellipticals, rowing machines, and stationary bikes. Each machine features personal screens and heart rate monitoring.'
        },
        {
            name: 'Free Weight Area',
            image: '/images/facility-weights.png',
            description: 'Our spacious free weight area is equipped with a wide range of dumbbells, barbells, squat racks, and benches, catering to all strength levels. Designed for optimal safety and performance.'
        },
        {
            name: 'Group Class Studio',
            image: '/images/facility-group.png',
            description: 'Dedicated studio space for yoga, pilates, HIIT, spinning, and dance classes. Featuring premium sound systems and climate control for the perfect group workout experience.'
        },
        {
            name: 'Recovery Zone',
            image: '/images/facility-recovery.png',
            description: 'Complete recovery suite with foam rollers, stretching areas, massage chairs, and cryotherapy options. Essential for muscle recovery and injury prevention.'
        },
        {
            name: 'Nutrition Bar',
            image: '/images/facility-nutrition.png',
            description: 'Freshly made smoothies, protein shakes, and healthy snacks. Our nutrition experts can help you fuel your body with the right pre and post-workout nutrition.'
        }
    ];

    const handleNewsletterSubmit = (e) => {
        e.preventDefault();
        // Handle newsletter signup
        alert('Thanks for subscribing!');
        setEmail('');
    };

    return (
        <div className="home">
            {/* Hero Section */}
            <section className={`hero ${heroLoaded ? 'hero-loaded' : ''}`}>
                {/* Background Image */}
                <div className="hero-bg"></div>

                {/* Geometric Overlays */}
                <div className="hero-geometric">
                    <div className="geometric-left"></div>
                    <div className="geometric-right"></div>
                    <div className="geometric-bottom"></div>
                </div>

                {/* Content */}
                <div className="hero-content">
                    <h1 className="hero-title">
                        <span className="hero-title-line" style={{ animationDelay: '0ms' }}>Join</span>
                        <span className="hero-title-line hero-title-accent" style={{ animationDelay: '120ms' }}>Us</span>
                    </h1>
                    <p className="hero-tagline" style={{ animationDelay: '240ms' }}>
                        GET IN SHAPE <span className="highlight">WITH 20% OFF</span>
                    </p>
                    <p className="hero-subtitle" style={{ animationDelay: '360ms' }}>
                        Transform your body and mind with our world-class facilities,
                        expert trainers, and supportive community. Start your fitness
                        journey today and discover the best version of yourself.
                    </p>
                    <div className="hero-cta" style={{ animationDelay: '480ms' }}>
                        <Link to="/memberships" className="btn btn-cta-primary">Get started</Link>
                    </div>
                </div>
            </section>

            {/* Personal Training Section */}
            <section className="section training-section" ref={trainingRef}>
                <div className="container">
                    <div className="training-grid">
                        <div className={`training-content ${trainingVisible ? 'reveal' : ''}`}>
                            <div className="double-arrow">
                                <span className="arrow-icon">»</span>
                            </div>
                            <h2>Personal Training</h2>
                            <div className="training-offer">
                                <span className="offer-label">We Offer</span>
                                <p>
                                    Professional, personalized training programs designed for your
                                    specific goals and fitness level.
                                </p>
                                <Link to="/sessions" className="btn btn-secondary">Join →</Link>
                            </div>
                        </div>
                        <div className={`training-images ${trainingVisible ? 'reveal' : ''}`}>
                            <div className="training-image-main">
                                <img src="/images/personal-training-1.png" alt="Personal Training" loading="lazy" />
                            </div>
                            <div className="training-image-secondary">
                                <img src="/images/personal-training-2.png" alt="Group Training" loading="lazy" />
                                <div className="trainers-badge">
                                    <span className="trainers-count">+10</span>
                                    <span className="trainers-label">Personal Trainers</span>
                                </div>
                            </div>
                            <div className="training-description">
                                <p>
                                    Our certified trainers tailor programs to optimize your results.
                                    Whether building strength, losing weight, or improving endurance.
                                </p>
                                <Link to="/sessions" className="text-link">Schedule Now →</Link>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Membership Plans Section */}
            <section className="section plans-section" ref={plansRef}>
                <div className="container">
                    <div className={`plans-header ${plansVisible ? 'reveal' : ''}`}>
                        <div className="double-arrow">
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
                                    {plan.features.map((feature, i) => (
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

            {/* Success Stories Section */}
            <section className="section success-section bg-accent" ref={successRef}>
                <div className="container">
                    <div className={`success-header ${successVisible ? 'reveal' : ''}`}>
                        <div className="double-arrow dark">
                            <span className="arrow-icon">»</span>
                        </div>
                        <h2>Success Stories</h2>
                        <p>
                            Our members achieve remarkable transformations through dedication
                            and our expert guidance. Here's what the numbers say.
                        </p>
                        <Link to="/about" className="btn btn-outline-dark">Read More →</Link>
                    </div>
                    <div className="success-images">
                        <div className="success-image">
                            <img src="/images/success-stories-bg.png" alt="Success Story" loading="lazy" />
                        </div>
                        <div className="success-image">
                            <img src="/images/personal-training-1.png" alt="Training" loading="lazy" />
                        </div>
                    </div>
                    <div className="success-stats">
                        <div className={`stat-item ${successVisible ? 'reveal' : ''}`}>
                            <span className="stat-value">{memberCount.toLocaleString()}</span>
                            <span className="stat-label">Active Members<br />Across All Centers</span>
                        </div>
                        <div className={`stat-item ${successVisible ? 'reveal' : ''}`} style={{ animationDelay: '100ms' }}>
                            <span className="stat-value">{trainerCount}</span>
                            <span className="stat-label">Professional Trainers<br />Certified & Experienced</span>
                        </div>
                        <div className={`stat-item ${successVisible ? 'reveal' : ''}`} style={{ animationDelay: '200ms' }}>
                            <span className="stat-value">{retentionRate}%</span>
                            <span className="stat-label">Member Retention<br />Year Over Year</span>
                        </div>
                        <div className={`stat-item ${successVisible ? 'reveal' : ''}`} style={{ animationDelay: '300ms' }}>
                            <span className="stat-value">{growthRate}%</span>
                            <span className="stat-label">Annual Growth<br />Expanding Nationwide</span>
                        </div>
                    </div>
                </div>
            </section>

            {/* Our Facilities Section */}
            <section className="section facilities-section" ref={facilitiesRef}>
                <div className="container">
                    <div className={`facilities-header ${facilitiesVisible ? 'reveal' : ''}`}>
                        <div>
                            <h2>Our Facilities</h2>
                            <p>Train in our premium, cutting-edge facilities, meticulously designed for peak performance and unparalleled results. It's the ultimate environment to forge your inner champion.</p>
                        </div>
                        <Link to="/centers" className="btn btn-secondary">View All Facilities</Link>
                    </div>
                    <div className="facilities-content">
                        <div className={`facilities-list ${facilitiesVisible ? 'reveal' : ''}`}>
                            {facilities.map((facility, idx) => (
                                <button
                                    key={idx}
                                    className={`facility-item ${activeFacility === idx ? 'active' : ''}`}
                                    onClick={() => setActiveFacility(idx)}
                                >
                                    {facility.name}
                                </button>
                            ))}
                        </div>
                        <div className={`facilities-display ${facilitiesVisible ? 'reveal' : ''}`}>
                            <div className="facility-image-wrapper">
                                {facilities.map((facility, idx) => (
                                    <img
                                        key={idx}
                                        src={facility.image}
                                        alt={facility.name}
                                        className={`facility-image ${activeFacility === idx ? 'active' : ''}`}
                                    />
                                ))}
                            </div>
                            <p className="facility-description">{facilities[activeFacility].description}</p>
                            <Link to="/centers" className="btn btn-primary">View Detail</Link>
                        </div>
                    </div>
                </div>
            </section>

            {/* Testimonials Section */}
            <section className="section testimonials-section" ref={testimonialsRef}>
                <div className="container">
                    <div className={`testimonials-header ${testimonialsVisible ? 'reveal' : ''}`}>
                        <div>
                            <h2>Testimonials</h2>
                            <p>Hear what our community has to say! Real stories from FitClass members who have achieved their fitness goals and embraced a healthier lifestyle with us.</p>
                        </div>
                        <Link to="/about" className="btn btn-outline">View All Testimonials</Link>
                    </div>
                    <div className="testimonials-rows">
                        {/* First Row */}
                        <div className="testimonials-row">
                            {testimonials.slice(0, 7).map((testimonial, idx) => (
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
                        {/* Second Row - Offset from middle */}
                        <div className="testimonials-row testimonials-row-offset">
                            {testimonials.slice(7, 14).map((testimonial, idx) => (
                                <div
                                    key={idx + 7}
                                    className={`testimonial-card ${testimonialsVisible ? 'reveal' : ''}`}
                                    style={{ animationDelay: `${(idx + 7) * 80}ms` }}
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
            <section className="section newsletter-section" ref={newsletterRef}>
                <div className="container">
                    <div className="newsletter-grid">
                        <div className={`newsletter-content ${newsletterVisible ? 'reveal' : ''}`}>
                            <h2>Signup Our Newsletter To Get Update Information, Insight Or News</h2>
                            <form onSubmit={handleNewsletterSubmit} className="newsletter-form">
                                <input
                                    type="email"
                                    placeholder="Email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="input"
                                    required
                                />
                                <button type="submit" className="btn btn-primary">Subscribe</button>
                            </form>
                        </div>
                        <div className={`newsletter-image ${newsletterVisible ? 'reveal' : ''}`}>
                            <img src="/images/hero-gym-dark.png" alt="Gym" loading="lazy" />
                        </div>
                    </div>
                </div>
            </section>

            {/* Centers Section */}
            {featuredCenters.length > 0 && (
                <section className="section centers-section" ref={centersRef}>
                    <div className="container">
                        <div className={`section-header ${centersVisible ? 'reveal' : ''}`}>
                            <h2>Our Locations</h2>
                            <Link to="/centers" className="view-link">
                                View All <span className="arrow">→</span>
                            </Link>
                        </div>
                        <div className="centers-grid">
                            {featuredCenters.map((center, idx) => (
                                <Link
                                    to={`/centers/${center.slug}`}
                                    key={center.id}
                                    className={`center-card ${centersVisible ? 'reveal' : ''}`}
                                    style={{ animationDelay: `${idx * 100}ms` }}
                                >
                                    <div className="center-image">
                                        <img src={center.image || '/images/gym-center-default.png'} alt={center.name} loading="lazy" />
                                        <div className="center-overlay">
                                            <span>View Details →</span>
                                        </div>
                                    </div>
                                    <h4>{center.name}</h4>
                                    <p>{center.city}</p>
                                </Link>
                            ))}
                        </div>
                    </div>
                </section>
            )}
        </div>
    );
};

export default Home;
