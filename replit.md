# Overview

Outfred is a modern, bilingual (Arabic/English) fashion discovery platform built with React, TypeScript, and Supabase. It offers smart search, merchant store management, and AI-powered outfit generation. The platform includes a comprehensive admin panel for managing users, merchants, and products, and has recently been migrated to Replit for deployment.

# User Preferences

Preferred communication style: Simple, everyday language.

# System Architecture

## Frontend Architecture

**Framework & Build System:**
- React 18 with TypeScript.
- Vite for building and development.
- Hash-based routing for SPA navigation.
- Tailwind CSS v4 for styling with custom design tokens.

**UI Component System:**
- Radix UI for accessible components.
- Custom glassmorphism design with CSS variables.
- Responsive, mobile-first layouts.
- Framer Motion for animations.

**State Management:**
- React Context API for global state (Language, Authentication).
- Local component state with `useState` hooks.
- No external state management libraries.

**Key Design Patterns:**
- Custom hooks for reusable logic.
- Component composition with Radix UI slots.
- CSS-in-JS via Tailwind classes and CSS variables.
- Bilingual content switching.

## Backend Architecture

**Platform:**
- Supabase Edge Functions (Deno runtime) using Hono framework.
- Deployed independently from the frontend.

**Authentication:**
- Custom token-based authentication (not Supabase Auth) using Base64-encoded JSON tokens (30-day expiration).
- Dual-header approach for Edge Function access and user authentication.
- Manual token validation in Edge Functions.

**API Structure:**
- RESTful endpoints under `/make-server-dec0bed9/` prefix.
- Role-based access control (admin, merchant, user).
- CORS enabled.

**Data Models:**
- Users, Merchants, Products, Import sessions, Statistics.

## Data Storage

**Database:**
- Supabase PostgreSQL.
- In-memory arrays used for demo/development data.

**File Storage:**
- External URLs for product images (no internal file upload system).

**Caching Strategy:**
- Browser localStorage for authentication tokens.

## System Design Choices

- **Complete Email & Notification System:** Implemented with bilingual templates, email verification, password reset, and real-time in-app notifications.
- **Complete Subscription System:** Features Free, Basic, and Pro plans with search rate limiting, monthly resets, and an admin management interface.
- **Paymob Payment Integration:** Skeleton for payment processing, ready for production API keys.
- **Admin Panel Overhaul:** Redesigned with a sidebar navigation, dashboard overview, and backend integration for CMS, site settings, payment settings, and subscription management.
- **Merchant Enhancements:** Improved product import security (merchants import to their own store), `isActive` and stock management for products, and real statistics in the merchant dashboard.
- **AI Configuration & Integration:** Dedicated Admin AI Settings page for controlling AI provider (OpenAI/Anthropic/Custom), model, and parameters. AI functionalities like smart search, image analysis (GPT-4 Vision for color detection), and outfit generation dynamically use these settings.
- **Bilingual Support:** Full Arabic/English support across the platform, including UI, content, and email templates.
- **Deployment:** Configured for Replit autoscale deployment.

# External Dependencies

**Third-Party Services:**
- **Supabase:** Edge Functions hosting.
- **Replit:** Frontend deployment.
- **Paymob:** Payment gateway integration (currently in demo mode).
- **OpenAI:** AI services (GPT-4 Vision) for smart search and image analysis.
- **Anthropic:** Planned as an alternative AI provider.

**External APIs:**
- Shopify JSON API for product imports.
- Generic website scraping for product extraction.

**NPM Packages (Key Dependencies):**
- `@supabase/supabase-js`
- `@radix-ui/*`
- `motion` (Framer Motion)
- `lucide-react`
- `sonner`
- `date-fns`
- `class-variance-authority`
- `hono`

**Development Tools:**
- TypeScript 5.x
- Vite
- Tailwind CSS v4
- ESLint
