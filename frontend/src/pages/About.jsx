import './About.css';

const About = () => {
    const milestones = [
        { year: '2018', event: 'FitClass founded in Mumbai' },
        { year: '2019', event: 'Expanded to 5 cities' },
        { year: '2020', event: 'Launched digital platform' },
        { year: '2021', event: 'Reached 5,000+ members' },
        { year: '2022', event: '15 centers across India' },
        { year: '2024', event: '25+ centers, 10,000+ members' }
    ];

    const team = [
        { name: 'Rajesh Kumar', role: 'Founder & CEO', image: '/images/trainer-1.png' },
        { name: 'Priya Sharma', role: 'Head of Operations', image: '/images/trainer-2.png' },
        { name: 'Amit Singh', role: 'Chief Fitness Officer', image: '/images/trainer-3.png' }
    ];

    const partners = [
        'Technogym', 'Life Fitness', 'Nike', 'Adidas', 'Puma', 'Under Armour'
    ];

    return (
        <div className="about-page">
            {/* Hero Section */}
            <section className="about-hero">
                <div className="container">
                    <h1>ABOUT FITCLASS</h1>
                    <p className="hero-subtitle">India's Premier Luxury Fitness Experience</p>
                    <p className="brand-note">FitClass is a premium brand powered by FitnessHub Pvt. Ltd.</p>
                </div>
            </section>

            {/* Story Section */}
            <section className="section">
                <div className="container">
                    <div className="story-content">
                        <div className="story-text">
                            <h2>OUR STORY</h2>
                            <p>
                                Founded in 2018, FitClass was born from a simple frustration: why should busy professionals
                                waste time waiting for equipment at the gym? We believed fitness should be efficient,
                                luxurious, and accessible.
                            </p>
                            <p>
                                Today, FitClass operates 25+ premium fitness centers across India, serving over 10,000
                                members who value their time as much as their health. We've pioneered the "Zero Wait Time"
                                concept with multiple machines for every muscle group.
                            </p>
                        </div>
                        <div className="story-image">
                            <img src="/images/gym-center-default.png" alt="FitClass Center" />
                        </div>
                    </div>
                </div>
            </section>

            {/* Mission & Values */}
            <section className="section" style={{ background: 'var(--color-gray-50)' }}>
                <div className="container">
                    <h2 className="text-center section-title">OUR MISSION</h2>
                    <p className="mission-statement text-center">
                        "To make premium fitness accessible to every Indian who values their time and health,
                        through world-class facilities, expert training, and cutting-edge technology."
                    </p>
                    <div className="values-grid grid grid-3">
                        <div className="value-card card">
                            <div className="value-icon">⚡</div>
                            <h3>Efficiency</h3>
                            <p>Your time is precious. We ensure zero wait times and maximum results.</p>
                        </div>
                        <div className="value-card card">
                            <div className="value-icon">💎</div>
                            <h3>Excellence</h3>
                            <p>Premium equipment, certified trainers, and luxury amenities.</p>
                        </div>
                        <div className="value-card card">
                            <div className="value-icon">🤝</div>
                            <h3>Community</h3>
                            <p>A supportive environment where members inspire each other.</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Timeline */}
            <section className="section">
                <div className="container">
                    <h2 className="text-center section-title">OUR JOURNEY</h2>
                    <div className="timeline">
                        {milestones.map((milestone, idx) => (
                            <div key={idx} className="timeline-item">
                                <div className="timeline-year">{milestone.year}</div>
                                <div className="timeline-event">{milestone.event}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Leadership Team */}
            <section className="section" style={{ background: 'var(--color-gray-50)' }}>
                <div className="container">
                    <h2 className="text-center section-title">LEADERSHIP TEAM</h2>
                    <div className="team-grid grid grid-3">
                        {team.map((member, idx) => (
                            <div key={idx} className="team-card card">
                                <div className="team-image">
                                    <img src={member.image} alt={member.name} />
                                </div>
                                <h4>{member.name}</h4>
                                <p>{member.role}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Safety & Cleanliness */}
            <section className="section safety-section">
                <div className="container">
                    <h2 className="text-center section-title">SAFETY & HYGIENE</h2>
                    <div className="safety-grid grid grid-4">
                        <div className="safety-item">
                            <span className="safety-icon">🧹</span>
                            <h4>Hourly Sanitization</h4>
                            <p>Equipment cleaned every 60 minutes</p>
                        </div>
                        <div className="safety-item">
                            <span className="safety-icon">🩺</span>
                            <h4>First-Aid Certified</h4>
                            <p>All trainers are emergency-ready</p>
                        </div>
                        <div className="safety-item">
                            <span className="safety-icon">🌬️</span>
                            <h4>Air Purification</h4>
                            <p>HEPA filters in all centers</p>
                        </div>
                        <div className="safety-item">
                            <span className="safety-icon">✅</span>
                            <h4>COVID Protocols</h4>
                            <p>Strict safety measures maintained</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Partners & Awards */}
            <section className="section" style={{ background: 'var(--color-gray-50)' }}>
                <div className="container">
                    <h2 className="text-center section-title">OUR PARTNERS</h2>
                    <p className="text-center section-subtitle">We partner with the world's best fitness brands</p>
                    <div className="partners-grid">
                        {partners.map((partner, idx) => (
                            <div key={idx} className="partner-logo">
                                {partner}
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section className="about-cta">
                <div className="container text-center">
                    <h2>Join the FitClass Family</h2>
                    <p>Experience the difference premium fitness makes</p>
                    <a href="/register" className="btn btn-primary btn-large">START FREE TRIAL</a>
                </div>
            </section>
        </div>
    );
};

export default About;
