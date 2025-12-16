import express from 'express';
import { createBooking, getMyBookings, cancelBooking } from '../controllers/bookingController.js';
import { authenticate } from '../middleware/authMiddleware.js';
import { validate, schemas } from '../middleware/validation.js';

const router = express.Router();

router.post('/', authenticate, validate(schemas.createBooking), createBooking);
router.get('/', authenticate, getMyBookings);
router.delete('/:id', authenticate, cancelBooking);

export default router;
