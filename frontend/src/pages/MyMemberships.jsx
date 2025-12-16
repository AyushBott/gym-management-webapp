import { useState, useEffect } from 'react';
import api from '../utils/api';

const MyMemberships = () => {
    const [memberships, setMemberships] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchMemberships();
    }, []);

    const fetchMemberships = async () => {
        try {
            const response = await api.get('/memberships/my-memberships');
            setMemberships(response.data.memberships);
        } catch (error) {
            console.error('Error fetching memberships:', error);
        } finally {
            setLoading(false);
        }
    };

    if (loading) return <div className="container section"><div className="spinner"></div></div>;

    return (
        <div className="container section">
            <h1>My Memberships</h1>

            {memberships.length === 0 ? (
                <div className="text-center" style={{ padding: 'var(--spacing-3xl)' }}>
                    <p>You don't have any memberships yet.</p>
                </div>
            ) : (
                <div className="grid grid-3">
                    {memberships.map(membership => (
                        <div key={membership.id} className="card">
                            <div className="flex justify-between items-center" style={{ marginBottom: 'var(--spacing-md)' }}>
                                <h3>{membership.plan.name}</h3>
                                <span className={`badge ${membership.status === 'active' ? 'badge-success' : 'badge-warning'}`}>
                                    {membership.status}
                                </span>
                            </div>
                            <p style={{ fontSize: 'var(--font-size-2xl)', fontWeight: '700', color: 'var(--color-primary)', margin: 'var(--spacing-md) 0' }}>
                                ₹{membership.plan.price.toLocaleString()}
                            </p>
                            <p>Valid: {new Date(membership.startDate).toLocaleDateString()} - {new Date(membership.endDate).toLocaleDateString()}</p>
                            {membership.bookingsUsed !== null && (
                                <p>Bookings Used: {membership.bookingsUsed}</p>
                            )}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default MyMemberships;
