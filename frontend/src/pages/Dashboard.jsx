import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Dashboard = () => {
    const { user } = useAuth();

    return (
        <div className="container section">
            <h1>Welcome, {user?.firstName}!</h1>
            <p>Manage your bookings and memberships</p>

            <div className="grid grid-3" style={{ marginTop: 'var(--spacing-2xl)' }}>
                <Link to="/my-bookings" className="card">
                    <div style={{ fontSize: '3rem', marginBottom: 'var(--spacing-md)' }}>📅</div>
                    <h3>My Bookings</h3>
                    <p>View and manage your session bookings</p>
                </Link>

                <Link to="/my-memberships" className="card">
                    <div style={{ fontSize: '3rem', marginBottom: 'var(--spacing-md)' }}>💳</div>
                    <h3>Memberships</h3>
                    <p>Track your active memberships</p>
                </Link>

                <Link to="/profile" className="card">
                    <div style={{ fontSize: '3rem', marginBottom: 'var(--spacing-md)' }}>👤</div>
                    <h3>Profile</h3>
                    <p>Update your account information</p>
                </Link>
            </div>
        </div>
    );
};

export default Dashboard;
