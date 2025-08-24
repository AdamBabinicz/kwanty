# Overview

This project is an interactive quantum mechanics educational website called "Kwantowy Portal" (Quantum Portal). It's a modern full-stack web application that manifests quantum mechanical principles through dynamic visualizations and interactive elements. The site educates users about quantum mechanics concepts like wave-particle duality, superposition, entanglement, uncertainty, and quantum tunneling through immersive, hands-on experiences rather than traditional static content.

The application features a unique "quantum journey" approach where each section represents a "quantum leap" to understanding fundamental postulates. Users progress through interactive visualizations that demonstrate quantum phenomena, with a floating quantum control panel that follows mouse movement and provides navigation and settings controls.

# User Preferences

Preferred communication style: Simple, everyday language.

# System Architecture

## Frontend Architecture
- **Framework**: React with TypeScript for type safety and modern development
- **Build Tool**: Vite for fast development and optimized builds
- **Styling**: TailwindCSS with shadcn/ui components for consistent design system
- **Animations**: Framer Motion for smooth quantum-inspired animations and transitions
- **State Management**: React Context API with custom hooks for quantum state management
- **Internationalization**: React i18next supporting Polish, English, and Finnish languages
- **UI Components**: Extensive shadcn/ui component library with Radix UI primitives

## Backend Architecture
- **Runtime**: Node.js with Express.js framework
- **Language**: TypeScript throughout the entire stack
- **API Design**: RESTful API endpoints for contact form submissions
- **Data Validation**: Zod schemas for runtime type checking and validation
- **Storage**: In-memory storage implementation with interface for future database integration

## State Management Strategy
- **Quantum Context**: Custom React Context managing quantum-specific state (language, theme, measurements, wave collapse)
- **Component State**: Local state for individual quantum visualizations and interactions
- **Global State**: Theme management, accessibility settings, and user preferences
- **Mouse Tracking**: Real-time mouse position tracking for interactive quantum control panel

## Animation and Visualization System
- **Physics Simulations**: Custom quantum visualization components for each concept
- **Interactive Elements**: Clickable qubits, hoverable entangled particles, adjustable uncertainty meters
- **Responsive Animations**: Framer Motion integration for smooth transitions and quantum-inspired effects
- **Performance Optimization**: Efficient rendering of particle systems and complex animations

## Data Layer
- **Schema Definition**: Drizzle ORM with PostgreSQL schemas for users and contacts
- **Type Safety**: Drizzle-Zod integration for automatic TypeScript type generation
- **Database Ready**: Configured for PostgreSQL with migration support via Drizzle Kit
- **Storage Interface**: Abstracted storage layer supporting future database implementations

# External Dependencies

## Core Framework Dependencies
- **React Ecosystem**: React 18+, React Query for server state, React Hook Form for form management
- **Animation**: Framer Motion for physics-based animations and quantum visualizations
- **UI Framework**: Radix UI primitives with shadcn/ui component system
- **Styling**: TailwindCSS with PostCSS for utility-first styling approach

## Database and ORM
- **Database**: Configured for PostgreSQL (via DATABASE_URL environment variable)
- **ORM**: Drizzle ORM for type-safe database operations
- **Driver**: Neon Database serverless driver for PostgreSQL connections
- **Migrations**: Drizzle Kit for database schema management and migrations

## Development and Build Tools
- **Build System**: Vite for fast development and production builds
- **TypeScript**: Full TypeScript support across client, server, and shared code
- **Code Quality**: ESLint and TypeScript compiler for code quality assurance
- **Hot Reload**: Vite HMR with custom error handling for development experience

## Internationalization and Accessibility
- **i18n**: React i18next for multi-language support (Polish, English, Finnish)
- **Fonts**: Google Fonts (Sora, Fira Code) for modern typography
- **Icons**: Font Awesome for consistent iconography
- **Accessibility**: Built-in accessibility mode with high contrast and reduced animations

## Replit Integration
- **Development Banner**: Replit dev banner for development environment
- **Runtime Errors**: Replit error modal plugin for better debugging experience
- **Cartographer**: Development-only Replit cartographer for enhanced debugging