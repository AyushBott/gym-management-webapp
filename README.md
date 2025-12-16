# FitnessHub - Modern Fitness Platform

A comprehensive web platform inspired by cult.fit that enables users to browse fitness centers, book sessions, manage memberships, and access wellness content.

![Tech Stack](https://img.shields.io/badge/Stack-PERN-blue)
![License](https://img.shields.io/badge/License-MIT-green)

## 🚀 Features

### For Users
- **User Authentication**: Email/password registration and login with JWT tokens
- **Browse Centers**: Explore fitness centers across cities with detailed information
- **Book Sessions**: Browse and book group workout sessions, yoga, strength training, and more
- **Membership Management**: View and purchase membership plans with payment integration
- **User Dashboard**: Manage bookings, track memberships, and update profile
- **Blog & Content**: Read health and wellness articles

### For Franchise Partners
- **Franchise Inquiry**: Submit franchise applications through dedicated landing page

### For Administrators
- **Admin Dashboard**: Analytics and statistics overview
- **Content Management**: Manage centers, sessions, users, blog posts, and franchise inquiries
- **Payment Tracking**: Monitor membership purchases and revenue

## 🛠️ Technology Stack

### Backend
- **Runtime**: Node.js with Express.js
- **Database**: PostgreSQL with Prisma ORM
- **Authentication**: JWT (JSON Web Tokens) + bcrypt
- **Payment Gateways**: Stripe & Razorpay
- **Security**: Helmet.js, CORS, rate limiting

### Frontend
- **Framework**: React 18 with Vite
- **Routing**: React Router v6
- **HTTP Client**: Axios with interceptors
- **Styling**: Modern CSS with design system
- **State Management**: Context API

## 📋 Prerequisites

- Node.js (v18 or higher)
- PostgreSQL (v14 or higher)
- npm or yarn

## 🔧 Installation & Setup

### 1. Clone the Repository
```bash
cd /Uses/ayushbot/Downloads/gymwebsite
```

### 2. Backend Setup

```bash
# Navigate to backend directory
cd backend

# Install dependencies
npm install

# Create .env file from example
cp .env.example .env

# Edit .env and configure your database and other settings
# Minimum required:
# DATABASE_URL="postgresql://username:password@localhost:5432/fitness_platform"
# JWT_SECRET=your-secret-key

# Generate Prisma client
npm run prisma:generate

# Run database migrations
npm run prisma:migrate

# Seed the database
npm run seed

# Start the development server
npm run dev
```

The backend server will start on `http://localhost:5000`

### 3. Frontend Setup

```bash
# Open a new terminal and navigate to frontend directory
cd frontend

# Install dependencies
npm install

# Start the development server
npm run dev
```

The frontend will start on `http://localhost:5173`

## 🎯 Quick Start

1. **Access the application**: Open `http://localhost:5173` in your browser

2. **Login as Admin**:
   - Email: `admin@fitnesshub.com`
   - Password: `Admin@123`

3. **Or Register a New User**: Click "Sign Up" and create your account

4. **Browse Centers**: Navigate to Centers to explore fitness locations

5. **Book a Session**: View available sessions and book (requires active membership)

6. **Purchase Membership**: Go to Memberships to purchase a plan

## 📁 Project Structure

```
gymwebsite/
├── backend/
│   ├── controllers/         # Request handlers
│   ├── middleware/          # Auth, validation middleware
│   ├── routes/              # API routes
│   ├── prisma/              # Database schema & migrations
│   ├── server.js            # Express app setup
│   └── package.json
│
├── frontend/
│   ├── src/
│   │   ├── components/      # Reusable components
│   │   ├── pages/           # Page components
│   │   ├── context/         # React Context (Auth)
│   │   ├── utils/           # API client, helpers
│   │   ├── App.jsx          # Main app component
│   │   └── index.css        # Global styles & design system
│   ├── index.html
│   └── package.json
│
└── README.md
```

## 🔌 API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user

### Centers & Sessions
- `GET /api/centers` - List all centers
- `GET /api/centers/:slug` - Get center details
- `GET /api/sessions` - List all sessions
- `GET /api/sessions/:id` - Get session details

### Bookings (Protected)
- `POST /api/bookings` - Create booking
- `GET /api/bookings` - Get user bookings
- `DELETE /api/bookings/:id` - Cancel booking

### Memberships
- `GET /api/memberships/plans` - List membership plans
- `POST /api/memberships/purchase` - Purchase membership (Protected)
- `GET /api/memberships/my-memberships` - Get user memberships (Protected)

### Admin (Protected - Admin Only)
- `GET /api/admin/dashboard/stats` - Get dashboard statistics
- `POST /api/admin/centers` - Create center
- `POST /api/admin/sessions` - Create session
- `GET /api/admin/users` - List users
- And more...

## 🎨 Design Features

- **Modern UI**: Vibrant gradient color scheme with purple/pink theme
- **Responsive Design**: Mobile-first approach with responsive grids
- **Smooth Animations**: Micro-interactions and transitions
- **Glassmorphism**: Modern glass effects on navigation
- **Custom Scrollbar**: Styled scrollbars matching theme
- **Loading States**: Spinners and skeleton screens

## 💳 Payment Integration

The platform supports both Stripe and Razorpay for membership purchases:

- Configure API keys in backend `.env`
- Webhooks handle payment confirmations
- Test mode available for development

## 🔒 Security Features

- JWT-based authentication
- Password hashing with bcrypt
- Rate limiting on API endpoints
- CORS configuration
- Helmet.js security headers
- Input validation with Joi

## 📝 Default Data

After running the seed script, you'll have:
- 1 Admin user
- 3 Fitness centers (Mumbai, Bangalore, Pune)
- 6 Activity types
- Multiple sessions
- 3 Membership plans
- 3 Blog posts

## 🤝 Contributing

This is a demonstration project. Feel free to fork and customize for your needs!

## 📄 License

MIT License - feel free to use this project for learning or commercial purposes.

## 🐛 Known Limitations

- Email/SMS notifications require additional configuration
- Social OAuth needs Google/Facebook app setup
- Payment webhooks need public URL (use ngrok for local testing)
- Admin panel has basic functionality (CRUD interfaces are stubs)

## 📞 Support

For issues or questions, please open an issue on GitHub.

---

**Built with ❤️ by Antigravity** 

Transform your fitness journey today! 💪🏋️‍♀️
