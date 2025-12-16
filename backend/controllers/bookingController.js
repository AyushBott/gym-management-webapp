import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const createBooking = async (req, res) => {
    try {
        const { sessionId } = req.body;
        const userId = req.user.id;

        // Check if session exists and is active
        const session = await prisma.session.findUnique({
            where: { id: sessionId },
            include: { center: true }
        });

        if (!session || !session.isActive) {
            return res.status(404).json({ error: { message: 'Session not found or inactive' } });
        }

        // Check if session is in the future
        if (new Date(session.startTime) < new Date()) {
            return res.status(400).json({ error: { message: 'Cannot book past sessions' } });
        }

        // Check if session is full
        if (session.currentBookings >= session.maxCapacity) {
            return res.status(400).json({ error: { message: 'Session is fully booked' } });
        }

        // Check if user already has an active booking for this session
        const existingBooking = await prisma.booking.findFirst({
            where: {
                userId,
                sessionId,
                bookingStatus: { not: 'cancelled' }
            }
        });

        if (existingBooking) {
            return res.status(400).json({ error: { message: 'You already have a booking for this session' } });
        }

        // Check if user has an active membership
        const activeMembership = await prisma.userMembership.findFirst({
            where: {
                userId,
                status: 'active',
                startDate: { lte: new Date() },
                endDate: { gte: new Date() }
            },
            include: { plan: true }
        });

        if (!activeMembership) {
            return res.status(400).json({ error: { message: 'You need an active membership to book sessions' } });
        }

        // Create booking and update session count in a transaction
        const [booking] = await prisma.$transaction([
            prisma.booking.create({
                data: {
                    userId,
                    sessionId,
                    bookingStatus: 'confirmed'
                },
                include: {
                    session: {
                        include: {
                            center: true,
                            activityType: true
                        }
                    }
                }
            }),
            prisma.session.update({
                where: { id: sessionId },
                data: { currentBookings: { increment: 1 } }
            }),
            prisma.userMembership.update({
                where: { id: activeMembership.id },
                data: { bookingsUsed: { increment: 1 } }
            })
        ]);

        res.status(201).json({ message: 'Booking created successfully', booking });
    } catch (error) {
        console.error('Create booking error:', error);
        res.status(500).json({ error: { message: 'Failed to create booking' } });
    }
};

export const getMyBookings = async (req, res) => {
    try {
        const userId = req.user.id;
        const { status, upcoming } = req.query;

        const where = {
            userId,
            ...(status && { bookingStatus: status }),
            ...(upcoming === 'true' && {
                session: { startTime: { gte: new Date() } },
                bookingStatus: { not: 'cancelled' }
            })
        };

        const bookings = await prisma.booking.findMany({
            where,
            include: {
                session: {
                    include: {
                        center: {
                            select: { id: true, name: true, city: true, address: true }
                        },
                        activityType: {
                            select: { id: true, name: true, category: true }
                        }
                    }
                }
            },
            orderBy: { createdAt: 'desc' }
        });

        res.json({ bookings });
    } catch (error) {
        console.error('Get bookings error:', error);
        res.status(500).json({ error: { message: 'Failed to fetch bookings' } });
    }
};

export const cancelBooking = async (req, res) => {
    try {
        const { id } = req.params;
        const userId = req.user.id;
        const { reason } = req.body;

        const booking = await prisma.booking.findUnique({
            where: { id },
            include: { session: true }
        });

        if (!booking) {
            return res.status(404).json({ error: { message: 'Booking not found' } });
        }

        if (booking.userId !== userId) {
            return res.status(403).json({ error: { message: 'Unauthorized' } });
        }

        if (booking.bookingStatus === 'cancelled') {
            return res.status(400).json({ error: { message: 'Booking already cancelled' } });
        }

        // Check if session has already started
        if (new Date(booking.session.startTime) < new Date()) {
            return res.status(400).json({ error: { message: 'Cannot cancel bookings for past sessions' } });
        }

        // Cancel booking and update session count
        const [updatedBooking] = await prisma.$transaction([
            prisma.booking.update({
                where: { id },
                data: {
                    bookingStatus: 'cancelled',
                    cancelledAt: new Date(),
                    cancellationReason: reason
                }
            }),
            prisma.session.update({
                where: { id: booking.sessionId },
                data: { currentBookings: { decrement: 1 } }
            })
        ]);

        res.json({ message: 'Booking cancelled successfully', booking: updatedBooking });
    } catch (error) {
        console.error('Cancel booking error:', error);
        res.status(500).json({ error: { message: 'Failed to cancel booking' } });
    }
};
