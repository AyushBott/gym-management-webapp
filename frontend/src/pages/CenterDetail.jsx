import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import api from '../utils/api';

const CenterDetail = () => {
    const { slug } = useParams();
    const [center, setCenter] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchCenter();
    }, [slug]);

    const fetchCenter = async () => {
        try {
            const response = await api.get(`/centers/${slug}`);
            setCenter(response.data.center);
        } catch (error) {
            console.error('Error fetching center:', error);
        } finally {
            setLoading(false);
        }
    };

    if (loading) return <div className="container section"><div className="spinner"></div></div>;
    if (!center) return <div className="container section"><h2>Center not found</h2></div>;

    return (
        <div className="container section">
            <div style={{ height: '300px', borderRadius: 'var(--radius-xl)', marginBottom: 'var(--spacing-2xl)', overflow: 'hidden' }}>
                <img
                    src={center.image || '/images/gym/gym-floor-main.jpg'}
                    alt={center.name}
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
            </div>

            <h1>{center.name}</h1>
            <p style={{ fontSize: 'var(--font-size-lg)', color: 'var(--color-gray-600)', marginBottom: 'var(--spacing-xl)' }}>
                📍 {center.address}, {center.city}, {center.state} - {center.pinCode}
            </p>

            <div className="grid grid-2" style={{ marginBottom: 'var(--spacing-2xl)' }}>
                <div className="card">
                    <h3>About</h3>
                    <p>{center.description}</p>
                    <p style={{ marginTop: 'var(--spacing-lg)' }}>
                        📞 {center.phone}< br />
                        📧 {center.email}
                    </p>
                </div>

                <div className="card">
                    <h3>Amenities</h3>
                    <div style={{ display: 'flex', gap: 'var(--spacing-sm)', flexWrap: 'wrap', marginTop: 'var(--spacing-md)' }}>
                        {center.amenities && Array.isArray(center.amenities) && center.amenities.map((amenity, idx) => (
                            <span key={idx} className="badge">{amenity}</span>
                        ))}
                    </div>
                </div>
            </div>

            {center.sessions && center.sessions.length > 0 && (
                <>
                    <h2>Upcoming Sessions</h2>
                    <div className="grid grid-3">
                        {center.sessions.map(session => (
                            <div key={session.id} className="card">
                                <h4>{session.title}</h4>
                                <p className="badge badge-success">{session.activityType?.name}</p>
                                <p style={{ margin: 'var(--spacing-md) 0' }}>
                                    {new Date(session.startTime).toLocaleString()}
                                </p>
                                <p>Duration: {session.durationMinutes} mins</p>
                                <p>Instructor: {session.instructorName}</p>
                            </div>
                        ))}
                    </div>
                </>
            )}
        </div>
    );
};

export default CenterDetail;
