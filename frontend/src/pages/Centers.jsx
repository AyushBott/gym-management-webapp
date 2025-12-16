import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../utils/api';

const Centers = () => {
    const [centers, setCenters] = useState([]);
    const [cities, setCities] = useState([]);
    const [selectedCity, setSelectedCity] = useState('');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchCenters();
        fetchCities();
    }, [selectedCity]);

    const fetchCenters = async () => {
        try {
            const params = selectedCity ? `?city=${selectedCity}` : '';
            const response = await api.get(`/centers${params}`);
            setCenters(response.data.centers);
        } catch (error) {
            console.error('Error fetching centers:', error);
        } finally {
            setLoading(false);
        }
    };

    const fetchCities = async () => {
        try {
            const response = await api.get('/centers/cities');
            setCities(response.data.cities);
        } catch (error) {
            console.error('Error fetching cities:', error);
        }
    };

    if (loading) return <div className="container section"><div className="spinner"></div></div>;

    return (
        <div className="container section">
            <h1>Fitness Centers</h1>
            <p>Explore our premium fitness centers across India</p>

            <div className="form-group" style={{ maxWidth: '300px', margin: 'var(--spacing-xl) 0' }}>
                <select className="select" value={selectedCity} onChange={(e) => setSelectedCity(e.target.value)}>
                    <option value="">All Cities</option>
                    {cities.map(city => <option key={city} value={city}>{city}</option>)}
                </select>
            </div>

            <div className="grid grid-3">
                {centers.map(center => (
                    <Link to={`/centers/${center.slug}`} key={center.id} className="card">
                        <div style={{ height: '200px', marginBottom: 'var(--spacing-lg)', borderRadius: 'var(--radius-md)', overflow: 'hidden' }}>
                            <img
                                src={center.image || '/images/gym-center-default.png'}
                                alt={center.name}
                                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                            />
                        </div>
                        <h3>{center.name}</h3>
                        <p style={{ color: 'var(--color-gray-500)', fontSize: 'var(--font-size-sm)' }}>
                            📍 {center.city}, {center.state}
                        </p>
                        <p>{center.description}</p>
                    </Link>
                ))}
            </div>

            {centers.length === 0 && (
                <div className="text-center" style={{ padding: 'var(--spacing-3xl)' }}>
                    <p>No centers found in this location.</p>
                </div>
            )}
        </div>
    );
};

export default Centers;
