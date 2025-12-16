import express from 'express';
import { PrismaClient } from '@prisma/client';
import Stripe from 'stripe';

const prisma = new PrismaClient();
const router = express.Router();
const stripe = process.env.STRIPE_SECRET_KEY ? new Stripe(process.env.STRIPE_SECRET_KEY) : null;

// Stripe webhook handler
router.post('/webhook/stripe', express.raw({ type: 'application/json' }), async (req, res) => {
    const sig = req.headers['stripe-signature'];

    try {
        const event = stripe.webhooks.constructEvent(
            req.body,
            sig,
            process.env.STRIPE_WEBHOOK_SECRET
        );

        if (event.type === 'payment_intent.succeeded') {
            const paymentIntent = event.data.object;
            const { paymentId } = paymentIntent.metadata;

            await prisma.payment.update({
                where: { id: paymentId },
                data: {
                    status: 'completed',
                    paymentDate: new Date(),
                    gatewayPaymentId: paymentIntent.id,
                    paymentMethod: paymentIntent.payment_method_types[0]
                }
            });
        }

        res.json({ received: true });
    } catch (error) {
        console.error('Stripe webhook error:', error);
        res.status(400).send(`Webhook Error: ${error.message}`);
    }
});

// Razorpay webhook handler
router.post('/webhook/razorpay', express.json(), async (req, res) => {
    try {
        const { event, payload } = req.body;

        if (event === 'payment.captured') {
            const payment = payload.payment.entity;
            const paymentId = payment.notes?.paymentId;

            if (paymentId) {
                await prisma.payment.update({
                    where: { id: paymentId },
                    data: {
                        status: 'completed',
                        paymentDate: new Date(),
                        gatewayPaymentId: payment.id,
                        paymentMethod: payment.method
                    }
                });
            }
        }

        res.json({ status: 'ok' });
    } catch (error) {
        console.error('Razorpay webhook error:', error);
        res.status(400).json({ error: error.message });
    }
});

// Get payment status
router.get('/:id/status', async (req, res) => {
    try {
        const { id } = req.params;

        const payment = await prisma.payment.findUnique({
            where: { id },
            select: {
                id: true,
                amount: true,
                currency: true,
                status: true,
                paymentDate: true,
                paymentMethod: true
            }
        });

        if (!payment) {
            return res.status(404).json({ error: { message: 'Payment not found' } });
        }

        res.json({ payment });
    } catch (error) {
        console.error('Get payment status error:', error);
        res.status(500).json({ error: { message: 'Failed to fetch payment status' } });
    }
});

export default router;
