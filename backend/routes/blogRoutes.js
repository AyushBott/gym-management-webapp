import express from 'express';
import { getBlogPosts, getBlogPostBySlug, getFeaturedPosts } from '../controllers/blogController.js';

const router = express.Router();

router.get('/', getBlogPosts);
router.get('/featured', getFeaturedPosts);
router.get('/:slug', getBlogPostBySlug);

export default router;
