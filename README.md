# Handika Juan Putra Sinaga — Cloud & DevOps Portfolio

Modern, high-performance portfolio website of **Handika Juan Putra Sinaga**, showcasing expertise as a **Cloud Engineer & DevOps Engineer** specializing in AWS Multi-AZ infrastructure, Docker containerization, CI/CD pipelines, Linux systems administration, and production monitoring (Prometheus & Grafana).

---

## 🚀 Tech Stack

- **Framework:** [Next.js](https://nextjs.org/) 16 (Turbopack, App Router, React Server Components)
- **Library:** [React](https://react.dev/) 19
- **Styling:** [Tailwind CSS](https://tailwindcss.com/) v4
- **Language:** [TypeScript](https://www.typescriptlang.org/) 5
- **Icons:** [Lucide React](https://lucide.dev/) & Custom SVG Brand Icons
- **Theme:** Native Dark / Light mode with View Transitions API & persistent preference

---

## ✨ Features

- **High-Performance Architecture:** Static pre-rendering (SSG) with optimized page hydration and zero artificial blocking delays.
- **Interactive Technical Dossiers:** Interactive modals with deep architecture inspection, network topologies, infrastructure specs, and live project artifacts.
- **Native Smooth Navigation:** Accessible, standards-compliant single-page anchor navigation with navbar offset alignment (`scroll-mt-16`).
- **Verified Credentials & Badges:** Direct integration with Credly digital badge verification and credential verification URLs.
- **Dark & Light Mode:** Seamless theme switching powered by CSS variables and View Transitions.
- **Production-Ready Code Standards:** Strict TypeScript type-checking and ESLint compliance.

---

## 📁 Project Structure

```text
web-porto/
├── public/                 # Static assets (images, certificates, favicon, cv)
│   ├── images/
│   │   ├── certificates/   # High-resolution certificates
│   │   └── projects/       # Architecture diagrams and system screenshots
├── src/
│   ├── app/                # Next.js App Router (layout, page, globals.css, loading)
│   ├── components/         # Reusable UI components
│   │   ├── icons/          # Custom SVG brand icons (GitHub, LinkedIn)
│   │   ├── About.tsx       # Experience, education, background & timeline
│   │   ├── Certifications.tsx # Verified industry credentials & badges
│   │   ├── Contact.tsx     # Contact channels, email, social links
│   │   ├── Footer.tsx      # Portfolio footer & copyright
│   │   ├── Hero.tsx        # Hero section & core telemetry metrics
│   │   ├── Navbar.tsx      # Navigation header with theme switch & CV link
│   │   ├── Projects.tsx    # Technical architecture & project dossier
│   │   └── Skills.tsx      # Tech stack categorization & tooling meters
│   ├── context/            # Global React context (ThemeContext)
│   ├── data/               # Centralized portfolio data (portfolioData.ts)
│   └── types/              # TypeScript definitions & interfaces
├── e2e/                    # End-to-end integration test flows
├── .gitignore              # Production-grade gitignore configuration
├── eslint.config.mjs       # ESLint configuration
├── next.config.ts          # Next.js configuration
├── package.json            # Project dependencies and npm scripts
└── tsconfig.json           # TypeScript configuration
```

---

## 🛠️ Getting Started

### Prerequisites

- Node.js 20.x or higher
- npm, yarn, or pnpm

### Installation

```bash
# Clone the repository
git clone https://github.com/HandikaSinaga/web-porto.git

# Navigate into the project directory
cd web-porto

# Install dependencies
npm install
```

### Development

Run the development server with Turbopack:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Linting & Type Checking

```bash
# Run ESLint
npm run lint

# Verify TypeScript compilation
npx tsc --noEmit
```

### Production Build

```bash
# Build optimized production bundle
npm run build

# Start production server
npm run start
```

---

## 📄 License

This repository is maintained by **Handika Juan Putra Sinaga**. All rights reserved.
