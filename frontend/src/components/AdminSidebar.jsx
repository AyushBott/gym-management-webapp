import React from 'react';
import { NavLink } from 'react-router-dom';

const AdminSidebar = () => {
    return (
        <aside className="admin-sidebar">
            <div className="admin-sidebar-header">
                <div className="admin-sidebar-title">Admin</div>
            </div>
            <nav className="admin-nav">
                <NavLink
                    to="/admin/dashboard"
                    className={({ isActive }) => `admin-nav-item ${isActive ? 'active' : ''}`}
                    end
                >
                    Overview
                </NavLink>
                <NavLink
                    to="/admin/users"
                    className={({ isActive }) => `admin-nav-item ${isActive ? 'active' : ''}`}
                >
                    Users
                </NavLink>
                <NavLink
                    to="/admin/centers"
                    className={({ isActive }) => `admin-nav-item ${isActive ? 'active' : ''}`}
                >
                    Fitness Centers
                </NavLink>
                <NavLink
                    to="/admin/sessions"
                    className={({ isActive }) => `admin-nav-item ${isActive ? 'active' : ''}`}
                >
                    Sessions
                </NavLink>
            </nav>
        </aside>
    );
};

export default AdminSidebar;
