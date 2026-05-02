# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

- Build project: `npm run build`
- Run development server: `npm run dev`
- Run tests: `npm run test`
- Run a single test: `npx vitest run <path_to_test>`
- Start production server: `npm run start` (after build)
- Preview production build: `npm run preview`

## Architecture & Structure

This is a full-stack application built with **TanStack Start**, utilizing a modern React 19 and Vite stack.

### Core Architecture
- **Framework**: TanStack Start (combining TanStack Router and a server-side runtime).
- **Routing**: File-based routing managed in `src/routes`.
  - `src/routes/__root.tsx`: The root layout and shell component for the entire application.
  - `src/routes/routeTree.gen.ts`: Automatically generated route tree.
- **Styling**: Tailwind CSS 4.0 with `@tailwindcss/vite` plugin.
- **Data Fetching**:
  - **Loaders**: Used in route definitions to fetch data before rendering.
  - **Server Functions**: Defined in `src/serverFns` using `createServerFn` for seamless client-server communication.
  - **API Routes**: Defined via the `server` property in route files.

### Project Layout
- `src/routes/`: Contains the application's pages and layouts.
- `src/components/`: Reusable UI components.
- `src/serverFns/`: Shared server-side logic and API wrappers.
- `src/styles.css`: Global styles and Tailwind imports.
- `src/router.tsx`: Router configuration.
