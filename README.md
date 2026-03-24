# StoneSaints™ — Technical System Architecture

![Next.js 14+](https://img.shields.io/badge/Next.js%2014+-000000?style=for-the-badge&logo=nextdotjs&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)
![tRPC](https://img.shields.io/badge/tRPC-2596BE?style=for-the-badge&logo=tRPC&logoColor=white)
![Prisma Postgres](https://img.shields.io/badge/Prisma%20PostgreSQL-3982CE?style=for-the-badge&logo=Prisma&logoColor=white)

A strictly-typed, scalable, and responsive E-Commerce application utilizing the T3 Stack implementation. This architecture demonstrates modern patterns for state synchronization, React Server Components, tRPC mutations, and comprehensive Analytics.

## ⚙️ Core Technical Capabilities

### End-to-End Type Safety
Full Type safety traversing from the PostgreSQL schema up to the client boundaries.
- **Database**: Prisma ORM with automatically generated types.
- **API Engine**: Next.js App Router bridging native tRPC.
- **Data Fetching**: `@trpc/react-query` managing normalized query cache pipelines.

### Advanced State Mechanisms
Bridging complex User vs. Guest cart behavior gracefully.
- **Local Persistence**: `Zustand` with `persist` middleware manages the guest state in `LocalStorage`.
- **Database Synchronization**: Asynchronous tRPC mutation maps the local Zustand cart to the backend relational Cart entities instantly upon NextAuth sign-in.

### Production Environment Features
- **Vercel Speed Insights**: Natively hooked at the root layout for real-time Core Web Vitals telemetry.
- **Umami Analytics**: Integrated for lightweight, privacy-focused analytics without the need for cookie banners, replacing legacy Google Analytics tracking.
- **Environment Management**: Environment variables are strictly typed and securely handled directly in Node configurations via T3 Env.
- **SEO Engines**: Automatically executing dynamic `robots.ts` and `sitemap.ts` routing to facilitate standard crawling.

### Security & Integrations
- **Authentication**: `NextAuth.js` enforcing session validation. Integrates both OAuth (Google) and custom Credential validation powered by `bcryptjs`.
- **Payments Checkouts**: Stripe Checkout flow utilizing webhooks for secure, server-side payload delivery to establish successful Orders inside the DB.
- **Unit Testing**: Vitest coupled with React Testing Library executing core functionality validations (Cart addition constraints, limits, and authentication component behaviors).

---

## 🏗 System Design Layout

```text
├── src/
│   ├── app/                 # Next.js App Router / Server Boundaries
│   │   ├── archive/         # Authenticated User Database Dashboards
│   │   ├── vault/           # Technical Readout Report (Tech-Lead Facing)
│   │   ├── api/             # API entry points (trpc catch-all, stripe hooks)
│   │   └── sitemap.ts       # Dynamic SEO Mapping
│   ├── components/          # Sharable Client React Elements
│   │   └── ui/              # Functional Primitives (Shadcn + Framer Motion)
│   ├── server/              # Backend Control Plane
│   │   ├── api/routers/     # Domain Routers (user, cart, stripe, order)
│   │   ├── db.ts            # Prisma connection pooling layer
│   │   └── auth.ts          # NextAuth strategy injection
│   ├── store/               # Zustand Global State definitions
│   └── trpc/                # React Query encapsulation boundary
├── prisma/                  # Relational Schema
└── vitest.config.ts         # Testing execution bounds
```

---

## 🚀 Initialize Local Development

1. **Clone & Install Packages**
```bash
git clone <repository-url>
cd frontend2-projeto
bun install
```

2. **Establish Environment**
Ensure you inject your local POSTGRES DB strings, keys, and Google Analytics Measurement ID here.
```bash
cp .env.example .env
```

3. **Migrate Database Scheme**
```bash
bunx prisma db push
# or bunx prisma migrate dev
```

4. **Verify Systems / Run Tests**
```bash
bun run test
```

5. **Start Dev Server**
```bash
bun run dev
```

The application mounts directly to `http://localhost:3000`.
