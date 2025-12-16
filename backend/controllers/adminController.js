import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// Dashboard Analytics
export const getDashboardStats = async (req, res) => {
    try {
        const [
            totalUsers,
            totalBookings,
            totalRevenue,
            activeMemberships,
            recentBookings
        ] = await Promise.all([
            prisma.user.count({ where: { role: 'user' } }),
            prisma.booking.count(),
            prisma.payment.aggregate({
                where: { status: 'completed' },
                _sum: { amount: true }
            }),
            prisma.userMembership.count({ where: { status: 'active' } }),
            prisma.booking.count({
                where: {
                    bookedAt: {
                        gte: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)
                    }
                }
            })
        ]);

        res.json({
            totalUsers,
            totalBookings,
            totalRevenue: totalRevenue._sum.amount || 0,
            activeMemberships,
            recentBookings
        });
    } catch (error) {
        console.error('Dashboard stats error:', error);
        res.status(500).json({ error: { message: 'Failed to fetch dashboard stats' } });
    }
};

// Center Management
export const createCenter = async (req, res) => {
    try {
        const data = req.body;

        const center = await prisma.fitnessCenter.create({
            data: {
                name: data.name,
                slug: data.slug || data.name.toLowerCase().replace(/\s+/g, '-'),
                description: data.description,
                address: data.address,
                city: data.city,
                state: data.state,
                country: data.country,
                pinCode: data.pinCode,
                latitude: data.latitude,
                longitude: data.longitude,
                phone: data.phone,
                email: data.email,
                images: data.images || [],
                amenities: data.amenities || [],
                operatingHours: data.operatingHours || {}
            }
        });

        res.status(201).json({ message: 'Center created successfully', center });
    } catch (error) {
        console.error('Create center error:', error);
        res.status(500).json({ error: { message: 'Failed to create center' } });
    }
};

export const updateCenter = async (req, res) => {
    try {
        const { id } = req.params;
        const data = req.body;

        const center = await prisma.fitnessCenter.update({
            where: { id },
            data
        });

        res.json({ message: 'Center updated successfully', center });
    } catch (error) {
        console.error('Update center error:', error);
        res.status(500).json({ error: { message: 'Failed to update center' } });
    }
};

export const deleteCenter = async (req, res) => {
    try {
        const { id } = req.params;

        await prisma.fitnessCenter.delete({ where: { id } });

        res.json({ message: 'Center deleted successfully' });
    } catch (error) {
        console.error('Delete center error:', error);
        res.status(500).json({ error: { message: 'Failed to delete center' } });
    }
};

// Session Management
export const createSession = async (req, res) => {
    try {
        const data = req.body;

        const session = await prisma.session.create({
            data: {
                centerId: data.centerId,
                activityTypeId: data.activityTypeId,
                title: data.title,
                description: data.description,
                instructorName: data.instructorName,
                instructorImageUrl: data.instructorImageUrl,
                startTime: new Date(data.startTime),
                endTime: new Date(data.endTime),
                durationMinutes: data.durationMinutes,
                maxCapacity: data.maxCapacity,
                difficultyLevel: data.difficultyLevel,
                isRecurring: data.isRecurring || false,
                recurrencePattern: data.recurrencePattern
            },
            include: {
                center: true,
                activityType: true
            }
        });

        res.status(201).json({ message: 'Session created successfully', session });
    } catch (error) {
        console.error('Create session error:', error);
        res.status(500).json({ error: { message: 'Failed to create session' } });
    }
};

export const updateSession = async (req, res) => {
    try {
        const { id } = req.params;
        const data = req.body;

        const session = await prisma.session.update({
            where: { id },
            data: {
                ...data,
                ...(data.startTime && { startTime: new Date(data.startTime) }),
                ...(data.endTime && { endTime: new Date(data.endTime) })
            }
        });

        res.json({ message: 'Session updated successfully', session });
    } catch (error) {
        console.error('Update session error:', error);
        res.status(500).json({ error: { message: 'Failed to update session' } });
    }
};

export const deleteSession = async (req, res) => {
    try {
        const { id } = req.params;

        await prisma.session.delete({ where: { id } });

        res.json({ message: 'Session deleted successfully' });
    } catch (error) {
        console.error('Delete session error:', error);
        res.status(500).json({ error: { message: 'Failed to delete session' } });
    }
};

// User Management
export const getAllUsers = async (req, res) => {
    try {
        const { limit = 50, offset = 0, search } = req.query;

        const where = search ? {
            OR: [
                { email: { contains: search, mode: 'insensitive' } },
                { firstName: { contains: search, mode: 'insensitive' } },
                { lastName: { contains: search, mode: 'insensitive' } }
            ]
        } : {};

        const [users, total] = await Promise.all([
            prisma.user.findMany({
                where,
                take: parseInt(limit),
                skip: parseInt(offset),
                select: {
                    id: true,
                    email: true,
                    firstName: true,
                    lastName: true,
                    phone: true,
                    role: true,
                    isActive: true,
                    createdAt: true
                },
                orderBy: { createdAt: 'desc' }
            }),
            prisma.user.count({ where })
        ]);

        res.json({ users, total, limit: parseInt(limit), offset: parseInt(offset) });
    } catch (error) {
        console.error('Get users error:', error);
        res.status(500).json({ error: { message: 'Failed to fetch users' } });
    }
};

export const toggleUserStatus = async (req, res) => {
    try {
        const { id } = req.params;

        const user = await prisma.user.findUnique({ where: { id } });

        if (!user) {
            return res.status(404).json({ error: { message: 'User not found' } });
        }

        const updated = await prisma.user.update({
            where: { id },
            data: { isActive: !user.isActive }
        });

        res.json({ message: 'User status updated', user: updated });
    } catch (error) {
        console.error('Toggle user status error:', error);
        res.status(500).json({ error: { message: 'Failed to update user status' } });
    }
};

// Blog Management
export const createBlogPost = async (req, res) => {
    try {
        const data = req.body;
        const authorId = req.user.id;

        const post = await prisma.blogPost.create({
            data: {
                title: data.title,
                slug: data.slug || data.title.toLowerCase().replace(/\s+/g, '-'),
                excerpt: data.excerpt,
                content: data.content,
                featuredImageUrl: data.featuredImageUrl,
                authorId,
                category: data.category,
                tags: data.tags || [],
                readTimeMinutes: data.readTimeMinutes,
                isPublished: data.isPublished || false,
                ...(data.isPublished && { publishedAt: new Date() })
            }
        });

        res.status(201).json({ message: 'Blog post created', post });
    } catch (error) {
        console.error('Create blog post error:', error);
        res.status(500).json({ error: { message: 'Failed to create blog post' } });
    }
};

export const updateBlogPost = async (req, res) => {
    try {
        const { id } = req.params;
        const data = req.body;

        const post = await prisma.blogPost.update({
            where: { id },
            data: {
                ...data,
                ...(data.isPublished && !data.publishedAt && { publishedAt: new Date() })
            }
        });

        res.json({ message: 'Blog post updated', post });
    } catch (error) {
        console.error('Update blog post error:', error);
        res.status(500).json({ error: { message: 'Failed to update blog post' } });
    }
};

export const deleteBlogPost = async (req, res) => {
    try {
        const { id } = req.params;

        await prisma.blogPost.delete({ where: { id } });

        res.json({ message: 'Blog post deleted' });
    } catch (error) {
        console.error('Delete blog post error:', error);
        res.status(500).json({ error: { message: 'Failed to delete blog post' } });
    }
};

// Franchise Inquiry Management
export const getInquiries = async (req, res) => {
    try {
        const { status, limit = 50, offset = 0 } = req.query;

        const where = status ? { status } : {};

        const [inquiries, total] = await Promise.all([
            prisma.franchiseInquiry.findMany({
                where,
                take: parseInt(limit),
                skip: parseInt(offset),
                include: {
                    assignedUser: {
                        select: { id: true, firstName: true, lastName: true, email: true }
                    }
                },
                orderBy: { createdAt: 'desc' }
            }),
            prisma.franchiseInquiry.count({ where })
        ]);

        res.json({ inquiries, total, limit: parseInt(limit), offset: parseInt(offset) });
    } catch (error) {
        console.error('Get inquiries error:', error);
        res.status(500).json({ error: { message: 'Failed to fetch inquiries' } });
    }
};

export const updateInquiry = async (req, res) => {
    try {
        const { id } = req.params;
        const data = req.body;

        const inquiry = await prisma.franchiseInquiry.update({
            where: { id },
            data
        });

        res.json({ message: 'Inquiry updated', inquiry });
    } catch (error) {
        console.error('Update inquiry error:', error);
        res.status(500).json({ error: { message: 'Failed to update inquiry' } });
    }
};
