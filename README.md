# Project Explorer: A Project Management Portal

A lightweight enterprise project management portal built with **Next.js (App Router)**, **React 19**, and **TypeScript**. It enables cross-functional visibility into ongoing organizational programs, sprint tasks, team rosters, and project technical documentation.

---

## Features & Implementation Overview

### 1. Application Structure
- **Home (`/`)**: Portal landing page with executive metrics, featured programs, and quick navigation.
- **Dashboard (`/dashboard`)**: Operations hub featuring real-time activity and project velocity.
- **Projects (`/projects`)**: Filterable and searchable catalog of all initiatives.
- **About (`/about`)**: Organizational directory and operational guidelines.
- **Settings (`/settings`)**: Personal workspace preferences, display view toggles, and bookmark management.

### 2. Common Application Layout
- Implemented in `src/app/layout.tsx`.
- Persistent header navigation bar with active route highlighting, brand logo, favorites counter, and user profile badge.
- Persistent footer across all sections.

### 3. Dashboard Experience & Nested Sidebar
- Implemented in `src/app/dashboard/layout.tsx`.
- Dedicated dashboard sidebar navigation isolated strictly to dashboard routes (`/dashboard`, `/dashboard/analytics`, `/dashboard/reports`).
- Includes quick-access shortcuts to active projects and sprint status highlights.

### 4. Projects Module: Dynamic, Nested & Catch-all Routes
- **Dynamic Routing**:
  - `/projects/[id]` handles individual project workspaces.
- **Nested Routing & Shared Layout**:
  - `src/app/projects/[id]/layout.tsx` preserves common project headers (name, category, status, priority, lead, budget, delivery progress, favorite toggle) and persistent navigation tabs across:
    - **Overview**: `/projects/[id]`
    - **Team**: `/projects/[id]/team`
    - **Tasks**: `/projects/[id]/tasks`
    - **Activity**: `/projects/[id]/activity`
    - **Documentation**: `/projects/[id]/docs`
- **Catch-all Route (`[[...slug]]`)**:
  - `src/app/projects/[id]/docs/[[...slug]]/page.tsx` dynamically handles documentation at any depth:
    - `/projects/1/docs` (Root index)
    - `/projects/1/docs/setup` (Environment setup)
    - `/projects/1/docs/setup/database` (Database runbook)
    - `/projects/1/docs/architecture` (Architecture overview)
  - Displays the requested path breadcrumb hierarchy and renders relevant technical specifications.

### 5. Server and Client Component Architecture
- **Server Components**:
  - Read URL search parameters (`searchParams`) directly on the server to retrieve and filter projects.
  - Server-side data access layer (`src/lib/projects.ts`) reading from a local JSON dataset (`src/data/projects.json`).
- **Client Components**:
  - Search input and interactive filter dropdowns (`src/components/ProjectFilters.tsx`) synchronized with the URL.
  - Interactive project bookmarking (`FavoriteButton` & `FavoritesContext`) using client state and persistent browser storage.
  - Filter by favorites toggle preserving other query parameters.

### 6. Streaming UI with React Suspense
- The Dashboard (`src/app/dashboard/page.tsx`) demonstrates React Suspense and streaming:
  - Immediate rendering of the dashboard header, greeting, and high-level summary cards.
  - Server Components with simulated data retrieval delays:
    - `RecentActivityStream` wrapped in `<Suspense fallback={<RecentActivitySkeleton />}>`
    - `ProjectStatsStream` wrapped in `<Suspense fallback={<ProjectStatsSkeleton />}>`
  - Streaming fallback skeletons pulse smoothly while background data resolves.

### 7. Loading States & Reusable Skeletons
- Built-in App Router loading mechanisms:
  - `src/app/projects/loading.tsx`
  - `src/app/projects/[id]/loading.tsx`
- Pulse-animated skeleton loaders for project cards, metric stats, and detail views.

### 8. Error Handling & 404 Pages
- Graceful error boundary (`src/app/projects/[id]/error.tsx`) displaying a friendly message and a retry button (`reset()`).
- Error simulation trigger (`/projects/1?fail=true`) available for testing error boundary fallback behavior.
- Custom Not Found page for invalid project IDs (`src/app/projects/[id]/not-found.tsx`).
- Global 404 page (`src/app/not-found.tsx`).

### 9. Client-Side Interactivity
- **Project Favorites**: Heart/star bookmark toggle that updates the global favorites count in real-time.
- **Interactive Task Checklist**: Check off sprint tasks in `/projects/[id]/tasks` to dynamically recalculate progress percentage.
- **Preference Controls**: View mode selection and notification settings in `/settings`.

---

## Getting Started

### 1. Install Dependencies
```bash
npm install
```

### 2. Run the Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

### 3. Build and Start Production Server
```bash
npm run build
npm start
```

### 4. Run Linter
```bash
npm run lint
```
