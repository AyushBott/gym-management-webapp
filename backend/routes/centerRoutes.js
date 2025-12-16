import express from 'express';
import { getCenters, getCenterBySlug, getCities } from '../controllers/centerController.js';

const router = express.Router();

router.get('/', getCenters);
router.get('/cities', getCities);
router.get('/:slug', getCenterBySlug);

export default router;
