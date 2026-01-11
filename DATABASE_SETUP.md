# Database Setup Options

The application requires a database. Here are your options:

## Option 1: Install MySQL (Recommended)

### On Mac (using Homebrew):
```bash
brew install mysql
brew services start mysql
# Default root user usually has no password.
# You might need to secure it or create a user.
```

If you use a GUI like DBngin or MAMP, just start the MySQL server on port 3306.

Then run:
```bash
cd backend
npx prisma migrate dev
npm run seed
npm run dev
```

## Option 2: Use SQLite (Easiest for Local Development)

I can reconfigure the app to use SQLite (no installation needed).

Just let me know and I'll:
1. Update `prisma/schema.prisma` to use SQLite
2. Run migrations
3. Seed the database
4. Start both servers

## Option 3: Connect to Existing PostgreSQL

If you have PostgreSQL running with different credentials, update `backend/.env`:
```
DATABASE_URL="postgresql://YOUR_USERNAME:YOUR_PASSWORD@localhost:5432/fitness_platform"
```

Then run the migration and seed commands.

---

**Which option would you like to proceed with?**
