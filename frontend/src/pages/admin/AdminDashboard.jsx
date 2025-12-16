import { useState, useEffect } from 'react';
import api from '../../utils/api';

const AdminDashboard = () => {
    const [stats, setStats] = useState(null);

    useEffect(() => {
        fetchStats();
    }, []);

    const fetchStats = async () => {
        try {
            const response = await api.get('/admin/dashboard/stats');
            setStats(response.data);
        } catch (error) {
            console.error('Error fetching stats:', error);
        }
    };

    if (!stats) return <div className="spinner"></div>;

    return (
        <div>
            <h1>Admin Dashboard</h1>
            <div className="grid grid-4" style={{ marginTop: 'var(--spacing-2xl)' }}>
                <div className="card">
                    <h3>Total Users</h3>
                    <div style={{ fontSize: 'var(--font-size-4xl)', fontWeight: '800', color: 'var(--color-primary)' }}>
                        {stats.totalUsers}
                    </div>
                </div>
                <div className="card">
                    <h3>Total Bookings</h3>
                    <div style={{ fontSize: 'var(--font-size-4xl)', fontWeight: '800', color: 'var(--color-secondary)' }}>
                        {stats.totalBookings}
                    </div>
                </div>
                <div className="card">
                    <h3>Total Revenue</h3>
                    <div style={{ fontSize: 'var(--font-size-4xl)', fontWeight: '800', color: 'var(--color-success)' }}>
                        ₹{stats.totalRevenue?.toLocaleString()}
                    </div>
                </div>
                <div className="card">
                    <h3>Active Memberships</h3>
                    <div style={{ fontSize: 'var(--font-size-4xl)', fontWeight: '800', color: 'var(--color-info)' }}>
                        {stats.activeMemberships}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminDashboard;
