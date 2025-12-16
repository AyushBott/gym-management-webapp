import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const createInquiry = async (req, res) => {
    try {
        const { fullName, email, phone, city, investmentCapacity, message } = req.body;

        const inquiry = await prisma.franchiseInquiry.create({
            data: {
                fullName,
                email,
                phone,
                city,
                investmentCapacity,
                message
            }
        });

        res.status(201).json({
            message: 'Thank you for your inquiry! Our team will contact you soon.',
            inquiry: {
                id: inquiry.id,
                fullName: inquiry.fullName,
                email: inquiry.email
            }
        });
    } catch (error) {
        console.error('Create franchise inquiry error:', error);
        res.status(500).json({ error: { message: 'Failed to submit inquiry' } });
    }
};
