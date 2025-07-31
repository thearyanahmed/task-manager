# Task Manager

A modern, full-stack task management application built with Next.js, PostgreSQL, and deployed on DigitalOcean App Platform.

![Task Manager](https://img.shields.io/badge/Next.js-14-black)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-16-blue)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-3-cyan)

## Features

- 🔐 **Authentication**: Secure login with Google and GitHub via NextAuth.js
- 📝 **Task Management**: Create, read, update, and delete tasks
- 🎯 **Task Organization**: Priority levels (Low, Medium, High, Urgent) and status tracking
- 📅 **Due Dates**: Set and track task deadlines with overdue indicators
- 📊 **Kanban Board**: Visual task organization by status
- 🔍 **Filtering**: Filter tasks by status and priority
- 📱 **Responsive Design**: Works seamlessly on desktop and mobile
- ⚡ **Real-time Updates**: Instant UI updates with optimistic rendering
- 🛡️ **Error Handling**: Comprehensive error handling and loading states

## Tech Stack

### Frontend
- **Framework**: Next.js 14 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS with custom design system
- **UI Components**: Radix UI primitives
- **Icons**: Lucide React

### Backend
- **API**: Next.js API Routes
- **Database**: PostgreSQL with Prisma ORM
- **Authentication**: NextAuth.js with OAuth providers
- **Validation**: Zod for schema validation

### Infrastructure
- **Hosting**: DigitalOcean App Platform
- **Database**: DigitalOcean Managed PostgreSQL
- **Deployment**: Automatic deployments from GitHub

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn
- PostgreSQL database (local or managed)
- Google OAuth app credentials
- GitHub OAuth app credentials

### Local Development

1. **Clone the repository**
   ```bash
   git clone https://github.com/thearyanahmed/task-manager.git
   cd task-manager
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env.local
   ```
   
   Fill in your environment variables:
   ```env
   DATABASE_URL="postgresql://username:password@localhost:5432/taskmanager"
   NEXTAUTH_URL="http://localhost:3000"
   NEXTAUTH_SECRET="your-nextauth-secret"
   GOOGLE_CLIENT_ID="your-google-client-id"  
   GOOGLE_CLIENT_SECRET="your-google-client-secret"
   GITHUB_ID="your-github-oauth-app-id"
   GITHUB_SECRET="your-github-oauth-app-secret"
   ```

4. **Set up the database**
   ```bash
   npx prisma db push
   npx prisma generate
   ```

5. **Run the development server**
   ```bash
   npm run dev
   ```

6. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

### OAuth Setup

#### Google OAuth
1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select an existing one
3. Enable the Google+ API
4. Create OAuth 2.0 credentials
5. Add `http://localhost:3000/api/auth/callback/google` to authorized redirect URIs

#### GitHub OAuth
1. Go to GitHub Settings > Developer settings > OAuth Apps
2. Create a new OAuth App
3. Set Authorization callback URL to `http://localhost:3000/api/auth/callback/github`

## Deployment on DigitalOcean

### 1. Create PostgreSQL Database

```bash
# Using DigitalOcean CLI (optional)
doctl databases create task-manager-db --engine pg --version 16 --region nyc1 --size db-s-2vcpu-4gb --num-nodes 1
```

Or use the DigitalOcean web interface:
- Go to Databases → Create Database
- Choose PostgreSQL 16
- Select NYC1 region
- Choose appropriate size (db-s-2vcpu-4gb recommended)

### 2. Deploy to App Platform

1. **Fork this repository** to your GitHub account

2. **Create App Platform application**:
   - Go to DigitalOcean → App Platform
   - Create App from GitHub repository
   - Select your forked repository
   - Choose NYC1 region

3. **Configure environment variables** in App Platform:
   ```
   NEXTAUTH_SECRET=your-production-secret
   NEXTAUTH_URL=https://your-app-name.ondigitalocean.app
   GOOGLE_CLIENT_ID=your-google-client-id
   GOOGLE_CLIENT_SECRET=your-google-client-secret
   GITHUB_ID=your-github-oauth-app-id
   GITHUB_SECRET=your-github-oauth-app-secret
   ```

4. **Connect the database**:
   - In App Platform, go to your app settings
   - Add the PostgreSQL database as a component
   - The `DATABASE_URL` will be automatically provided

5. **Update OAuth redirect URIs**:
   - Google: Add `https://your-app-name.ondigitalocean.app/api/auth/callback/google`
   - GitHub: Add `https://your-app-name.ondigitalocean.app/api/auth/callback/github`

6. **Deploy**: App Platform will automatically deploy your application

### 3. Database Migration

After deployment, run the database migration:

```bash
# This will be handled automatically by the build process
# Prisma will run migrations during the build
```

## Database Schema

```sql
-- Users table (managed by NextAuth.js)
Users: id, name, email, image, created_at, updated_at

-- Tasks table
Tasks: id, title, description, status, priority, due_date, user_id, created_at, updated_at

-- Auth tables (NextAuth.js)
Accounts, Sessions, VerificationTokens
```

## API Endpoints

- `GET /api/tasks` - Get user's tasks (with optional filtering)
- `POST /api/tasks` - Create a new task
- `GET /api/tasks/[id]` - Get specific task
- `PATCH /api/tasks/[id]` - Update task
- `DELETE /api/tasks/[id]` - Delete task
- `GET/POST /api/auth/*` - NextAuth.js authentication endpoints

## Project Structure

```
src/
├── app/
│   ├── api/              # API routes
│   ├── globals.css       # Global styles
│   ├── layout.tsx        # Root layout
│   └── page.tsx          # Home page
├── components/
│   ├── ui/               # Reusable UI components
│   ├── auth-provider.tsx # Session provider
│   ├── loading-spinner.tsx
│   ├── task-card.tsx     # Individual task display
│   ├── task-form.tsx     # Task creation/editing
│   └── task-list.tsx     # Task list with filtering
├── lib/
│   ├── auth.ts           # NextAuth configuration
│   ├── prisma.ts         # Prisma client
│   └── utils.ts          # Utility functions
prisma/
└── schema.prisma         # Database schema
```

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npm run db:push` - Push schema changes to database
- `npm run db:migrate` - Run database migrations
- `npm run db:generate` - Generate Prisma client
- `npm run db:studio` - Open Prisma Studio

## Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `DATABASE_URL` | PostgreSQL connection string | Yes |
| `NEXTAUTH_URL` | Application URL | Yes |
| `NEXTAUTH_SECRET` | NextAuth.js secret key | Yes |
| `GOOGLE_CLIENT_ID` | Google OAuth client ID | Yes |
| `GOOGLE_CLIENT_SECRET` | Google OAuth client secret | Yes |
| `GITHUB_ID` | GitHub OAuth app ID | Yes |
| `GITHUB_SECRET` | GitHub OAuth app secret | Yes |

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Support

If you encounter any issues or have questions, please [open an issue](https://github.com/thearyanahmed/task-manager/issues) on GitHub.