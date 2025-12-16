import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
    console.log('🌱 Starting database seed...');

    // Create admin user
    const adminUser = await prisma.user.upsert({
        where: { email: 'admin@fitnesshub.com' },
        update: {},
        create: {
            email: 'admin@fitnesshub.com',
            passwordHash: await bcrypt.hash('Admin@123', 10),
            firstName: 'Admin',
            lastName: 'User',
            role: 'admin',
            emailVerified: true
        }
    });
    console.log('✅ Created admin user:', adminUser.email);

    // Create activity types
    const activityTypes = await Promise.all([
        prisma.activityType.upsert({
            where: { slug: 'yoga' },
            update: {},
            create: {
                name: 'Yoga',
                slug: 'yoga',
                description: 'Mind-body practice combining physical postures, breathing, and meditation',
                category: 'yoga'
            }
        }),
        prisma.activityType.upsert({
            where: { slug: 'strength-training' },
            update: {},
            create: {
                name: 'Strength Training',
                slug: 'strength-training',
                description: 'Build muscle and increase strength with weights and resistance',
                category: 'strength'
            }
        }),
        prisma.activityType.upsert({
            where: { slug: 'cardio' },
            update: {},
            create: {
                name: 'Cardio',
                slug: 'cardio',
                description: 'High-energy cardiovascular workouts',
                category: 'cardio'
            }
        }),
        prisma.activityType.upsert({
            where: { slug: 'zumba' },
            update: {},
            create: {
                name: 'Zumba',
                slug: 'zumba',
                description: 'Dance fitness with Latin-inspired music',
                category: 'group_workout'
            }
        }),
        prisma.activityType.upsert({
            where: { slug: 'pilates' },
            update: {},
            create: {
                name: 'Pilates',
                slug: 'pilates',
                description: 'Low-impact exercises focusing on core strength and flexibility',
                category: 'yoga'
            }
        }),
        prisma.activityType.upsert({
            where: { slug: 'boxing' },
            update: {},
            create: {
                name: 'Boxing',
                slug: 'boxing',
                description: 'Combat sport training for fitness and self-defense',
                category: 'sports'
            }
        })
    ]);
    console.log(`✅ Created ${activityTypes.length} activity types`);

    // Create fitness centers
    const centers = await Promise.all([
        prisma.fitnessCenter.upsert({
            where: { slug: 'fitness-hub-downtown' },
            update: {},
            create: {
                name: 'FitnessHub Downtown',
                slug: 'fitness-hub-downtown',
                description: 'Premium fitness center in the heart of the city with state-of-the-art equipment',
                address: '123 Main Street',
                city: 'Mumbai',
                state: 'Maharashtra',
                country: 'India',
                pinCode: '400001',
                latitude: 19.0760,
                longitude: 72.8777,
                phone: '+91 98765 43210',
                email: 'downtown@fitnesshub.com',
                amenities: ['Parking', 'Shower', 'Locker', 'WiFi', 'Cafe'],
                operatingHours: {
                    monday: { open: '06:00', close: '22:00' },
                    tuesday: { open: '06:00', close: '22:00' },
                    wednesday: { open: '06:00', close: '22:00' },
                    thursday: { open: '06:00', close: '22:00' },
                    friday: { open: '06:00', close: '22:00' },
                    saturday: { open: '07:00', close: '21:00' },
                    sunday: { open: '07:00', close: '21:00' }
                }
            }
        }),
        prisma.fitnessCenter.upsert({
            where: { slug: 'fitness-hub-south' },
            update: {},
            create: {
                name: 'FitnessHub South',
                slug: 'fitness-hub-south',
                description: 'Spacious facility with dedicated areas for different training styles',
                address: '456 Park Avenue',
                city: 'Bangalore',
                state: 'Karnataka',
                country: 'India',
                pinCode: '560001',
                latitude: 12.9716,
                longitude: 77.5946,
                phone: '+91 98765 43211',
                email: 'south@fitnesshub.com',
                amenities: ['Parking', 'Shower', 'Locker', 'Steam Room', 'Sauna'],
                operatingHours: {
                    monday: { open: '06:00', close: '22:00' },
                    tuesday: { open: '06:00', close: '22:00' },
                    wednesday: { open: '06:00', close: '22:00' },
                    thursday: { open: '06:00', close: '22:00' },
                    friday: { open: '06:00', close: '22:00' },
                    saturday: { open: '07:00', close: '20:00' },
                    sunday: { open: '07:00', close: '20:00' }
                }
            }
        }),
        prisma.fitnessCenter.upsert({
            where: { slug: 'fitness-hub-west' },
            update: {},
            create: {
                name: 'FitnessHub West',
                slug: 'fitness-hub-west',
                description: 'Modern wellness center with holistic fitness approach',
                address: '789 Sunset Boulevard',
                city: 'Pune',
                state: 'Maharashtra',
                country: 'India',
                pinCode: '411001',
                latitude: 18.5204,
                longitude: 73.8567,
                phone: '+91 98765 43212',
                email: 'west@fitnesshub.com',
                amenities: ['Parking', 'Shower', 'Locker', 'Juice Bar', 'Pool'],
                operatingHours: {
                    monday: { open: '05:30', close: '23:00' },
                    tuesday: { open: '05:30', close: '23:00' },
                    wednesday: { open: '05:30', close: '23:00' },
                    thursday: { open: '05:30', close: '23:00' },
                    friday: { open: '05:30', close: '23:00' },
                    saturday: { open: '06:00', close: '22:00' },
                    sunday: { open: '06:00', close: '22:00' }
                }
            }
        })
    ]);
    console.log(`✅ Created ${centers.length} fitness centers`);

    // Create sessions for each center
    const now = new Date();
    const tomorrow = new Date(now);
    tomorrow.setDate(tomorrow.getDate() + 1);
    tomorrow.setHours(7, 0, 0, 0);

    const sessions = [];
    for (const center of centers) {
        for (let i = 0; i < 5; i++) {
            const sessionDate = new Date(tomorrow);
            sessionDate.setHours(7 + i * 2, 0, 0, 0);
            const endDate = new Date(sessionDate);
            endDate.setHours(sessionDate.getHours() + 1);

            const activityType = activityTypes[i % activityTypes.length];

            sessions.push(
                prisma.session.create({
                    data: {
                        centerId: center.id,
                        activityTypeId: activityType.id,
                        title: `${activityType.name} Class`,
                        description: `${activityType.name} session at ${center.name}`,
                        instructorName: `Instructor ${i + 1}`,
                        startTime: sessionDate,
                        endTime: endDate,
                        durationMinutes: 60,
                        maxCapacity: 20,
                        difficultyLevel: ['beginner', 'intermediate', 'advanced'][i % 3]
                    }
                })
            );
        }
    }
    await Promise.all(sessions);
    console.log(`✅ Created ${sessions.length} sessions`);

    // Create membership plans
    const plans = await Promise.all([
        prisma.membershipPlan.upsert({
            where: { slug: 'monthly-basic' },
            update: {},
            create: {
                name: 'Monthly Basic',
                slug: 'monthly-basic',
                description: 'Perfect for getting started with your fitness journey',
                durationDays: 30,
                price: 1999,
                currency: 'INR',
                features: ['Access to all centers', 'Up to 8 classes per month', 'Basic equipment access'],
                maxBookingsPerMonth: 8,
                accessType: 'unlimited'
            }
        }),
        prisma.membershipPlan.upsert({
            where: { slug: 'quarterly-pro' },
            update: {},
            create: {
                name: 'Quarterly Pro',
                slug: 'quarterly-pro',
                description: 'Best value for dedicated fitness enthusiasts',
                durationDays: 90,
                price: 4999,
                currency: 'INR',
                features: ['Access to all centers', 'Unlimited classes', 'Personal trainer session', 'Nutrition consultation'],
                maxBookingsPerMonth: null,
                accessType: 'unlimited',
                isPopular: true
            }
        }),
        prisma.membershipPlan.upsert({
            where: { slug: 'annual-elite' },
            update: {},
            create: {
                name: 'Annual Elite',
                slug: 'annual-elite',
                description: 'Ultimate fitness package with exclusive benefits',
                durationDays: 365,
                price: 15999,
                currency: 'INR',
                features: ['Access to all centers', 'Unlimited classes', '12 personal trainer sessions', 'Monthly nutrition plan', 'Guest passes', 'Priority booking'],
                maxBookingsPerMonth: null,
                accessType: 'unlimited'
            }
        })
    ]);
    console.log(`✅ Created ${plans.length} membership plans`);

    // Create sample blog posts
    const blogPosts = await Promise.all([
        prisma.blogPost.upsert({
            where: { slug: '10-benefits-of-regular-exercise' },
            update: {},
            create: {
                title: '10 Benefits of Regular Exercise',
                slug: '10-benefits-of-regular-exercise',
                excerpt: 'Discover how regular physical activity can transform your health and well-being',
                content: 'Regular exercise is one of the most important things you can do for your health. It can help control your weight, combat health conditions, boost energy, promote better sleep, and improve your mood...',
                authorId: adminUser.id,
                category: 'Health & Wellness',
                tags: ['fitness', 'health', 'wellness'],
                readTimeMinutes: 5,
                isPublished: true,
                publishedAt: new Date()
            }
        }),
        prisma.blogPost.upsert({
            where: { slug: 'yoga-for-beginners' },
            update: {},
            create: {
                title: 'Yoga for Beginners: Getting Started',
                slug: 'yoga-for-beginners',
                excerpt: 'A comprehensive guide to starting your yoga journey safely and effectively',
                content: 'Starting a yoga practice can seem intimidating, but it doesn\'t have to be. This guide will walk you through the basics of yoga, common poses for beginners, and tips for establishing a regular practice...',
                authorId: adminUser.id,
                category: 'Yoga',
                tags: ['yoga', 'beginners', 'mindfulness'],
                readTimeMinutes: 7,
                isPublished: true,
                publishedAt: new Date()
            }
        }),
        prisma.blogPost.upsert({
            where: { slug: 'nutrition-tips-for-fitness' },
            update: {},
            create: {
                title: 'Nutrition Tips for Fitness Success',
                slug: 'nutrition-tips-for-fitness',
                excerpt: 'Learn how proper nutrition can maximize your workout results',
                content: 'Nutrition plays a crucial role in fitness. What you eat before and after workouts can significantly impact your performance and recovery. Here are essential nutrition tips to support your fitness goals...',
                authorId: adminUser.id,
                category: 'Nutrition',
                tags: ['nutrition', 'diet', 'fitness'],
                readTimeMinutes: 6,
                isPublished: true,
                publishedAt: new Date()
            }
        })
    ]);
    console.log(`✅ Created ${blogPosts.length} blog posts`);

    console.log('🎉 Database seed completed successfully!');
    console.log('\n📝 Admin Login Credentials:');
    console.log('Email: admin@fitnesshub.com');
    console.log('Password: Admin@123');
}

main()
    .catch((e) => {
        console.error('❌ Seed error:', e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
