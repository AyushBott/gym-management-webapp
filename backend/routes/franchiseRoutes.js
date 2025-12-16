import express from 'express';
import { createInquiry } from '../controllers/franchiseController.js';
import { validate, schemas } from '../middleware/validation.js';

const router = express.Router();

router.post('/inquire', validate(schemas.franchiseInquiry), createInquiry);

export default router;
