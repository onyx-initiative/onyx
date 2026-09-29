# onyx
💼 Job board for the Onyx Initiative

## Backend

### Introduction
The onyx job board is deployed on an AWS EC2 instance. Below are the steps to deploy it locally using serverless
for testing and development purposes and to deploy it to AWS.

### Local Deployment
#### Prerequisites
- [Node.js](https://nodejs.org/en/download/)
- [Serverless](https://serverless.com/framework/docs/getting-started/)
- [AWS CLI](https://docs.aws.amazon.com/cli/latest/userguide/cli-chap-install.html)

#### Deployment
1. Clone the repository
2. Install the dependencies
```bash
npm install
```
3. Configure the AWS CLI (Only needed if deploying to AWS and need to use and access key)
```bash
aws configure
```
4. Deploy the application
```bash
serverless deploy
```
5. The application will be deployed to AWS and the endpoint will be displayed in the console.

### Database deployment
If you make modifications to the database schema (backend/src/database/schema.ddl), you will need to deploy the database.
You will likely need to modify 1. the privacy and 2. the security groups to allow local access to the database. Make sure
to change the security group back to the original settings after you are done.
```bash
serverless deploy --stage dev --function deployDatabase

# or connect to the database via the psql cli
# port automatically forwarded to 5432
psql -h {HOSTNAME} -U {MASTER_USERNAME} -d {DATABASE_NAME}
```


---

## Developer Guide

Everything below is for someone new to the codebase who is about to make changes. The original sections above are kept as-is; this guide fills in the parts they don't cover.

### Repository Layout

```
onyx/
├── backend/          # Apollo GraphQL API, deployed to AWS Lambda via Serverless Framework
├── frontend/         # Next.js 15 app (Pages Router), deployed to Vercel
├── microservices/    # Python web scraper, Docker image run on an EC2 instance
├── meetings/         # Meeting notes
├── assets/           # Shared images / branding
├── CLAUDE.md         # Condensed architecture notes (kept in sync with this README)
└── .github/workflows/tests.yml   # CI: runs backend integration tests on push and PR
```

The three deployable pieces (backend, frontend, microservices) are independent. Each has its own `package.json` / `requirements.txt`, its own env file, and its own deploy path. The root `package.json` is largely vestigial and is not what you install from.

### Technology Stack

| Layer | Technology | Notes |
|---|---|---|
| Frontend framework | Next.js 15 (Pages Router), React 19, TypeScript | Not the App Router. Routes are files in `frontend/pages/`. |
| UI | Mantine v6, Material UI, Tabler icons, Tiptap (rich text) | Mantine is the primary kit; MUI appears in older components. |
| Auth | NextAuth.js v4 | Providers: Azure AD, Google, Apple, and a credentials provider for admins. JWT session strategy, 2 hour expiry. |
| GraphQL client | Apollo Client 3 | Single client in `frontend/hooks/ApolloContextProvider.tsx` pointed at `NEXT_PUBLIC_URI`. |
| Backend framework | Apollo Server 3 (`apollo-server-lambda`) wrapped in Express | Express is only used to attach CORS, Helmet, and a couple of health endpoints. |
| Database | PostgreSQL (AWS RDS) with `pg_trgm` extension | Accessed through a `pg` Pool with `max: 1` (Lambda-friendly). |
| Email | Resend (backend invites), SendGrid (frontend weekly cron), React Email (templates) | Two email providers exist; Resend is the newer one. |
| Infra | Serverless Framework v4, AWS Lambda (Node 22), API Gateway, VPC in `ca-central-1` | esbuild bundling configured in `serverless.yaml`. |
| Scraper | Python, Docker | See `microservices/build.md`. |
| Analytics | Vercel Analytics, Chart.js, Google Charts | Vercel Analytics is injected in `_app.tsx`. |
| Testing | Jest + ts-jest (backend integration tests only) | Requires a real database connection. |

### Entry Points

#### Backend: `backend/src/index.ts`

Every request into the API goes through this file. It exports a single `handler` function that:

1. Calls `createApolloServer()` (`backend/src/graphql/createApolloServer.ts`) to build the schema from `typeDefs/` and `resolvers/`.
2. Wraps the Apollo Lambda handler in an Express app that adds CORS (config in `backend/src/lib/config.ts`), Helmet, JSON body parsing, and three plain HTTP endpoints: `/test`, `/healthcheck`, and `/error`.
3. Returns the Lambda handler.

`serverless.yaml` points at the compiled output, `build/index.handler`, and exposes it on `GET` and `POST /graphql`. `npm run dev` runs the same file locally under nodemon.

Request flow: **API Gateway → Lambda → `index.handler` → Express middleware → Apollo → resolver → `pg` Pool → RDS**

Other backend files you will touch most often:

- `backend/src/graphql/typeDefs/*.typedef.ts` — GraphQL schema, one file per domain (admin, analytics, employer, job, scholar, view). Combined in `typeDefs/index.ts`.
- `backend/src/graphql/resolvers/*.resolver.ts` — Matching resolvers, combined in `resolvers/index.ts`. Resolvers get the DB client via `dataSources.db`.
- `backend/src/database/index.ts` — Creates the `pg` Pool. Imports credentials from `backend/src/database/db.ts`, which is **gitignored** (see Local Setup below).
- `backend/src/database/schema.ddl` — Full schema including the custom trigram search functions. Note that it starts with `DROP SCHEMA IF EXISTS onyx CASCADE`, so running it wipes the database.
- `backend/src/email/emailService.ts` — Resend wrapper for scholar invite emails.
- `backend/src/types/db.types.ts` — TypeScript types for raw DB rows. The frontend imports from this file directly across the package boundary.

#### Frontend: `frontend/pages/_app.tsx` and `frontend/pages/index.tsx`

The frontend uses the Next.js **Pages Router**, so routing is file-based. Every file in `frontend/pages/` becomes a URL (`Jobs.tsx` → `/Jobs`, `index.tsx` → `/`). There is no route table anywhere.

- **`_app.tsx`** is the shell that wraps every page. It is not itself a page (underscore files are reserved by Next.js). It mounts the providers once so they persist across client-side navigation: `SessionProvider` (NextAuth), `MantineProvider`, `Notifications`, `ApolloContextProvider`, and Vercel `Analytics`. Next.js passes it `Component` (the page matched by the URL) and `pageProps` (the result of that page's `getServerSideProps`/`getStaticProps`, if any). No page in this app defines one, so `pageProps` is always empty and all data loading happens client-side.
- **`index.tsx`** is the page served at `/`. It checks the NextAuth session status and renders `Login` if unauthenticated, otherwise `Scholar`. That branch is plain React, not routing.

Other frontend pieces worth knowing:

- `frontend/pages/api/auth/[...nextauth].ts` — NextAuth config. The credentials provider validates admins by calling the backend GraphQL API directly (URL is currently hard-coded here rather than read from `NEXT_PUBLIC_URI`). Sign-in, sign-out, and error pages all route to `/Login`.
- `frontend/pages/api/cron.ts` — Sends the weekly "Onyx Job Weekly Update" email via SendGrid. Triggered by the Vercel cron in `frontend/vercel.json` (Fridays at 16:00 UTC).
- `frontend/pages/api/acceptedScholars.ts` — Scaffolding for a HubSpot sync. Not implemented.
- `frontend/graphql/queries/` and `frontend/graphql/mutations/` — Apollo `gql` documents. If you add a field on the backend, add it here too.
- `frontend/src/components/` — Components grouped by domain: `admin`, `employer`, `general`, `jobs`, `navbar`, `scholar`.
- `frontend/emails/` — React Email templates used by the cron job.

#### Microservices: `microservices/server.py`

A Python HTTP server exposing the web scraper in `microservices/webscraper/`. It is built as a Docker image and run on an EC2 instance. The backend reaches it via `microserviceUrl` in `backend/src/graphql/.env.ts`.

### Local Setup

#### Backend

```bash
cd backend
npm install
```

Create **two** files that are gitignored and therefore not in the repo. Ask an existing maintainer for the values.

1. `backend/.env`

```
DB_USER=
DB_PASSWORD=
DB_NAME=
PROD_HOST=
DB_PORT=5432
DB_ID=
NODE_ENV=dev
RESEND_API_KEY=
FROM_EMAIL=            # optional, defaults to cole.purboo@onyxinitiative.org
```

2. `backend/src/database/db.ts` — the Pool in `database/index.ts` imports credentials from this file rather than from `.env` (a workaround for env loading under Serverless). It should default-export an object with the same keys:

```ts
export default {
  DB_USER: "...",
  DB_PASSWORD: "...",
  DB_NAME: "...",
  PROD_HOST: "...",
  DB_PORT: 5432,
};
```

Then run:

```bash
npm run dev       # nodemon on src/index.ts
npm run offline   # serverless-offline on http://localhost:4000/dev/graphql
```

`serverless-offline` is commented out of the plugins list in `serverless.yaml`. Uncomment it locally to use `npm run offline`, and re-comment before deploying. With `NODE_ENV=dev`, GraphQL introspection is enabled so you can explore the schema in any GraphQL client.

The database is a remote RDS instance inside a VPC. Local development still talks to that remote instance, which is why the security group note in the Database deployment section above matters.

#### Frontend

```bash
cd frontend
npm install
```

Create `frontend/.env.local`:

```
NEXT_PUBLIC_URI=                      # GraphQL endpoint, e.g. https://<api-id>.execute-api.ca-central-1.amazonaws.com/dev/graphql
NEXT_PUBLIC_ENV=dev                   # controls post-login redirect
NEXT_PUBLIC_CALLBACK_URL=             # post-login redirect in prod
NEXTAUTH_SECRET=
NEXTAUTH_URL=http://localhost:3000
NEXT_PUBLIC_AZURE_AD_CLIENT_ID=
NEXT_PUBLIC_AZURE_CLIENT_SECRET=
NEXT_PUBLIC_GOOGLE_CLIENT_ID=
NEXT_PUBLIC_GOOGLE_CLIENT_SECRET=
APPLE_ID=                             # Apple sign-in is wired up but commented out in the UI
APPLE_SECRET=
NEXT_PUBLIC_SENDGRID_API_KEY=         # only needed for the weekly email cron
```

Then:

```bash
npm run dev     # http://localhost:3000
npm run build   # production build, run before opening a PR to catch type errors
npm run lint
```

### How Deployment Currently Works

There is no single deploy pipeline. Each piece is deployed separately, and the backend is deployed manually.

#### Backend → AWS Lambda (manual)

```bash
cd backend
npm run build          # tsc → build/
npm run deploy         # serverless deploy
```

What this does:

- Serverless Framework v4 reads `serverless.yaml`, bundles with esbuild, and uploads the `graphql` function to Lambda (Node 22, `ca-central-1`).
- Environment variables are pulled from `backend/.env` via `useDotenv: true` and baked into the Lambda config.
- The VPC, subnet group, and gateway attachment in `backend/resources/` are created or updated as CloudFormation resources. `resources/` is gitignored, so you will need those three YAML files from a maintainer before your first deploy.
- API Gateway exposes `GET` and `POST /graphql` with CORS. The stage is `dev` by default, which is why the production URL contains `/dev/graphql`.

Nobody runs this automatically. Merging to `main` does **not** deploy the backend.

> The `deployDatabase` function referenced in the Database deployment section above is no longer defined in `serverless.yaml`. To apply schema changes today, connect with `psql` and run `schema.ddl` (or the relevant portion of it) by hand. Remember that the file drops the whole `onyx` schema first.

#### Frontend → Vercel (automatic)

The frontend is deployed by Vercel's Git integration. Pushing to `main` triggers a production build; pushing any other branch creates a preview deployment. Environment variables live in the Vercel project settings, not in the repo. `frontend/vercel.json` also registers the weekly cron that hits `/api/cron`.

#### Microservices → EC2 (manual, Docker)

Follow `microservices/build.md`: build the image for `linux/amd64`, push it to ECR, SSH into the EC2 instance, pull, and run on port 80.

#### CI

`.github/workflows/tests.yml` runs `npm run test` in `backend/` on every push and pull request and posts a `tests` status check to the commit. The tests are integration tests against a real database, so the workflow needs DB credentials available as secrets to pass. It does not deploy anything.

### Making a Change: Typical Workflow

1. Branch from `main`.
2. **Schema change?** Edit `backend/src/database/schema.ddl`, then apply it to the database with `psql`. Update `backend/src/types/db.types.ts` to match.
3. **API change?** Add or edit the field in the relevant `*.typedef.ts`, implement it in the matching `*.resolver.ts`, and add an integration test in `backend/src/integration/__tests__/`. Run `npm test` from `backend/`.
4. **Frontend change?** Add the query or mutation in `frontend/graphql/`, then use it in a component with Apollo hooks. Run `npm run build` from `frontend/` to type-check.
5. Open a PR. CI runs the backend tests. Vercel builds a preview of the frontend.
6. After merge: Vercel deploys the frontend automatically. Deploy the backend by hand with `npm run deploy` if you changed it.

### Things That Will Trip You Up

- **Two gitignored files are required for the backend to start**: `backend/.env` and `backend/src/database/db.ts`. Missing either one produces a confusing import or connection error.
- **`resources/` is gitignored** but referenced by `serverless.yaml`. You cannot deploy the backend without it.
- **The frontend imports types from the backend** (`../../backend/src/types/db.types`). Both folders must be checked out together, and the frontend tsconfig must be able to resolve that path.
- **Every file in `frontend/pages/` is a public route**, including `Login.tsx`, `Scholar.tsx`, and `Loading.tsx`, even though they are mostly rendered as components from `index.tsx`.
- **The credentials-provider URL is hard-coded** in `[...nextauth].ts`. If the API Gateway URL changes, update it there as well as in `NEXT_PUBLIC_URI`.
- **CORS is wide open** (`origin: "*"`) in `backend/src/lib/config.ts`. Tighten this before relying on cookie-based auth against the API.
- **`schema.ddl` is destructive.** It drops and recreates the schema. Extract the statements you need rather than running the whole file against production.
- **Serverless stage is `dev`** even for the live deployment. Do not assume `dev` means non-production.
