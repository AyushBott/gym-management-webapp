import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const getCenters = async (req, res) => {
    try {
        const { city, search, limit = 20, offset = 0 } = req.query;

        const where = {
            isActive: true,
            ...(city && { city: { contains: city, mode: 'insensitive' } }),
            ...(search && {
                OR: [
                    { name: { contains: search, mode: 'insensitive' } },
                    { description: { contains: search, mode: 'insensitive' } }
                ]
            })
        };

        const [centers, total] = await Promise.all([
            prisma.fitnessCenter.findMany({
                where,
                take: parseInt(limit),
                skip: parseInt(offset),
                orderBy: { name: 'asc' }
            }),
            prisma.fitnessCenter.count({ where })
        ]);

        res.json({ centers, total, limit: parseInt(limit), offset: parseInt(offset) });
    } catch (error) {
        console.error('Get centers error:', error);
        res.status(500).json({ error: { message: 'Failed to fetch centers' } });
    }
};

export const getCenterBySlug = async (req, res) => {
    try {
        const { slug } = req.params;

        const center = await prisma.fitnessCenter.findUnique({
            where: { slug },
            include: {
                sessions: {
                    where: {
                        isActive: true,
                        startTime: { gte: new Date() }
                    },
                    take: 10,
                    orderBy: { startTime: 'asc' },
                    include: {
                        activityType: true
                    }
                }
            }
        });

        if (!center) {
            return res.status(404).json({ error: { message: 'Center not found' } });
        }

        res.json({ center });
    } catch (error) {
        console.error('Get center error:', error);
        res.status(500).json({ error: { message: 'Failed to fetch center' } });
    }
};

export const getCities = async (req, res) => {
    try {
        const cities = await prisma.fitnessCenter.findMany({
            where: { isActive: true },
            select: { city: true },
            distinct: ['city'],
            orderBy: { city: 'asc' }
        });

        res.json({ cities: cities.map(c => c.city) });
    } catch (error) {
        console.error('Get cities error:', error);
        res.status(500).json({ error: { message: 'Failed to fetch cities' } });
    }
};
