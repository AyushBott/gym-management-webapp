import { Link } from 'react-router-dom';
import './Footer.css';

const Footer = () => {
    return (
        <footer className="footer">
            <div className="container">
                <div className="footer-grid">
                    <div className="footer-brand">
                        <Link to="/" className="footer-logo">
                            <img src="/images/fitclass-logo-white.svg" alt="FitClass" className="footer-logo-image" />
                        </Link>
                        <p className="footer-slogan">Fit By Choice</p>
                        <p className="footer-tagline">
                            Where your time gets the luxury it deserves.
                        </p>
                        <p className="footer-legal">
                            FitClass is the flagship program of FitnessHub Pvt. Ltd.
                        </p>
                    </div>

                    <div className="footer-links">
                        <h4>Explore</h4>
                        <ul>
                            <li><Link to="/about">About</Link></li>
                            <li><Link to="/gallery">Gallery</Link></li>
                            <li><Link to="/centers">Locations</Link></li>
                            <li><Link to="/sessions">Classes</Link></li>
                            <li><Link to="/memberships">Membership</Link></li>
                        </ul>
                    </div>

                    <div className="footer-links">
                        <h4>Company</h4>
                        <ul>
                            <li><Link to="/contact">Contact</Link></li>
                            <li><Link to="/franchise">Franchise</Link></li>
                            <li><a href="/careers">Careers</a></li>
                            <li><a href="/press">Press</a></li>
                        </ul>
                    </div>

                    <div className="footer-links">
                        <h4>Legal</h4>
                        <ul>
                            <li><a href="/privacy">Privacy Policy</a></li>
                            <li><a href="/terms">Terms of Service</a></li>
                            <li><a href="/refund">Refund Policy</a></li>
                        </ul>
                    </div>

                    <div className="footer-contact">
                        <h4>Get in Touch</h4>
                        <p>
                            India Expo Plaza<br />
                            Knowledge Park II<br />
                            Greater Noida – 201310
                        </p>
                        <p>
                            <a href="mailto:info@fitclass.in">info@fitclass.in</a><br />
                            <a href="tel:+917303001520">+91 73030 01520</a>
                        </p>
                    </div>
                </div>

                <div className="footer-bottom">
                    <p className="copyright">© 2025 FitnessHub Pvt. Ltd. All rights reserved.</p>
                    <div className="social-links">
                        <a href="https://instagram.com/fitclass.india" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
                            <img src="/images/social-instagram.png" alt="Instagram" className="social-icon" />
                        </a>
                        <a href="https://youtube.com/@fitclass" target="_blank" rel="noopener noreferrer" aria-label="YouTube">
                            <img src="/images/social-youtube.png" alt="YouTube" className="social-icon" />
                        </a>
                        <a href="https://linkedin.com/company/fitclass-india" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
                            <img src="/images/social-linkedin.png" alt="LinkedIn" className="social-icon" />
                        </a>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
