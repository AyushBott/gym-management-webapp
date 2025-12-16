import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../utils/api';
import { useAuth } from '../context/AuthContext';

const Sessions = () => {
    const [sessions, setSessions] = useState([]);
    const [activityTypes, setActivityTypes] = useState([]);
    const [selectedActivity, setSelectedActivity] = useState('');
    const [loading, setLoading] = useState(true);
    const { isAuthenticated } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        fetchSessions();
        fetchActivityTypes();
    }, [selectedActivity]);

    const fetchSessions = async () => {
        try {
            const params = selectedActivity ? `?activityTypeId=${selectedActivity}` : '';
            const response = await api.get(`/sessions${params}`);
            setSessions(response.data.sessions);
        } catch (error) {
            console.error('Error fetching sessions:', error);
        } finally {
            setLoading(false);
        }
    };

    const fetchActivityTypes = async () => {
        try {
            const response = await api.get('/sessions/activity-types');
            setActivityTypes(response.data.activityTypes);
        } catch (error) {
            console.error('Error fetching activity types:', error);
        }
    };

    const handleBook = async (sessionId) => {
        if (!isAuthenticated) {
            navigate('/login');
            return;
        }

        try {
            await api.post('/bookings', { sessionId });
            alert('Booking successful!');
            fetchSessions(); // Refresh to show updated availability
        } catch (error) {
            alert(error.response?.data?.error?.message || 'Booking failed');
        }
    };

    if (loading) return <div className="container section"><div className="spinner"></div></div>;

    return (
        <div className="container section">
            <h1>Browse Sessions</h1>
            <p>Find and book your next workout session</p>

            <div className="form-group" style={{ maxWidth: '300px', margin: 'var(--spacing-xl) 0' }}>
                <select className="select" value={selectedActivity} onChange={(e) => setSelectedActivity(e.target.value)}>
                    <option value="">All Activities</option>
                    {activityTypes.map(type => (
                        <option key={type.id} value={type.id}>{type.name}</option>
                    ))}
                </select>
            </div>

            <div className="grid grid-3">
                {sessions.map(session => (
                    <div key={session.id} className="card">
                        <h3>{session.title}</h3>
                        <span className="badge badge-success">{session.activityType?.name}</span>
                        <p style={{ margin: 'var(--spacing-md) 0' }}>
                            <strong>{session.center?.name}</strong><br />
                            📍 {session.center?.city}
                        </p>
                        <p>
                            🕐 {new Date(session.startTime).toLocaleString()}<br />
                            ⏱️ {session.durationMinutes} minutes<br />
                            👤 {session.instructorName}
                        </p>
                        <p>
                            Available: {session.availableSlots} / {session.maxCapacity}
                        </p>
                        <button
                            className="btn btn-primary"
                            style={{ width: '100%', marginTop: 'var(--spacing-md)' }}
                            onClick={() => handleBook(session.id)}
                            disabled={session.isFull}
                        >
                            {session.isFull ? 'Fully Booked' : 'Book Now'}
                        </button>
                    </div>
                ))}
            </div>

            {sessions.length === 0 && (
                <div className="text-center" style={{ padding: 'var(--spacing-3xl)' }}>
                    <p>No sessions available.</p>
                </div>
            )}
        </div>
    );
};

export default Sessions;
