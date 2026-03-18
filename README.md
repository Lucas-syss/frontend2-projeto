# StoneSaints™ — Premium Clothing Storefront

![Next.js](https://img.shields.io/badge/Next.js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
![Prisma](https://img.shields.io/badge/Prisma-3982CE?style=for-the-badge&logo=Prisma&logoColor=white)
![tRPC](https://img.shields.io/badge/tRPC-2596BE?style=for-the-badge&logo=tRPC&logoColor=white)
![Stripe](https://img.shields.io/badge/Stripe-626CD9?style=for-the-badge&logo=Stripe&logoColor=white)

A full-stack, premium clothing e-commerce application built with the **T3 Stack**. Features a curated storefront with Stripe checkout, a user account dashboard, and end-to-end type safety from the database to the UI.

---

## ✨ Features

### Storefront
- **Premium Landing Page** — Hero section, trust bar, category highlights, curated product grid, campaign lookbook, and craftsmanship section.
- **Product Modal** — Quick-view with size selection and add-to-cart.
- **Cart System** — Guest cart (Zustand/localStorage) that syncs with the database upon sign-in.
- **Stripe Checkout** — Secure payment flow with webhook-based order fulfillment.

### User Dashboard (`/archive`)
- **Overview** — Welcome header, stats cards (Total Orders, Total Spent, Member Since), and recent orders.
- **Order History** — Full order archive with status badges (Processing, Fulfilled, Refunded).
- **Account Settings** — Profile editor (name, email), password change form, and danger zone.

### Authentication
- **Email/Password** registration and login.
- **Google OAuth** via NextAuth.js.
- Session-based authentication with Prisma adapter.

---

## 🛠️ Tech Stack

| Layer | Technology |
| :--- | :--- |
| **Framework** | Next.js 15+ (App Router) |
| **Language** | TypeScript |
| **API** | tRPC (end-to-end type-safe) |
| **Database** | PostgreSQL via Prisma ORM |
| **Auth** | NextAuth.js / Auth.js + Prisma Adapter |
| **Payments** | Stripe Checkout + Webhooks |
| **Styling** | Tailwind CSS + Shadcn UI + Radix UI |
| **State** | TanStack Query (React Query) + Zustand |
| **Animation** | Framer Motion |
| **Notifications** | Sonner (toast) |
| **Icons** | Lucide React |

---

## 🚀 Getting Started

### Prerequisites
- Node.js v18+ (or Bun)
- PostgreSQL database
- Stripe account (for payments)

### Installation
```bash
# Clone and install
git clone <repo-url>
cd frontend2-projeto
bun install   # or npm install
```

### Environment Variables
```bash
cp .env.example .env
```

Required variables:
- `DATABASE_URL` / `DIRECT_URL` — PostgreSQL connection strings
- `NEXTAUTH_SECRET` — Random secret for session encryption
- `NEXTAUTH_URL` — App URL (e.g., `http://localhost:3000`)
- `GOOGLE_CLIENT_ID` / `GOOGLE_CLIENT_SECRET` — Google OAuth credentials
- `STRIPE_SECRET_KEY` / `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` — Stripe API keys
- `STRIPE_WEBHOOK_SECRET` — Stripe webhook signing secret

### Database Setup
```bash
npx prisma db push
# or
npx prisma migrate dev
```

### Run
```bash
bun run dev   # or npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

---

## 📁 Project Structure

```text
├── prisma/                 # Prisma schema & migrations
├── public/                 # Static assets (images, fonts)
├── src/
│   ├── app/                # Next.js App Router
│   │   ├── archive/        # User dashboard (tabbed: overview/orders/settings)
│   │   ├── cart/            # Shopping cart page
│   │   ├── login/          # Login page
│   │   ├── register/       # Registration page
│   │   ├── privacy/        # Privacy policy
│   │   ├── terms/          # Terms of service
│   │   └── api/            # API routes (Stripe webhooks, auth)
│   ├── components/         # Shared UI components
│   │   ├── AnnouncementBar, Hero, TrustBar, CategoryHighlights
│   │   ├── ProductGrid, ProductModal, Lookbook, Craftsmanship
│   │   ├── Navbar, Footer, CartSync
│   │   └── ui/             # Shadcn UI primitives
│   ├── server/             # Backend
│   │   ├── api/routers/    # tRPC routers (auth, cart, order, stripe, user)
│   │   ├── auth.ts         # NextAuth config
│   │   └── db.ts           # Prisma client
│   ├── store/              # Zustand stores (guest cart)
│   └── trpc/               # tRPC client setup
├── .env                    # Environment variables
├── tailwind.config.ts      # Tailwind theme
└── tsconfig.json           # TypeScript config
```

---

## 📜 Scripts

| Command | Description |
| :--- | :--- |
| `bun run dev` | Start development server |
| `bun run build` | Create production build |
| `bun run start` | Start production server |
| `bun run lint` | Run ESLint |

---

*StoneSaints™ — Crafted with intention.*
