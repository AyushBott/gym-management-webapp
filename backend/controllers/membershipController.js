import { PrismaClient } from '@prisma/client';
import Stripe from 'stripe';
import Razorpay from 'razorpay';

const prisma = new PrismaClient();
const stripe = process.env.STRIPE_SECRET_KEY ? new Stripe(process.env.STRIPE_SECRET_KEY) : null;
const razorpay = process.env.RAZORPAY_KEY_ID ? new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_KEY_SECRET
}) : null;

export const getMembershipPlans = async (req, res) => {
    try {
        const plans = await prisma.membershipPlan.findMany({
            where: { isActive: true },
            orderBy: [{ isPopular: 'desc' }, { price: 'asc' }]
        });

        res.json({ plans });
    } catch (error) {
        console.error('Get membership plans error:', error);
        res.status(500).json({ error: { message: 'Failed to fetch membership plans' } });
    }
};

export const purchaseMembership = async (req, res) => {
    try {
        const { planId, paymentGateway } = req.body;
        const userId = req.user.id;

        const plan = await prisma.membershipPlan.findUnique({ where: { id: planId } });

        if (!plan || !plan.isActive) {
            return res.status(404).json({ error: { message: 'Plan not found or inactive' } });
        }

        // Create payment record
        const payment = await prisma.payment.create({
            data: {
                userId,
                amount: plan.price,
                currency: plan.currency,
                paymentGateway: paymentGateway || 'stripe',
                status: 'pending'
            }
        });

        // Create payment intent based on gateway
        let paymentIntent;

        if (paymentGateway === 'razorpay' && razorpay) {
            const order = await razorpay.orders.create({
                amount: Math.round(parseFloat(plan.price) * 100),
                currency: plan.currency,
                receipt: payment.id,
                notes: {
                    userId,
                    planId,
                    paymentId: payment.id
                }
            });

            await prisma.payment.update({
                where: { id: payment.id },
                data: { gatewayOrderId: order.id }
            });

            paymentIntent = {
                orderId: order.id,
                amount: order.amount,
                currency: order.currency,
                keyId: process.env.RAZORPAY_KEY_ID
            };
        } else if (stripe) {
            const intent = await stripe.paymentIntents.create({
                amount: Math.round(parseFloat(plan.price) * 100),
                currency: plan.currency.toLowerCase(),
                metadata: {
                    userId,
                    planId,
                    paymentId: payment.id
                }
            });

            await prisma.payment.update({
                where: { id: payment.id },
                data: { gatewayPaymentId: intent.id }
            });

            paymentIntent = {
                clientSecret: intent.client_secret,
                publishableKey: process.env.STRIPE_PUBLISHABLE_KEY
            };
        } else {
            return res.status(500).json({ error: { message: 'Payment gateway not configured' } });
        }

        res.json({
            message: 'Payment initiated',
            payment: {
                id: payment.id,
                amount: payment.amount,
                currency: payment.currency
            },
            paymentIntent,
            plan
        });
    } catch (error) {
        console.error('Purchase membership error:', error);
        res.status(500).json({ error: { message: 'Failed to initiate purchase' } });
    }
};

export const getMyMemberships = async (req, res) => {
    try {
        const userId = req.user.id;
        const { status } = req.query;

        const where = {
            userId,
            ...(status && { status })
        };

        const memberships = await prisma.userMembership.findMany({
            where,
            include: {
                plan: true,
                payments: {
                    where: { status: 'completed' },
                    orderBy: { createdAt: 'desc' },
                    take: 1
                }
            },
            orderBy: { createdAt: 'desc' }
        });

        res.json({ memberships });
    } catch (error) {
        console.error('Get memberships error:', error);
        res.status(500).json({ error: { message: 'Failed to fetch memberships' } });
    }
};

export const activateMembership = async (req, res) => {
    try {
        const { paymentId } = req.body;
        const userId = req.user.id;

        const payment = await prisma.payment.findUnique({
            where: { id: paymentId }
        });

        if (!payment || payment.userId !== userId) {
            return res.status(404).json({ error: { message: 'Payment not found' } });
        }

        if (payment.status !== 'completed') {
            return res.status(400).json({ error: { message: 'Payment not completed' } });
        }

        // Get plan details from payment metadata or request
        const { planId } = req.body;
        const plan = await prisma.membershipPlan.findUnique({ where: { id: planId } });

        if (!plan) {
            return res.status(404).json({ error: { message: 'Plan not found' } });
        }

        const startDate = new Date();
        const endDate = new Date();
        endDate.setDate(endDate.getDate() + plan.durationDays);

        const membership = await prisma.userMembership.create({
            data: {
                userId,
                planId,
                startDate,
                endDate,
                status: 'active',
                paymentId
            },
            include: { plan: true }
        });

        res.json({ message: 'Membership activated successfully', membership });
    } catch (error) {
        console.error('Activate membership error:', error);
        res.status(500).json({ error: { message: 'Failed to activate membership' } });
    }
};
