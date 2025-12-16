# Gym Management Web Application

A modern, full-stack fitness platform for gym management, class bookings, and memberships. Built with React, Node.js, and Prisma featuring stunning dark/light themes.

![Gym App](https://img.shields.io/badge/Gym-Management-2c4a6e?style=for-the-badge)
![React](https://img.shields.io/badge/React-18-61DAFB?style=flat-square&logo=react)
![Node.js](https://img.shields.io/badge/Node.js-Express-339933?style=flat-square&logo=node.js)
![Prisma](https://img.shields.io/badge/Prisma-ORM-2D3748?style=flat-square&logo=prisma)
![License](https://img.shields.io/badge/License-MIT-green?style=flat-square)

## ✨ Features

### 🏋️ For Users
- **Browse Centers** - Explore fitness locations across cities
- **Book Classes** - Schedule yoga, strength training, cardio, and boxing sessions
- **Membership Plans** - Purchase and manage gym memberships
- **Personal Dashboard** - Track bookings and profile management
- **Blog & Wellness** - Health and fitness articles

### 🏢 For Franchise Partners
- **Franchise Portal** - Submit franchise applications and inquiries

### ⚡ For Administrators
- **Admin Dashboard** - Analytics and statistics
- **Content Management** - Manage centers, sessions, users, and blog posts
- **Revenue Tracking** - Monitor payments and memberships

## 🎨 Design Highlights

- **Dark & Light Themes** - Elegant dark mode with teal accents and bright light mode with navy blue
- **Custom Branding** - Logo with wing icon, watermark backgrounds
- **Geometric Hero Section** - Modern animated overlays
- **Premium UI** - Glassmorphism, smooth animations, micro-interactions
- **Responsive Design** - Mobile-first, works on all devices

## 🛠️ Tech Stack

| Layer | Technology |
|-------|------------|
| **Frontend** | React 18, Vite, React Router v6, Context API |
| **Backend** | Node.js, Express.js, JWT Authentication |
| **Database** | SQLite (dev) / PostgreSQL (prod) with Prisma ORM |
| **Styling** | Custom CSS Design System, CSS Variables |
| **Payments** | Stripe & Razorpay Integration |

## 🚀 Quick Start

### Prerequisites
- Node.js v18+
- npm or yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/AyushBott/gym-management-webapp.git
cd gym-management-webapp

# Backend Setup
cd backend
npm install
cp .env.example .env
npm run prisma:generate
npm run prisma:migrate
npm run seed
npm run dev

# Frontend Setup (new terminal)
cd frontend
npm install
npm run dev
```

### Access
- **Frontend**: http://localhost:5173
- **Backend API**: http://localhost:5001

### Default Login
- **Admin**: `admin@fitnesshub.com` / `Admin@123`

## 📁 Project Structure

```
gym-management-webapp/
├── backend/
│   ├── controllers/     # API route handlers
│   ├── middleware/      # Auth, validation
│   ├── routes/          # Express routes
│   ├── prisma/          # Database schema & migrations
│   └── server.js        # App entry point
│
├── frontend/
│   ├── src/
│   │   ├── components/  # Navbar, Footer, etc.
│   │   ├── pages/       # Page components
│   │   ├── context/     # Auth & Theme providers
│   │   └── index.css    # Design system
│   └── public/images/   # Logos, backgrounds, assets
│
└── README.md
```

## 🔌 API Endpoints

| Endpoint | Description |
|----------|-------------|
| `POST /api/auth/register` | Register user |
| `POST /api/auth/login` | User login |
| `GET /api/centers` | List fitness centers |
| `GET /api/sessions` | List workout sessions |
| `POST /api/bookings` | Book a session |
| `GET /api/memberships/plans` | List membership plans |
| `GET /api/admin/dashboard/stats` | Admin analytics |

## 🎯 Brand Colors

| Color | Hex | Usage |
|-------|-----|-------|
| Navy Blue | `#2c4a6e` | Primary brand, geometric shapes |
| Teal | `#53b9ea` | Accent, CTAs, highlights |
| Dark Base | `#0d0d0d` | Dark mode background |
| White | `#ffffff` | Light mode background |

## 📸 Screenshots

*The app features a stunning dark theme with geometric hero section, animated testimonials, and premium UI elements.*

## 🤝 Contributing

This is a demonstration project. Fork and customize for your needs!

## 📄 License

MIT License - free to use for learning or commercial purposes.

---

**Built with ❤️**

*Transform your fitness journey today!* 💪🏋️‍♀️
