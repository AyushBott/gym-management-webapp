import { Routes, Route } from 'react-router-dom';
import { SpeedInsights } from '@vercel/speed-insights/react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Centers from './pages/Centers';
import CenterDetail from './pages/CenterDetail';
import Sessions from './pages/Sessions';
import Memberships from './pages/Memberships';
import Blog from './pages/Blog';
import BlogPost from './pages/BlogPost';
import Franchise from './pages/Franchise';
import About from './pages/About';
import Gallery from './pages/Gallery';
import Contact from './pages/Contact';
import Dashboard from './pages/Dashboard';
import MyBookings from './pages/MyBookings';
import MyMemberships from './pages/MyMemberships';
import Profile from './pages/Profile';
import AdminLayout from './pages/admin/AdminLayout';
import AdminDashboard from './pages/admin/AdminDashboard';
import CentersManager from './pages/admin/CentersManager';
import UsersManager from './pages/admin/UsersManager';
// import ManageSessions from './pages/admin/ManageSessions';
// import ManageBlog from './pages/admin/ManageBlog';
// import ManageInquiries from './pages/admin/ManageInquiries';
import ProtectedRoute from './components/ProtectedRoute';

function App() {
    return (
        <div className="App">
            <Navbar />
            <main style={{ minHeight: '80vh' }}>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/centers" element={<Centers />} />
                    <Route path="/centers/:slug" element={<CenterDetail />} />
                    <Route path="/sessions" element={<Sessions />} />
                    <Route path="/memberships" element={<Memberships />} />
                    <Route path="/blog" element={<Blog />} />
                    <Route path="/blog/:slug" element={<BlogPost />} />
                    <Route path="/franchise" element={<Franchise />} />
                    <Route path="/about" element={<About />} />
                    <Route path="/gallery" element={<Gallery />} />
                    <Route path="/contact" element={<Contact />} />

                    {/* Protected User Routes */}
                    <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
                    <Route path="/my-bookings" element={<ProtectedRoute><MyBookings /></ProtectedRoute>} />
                    <Route path="/my-memberships" element={<ProtectedRoute><MyMemberships /></ProtectedRoute>} />
                    <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />

                    {/* Protected Admin Routes */}
                    <Route path="/admin" element={<ProtectedRoute requireAdmin><AdminLayout /></ProtectedRoute>}>
                        <Route index element={<AdminDashboard />} />
                        <Route path="centers" element={<CentersManager />} />
                        <Route path="users" element={<UsersManager />} />
                        {/* <Route path="sessions" element={<ManageSessions />} /> */}
                        {/* <Route path="blog" element={<ManageBlog />} /> */}
                        {/* <Route path="inquiries" element={<ManageInquiries />} /> */}
                    </Route>
                </Routes>
            </main>
            <Footer />
            <SpeedInsights />
        </div>
    );
}

export default App;
