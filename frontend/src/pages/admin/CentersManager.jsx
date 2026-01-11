import { useState, useEffect } from 'react';
import api from '../../utils/api';

const CentersManager = () => {
    const [centers, setCenters] = useState([]);
    const [loading, setLoading] = useState(true);
    // Placeholder for future edit functionality

    useEffect(() => {
        fetchCenters();
    }, []);

    const fetchCenters = async () => {
        try {
            const response = await api.get('/centers');
            setCenters(response.data);
            setLoading(false);
        } catch (error) {
            console.error('Error fetching centers:', error);
            setLoading(false);
        }
    };

    if (loading) return <div className="spinner"></div>;

    return (
        <div>
            <div className="admin-header">
                <h1>Fitness Centers</h1>
                <button className="btn btn-primary">Add New Center</button>
            </div>

            <div className="admin-table-container">
                <table className="admin-table">
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Location</th>
                            <th>Contact</th>
                            <th>Status</th>
                            <th>Last Updated</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {centers.map(center => (
                            <tr key={center.id}>
                                <td style={{ fontWeight: 500 }}>{center.name}</td>
                                <td>{center.city}, {center.state}</td>
                                <td>{center.phone}</td>
                                <td>
                                    <span className={`status-badge ${center.isActive ? 'status-active' : 'status-inactive'}`}>
                                        {center.isActive ? 'Active' : 'Hidden'}
                                    </span>
                                </td>
                                <td>{new Date(center.updatedAt).toLocaleDateString()}</td>
                                <td>
                                    <button className="action-btn btn-edit">Edit</button>
                                    <button className="action-btn btn-delete">Delete</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {centers.length === 0 && (
                <div style={{ textAlign: 'center', padding: 'var(--spacing-2xl)', color: 'var(--color-text-dim)' }}>
                    No fitness centers found.
                </div>
            )}
        </div>
    );
};

export default CentersManager;
