import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const getSessions = async (req, res) => {
    try {
        const { centerId, activityTypeId, date, limit = 50, offset = 0 } = req.query;

        let startDate, endDate;
        if (date) {
            startDate = new Date(date);
            startDate.setHours(0, 0, 0, 0);
            endDate = new Date(date);
            endDate.setHours(23, 59, 59, 999);
        }

        const where = {
            isActive: true,
            ...(centerId && { centerId }),
            ...(activityTypeId && { activityTypeId }),
            ...(date && {
                startTime: { gte: startDate, lte: endDate }
            }),
            ...(!date && { startTime: { gte: new Date() } })
        };

        const [sessions, total] = await Promise.all([
            prisma.session.findMany({
                where,
                take: parseInt(limit),
                skip: parseInt(offset),
                orderBy: { startTime: 'asc' },
                include: {
                    center: {
                        select: { id: true, name: true, city: true, slug: true }
                    },
                    activityType: {
                        select: { id: true, name: true, slug: true, category: true }
                    }
                }
            }),
            prisma.session.count({ where })
        ]);

        // Add availability info
        const sessionsWithAvailability = sessions.map(session => ({
            ...session,
            availableSlots: session.maxCapacity - session.currentBookings,
            isFull: session.currentBookings >= session.maxCapacity
        }));

        res.json({ sessions: sessionsWithAvailability, total, limit: parseInt(limit), offset: parseInt(offset) });
    } catch (error) {
        console.error('Get sessions error:', error);
        res.status(500).json({ error: { message: 'Failed to fetch sessions' } });
    }
};

export const getSessionById = async (req, res) => {
    try {
        const { id } = req.params;

        const session = await prisma.session.findUnique({
            where: { id },
            include: {
                center: true,
                activityType: true
            }
        });

        if (!session) {
            return res.status(404).json({ error: { message: 'Session not found' } });
        }

        const availability = {
            availableSlots: session.maxCapacity - session.currentBookings,
            isFull: session.currentBookings >= session.maxCapacity
        };

        res.json({ session: { ...session, ...availability } });
    } catch (error) {
        console.error('Get session error:', error);
        res.status(500).json({ error: { message: 'Failed to fetch session' } });
    }
};

export const getActivityTypes = async (req, res) => {
    try {
        const activityTypes = await prisma.activityType.findMany({
            where: { isActive: true },
            orderBy: { name: 'asc' }
        });

        res.json({ activityTypes });
    } catch (error) {
        console.error('Get activity types error:', error);
        res.status(500).json({ error: { message: 'Failed to fetch activity types' } });
    }
};
