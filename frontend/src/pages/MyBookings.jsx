import { useState, useEffect } from 'react';
import api from '../utils/api';

const MyBookings = () => {
    const [bookings, setBookings] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchBookings();
    }, []);

    const fetchBookings = async () => {
        try {
            const response = await api.get('/bookings');
            setBookings(response.data.bookings);
        } catch (error) {
            console.error('Error fetching bookings:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleCancel = async (id) => {
        if (!confirm('Are you sure you want to cancel this booking?')) return;

        try {
            await api.delete(`/bookings/${id}`);
            fetchBookings();
        } catch (error) {
            alert('Cancellation failed');
        }
    };

    if (loading) return <div className="container section"><div className="spinner"></div></div>;

    return (
        <div className="container section">
            <h1>My Bookings</h1>

            {bookings.length === 0 ? (
                <div className="text-center" style={{ padding: 'var(--spacing-3xl)' }}>
                    <p>You haven't booked any sessions yet.</p>
                </div>
            ) : (
                <div className="grid grid-2">
                    {bookings.map(booking => (
                        <div key={booking.id} className="card">
                            <div className="flex justify-between items-center" style={{ marginBottom: 'var(--spacing-md)' }}>
                                <h3>{booking.session.title}</h3>
                                <span className={`badge ${booking.bookingStatus === 'confirmed' ? 'badge-success' : booking.bookingStatus === 'cancelled' ? 'badge-error' : ''}`}>
                                    {booking.bookingStatus}
                                </span>
                            </div>
                            <p><strong>{booking.session.center.name}</strong></p>
                            <p>📍 {booking.session.center.city}</p>
                            <p>🕐 {new Date(booking.session.startTime).toLocaleString()}</p>
                            <p>👤 {booking.session.instructorName}</p>
                            {booking.bookingStatus === 'confirmed' && new Date(booking.session.startTime) > new Date() && (
                                <button
                                    className="btn btn-secondary"
                                    style={{ marginTop: 'var(--spacing-md)' }}
                                    onClick={() => handleCancel(booking.id)}
                                >
                                    Cancel Booking
                                </button>
                            )}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default MyBookings;
