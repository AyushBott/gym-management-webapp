import express from 'express';
import { getSessions, getSessionById, getActivityTypes } from '../controllers/sessionController.js';

const router = express.Router();

router.get('/', getSessions);
router.get('/activity-types', getActivityTypes);
router.get('/:id', getSessionById);

export default router;
