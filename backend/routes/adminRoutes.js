import express from 'express';
import {
    getDashboardStats,
    createCenter,
    updateCenter,
    deleteCenter,
    createSession,
    updateSession,
    deleteSession,
    getAllUsers,
    toggleUserStatus,
    createBlogPost,
    updateBlogPost,
    deleteBlogPost,
    getInquiries,
    updateInquiry
} from '../controllers/adminController.js';
import { authenticate, requireRole } from '../middleware/authMiddleware.js';

const router = express.Router();

// All admin routes require admin role
router.use(authenticate, requireRole('admin'));

// Dashboard
router.get('/dashboard/stats', getDashboardStats);

// Center Management
router.post('/centers', createCenter);
router.put('/centers/:id', updateCenter);
router.delete('/centers/:id', deleteCenter);

// Session Management
router.post('/sessions', createSession);
router.put('/sessions/:id', updateSession);
router.delete('/sessions/:id', deleteSession);

// User Management
router.get('/users', getAllUsers);
router.patch('/users/:id/toggle-status', toggleUserStatus);

// Blog Management
router.post('/blog', createBlogPost);
router.put('/blog/:id', updateBlogPost);
router.delete('/blog/:id', deleteBlogPost);

// Franchise Inquiry Management
router.get('/inquiries', getInquiries);
router.put('/inquiries/:id', updateInquiry);

export default router;
