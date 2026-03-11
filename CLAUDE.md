# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Onyx is a job board platform for the Onyx Initiative, built as a full-stack application with a Next.js frontend and Apollo GraphQL backend deployed to AWS Lambda via Serverless Framework.

## Architecture

### Backend (GraphQL API on AWS Lambda)
- **Framework**: Apollo Server on AWS Lambda (serverless)
- **Database**: PostgreSQL with custom search functions using pg_trgm extension
- **Schema**: GraphQL schema split into modular typeDefs and resolvers
- **Deployment**: Serverless Framework with VPC and subnet configurations
- **Entry Point**: `backend/src/index.ts` - creates Apollo Lambda handler

### Frontend (Next.js)
- **Framework**: Next.js 15 with TypeScript
- **UI Libraries**: Mantine UI components, Material UI (@mui/material)
- **Authentication**: NextAuth.js with Azure MSAL
- **GraphQL Client**: Apollo Client connecting via `NEXT_PUBLIC_URI` env variable
- **Pages**: Located in `frontend/pages/` (Next.js pages router, not app router)
- **Components**: Organized by domain in `frontend/src/components/` (admin, jobs, employer, scholar, etc.)

### Database Schema
Core entities (all in `onyx` schema):
- **Admin** and **AllowedAdmins**: Admin user management with email-based allow list
- **Scholar** and **AllowedScholars**: Students/alumni with status tracking (current/alumni)
- **Employer**: Companies posting jobs, linked to admins
- **Job**: Job postings with extensive metadata (tags, years, location, deadline, etc.)
- **Archive**: Scholar-specific job archival
- **Saved**: Scholar job bookmarks
- **Application**: Track scholar applications

Custom PostgreSQL functions:
- `search_jobs_trgm()`: Trigram-based fuzzy search for live jobs
- `search_archived_jobs_trgm()`: Same for archived jobs
- `search_jobs_by_criteria()`: Filter jobs by exact criteria match

## Common Development Commands

### Backend
```bash
# Local development with nodemon
cd backend
npm run dev

# Run serverless offline (local API testing)
npm run offline

# Deploy to AWS
npm run deploy
# or
serverless deploy

# Run integration tests
npm test

# Run a single test file
npx jest src/integration/__tests__/job.tests.ts

# Build TypeScript
npm run build
```

### Frontend
```bash
# Development server
cd frontend
npm run dev

# Production build
npm run build

# Start production server
npm start

# Lint
npm run lint
```

### Database
To deploy database schema changes (from `backend/src/database/schema.ddl`):
```bash
cd backend
serverless deploy --stage dev --function deployDatabase

# Or connect directly via psql
psql -h {HOSTNAME} -U {MASTER_USERNAME} -d {DATABASE_NAME}
```

**Important**: Modify privacy and security groups to allow local database access during deployment, then restore original settings afterward.

## GraphQL Structure

### Backend
- **Type Definitions**: `backend/src/graphql/typeDefs/`
  - `admin.typedef.ts`, `analytics.typedef.ts`, `employer.typedef.ts`, `job.typedef.ts`, `scholar.typedef.ts`, `view.typedef.ts`
- **Resolvers**: `backend/src/graphql/resolvers/`
  - Matching resolver files for each typedef
  - Combined in `backend/src/graphql/resolvers/index.ts`

### Frontend
- **Queries**: `frontend/graphql/queries/`
- **Mutations**: `frontend/graphql/mutations/`
- **Apollo Client**: Configured in `frontend/hooks/ApolloContextProvider.tsx`

## Environment Configuration

### Backend (`backend/.env`)
Required variables:
- `DB_USER`, `DB_PASSWORD`, `DB_NAME`, `PROD_HOST`, `DB_PORT`
- `DB_ID` (database identifier)
- `NODE_ENV` (set to "dev" for development features like GraphQL introspection)
- `RESEND_API_KEY`: API key for the Resend email service (used to send scholar invite emails)
- `FROM_EMAIL` (optional): Sender address for invite emails; defaults to `cole.purboo@onyxinitiative.org`

### Frontend (`frontend/.env.local`)
Required:
- `NEXT_PUBLIC_URI`: GraphQL API endpoint
- Azure MSAL configuration for authentication

## Key Technical Details

### Deployment Configuration
- **serverless.yaml**: Uses `serverless-plugin-typescript`, `serverless-dotenv-plugin`
- **Runtime**: Node.js 16.x on AWS Lambda
- **Region**: ca-central-1 (Canada Central)
- **GraphQL Endpoints**: `/graphql` (both GET and POST with CORS enabled)

### Frontend Routing
- Uses Next.js Pages Router (not App Router)
- Main pages include: Dashboard, Jobs, Analytics, Admin, Archive, CreateAccount, Login, etc.
- API routes in `frontend/pages/api/`

### Database Connection
- Backend uses `backend/src/database/db.ts` and `index.ts` for PostgreSQL client
- Connection pooling via `pg` library
- Schema deployed from `backend/src/database/schema.ddl`

### Search Functionality
Jobs support two search modes:
1. **Trigram fuzzy search**: Finds similar matches using `pg_trgm` extension
2. **Criteria-based search**: Exact match filtering on tags, location, job type, etc.

Both respect the Archive table - archived jobs are excluded from standard search but can be searched separately.

## Email Service

Scholar invitations are sent via the Resend API (`backend/src/email/emailService.ts`). When adding scholars to the allow-list, `sendInviteEmail` or `sendBulkInviteEmails` are called automatically from the relevant admin resolver.

## Testing

Backend integration tests in `backend/src/integration/__tests__/` run via Jest with config in `backend/jest.config.ts`. Tests are integration-level and require a real database connection — do not mock the database layer.

## Other Notes

- `backend/src/graphql/utils.ts`: Shared GraphQL resolver utilities
- `backend/src/types/db.types.ts`: TypeScript types for raw DB row shapes
- Frontend uses `@vercel/analytics` (injected in `_app.tsx`) — no config needed beyond the Vercel deployment
