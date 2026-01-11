import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';
import { useState, useEffect } from 'react';
import './Navbar.css';

const Navbar = () => {
    const { user, isAuthenticated, isAdmin, logout } = useAuth();
    const { isDark, toggleTheme } = useTheme();
    const navigate = useNavigate();
    const location = useLocation();
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const handleLogout = () => {
        logout();
        navigate('/');
    };

    const isActive = (path) => {
        if (path === '/') return location.pathname === '/';
        return location.pathname.startsWith(path);
    };

    const navLinks = [
        { path: '/about', label: 'About' },
        { path: '/gallery', label: 'Gallery' },
        { path: '/centers', label: 'Locations' },
        { path: '/sessions', label: 'Classes' },
        { path: '/memberships', label: 'Membership' },
        { path: '/contact', label: 'Contact' }
    ];

    return (
        <nav className={`navbar ${scrolled ? 'scrolled' : ''}`} role="navigation" aria-label="Main">
            <div className="container navbar-container">
                <Link to="/" className="logo" aria-label="FitClass Home">
                    <img
                        src={isDark ? "/images/fitclass-logo-dark.png" : "/images/fitclass-logo-light.png"}
                        alt="FitClass"
                        className="logo-image"
                    />
                </Link>

                <button
                    className="mobile-menu-btn"
                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                    aria-expanded={isMenuOpen}
                    aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
                >
                    <span className={`hamburger ${isMenuOpen ? 'open' : ''}`}>
                        <span></span>
                        <span></span>
                    </span>
                </button>

                <div className={`nav-links ${isMenuOpen ? 'active' : ''}`}>
                    {navLinks.map(link => (
                        <Link
                            key={link.path}
                            to={link.path}
                            className={isActive(link.path) ? 'active' : ''}
                            onClick={() => setIsMenuOpen(false)}
                        >
                            {link.label}
                        </Link>
                    ))}

                    <button
                        className="theme-toggle"
                        onClick={toggleTheme}
                        aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
                        title={isDark ? 'Light mode' : 'Dark mode'}
                    >
                        {isDark ? (
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <circle cx="12" cy="12" r="5"></circle>
                                <line x1="12" y1="1" x2="12" y2="3"></line>
                                <line x1="12" y1="21" x2="12" y2="23"></line>
                                <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
                                <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
                                <line x1="1" y1="12" x2="3" y2="12"></line>
                                <line x1="21" y1="12" x2="23" y2="12"></line>
                                <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>
                                <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
                            </svg>
                        ) : (
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
                            </svg>
                        )}
                    </button>

                    {isAuthenticated ? (
                        <div className="user-menu">
                            <button className="user-menu-btn">
                                {user?.firstName || 'Account'}
                            </button>
                            <div className="dropdown">
                                <Link to="/dashboard" onClick={() => setIsMenuOpen(false)}>Dashboard</Link>
                                <Link to="/my-bookings" onClick={() => setIsMenuOpen(false)}>My Bookings</Link>
                                <Link to="/profile" onClick={() => setIsMenuOpen(false)}>Profile</Link>
                                {isAdmin && <Link to="/admin" onClick={() => setIsMenuOpen(false)}>Admin</Link>}
                                <button onClick={handleLogout}>Sign Out</button>
                            </div>
                        </div>
                    ) : (
                        <div className="auth-buttons">
                            <Link to="/login" className="nav-link-login" onClick={() => setIsMenuOpen(false)}>
                                Sign In
                            </Link>
                            <Link to="/register" className="btn btn-primary btn-small" onClick={() => setIsMenuOpen(false)}>
                                Book Visit
                            </Link>
                        </div>
                    )}
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
