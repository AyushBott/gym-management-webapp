import { Outlet } from 'react-router-dom';
import { Link, useLocation } from 'react-router-dom';

const AdminLayout = () => {
    const location = useLocation();

    const isActive = (path) => location.pathname === path || location.pathname.startsWith(path);

    return (
        <div style={{ display: 'flex', minHeight: '80vh' }}>
            <aside style={{ width: '250px', background: 'var(--color-gray-900)', color: 'white', padding: 'var(--spacing-xl)' }}>
                <h2 style={{ color: 'white', marginBottom: 'var(--spacing-xl)' }}>Admin Panel</h2>
                <nav style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-sm)' }}>
                    <Link
                        to="/admin"
                        style={{
                            padding: 'var(--spacing-md)',
                            color: 'white',
                            background: isActive('/admin') && location.pathname === '/admin' ? 'var(--color-primary)' : 'transparent',
                            borderRadius: 'var(--radius-md)',
                            textDecoration: 'none'
                        }}
                    >
                        Dashboard
                    </Link>
                    <Link
                        to="/admin/centers"
                        style={{
                            padding: 'var(--spacing-md)',
                            color: 'white',
                            background: isActive('/admin/centers') ? 'var(--color-primary)' : 'transparent',
                            borderRadius: 'var(--radius-md)',
                            textDecoration: 'none'
                        }}
                    >
                        Centers
                    </Link>
                    <Link
                        to="/admin/sessions"
                        style={{
                            padding: 'var(--spacing-md)',
                            color: 'white',
                            background: isActive('/admin/sessions') ? 'var(--color-primary)' : 'transparent',
                            borderRadius: 'var(--radius-md)',
                            textDecoration: 'none'
                        }}
                    >
                        Sessions
                    </Link>
                    <Link
                        to="/admin/users"
                        style={{
                            padding: 'var(--spacing-md)',
                            color: 'white',
                            background: isActive('/admin/users') ? 'var(--color-primary)' : 'transparent',
                            borderRadius: 'var(--radius-md)',
                            textDecoration: 'none'
                        }}
                    >
                        Users
                    </Link>
                    <Link
                        to="/admin/blog"
                        style={{
                            padding: 'var(--spacing-md)',
                            color: 'white',
                            background: isActive('/admin/blog') ? 'var(--color-primary)' : 'transparent',
                            borderRadius: 'var(--radius-md)',
                            textDecoration: 'none'
                        }}
                    >
                        Blog
                    </Link>
                    <Link
                        to="/admin/inquiries"
                        style={{
                            padding: 'var(--spacing-md)',
                            color: 'white',
                            background: isActive('/admin/inquiries') ? 'var(--color-primary)' : 'transparent',
                            borderRadius: 'var(--radius-md)',
                            textDecoration: 'none'
                        }}
                    >
                        Franchise Inquiries
                    </Link>
                </nav>
            </aside>
            <main style={{ flex: 1, padding: 'var(--spacing-2xl)' }}>
                <Outlet />
            </main>
        </div>
    );
};

export default AdminLayout;
