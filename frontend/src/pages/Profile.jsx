import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import api from '../utils/api';

const Profile = () => {
    const { user, updateUser } = useAuth();
    const [formData, setFormData] = useState({
        firstName: user?.firstName || '',
        lastName: user?.lastName || '',
        phone: user?.phone || ''
    });
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setMessage('');

        try {
            const response = await api.put('/ users/profile', formData);
            updateUser(response.data.user);
            setMessage('Profile updated successfully!');
        } catch (error) {
            setMessage('Update failed');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="container section">
            <h1>My Profile</h1>

            <div className="card" style={{ maxWidth: '600px', margin: '0 auto' }}>
                {message && (
                    <div style={{ padding: 'var(--spacing-md)', background: 'var(--color-success)', color: 'white', borderRadius: 'var(--radius-md)', marginBottom: 'var(--spacing-lg)' }}>
                        {message}
                    </div>
                )}

                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label className="form-label">Email</label>
                        <input type="email" className="input" value={user?.email} disabled />
                    </div>

                    <div className="form-group">
                        <label className="form-label">First Name</label>
                        <input
                            type="text"
                            className="input"
                            value={formData.firstName}
                            onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                        />
                    </div>

                    <div className="form-group">
                        <label className="form-label">Last Name</label>
                        <input
                            type="text"
                            className="input"
                            value={formData.lastName}
                            onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                        />
                    </div>

                    <div className="form-group">
                        <label className="form-label">Phone</label>
                        <input
                            type="tel"
                            className="input"
                            value={formData.phone}
                            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        />
                    </div>

                    <button type="submit" className="btn btn-primary" disabled={loading} style={{ width: '100%' }}>
                        {loading ? 'Updating...' : 'Update Profile'}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Profile;
