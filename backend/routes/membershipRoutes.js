import express from 'express';
import { getMembershipPlans, purchaseMembership, getMyMemberships, activateMembership } from '../controllers/membershipController.js';
import { authenticate } from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/plans', getMembershipPlans);
router.post('/purchase', authenticate, purchaseMembership);
router.get('/my-memberships', authenticate, getMyMemberships);
router.post('/activate', authenticate, activateMembership);

export default router;
