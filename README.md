# 🚀 Modern Next.js Grunge Clothing Shop

![Next.js](https://img.shields.io/badge/Next.js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
![Prisma](https://img.shields.io/badge/Prisma-3982CE?style=for-the-badge&logo=Prisma&logoColor=white)
![tRPC](https://img.shields.io/badge/tRPC-2596BE?style=for-the-badge&logo=tRPC&logoColor=white)
![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)

An advanced, highly polished full-stack application leveraging the finest tools in the modern React ecosystem. Evolving from its Vite origins, this project has been fully migrated into a robust **Next.js** environment integrated with the **T3 Stack**. It emphasizes maximum developer velocity, complete end-to-end type safety, and premium user-facing aesthetics.

---

## ✨ Key Capabilities & Features

- 🔒 **End-to-End Type Safety:** TypeScript natively bound from the database schema up to the React UI components using Prisma and tRPC.
- 🎨 **Premium UI/UX:** Responsive, dark-mode ready, and highly accessible user interface crafted with Tailwind CSS and Shadcn UI.
- 🛡️ **Authentication Built In:** Secure user sessions and provider integrations via NextAuth.js (v5 Beta) backed by Prisma.
- 🚀 **Performant Data Fetching:** Seamless data synchronization and caching on the client using TanStack Query (React Query) driving the tRPC client.
- 📝 **Streamlined Form Management:** Completely type-safe and validated form handling combining React Hook Form and Zod schemas.
- ✨ **Interactive Motion & Charts:** Fluid animations via Framer Motion, robust interactive charts via Recharts, and dynamic specialized UI elements.

---

## 🛠️ Tech Stack & Ecosystem

### 🏗️ Core Architecture
- **[Next.js 15+](https://nextjs.org/)** — React Framework (App Router, Server Actions, Server Components)
- **[TypeScript](https://www.typescriptlang.org/)** — Superset of JavaScript providing static typing
- **[tRPC](https://trpc.io/)** — End-to-end typesafe APIs without GraphQL/REST boilerplate

### 🗄️ Database & ORM
- **[Prisma](https://www.prisma.io/)** — Next-generation Node.js and TypeScript ORM for robust data modeling, migrations, and querying.

### 🔐 Authentication
- **[NextAuth.js / Auth.js](https://authjs.dev/)** — The absolute standard for Next.js authentication, utilizing the `@auth/prisma-adapter` to persist users.

### 💅 UI, Styling & Components
- **[Tailwind CSS](https://tailwindcss.com/)** — Utility-first, brilliantly fast CSS framework.
- **[Shadcn UI](https://ui.shadcn.com/)** — Beautifully designed, unstyled and highly customizable accessible components.
- **[Radix UI](https://www.radix-ui.com/)** — Headless UI primitives (Dialog, Dropdown, Hover Cards, Accordions, etc.) powering Shadcn.
- **[next-themes](https://github.com/pacocoursey/next-themes)** — Effortless integration for Dark/Light mode switching.

### 📦 Essential Libraries & React Ecosystem
| Library | Purpose |
| :--- | :--- |
| **`@tanstack/react-query`** | Advanced state management and data fetching |
| **`react-hook-form`** + **`zod`** | High-performance, flexible, and type-checked form validation |
| **`framer-motion`** | Production-ready motion and animation library for React |
| **`recharts`** | Composable, highly customizable React charting library |
| **`embla-carousel-react`** | Bare-bones, highly extensible carousel and slider logic |
| **`sonner`** | An opinionated toast component for elegant inline notifications |
| **`lucide-react`** | Beautiful, clean, consistently designed SVG icons |
| **`date-fns`** & **`react-day-picker`** | Modern JavaScript date utility libraries for scheduling and calendars |

---

## 🚀 Getting Started

### 1. Prerequisites
Ensure you have Node.js (v18+) and your preferred package manager (`npm`, `yarn`, `pnpm`, or `bun`) installed on your local machine.

### 2. Installation
Clone the repository and install the dependencies:
```bash
# Using npm
npm install

# Or using bun (as a bun.lockb is present in the repo)
bun install
```

### 3. Environment Variables
Create a `.env` file in the root directory and populate it with the appropriate values. The template requires a database URL, NextAuth secrets, and any necessary API keys.
```bash
cp .env.example .env
```

### 4. Database Setup
Push the Prisma schema to your local or remote database to create the required tables:
```bash
npx prisma db push
# or
npx prisma migrate dev
```

### 5. Running the Development Server
Launch the application locally.
```bash
npm run dev
# or
bun run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser to see the result.

---

## 📁 Project Structure

A high-level overview of how the Next.js application is organized:

```text
├── prisma/               # Prisma schema and database connection configuration
├── public/               # Static assets (images, fonts, favicons)
├── src/                  # Main application source code
│   ├── app/              # Next.js App Router root (Pages, Layouts, API routes)
│   ├── components/       # Shared UI components (Shadcn, custom components)
│   ├── lib/              # Utility functions, instances, and shared core logic
│   └── server/           # Backend trpc routers, auth configs, and database clients
├── .env                  # Environment variables
├── components.json       # Shadcn UI configuration file
├── tailwind.config.ts    # Tailwind CSS configuration and theme extensions
└── tsconfig.json         # TypeScript configuration
```

---

## 📜 Available Scripts

- `npm run dev` - Starts the Next.js development server.
- `npm run build` - Creates an optimized production build of the application.
- `npm run start` - Starts the Next.js production server.
- `npm run lint` - Runs ESLint to statically analyze the code for issues.

---

*Made with ❤️ using modern web development standards.*
