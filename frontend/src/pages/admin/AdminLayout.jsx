import React from 'react';
import { Outlet } from 'react-router-dom';
import AdminSidebar from '../../components/AdminSidebar';
import './Admin.css';

const AdminLayout = () => {
    return (
        <div className="admin-container">
            <AdminSidebar />
            <main className="admin-content">
                <Outlet />
            </main>
        </div>
    );
};

export default AdminLayout;
