import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const getBlogPosts = async (req, res) => {
    try {
        const { category, search, limit = 12, offset = 0 } = req.query;

        const where = {
            isPublished: true,
            ...(category && { category }),
            ...(search && {
                OR: [
                    { title: { contains: search, mode: 'insensitive' } },
                    { excerpt: { contains: search, mode: 'insensitive' } }
                ]
            })
        };

        const [posts, total] = await Promise.all([
            prisma.blogPost.findMany({
                where,
                take: parseInt(limit),
                skip: parseInt(offset),
                orderBy: { publishedAt: 'desc' },
                select: {
                    id: true,
                    title: true,
                    slug: true,
                    excerpt: true,
                    featuredImageUrl: true,
                    category: true,
                    tags: true,
                    readTimeMinutes: true,
                    publishedAt: true,
                    author: {
                        select: {
                            id: true,
                            firstName: true,
                            lastName: true
                        }
                    }
                }
            }),
            prisma.blogPost.count({ where })
        ]);

        res.json({ posts, total, limit: parseInt(limit), offset: parseInt(offset) });
    } catch (error) {
        console.error('Get blog posts error:', error);
        res.status(500).json({ error: { message: 'Failed to fetch blog posts' } });
    }
};

export const getBlogPostBySlug = async (req, res) => {
    try {
        const { slug } = req.params;

        const post = await prisma.blogPost.findUnique({
            where: { slug },
            include: {
                author: {
                    select: {
                        id: true,
                        firstName: true,
                        lastName: true,
                        profileImageUrl: true
                    }
                }
            }
        });

        if (!post || !post.isPublished) {
            return res.status(404).json({ error: { message: 'Blog post not found' } });
        }

        // Increment view count
        await prisma.blogPost.update({
            where: { id: post.id },
            data: { viewsCount: { increment: 1 } }
        });

        res.json({ post });
    } catch (error) {
        console.error('Get blog post error:', error);
        res.status(500).json({ error: { message: 'Failed to fetch blog post' } });
    }
};

export const getFeaturedPosts = async (req, res) => {
    try {
        const posts = await prisma.blogPost.findMany({
            where: { isPublished: true },
            take: 3,
            orderBy: { viewsCount: 'desc' },
            select: {
                id: true,
                title: true,
                slug: true,
                excerpt: true,
                featuredImageUrl: true,
                category: true,
                readTimeMinutes: true,
                publishedAt: true
            }
        });

        res.json({ posts });
    } catch (error) {
        console.error('Get featured posts error:', error);
        res.status(500).json({ error: { message: 'Failed to fetch featured posts' } });
    }
};
